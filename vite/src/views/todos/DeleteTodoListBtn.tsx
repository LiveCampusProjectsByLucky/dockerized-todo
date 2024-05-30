import { useContext } from "react";
import { apiRequest } from "../../api/utils/fetch";
import reloadContext from "../../context/reloadContext";

function DeleteTodoListBtn({ todoListId }: { todoListId: number }) {
    const {reload, setReload} = useContext(reloadContext);

  const handleDeleteTodoList = () => {
    apiRequest(`todolists/${todoListId}`, "DELETE").then((data: any) => {
      if (data.code === 204) {
        setReload(!reload);
      } else {
        alert("An error occurred. Please try again.");
      }
    });
  };

  return (
    <div className="flex justify-end">
        <button
          onClick={handleDeleteTodoList}
          type="button"
          className="my-8 text-white bg-red-400 hover:bg-red-600/90 focus:ring-4 focus:outline-none focus:ring-red-600/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-red-600/55 me-2 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 me-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete Todo List
        </button>
    </div>
  );
}

export default DeleteTodoListBtn;
