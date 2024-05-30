import { useContext, useEffect, useState } from "react";
import useGetTodoLists from "../../api/hooks/useGetTodoLists";
import TodoListItems from "./TodoListItems";
import DeleteTodoListBtn from "./DeleteTodoListBtn";
import reloadContext from "../../context/reloadContext";

function TodoListTabs() {
  const { reload } = useContext(reloadContext);

  const { todoLists } = useGetTodoLists();
  const tabs = todoLists;

  const [activeTab, setActiveTab] = useState<number>();

  useEffect(() => {
    // check if activeTab is in todoLists
    const isActiveTabInTabs = tabs.find((tab) => tab.id === activeTab);
    if (!isActiveTabInTabs) {
      setActiveTab(tabs[tabs?.length - 1]?.id);
    }
  }, [todoLists, reload]);

  return (
    <>
      {tabs.length > 0 ? (
        <>
          <div className="mt-16 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer px-4 py-2 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:border-gray-700"
                  }`}
                >
                  {tab.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 text-sm text-gray-900 dark:text-gray-300">
            <h1 className="my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-600">
              Todo List:{" "}
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-300">
                {tabs.map((tab) => {
                  if (tab.id === activeTab) {
                    return tab.title;
                  }
                })}
              </span>
            </h1>

            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={activeTab === tab.id ? "" : "hidden"}
              >
                <TodoListItems todolistId={tab.id} item={tab.items} />
              </div>
            ))}

            {activeTab && <DeleteTodoListBtn todoListId={activeTab!} />}
          </div>
        </>
      ) : (
        <h1 className="my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-600">
          No Todo List Found
        </h1>
      )}
    </>
  );
}

export default TodoListTabs;
