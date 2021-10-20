import React, { useState } from 'react';
import { TaskType } from '../types';

interface TaskProps {
  saveTask?: (task: TaskType) => void;
  deleteTask?: (taskID: number) => void;
  moveTask?: (taskID: number, newStatus: string) => void;
  task: TaskType;
  buttonText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Task(props: TaskProps): JSX.Element {
  const [priority, setPriorityLevel] = useState(props.task.priority);
  const [collapsed, setCollapsed] = useState(props.task.isCollapsed);
  const [formAction, setFormAction] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formAction === 'save') {
      if (collapsed) {
        setCollapsed(false);
      } else {
        const newTask: TaskType = {
          id: props.task.id,
          title: e.target.title.value,
          description: e.target.description.value,
          priority: priority,
          status: props.task.status,
          isCollapsed: true,
        };

        props.saveTask && props.saveTask(newTask);
        setCollapsed(true);
      }
    }

    if (formAction === 'delete') {
      props.deleteTask && props.deleteTask(props.task.id);
    }
  }

  function setPriority(e: React.ChangeEvent<HTMLInputElement>) {
    setPriorityLevel(parseInt(e.target.getAttribute('_priority') as string));
  }

  return (
    <div className={`app-task ${collapsed ? 'is-collapsed' : ''}`}>
      <form onSubmit={handleSubmit} className={collapsed ? 'is-collapsed' : ''}>
        <input
          type="text"
          className="app-task__title input"
          name="title"
          placeholder="Enter task title"
          disabled={collapsed}
          defaultValue={props.task.title}
        />
        <textarea
          className="app-task__description input"
          name="description"
          placeholder="Enter task description"
          defaultValue={props.task.description}
        />
        <div className="app-task__priority-labels">
          <label className={`low ${priority === 0 ? 'selected' : ''}`}>
            <input _priority="0" onChange={setPriority} type="radio" name="priority" checked={priority === 0} />
            low
          </label>
          <label className={`medium ${priority === 1 ? 'selected' : ''}`}>
            <input _priority="1" onChange={setPriority} type="radio" name="priority" checked={priority === 1} />
            medium
          </label>
          <label className={`high ${priority === 2 ? 'selected' : ''}`}>
            <input _priority="2" onChange={setPriority} type="radio" name="priority" checked={priority === 2} />
            high
          </label>
        </div>
        <button
          onClick={() => {
            setFormAction('save');
          }}
          className="app-button app-button--small"
        >
          {collapsed ? 'Edit' : 'Save'}
        </button>
        {collapsed && (
          <button
            onClick={() => {
              setFormAction('delete');
            }}
            className="app-button app-button--small delete"
          >
            X
          </button>
        )}
      </form>
    </div>
  );
}

export default Task;
