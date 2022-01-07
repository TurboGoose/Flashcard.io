import React from 'react';
import classes from './Modal.module.css'

const Modal = ({children, visible, setVisible}) => {
    const modalClasses = [classes.myModal]
    if (visible) {
        modalClasses.push(classes.active)
    }

    return (
        <div className={modalClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;