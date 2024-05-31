import { apiRequest } from "../../api/utils/fetch";
import { TodoItemI } from "../../api/hooks/useGetTodoLists";
import { useContext, useState } from "react";
import reloadContext from "../../context/reloadContext";

function TodoListItem({ item }: { item: TodoItemI }) {
  const { reload, setReload } = useContext(reloadContext);
  const [done, setDone] = useState<boolean>(
    item.isComplete == 1 ? true : false
  );

  const handleDone = (e: any) => {
    setDone(!done);
    apiRequest(`todoitems/${e.target.value}`, "PUT", {
      isComplete: e.target.checked ? 1 : 0,
    })

    setReload(!reload);
  };

  return (
    <div
      key={item.id}
      className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
    >
      <input
        onChange={handleDone}
        id={item.id.toString()}
        type="checkbox"
        value={item.id.toString()}
        name="bordered-checkbox"
        checked={done}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={item.id.toString()}
        className={`text-left w-full py-4 ms-2 text-sm font-medium cursor-pointer ${
          done
            ? "line-through text-gray-400"
            : "text-gray-900 dark:text-gray-600"
        }`}
      >
        {item.title}
      </label>
    </div>
  );
}

export default TodoListItem;
