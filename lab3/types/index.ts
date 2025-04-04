export enum TaskAction {
  CLICK = "click",
  DOUBLE_CLICK = "doubleClick",
  LONG_PRESS = "longPress",
  DRAG = "drag",
  LEFT_SWIPE = "leftSwipe",
  RIGHT_SWIPE = "rightSwipe",
  RESIZE = "resize",
  COLLECT = "collect",
}

export interface Task {
  id: string;
  name: string;
  action: TaskAction;
  isCompleted: boolean;
}
