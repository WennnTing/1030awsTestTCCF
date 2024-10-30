import React, { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './exhibitionInput.module.scss';
import { FiPaperclip } from 'react-icons/fi';
import Tooltip from '../Tooltip/Tooltip';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { BsCheckCircle } from "react-icons/bs";
import { BsExclamationCircle } from "react-icons/bs";


const InputComponent = ({ type, label, onChange, value, checked, checkboxInput, require, placeholder, disabled, name, checkboxName, options, selectedValue, message, maxLength, multiple, allowedExtensions, isLongTextTooltip, castLongText, isawardText, trailerText, companyProfile, showError, uploadStatus }) => {
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const fileInputRef = useRef(null);
    const [date, setDate] = useState({
        year: '',
        month: ''
    });
    const [fileNames, setFileNames] = useState([]);
    const [showPassword, setShowPassword] = useState(false);    // 顯示密碼
    const [isFocused, setIsFocused] = useState(false);          // 設定焦點狀態

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);

        const base64Files = [];
        const names = [];

        // 處理每個檔案
        for (const file of files) {
            const fileExtension = file.name.split('.').pop().toLowerCase();

            // 處理每個副檔名，確認副檔名props是否符合
            // 比如：allowedExtensions: ['jpg', 'jpeg', 'png']
            if (allowedExtensions && !allowedExtensions.includes(fileExtension)) {
                alert(`Invalid file type. Allowed types are: ${allowedExtensions.join(', ')}`);
                return;
            }

            // 將檔案轉換成base64
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            base64Files.push(base64);
            names.push(file.name);

            // 每次處理完一個檔案，立即更新狀態
            onChange({ target: { name, value: [...base64Files], fileNames: [...names] } });
        }
        setFileNames(names);
    };


    // 顯示或隱藏密碼
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 點擊icon時觸發input file
    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    // checkbox change
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (onChange) {
            onChange({ target: { name, value: checked } });
        } else {
            console.error('onChange handler is not defined');
        }
    };

    // number input change
    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        const numericValue = value.replace(/\D/g, '');
        onChange({ target: { name, value: numericValue } });
    };

    // date input change
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDate(prevDate => ({ ...prevDate, [name]: value }));
        onChange({ target: { name, value: { ...date, [name]: value } } });
    };

    return (
        <div className={styles.exhibitioninputWrapper}>
            <div className={styles.exhibitioninputWrapper__labelBlock}>
                <div className={styles.exhibitioninputWrapper__labelAndTooltip}>
                    <label className={styles.exhibitioninputWrapper__label}>
                        {label}
                    </label>
                    {require && <span className={styles.exhibitioninputWrapper__required}> *</span>}
                    {message &&
                        <Tooltip
                            message={message}
                            show={isFocused}
                            isLongText={isLongTextTooltip}
                            castLongText={castLongText}
                            awardText={isawardText}
                            trailerText={trailerText}
                            companyProfile={companyProfile}
                        >
                            <IoIosInformationCircleOutline className={styles.exhibitioninputWrapper__infoIcon} />
                        </Tooltip>
                    }
                </div>

                {typeof uploadStatus !== 'undefined' && (
                    <div className={styles.exhibitioninputWrapper__uploadStatusBlock}>
                        {uploadStatus ? (
                            <>
                                <BsCheckCircle className={styles.exhibitioninputWrapper__uploadText} />
                                <span className={styles.exhibitioninputWrapper__uploadText}>上傳成功</span>
                            </>
                        ) : (
                            <>
                                <BsExclamationCircle className={styles.exhibitioninputWrapper__unUploadText} />
                                <span className={styles.exhibitioninputWrapper__unUploadText}>尚未上傳</span>
                            </>
                        )}
                    </div>
                )}

            </div>


            {/* {type === 'text' &&
                <input
                    type="text"
                    onChange={onChange}
                    value={value || ''}
                    name={name}
                    placeholder={placeholder}
                    className={styles.exhibitioninputWrapper__input}
                    disabled={disabled}
                />}

            {type === 'number' &&
                <input
                    type="text"
                    onChange={handleNumberChange}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    className={styles.exhibitioninputWrapper__input}
                    disabled={disabled}
                />} */}

            {(type === 'text' || type === 'number') &&
                <input
                    type={type === 'number' ? 'text' : type} // Number 也設為text來處理focus事件
                    onChange={type === 'number' ? handleNumberChange : onChange}
                    value={value || ''}
                    name={name}
                    placeholder={placeholder}
                    className={`${styles.exhibitioninputWrapper__input} ${showError ? styles.error : ''}`}
                    disabled={disabled}
                    onFocus={() => message && setIsFocused(true)}  // 如果有message，設置焦點狀態
                    onBlur={() => message && setIsFocused(false)}   // 失去焦點時隱藏tooltip
                />}

            {type === 'password' &&
                <div className={styles.exhibitioninputWrapper__passwordInputWrapper}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        onChange={onChange}
                        value={value}
                        name={name}
                        className={styles.exhibitioninputWrapper__input}
                        disabled={disabled}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={styles.exhibitioninputWrapper__passwordInputWrapper__toggleBtn}
                    >
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                </div>
            }

            {type === 'checkbox' &&
                <>
                    <input
                        type="text"
                        onChange={onChange}
                        value={value}
                        name={name}
                        className={styles.exhibitioninputWrapper__input}
                        disabled={disabled}
                    />
                    <div>
                        <input
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            checked={checked}
                            name={checkboxName}
                        />
                        <label>{checkboxInput}</label>
                    </div>
                </>}

            {type === 'image' && (
                <div className={styles.exhibitioninputWrapper__imageInput}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className={styles.exhibitioninputWrapper__imageInput_hidden}
                        name={name}
                        placeholder={placeholder}
                        accept="image/*"
                        multiple={multiple}
                    />
                    <div className={styles.exhibitioninputWrapper__imageInput_display}>
                        {fileNames.join(', ')}
                    </div>
                    <FiPaperclip className={styles.exhibitioninputWrapper__imageInput_icon}
                        onClick={handleIconClick} />
                </div>
            )}

            {type === 'file' && (
                <div className={styles.exhibitioninputWrapper__imageInput}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className={styles.exhibitioninputWrapper__imageInput_hidden}
                        name={name}
                        placeholder={placeholder}
                        accept={allowedExtensions ? allowedExtensions.map(ext => `.${ext}`).join(', ') : '*/*'}
                        multiple={multiple}
                    />
                    <div className={styles.exhibitioninputWrapper__imageInput_display}>
                        {fileNames.join(', ')}
                    </div>
                    <FiPaperclip className={styles.exhibitioninputWrapper__imageInput_icon}
                        onClick={handleIconClick} />
                </div>
            )}

            {type === 'radio' && (
                <div className={styles.radioGroupWrapper}>
                    <div className={styles.radioGroupWrapper__options}>
                        {options.map((option, index) => (
                            <label key={index} className={styles.radioGroupWrapper__option}>
                                <input
                                    type="radio"
                                    name={name}
                                    value={option.value}
                                    checked={selectedValue === option.value}
                                    onChange={onChange}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {type === 'date' && (
                <div className={styles.dateInputWrapper}>
                    <input
                        type="text"
                        onChange={handleDateChange}
                        value={value?.year || date.year}
                        name="year"
                        placeholder="YYYY"
                        className={styles.exhibitioninputWrapper__input}
                        disabled={disabled}
                    />
                    <input
                        type="text"
                        onChange={handleDateChange}
                        value={value?.month || date.month}
                        name="month"
                        placeholder="MM"
                        className={styles.exhibitioninputWrapper__input}
                        disabled={disabled}
                    />
                </div>
            )}

            {type === 'textarea' &&
                <textarea
                    onChange={onChange}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    className={`${styles.exhibitioninputWrapper__textarea} ${showError ? styles.error : ''}`}
                    disabled={disabled}
                    maxLength={maxLength}
                    onFocus={() => message && setIsFocused(true)}  // 如果有message，設置焦點狀態
                    onBlur={() => message && setIsFocused(false)}

                />}

            {showError && (
                <div className={styles.exhibitioninputWrapper__errorText}>
                    {locale === 'zh' ? '必填' : 'Required'}
                </div>
            )}
        </div>
    );
};

export default InputComponent;
