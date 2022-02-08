import React from 'react';
import classes from './Modal.module.css'

const Modal = ({children, visible, setVisible}) => {
    const modalClasses = [classes.modal]
    if (visible) {
        modalClasses.push(classes.active)
    }

    return (
        <div className={modalClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;