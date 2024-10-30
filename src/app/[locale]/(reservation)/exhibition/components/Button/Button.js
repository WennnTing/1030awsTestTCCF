import React from 'react';
import styles from './exhibitionButton.module.scss';

const Button = ({ text, icon, onClick, isDelete }) => {
    return (
        <button
            className={`${styles.buttonWrapper} ${isDelete ? styles.delete : ''}`}
            onClick={onClick}
        >
            {icon && (
                <span className={`${styles.buttonWrapper__icon} ${isDelete ? styles.deleteIcon : ''}`}>
                    {icon}
                </span>
            )}
            {text}
        </button>
    );
}

export default Button;