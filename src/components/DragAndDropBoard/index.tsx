import { useCallback, useEffect, useMemo, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import DraggableElement from "../DraggableTaskCard";

import { KanbanBoardData } from "@/utils/data";
import { TaskCardPanelProps, TaskCardProps, TaskPanelProps } from "@/types";

const DragAndDropBoard = () => {
  // Define Kanban panel names
  const kanbanPanels = useMemo(() => ["To Do", "On Progress", "Done"], []);

  // Initialize Kanban task state
  const [kanbanTasks, setKanbanTasks] = useState<TaskCardPanelProps>(
    KanbanBoardData
  );

  // Remove element from list
  const removeFromList = (list: TaskCardProps[], index: number) => {
    const updatedList = Array.from(list);
    const [removed] = updatedList.splice(index, 1);
    return [removed, updatedList] as [TaskCardProps, TaskCardProps[]];
  };

  // Add element to list
  const addToList = useCallback(
    (list: TaskCardProps[], index: number, task: TaskCardProps) => {
      const updatedList = Array.from(list);
      updatedList.splice(index, 0, task);
      return updatedList;
    },
    []
  );

  // Handle drag and drop events
  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const updatedKanbanTasks = { ...kanbanTasks };

      const sourceList = updatedKanbanTasks[result.source.droppableId].tasks;
      const [removedElement, newSourceList] = removeFromList(
        sourceList,
        result.source.index
      );

      updatedKanbanTasks[result.source.droppableId].tasks = newSourceList;

      const destinationList =
        updatedKanbanTasks[result.destination.droppableId].tasks;
      updatedKanbanTasks[result.destination.droppableId].tasks = addToList(
        destinationList,
        result.destination.index,
        removedElement
      );

      setKanbanTasks(updatedKanbanTasks);
    },
    [kanbanTasks, addToList]
  );

  return (
    <div className="px-4 md:px-6 lg:px-9 w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid lg:grid-cols-3 w-full gap-6">
          {kanbanPanels.map((panel, index) => (
            <DraggableElement
              panel={KanbanBoardData[panel]}
              key={`${panel}-${index}`}
              panelKey={panel}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DragAndDropBoard;
