import React from 'react';

interface OrderProps {
  id: number;
  title: string;
  buttonText?: string;
  onClick?: any;
}

function Order(props: OrderProps): JSX.Element {
  return (
    <div className="app-order-card">
      <div className="app-order-card__name">{props.title}</div>
      <div className="app-spacer--16"></div>
      {props.buttonText && (
        <button className="app-button app-button--small" onClick={props.onClick}>
          {props.buttonText}
        </button>
      )}
    </div>
  );
}

export default Order;