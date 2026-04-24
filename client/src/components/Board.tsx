import React, { useMemo, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useBoard } from '@/context/BoardContext';
import { BoardColumn } from './Column';
import { TaskCard } from './TaskCard';
import { createPortal } from 'react-dom';
import { Task, Column } from '@/lib/types';
import { TaskDetailModal } from './TaskDetailModal';

export function KanbanBoard() {
  const { activeBoard, moveTask, reorderColumn, updateTask } = useBoard();

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor)
  );

  const columnIds = useMemo(() => activeBoard.columnOrder, [activeBoard]);

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!isActiveTask) return;

    // Task over Task - visual feedback handled by dnd-kit mostly
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Column Reordering
    if (active.data.current?.type === 'Column') {
      if (activeId !== overId) {
        reorderColumn(activeId as string, overId as string);
      }
      return;
    }

    // Task Reordering / Moving
    if (active.data.current?.type === 'Task') {
      const activeTask = active.data.current.task;
      
      // Dropping over another Task
      if (over.data.current?.type === 'Task') {
        const overTask = over.data.current.task;
        const overColumnId = overTask.columnId;
        const overColumn = activeBoard.columns[overColumnId];
        const overIndex = overColumn.taskIds.indexOf(overId as string);
        
        moveTask(activeId as string, activeTask.columnId, overColumnId, overIndex);
      }
      
      // Dropping over a Column (empty area)
      else if (over.data.current?.type === 'Column') {
        const overColumnId = overId as string;
        // Add to end of column
        const newIndex = activeBoard.columns[overColumnId].taskIds.length;
        moveTask(activeId as string, activeTask.columnId, overColumnId, newIndex);
      }
    }
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="flex h-full gap-4 overflow-x-auto pb-4 px-2">
        <SortableContext items={columnIds}>
          {columnIds.map((colId) => {
            const column = activeBoard.columns[colId];
            const tasks = column.taskIds.map(taskId => activeBoard.tasks[taskId]);
            // We need to update BoardColumn to pass onClick to TaskCard, but BoardColumn uses TaskCard inside.
            // Wait, BoardColumn renders TaskCard. I need to update BoardColumn to accept onTaskClick.
            // Let's assume I'll update BoardColumn next.
             return <BoardColumn key={colId} column={column} tasks={tasks} onTaskClick={handleTaskClick} />;
          })}
        </SortableContext>
      </div>

      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <BoardColumn
              column={activeColumn}
              tasks={activeColumn.taskIds.map(taskId => activeBoard.tasks[taskId])}
              onTaskClick={() => {}} 
            />
          )}
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>,
        document.body
      )}

      <TaskDetailModal 
        task={selectedTask} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onUpdate={updateTask} 
      />

    </DndContext>
  );
}
