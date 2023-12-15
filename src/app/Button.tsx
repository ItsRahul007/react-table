import React from 'react'

interface I_Button {
    text: string | any | undefined;
    onClick: () => void;
}

const Button: React.FC<I_Button> = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
        {text ? text : "Click me!"}
    </button>
  )
}

export default Button;