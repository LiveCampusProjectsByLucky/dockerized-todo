import { TodoItemI } from "../../api/hooks/useGetTodoLists";
import TodoListItem from "./TodoListItem";
import TodoListItemAdd from "./TodoListItemAdd";

function TodoListItems({ todolistId, item }: { todolistId : number, item: TodoItemI[] }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <TodoListItemAdd todolistId={todolistId} />
        {item.map((todo) => (
          <TodoListItem key={todo.id} item={todo} />
        ))}
      </div>
    </>
  );
}

export default TodoListItems;
