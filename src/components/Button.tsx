import React, { useState } from 'react';

interface ButtonProps {
  buttonText: string;
}

const Button: React.FC<ButtonProps> = ({ buttonText }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <button onClick={handleClick}>
      {clicked ? 'Button clicked!' : buttonText}
    </button>
  );
};

export default Button;
