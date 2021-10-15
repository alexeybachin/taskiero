import React from 'react';
import './scss/main.scss';

function App(): JSX.Element {
  return (
    <div className="app-wrapper">
      <header className="app-header"></header>
      <div className="app-content"></div>
      <footer className="app-footer"></footer>
    </div>
  );
}

export default App;
