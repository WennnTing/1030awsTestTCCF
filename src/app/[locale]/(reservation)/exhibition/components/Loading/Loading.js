import React from 'react';
import styles from './Loading.module.scss';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = ({ small }) => {
    return (
        <div className={styles['loading-wrapper']}>
            <div className={`${styles.animation} ${small ? styles['animation--small'] : styles['animation--large']}`}>
                <AiOutlineLoading3Quarters style={{ color: "#4EAC85" }} />
            </div>
        </div>
    );
}

export default Loading;
