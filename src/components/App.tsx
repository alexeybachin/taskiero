import React, { useState } from 'react';
import '../scss/main.scss';
import Header from './Header';
import Orders from './Orders';

function App(): JSX.Element {
  const [state, setState] = useState({ counter: 0, orders: [] });

  return (
    <div className="app-wrapper">
      <Header />
      <div className="app-content">
        <Orders orders={state.orders} counter={state.counter} setState={setState} />
      </div>
    </div>
  );
}

export default App;
