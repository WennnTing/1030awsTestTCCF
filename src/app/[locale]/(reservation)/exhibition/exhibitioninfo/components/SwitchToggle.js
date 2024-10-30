import React from 'react';
import styles from './SwitchToggle.module.scss';

const SwitchToggle = ({ checked, onChange }) => {
    return (
        <label className={styles.switch}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className={styles.slider}></span>
        </label>
    );
};

export default SwitchToggle;
