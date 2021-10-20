import React from 'react';

interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps): JSX.Element {
  return (
    <header className="app-header">
      <h1>{props.title}</h1>
    </header>
  );
}

export default Header;
