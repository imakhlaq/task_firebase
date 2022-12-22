import React, { useEffect, useState, useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/Hooks/use-Http";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTask = useCallback((taskObj) => {
    const loadedTask = [];

    for (const taskKey in taskObj) {
      loadedTask.push({ id: taskKey, text: taskObj[taskKey].text });
    }
    setTasks(loadedTask);
  }, []);
  const [isLoading, error, sendRequest] = useHttp(transformTask);

  useEffect(() => {
    sendRequest({
      url: "https://task-a6072-default-rtdb.firebaseio.com/tasks.json",
    });
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
