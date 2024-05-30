import "./App.css";
import { useState } from "react";
import NewTodoListForm from "./views/todos/NewTodoListForm";
import TodoListTabs from "./views/todos/TodoListTabs";
import ReloadContext from "./context/reloadContext";


function App() {
  const [reload, setReload] = useState(false);

  return (
    <ReloadContext.Provider value={{ reload, setReload }}>
      <NewTodoListForm />
      <TodoListTabs />
    </ReloadContext.Provider>
  );
}

export default App;
