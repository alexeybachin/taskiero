import React from 'react';

interface OrderProps {
  id: number;
  title: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Order(props: OrderProps): JSX.Element {
  return (
    <div className="app-order-card">
      <div className="app-order-card__name">{props.title}</div>
      <div className="app-spacer--16" />
      {props.buttonText && (
        <button className="app-button app-button--small" onClick={props.onClick}>
          {props.buttonText}
        </button>
      )}
    </div>
  );
}

export default Order;
