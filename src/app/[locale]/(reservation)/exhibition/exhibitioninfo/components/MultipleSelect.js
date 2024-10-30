"use client";
// 多選select component
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import styles from "./MultipleSelect.module.scss";
import Tooltip from "../../components/Tooltip/Tooltip";
import useWindowSize from "@/tool/useWindowSize";

const MultipleSelect = ({
  label,
  options,
  maxSelection,
  message,
  defaultText,
  value = [],
  onChange,
  require,
  showError,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [limit, setLimit] = useState(3);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const windowSize = useWindowSize();
  const refreshViewHeight = () => {
    const vh = windowSize.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    refreshViewHeight();
    if (windowSize.width <= 1440) {
      setLimit(1);
    } else {
      setLimit(1);
    }
  }, [windowSize.width]);

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // 選擇或取消選擇一個選項
  // 檢查該選項是否已被選中，如果是，則從已選中的選項中移除
  // 如果未選中，並且未超過最大選擇數，則添加到已選中的選項中
  // 如果超過最大選擇數，則不進行任何動作
  const handleSelectOption = (option) => {
    if (disabled) return; // 如果禁用，則不允許選擇
    const isSelected = value.includes(option.value);
    let newSelectedOptions;
    if (isSelected) {
      newSelectedOptions = value.filter(
        (selected) => selected !== option.value
      );
    } else if (!maxSelection || value.length < maxSelection) {
      newSelectedOptions = [...value, option.value];
    } else {
      return;
    }
    onChange({ target: { value: newSelectedOptions } });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderSelectedOptions = () => {
    const limitnum = limit;
    if (value.length > 0) {
      const selectedLabels = value.map((val) => {
        const option = options.find((opt) => opt.value === val);
        return option ? option.label : val;
      });

      if (selectedLabels.length > limitnum) {
        return (
          <>
            {selectedLabels.slice(0, limitnum).map((label, index) => (
              <span
                key={index}
                className={styles["multiple-select__option-item"]}
              >
                {label}
              </span>
            ))}
            <span>...</span>
          </>
        );
      }
      return selectedLabels.map((label, index) => (
        <span key={index} className={styles["multiple-select__option-item"]}>
          {label}
        </span>
      ));
    }
    return defaultText || "Select options";
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles["multiple-select"]} ${
        disabled ? styles["multiple-select--disabled"] : ""
      }`}
    >
      <label className={styles["multiple-select__label"]}>
        {label}
        {require && (
          <span className={styles["multiple-select__require"]}> *</span>
        )}
        {message && (
          <Tooltip message={message}>
            <IoIosInformationCircleOutline
              className={styles["multiple-select__icon"]}
            />
          </Tooltip>
        )}
      </label>
      <div
        onClick={handleToggleDropdown}
        className={`
                ${styles["multiple-select__toggle"]} 
                ${showError ? styles["error"] : ""} 
                ${disabled ? styles["multiple-select__toggle--disabled"] : ""}`}
      >
        <span className={styles["multiple-select__selected"]}>
          {renderSelectedOptions()}
        </span>
        <span className={styles["multiple-select__icon"]}>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>

      {showError && (
        <div className={styles["multiple-select__requiredText"]}>
          {locale === "zh" ? "必填" : "Required"}
        </div>
      )}
      {isOpen && !disabled && (
        <ul className={styles["multiple-select__options"]}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelectOption(option)}
              className={`${styles["multiple-select__option"]} ${
                value.includes(option.value)
                  ? styles["multiple-select__option--selected"]
                  : ""
              }`}
            >
              <span>{option.label}</span>
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                readOnly
                className={styles["multiple-select__checkbox"]}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultipleSelect;
