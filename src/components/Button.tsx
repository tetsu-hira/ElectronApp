import React from 'react';

const Button: React.FC<Props> = ({ key, button, handleSort, sort }) => {
  return (
    <button onClick={() => handleSort(key)} className={`ItemHead ${button}`}>
      {button.charAt(0).toUpperCase() + button.slice(1)}
    </button>
  );
};
export default Button;
