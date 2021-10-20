import React from 'react';
import Task from './Task';
import { TaskType } from '../types';

interface StatusColumnProps {
  status: string;
  tasks: TaskType[];
  saveTask?: (taskToAdd: TaskType) => void;
  deleteTask?: (taskID: number) => void;
  moveTask?: (taskID: number, newStatus: string) => void;
}

function StatusColumn(props: StatusColumnProps): JSX.Element {
  let taskList, tasksForStatus;

  if (props.tasks) {
    tasksForStatus = props.tasks.filter((task) => {
      return task.status === props.status;
    });
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          saveTask={(task) => props.saveTask && props.saveTask(task)}
          deleteTask={(id) => props.deleteTask && props.deleteTask(id)}
          moveTask={(id, status) => props.moveTask && props.moveTask(id, status)}
          key={task.id}
          task={task}
        />
      );
    });
  }

  return (
    <div className="app-status-column">
      <div className="app-status-column__title">{props.status}</div>
      <div className="app-status-column__items">{taskList}</div>
    </div>
  );
}

export default StatusColumn;
