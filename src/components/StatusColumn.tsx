import React from 'react';

interface StatusColumnProps {
  title: string;
  children?: React.ReactNode;
}

function StatusColumn(props: StatusColumnProps): JSX.Element {
  return (
    <div className="app-status-column">
      <div className="app-status-column__title">{props.title}</div>
      <div className="app-status-column__items">{props.children}</div>
    </div>
  );
}

export default StatusColumn;
