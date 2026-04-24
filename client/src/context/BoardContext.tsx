import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Board, Task, INITIAL_BOARD } from '@/lib/types';
import { arrayMove } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

interface BoardContextType {
  activeBoard: Board;
  moveTask: (taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => Promise<void>;
  reorderColumn: (activeId: string, overId: string) => Promise<void>;
  addTask: (columnId: string, task: Partial<Task>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  addColumn: (title: string) => Promise<void>;
  loading: boolean;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

const BOARD_ID = "default-board"; // For this demo, we use a single shared board

export function BoardProvider({ children }: { children: ReactNode }) {
  const [activeBoard, setActiveBoard] = useState<Board>(INITIAL_BOARD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const unsub = onSnapshot(doc(db, "boards", BOARD_ID), (docSnap) => {
      if (docSnap.exists()) {
        setActiveBoard(docSnap.data() as Board);
      } else {
        // Initialize board if it doesn't exist
        setDoc(doc(db, "boards", BOARD_ID), INITIAL_BOARD);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const moveTask = async (taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => {
    const newBoard = { ...activeBoard };
    
    // Remove from source
    const sourceColumn = newBoard.columns[fromColumnId];
    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    const oldIndex = sourceTaskIds.indexOf(taskId);
    if (oldIndex !== -1) sourceTaskIds.splice(oldIndex, 1);
    
    // Add to destination
    const destColumn = newBoard.columns[toColumnId];
    const destTaskIds = fromColumnId === toColumnId ? sourceTaskIds : Array.from(destColumn.taskIds);
    destTaskIds.splice(newIndex, 0, taskId);

    newBoard.columns = {
      ...newBoard.columns,
      [fromColumnId]: { ...sourceColumn, taskIds: sourceTaskIds },
      [toColumnId]: { ...destColumn, taskIds: destTaskIds },
    };
    
    newBoard.tasks[taskId] = { ...newBoard.tasks[taskId], columnId: toColumnId };

    await setDoc(doc(db, "boards", BOARD_ID), newBoard);
  };

  const reorderColumn = async (activeId: string, overId: string) => {
    const oldIndex = activeBoard.columnOrder.indexOf(activeId);
    const newIndex = activeBoard.columnOrder.indexOf(overId);
    const newOrder = arrayMove(activeBoard.columnOrder, oldIndex, newIndex);
    
    await updateDoc(doc(db, "boards", BOARD_ID), {
      columnOrder: newOrder
    });
  };

  const addTask = async (columnId: string, taskData: Partial<Task>) => {
    const newTaskId = `t-${nanoid(4)}`;
    const newTask: Task = {
      id: newTaskId,
      columnId,
      title: taskData.title || 'New Task',
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      assignees: taskData.assignees || [],
      tags: taskData.tags || [],
    };

    const newBoard = { ...activeBoard };
    newBoard.tasks[newTaskId] = newTask;
    newBoard.columns[columnId].taskIds.push(newTaskId);

    await setDoc(doc(db, "boards", BOARD_ID), newBoard);
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    const newBoard = { ...activeBoard };
    if (!newBoard.tasks[taskId]) return;

    newBoard.tasks[taskId] = {
      ...newBoard.tasks[taskId],
      ...updates
    };

    await setDoc(doc(db, "boards", BOARD_ID), newBoard);
  };

  const deleteTask = async (taskId: string) => {
    const newBoard = { ...activeBoard };
    const task = newBoard.tasks[taskId];
    if (!task) return;

    const column = newBoard.columns[task.columnId];
    newBoard.columns[task.columnId].taskIds = column.taskIds.filter(id => id !== taskId);
    delete newBoard.tasks[taskId];

    await setDoc(doc(db, "boards", BOARD_ID), newBoard);
  };

  const addColumn = async (title: string) => {
    const newColId = `c-${nanoid(4)}`;
    const newBoard = { ...activeBoard };
    newBoard.columns[newColId] = { id: newColId, title, taskIds: [] };
    newBoard.columnOrder.push(newColId);

    await setDoc(doc(db, "boards", BOARD_ID), newBoard);
  };

  return (
    <BoardContext.Provider value={{ activeBoard, moveTask, reorderColumn, addTask, updateTask, deleteTask, addColumn, loading }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}
