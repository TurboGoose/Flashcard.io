import React from 'react';
import classes from "./Button.module.css";

const Button = ({children, ...props}) => {
    const buttonClasses = props.className + " " + classes.myBtn
    return (

        <button {...props} className={buttonClasses}>
            {children}
        </button>
    );
};

export default Button;