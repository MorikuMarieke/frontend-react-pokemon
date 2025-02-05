import React from 'react';
import './Button.css'

const Button = ({type, onClick, className, buttonText, isDisabled}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
            disabled={isDisabled}
        >
            {buttonText}
        </button>
    );
};



export default Button;