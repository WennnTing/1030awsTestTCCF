"use client";
import Select from "react-select";
import { useState, useEffect } from "react";
import styles from "./select.module.scss";

export default function SelectComponent({
  label,
  required,
  name,
  placeholder,
  options,
  defaultValue,
}) {
  const [defaultOptionIndex, setDefaultOptionIndex] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      const index = options.findIndex(
        (option) => option.value === defaultValue
      );
      setDefaultOptionIndex(index);
    }
  }, [defaultValue]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#F8F9FAFF",
      display: "flex",
      flexWrap: "nowrap",
      border: 0,
      boxShadow: "none",
      borderRadius: "0px",
      fontSize: "14px",
    }),
    menu: (provided) => ({
      ...provided,
      background: "#F8F9FAFF",
      borderRadius: "0px",
      border: 0,
      zIndex: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black",
      background: state.isSelected ? "#f2f2f2" : "#F8F9FAFF",
      "&:hover": {
        background: "#f2f2f2",
      },
      fontSize: "14px",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "13.5px",
      letterSpacing: "2.5px",
    }),
  };

  return (
    <div className={styles.reservationSelect}>
      <label>
        {label}
        {required && (
          <span className={styles.reservationSelect__required}>&#42;</span>
        )}
      </label>
      <Select
        styles={customStyles}
        placeholder={placeholder}
        name={name}
        options={options}
        defaultValue={defaultValue}
      />
    </div>
  );
}
