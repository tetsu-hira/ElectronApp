import React from 'react';

type Props = {
  button: string;
  handleSort: any;
  sort: any;
};

const Button: React.FC<Props> = ({ button, handleSort, sort }) => {
  return (
    <button onClick={() => handleSort(button)} className={`ItemHead ${button}`}>
      {button.charAt(0).toUpperCase() + button.slice(1)}
    </button>
  );
};
export default Button;
