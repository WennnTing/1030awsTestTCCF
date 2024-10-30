// 單選select
import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import styles from './NormalSelect.module.scss';

const NormalSelect = ({ label, options, onChange, value, require, disabled, defaultText, name, showError }) => {
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option) => {
        onChange({ target: { name, value: option.value } });
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderSelectedOption = () => {
        const selectedOption = options.find(option => option.value === value);
        return selectedOption ? selectedOption.label : defaultText || 'Select option';
    };

    return (
        <div ref={dropdownRef} className={styles.selectWrapper}>
            <div className={styles.selectWrapper__labelBlock}>
                <label className={styles.selectWrapper__label}>
                    {label}
                </label>
                {require && <span> *</span>}
            </div>
            <div
                onClick={!disabled ? handleToggleDropdown : undefined}
                className={`
                ${styles.selectWrapper__toggle} 
                ${disabled ? styles.selectWrapper__toggleDisabled : ''}
                ${showError ? styles.selectWrapper__toggleError : ''}
                `}
            >
                <span className={styles.selectWrapper__selected}>
                    {renderSelectedOption()}
                </span>
                <span className={styles.selectWrapper__icon}>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {showError && (
                <div className={styles.selectWrapper__toggleErrorText}>
                    {locale === 'zh' ? '必填' : 'Required'}
                </div>
            )}
            {isOpen && !disabled && (
                <ul className={styles.selectWrapper__options}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelectOption(option)}
                            className={styles.selectWrapper__option}
                        >
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};

export default NormalSelect;
