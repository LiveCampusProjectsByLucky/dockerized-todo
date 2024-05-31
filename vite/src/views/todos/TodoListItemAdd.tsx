import { useContext } from "react";
import reloadContext from "../../context/reloadContext";
import { apiRequest } from "../../api/utils/fetch";

function TodoListItemAdd({ todolistId }: { todolistId: number }) {
  const { reload, setReload } = useContext(reloadContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todoName = event.currentTarget["add-todo-item"].value;
    apiRequest("todoitems", "POST", { todolistId, title: todoName }).then(
      (data: any) => {
        if (data.code === 201) {
          setReload(!reload);
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    );
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <label
        htmlFor="add-todo-item"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-900"
      >
        Add Todo
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-6 h-6 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <input
          type="text"
          id="add-todo-item"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add Todo"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-100 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-100 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoListItemAdd;
