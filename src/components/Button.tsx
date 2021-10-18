import React from 'react';

interface ButtonProps {
  cssClass?: [string];
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ cssClass, children, onClick }) => {
  return (
    <button className={'app-button' + cssClass?.join(' ')} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
