import React, { useState, useEffect } from 'react';
import { TaskType } from '../types';
import '../scss/main.scss';
import Header from './Header';
import StatusColumn from './StatusColumn';

function App(): JSX.Element {
  const [tasks, setTasks] = useState<Array<TaskType>>([]);

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  /**
   * Adds new empty task
   */
  function addTask() {
    const lastTask = tasks[tasks.length - 1];

    let newTaskID = 1;

    if (lastTask !== undefined) {
      newTaskID = lastTask.id + 1;
    }

    setTasks((tasks: TaskType[]) => [
      ...tasks,
      {
        id: newTaskID,
        status: 'Todo',
        title: '',
        description: '',
        priority: 0,
        isCollapsed: false,
      },
    ]);
  }

  /**
   * Saves task
   * @param taskToAdd
   */
  function saveTask(taskToAdd: TaskType) {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    const newTaskList = [taskToAdd, ...filteredTasks];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  /**
   * Deletes task
   * @param taskID
   */
  function deleteTask(taskID: number) {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskID;
    });

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  }

  /**
   * Moves task to a different status section
   * @param taskID
   * @param newStatus
   */
  function moveTask(taskID: number, newStatus: string) {
    const task = tasks.filter((task) => {
      return task.id === taskID;
    })[0];

    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskID;
    });

    task.status = newStatus;

    const newTaskList = [...filteredTasks, task];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  function saveTasksToLocalStorage(tasks: TaskType[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    const loadedTasks = localStorage.getItem('tasks');

    if (loadedTasks != null) {
      setTasks(JSON.parse(loadedTasks));
    }
  }

  return (
    <div className="app-wrapper">
      <Header title="Task Manager" />
      <div className="app-content">
        <button className="app-button app-button--large mb-xl" onClick={addTask}>
          New task
        </button>
        <div className="app-grid">
          <StatusColumn status="Todo" tasks={tasks} saveTask={saveTask} deleteTask={deleteTask} moveTask={moveTask} />
          <StatusColumn
            status="In Progress"
            tasks={tasks}
            saveTask={saveTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
          />
          <StatusColumn status="Done" tasks={tasks} saveTask={saveTask} deleteTask={deleteTask} moveTask={moveTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
