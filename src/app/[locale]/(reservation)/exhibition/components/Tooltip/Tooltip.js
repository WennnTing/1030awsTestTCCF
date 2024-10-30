import React from 'react';
import styles from './Tooltip.module.scss';
import parse from 'html-react-parser';

const Tooltip = ({ message, children, show, isLongText, castLongText, awardText, trailerText, companyProfile, passwordRWD }) => {
    return (
        <div className={styles.tooltipWrapper}>
            {children}
            <span className={`
            ${styles.tooltipText} 
            ${show ? styles.visible : ''} 
            ${isLongText ? styles.longText : ''}
            ${castLongText ? styles.castLongText : ''}
            ${awardText ? styles.award : ''}
            ${trailerText ? styles.trailer : ''}
            ${companyProfile ? styles.companyProfile : ''}
            ${passwordRWD ? styles.passwordRWD : ''}
            `}>
                {parse(message)}
            </span>
        </div>
    );
}

export default Tooltip;
