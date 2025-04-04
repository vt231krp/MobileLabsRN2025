import { createContext, ReactNode, useState } from "react";
import { Task, TaskAction } from "@/types";

interface ITaskContext {
  tasks: Task[];
  setTaskCompleted: (taskId: string) => void;
}

export const TaskContext = createContext<ITaskContext | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "click",
      name: "Make a 10 clicks",
      action: TaskAction.CLICK,
      isCompleted: false,
    },
    {
      id: "doubleClick",
      name: "Make a 5 double clicks",
      action: TaskAction.DOUBLE_CLICK,
      isCompleted: false,
    },
    {
      id: "longPress",
      name: "Make a long presses (3s)",
      action: TaskAction.LONG_PRESS,
      isCompleted: false,
    },
    {
      id: "drag",
      name: "Drag the block",
      action: TaskAction.DRAG,
      isCompleted: false,
    },
    {
      id: "leftSwipe",
      name: "Make a swipe to the left",
      action: TaskAction.LEFT_SWIPE,
      isCompleted: false,
    },
    {
      id: "rightSwipe",
      name: "Make a swipe to the right",
      action: TaskAction.RIGHT_SWIPE,
      isCompleted: false,
    },
    {
      id: "resize",
      name: "Resize the block",
      action: TaskAction.RESIZE,
      isCompleted: false,
    },
    {
      id: "collect",
      name: "Collect 100 points",
      action: TaskAction.COLLECT,
      isCompleted: false,
    },
  ]);

  const setTaskCompleted = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: true } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, setTaskCompleted }}>
      {children}
    </TaskContext.Provider>
  );
};
