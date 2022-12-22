import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/Hooks/use-Http";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTask = (taskObj) => {
    const loadedTask = [];

    for (const taskKey in taskObj) {
      loadedTask.push({ id: taskKey, text: taskObj[taskKey].text });
    }
    setTasks(loadedTask);
  };
  const []useHttp({
    url: "https://task-a6072-default-rtdb.firebaseio.com/tasks.json",
  });

  useEffect(() => {
    useHttp();
  }, []);

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
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
