import React from 'react';
import classes from "./TextArea.module.css";

const TextArea = props => {
    return (
        <textarea className={classes.TextArea} {...props}/>
    );
};

export default TextArea;