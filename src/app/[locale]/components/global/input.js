"use client";
import { useState, useCallback, forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { BsExclamationCircle } from "react-icons/bs";
import ImageLoader from "./image-loader";
import styles from "@/(reservation)/exhibition/components/Input/exhibitionInput.module.scss";

import { IoIosInformationCircleOutline } from "react-icons/io";

import Tooltip from "@/(reservation)/exhibition/components/Tooltip/Tooltip";

/**
 * type: input type
 * name: input name
 * value: input value
 * onChange: input onChange function
 * placeholder: input placeholder
 * labelName: input label name
 * required: 是否為必填
 * readOnly: input readOnly
 * isInDialog: 是否為dialog使用
 * isFileUpload: 是否為檔案上傳
 * accept: 檔案上傳接受的檔案類型
 */

const Input = forwardRef(
  (
    {
      type,
      name,
      value,
      onChange,
      placeholder,
      labelName,
      required,
      readOnly,
      isInDialog,
      isFileUpload,
      accept,
      initialPreview,
      message,
      disabled,
      passwordRWD,
      onBlur,
      onFocus,
      setError,
      errorMessage,
      emailError,
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type);
    const [preview, setPreview] = useState(initialPreview);
    const [fileName, setFileName] = useState("");

    const togglePasswordVisibility = () => {
      setInputType(inputType === "password" ? "text" : "password");
    };

    const onDrop = useCallback(
      (acceptedFiles) => {
        const file = acceptedFiles[0];
        onChange({
          target: {
            name,
            value: file,
          },
        });
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setFileName(file.name);
      },
      [onChange, name]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });

    return (
      <div className="inputWrapper">
        <label
          className={`inputWrapper__text ${isInDialog ? "dialog" : ""}`}
          style={{ display: "flex", alignItems: "center" }}
        >
          {labelName}{" "}
          {required && <span className="inputWrapper__required">*</span>}
          {message && (
            <Tooltip message={message} passwordRWD={passwordRWD}>
              <IoIosInformationCircleOutline
                className={styles.exhibitioninputWrapper__infoIcon}
              />
            </Tooltip>
          )}
        </label>
        {isFileUpload ? (
          <>
            <div {...getRootProps()} className="inputWrapper__dropzone">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here</p>
              ) : (
                <>
                  {preview ? (
                    <ImageLoader
                      src={preview}
                      alt="Preview"
                      sizes={"100%"}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <>
                      <p>Drag & drop your files here, or</p>
                      <p> click to select files</p>
                    </>
                  )}
                </>
              )}
            </div>
            <p className="inputWrapper__dropzone__format">
              <BsExclamationCircle />
              圖片格式：png或svg圖檔
            </p>
            <p className="inputWrapper__dropzone__format">
              <BsExclamationCircle />
              建議尺寸：1920*910px、2560*1214px、3840*1820px
            </p>
            {fileName && (
              <p className="inputWrapper__dropzone__fileName">
                檔案名稱：{fileName}
              </p>
            )}
          </>
        ) : (
          <div className="inputWrapper__inputContainer">
            <input
              ref={ref}
              className={`inputWrapper__input ${setError ? "error" : ""}`}
              type={inputType}
              name={name}
              value={value || ""}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              readOnly={readOnly}
              disabled={disabled}
              onBlur={onBlur}
              onFocus={onFocus}
            />
            {setError && (
              <p className="inputWrapper__errorText">{errorMessage}</p>
            )}
            {type === "password" && (
              <span
                className="inputWrapper__icon"
                onClick={togglePasswordVisibility}
              >
                {inputType === "password" ? <LuEyeOff /> : <LuEye />}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
