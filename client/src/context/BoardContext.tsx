import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Board, Task, INITIAL_BOARD, MOCK_USERS } from '@/lib/types';
import { arrayMove } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';

interface BoardContextType {
  activeBoard: Board;
  moveTask: (taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => void;
  reorderColumn: (activeId: string, overId: string) => void;
  addTask: (columnId: string, task: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  addColumn: (title: string) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [activeBoard, setActiveBoard] = useState<Board>(INITIAL_BOARD);

  const moveTask = (taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => {
    setActiveBoard((prev) => {
      const newBoard = { ...prev };
      
      // Remove from source
      const sourceColumn = newBoard.columns[fromColumnId];
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      const oldIndex = sourceTaskIds.indexOf(taskId);
      sourceTaskIds.splice(oldIndex, 1);
      
      // Add to destination
      const destColumn = newBoard.columns[toColumnId];
      const destTaskIds = fromColumnId === toColumnId ? sourceTaskIds : Array.from(destColumn.taskIds);
      
      destTaskIds.splice(newIndex, 0, taskId);

      newBoard.columns = {
        ...newBoard.columns,
        [fromColumnId]: { ...sourceColumn, taskIds: sourceTaskIds },
        [toColumnId]: { ...destColumn, taskIds: destTaskIds },
      };
      
      // Update task's columnId reference
      newBoard.tasks[taskId] = { ...newBoard.tasks[taskId], columnId: toColumnId };

      return newBoard;
    });
  };

  const reorderColumn = (activeId: string, overId: string) => {
    setActiveBoard((prev) => {
      const oldIndex = prev.columnOrder.indexOf(activeId);
      const newIndex = prev.columnOrder.indexOf(overId);
      return {
        ...prev,
        columnOrder: arrayMove(prev.columnOrder, oldIndex, newIndex),
      };
    });
  };

  const addTask = (columnId: string, taskData: Partial<Task>) => {
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

    setActiveBoard((prev) => {
      return {
        ...prev,
        tasks: { ...prev.tasks, [newTaskId]: newTask },
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            taskIds: [...prev.columns[columnId].taskIds, newTaskId],
          },
        },
      };
    });
  };

  const deleteTask = (taskId: string) => {
    setActiveBoard((prev) => {
      const task = prev.tasks[taskId];
      if (!task) return prev;

      const column = prev.columns[task.columnId];
      const newTaskIds = column.taskIds.filter(id => id !== taskId);
      
      const newTasks = { ...prev.tasks };
      delete newTasks[taskId];

      return {
        ...prev,
        tasks: newTasks,
        columns: {
          ...prev.columns,
          [task.columnId]: { ...column, taskIds: newTaskIds },
        },
      };
    });
  };

  const addColumn = (title: string) => {
    const newColId = `c-${nanoid(4)}`;
    setActiveBoard((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newColId]: { id: newColId, title, taskIds: [] },
      },
      columnOrder: [...prev.columnOrder, newColId],
    }));
  };

  return (
    <BoardContext.Provider value={{ activeBoard, moveTask, reorderColumn, addTask, deleteTask, addColumn }}>
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
