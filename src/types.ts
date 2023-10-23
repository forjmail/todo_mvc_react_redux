export interface StateType {
  todos: Todo[];
  editedId: number;
  filter: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
