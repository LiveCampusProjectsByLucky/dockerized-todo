import { useState, useEffect, useContext } from "react";
import { apiRequest } from "../utils/fetch";
import reloadContext from "../../context/reloadContext";

export interface TodoListsI {
  data: TodoItemsI[];
}

export interface TodoItemsI {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  items: any[];
}

export interface TodoItemI {
  todolistId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  isComplete: 0 | 1;
}

const useGetTodoLists = () => {
  const { reload } = useContext(reloadContext);
  const [todoLists, setTodoLists] = useState<TodoItemsI[]>([]);

  useEffect(() => {
    apiRequest("todolists").then((res: TodoListsI) => {
      setTodoLists(res.data);
    });
  }, [reload]);

  return { todoLists };
};

export default useGetTodoLists;
