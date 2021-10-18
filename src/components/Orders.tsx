import React, { useState, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import StatusColumn from './StatusColumn';
import Order from './Order';

interface OrdersProps {
  orders: { id: number; title: string; status: string }[];
  counter: number;
  setState: Dispatch<SetStateAction<any>>;
}

const Orders: React.FC<OrdersProps> = ({ orders, counter, setState }) => {
  const updateStatus = (id: number, newStatus: string) => {
    let allOrders = orders;
    allOrders = allOrders.map((order) => {
      if (order.id === id) {
        order.status = newStatus;
      }
      return order;
    });
    setState((prevState: React.ComponentState) => ({
      ...prevState,
      orders: allOrders,
    }));
  };

  const placeOrder = (e: SyntheticEvent) => {
    e.preventDefault();
    setState({ counter: counter + 1, orders: [{ id: counter, title: 'Order ' + counter, status: 'New' }, ...orders] });
  };

  return (
    <div className="app-container">
      <button className="app-button app-button--large" onClick={placeOrder}>
        New
      </button>
      <div className="app-spacer--32"></div>
      <div className="app-grid">
        <div className="app-grid-item">
          <StatusColumn title="New">
            {orders &&
              orders.map((order) => {
                if (order.status === 'New') {
                  return (
                    <Order
                      key={order.id}
                      id={order.id}
                      title={order.title}
                      buttonText="Begin preparing"
                      onClick={() => updateStatus(order.id, 'In Progress')}
                    />
                  );
                }
              })}
          </StatusColumn>
        </div>
        <div className="app-grid-item">
          <StatusColumn title="In Progress">
            {orders &&
              orders.map((order) => {
                if (order.status === 'In Progress') {
                  return (
                    <Order
                      key={order.id}
                      id={order.id}
                      title={order.title}
                      buttonText="Mark as prepared"
                      onClick={() => updateStatus(order.id, 'Done')}
                    />
                  );
                }
              })}
          </StatusColumn>
        </div>
        <div className="app-grid-item">
          <StatusColumn title="Done">
            {orders &&
              orders.map((order) => {
                if (order.status === 'Done') {
                  return <Order key={order.id} id={order.id} title={order.title} />;
                }
              })}
          </StatusColumn>
        </div>
      </div>
    </div>
  );
};

export default Orders;
