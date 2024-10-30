import React from 'react';
import styles from './exhibitionTagInput.module.scss';
import Tooltip from '../Tooltip/Tooltip';
import { IoIosInformationCircleOutline } from 'react-icons/io';

const TagInput = ({ tags, label, required, message }) => {
    return (
        <div className={styles.tagInputWrapper}>
            <div className={styles.tagInputWrapper__labelBlock}>
                <label className={styles.tagInputWrapper__label}>
                    {label} {required && <span className={styles.required}>*</span>}
                </label>
                {message &&
                    <Tooltip message={message}>
                        <IoIosInformationCircleOutline className={styles.tagInputWrapper__infoIcon} />
                    </Tooltip>}
            </div>
            <div className={styles.tagInputWrapper__tags}>
                {Array.isArray(tags) && tags.map((tag, index) => (
                    <span key={index} className={styles.tagInputWrapper__tag}>
                        {tag}
                    </span>
                ))}
            </div>

        </div>
    );
};

export default TagInput;