"use client";
import Select from "react-select";
import { useState, useEffect, Fragment } from "react";
import moment from "moment";
import styles from "./select.module.scss";

export default function SelectComponent({
  name,
  placeholder,
  options,
  defaultValue,
  setSelect,
  controller,
  label,
  required,
}) {
  const [defaultValueIndex, setDefaultValueIndex] = useState(null);

  useEffect(() => {
    if (defaultValue && options) {
      const index = options.findIndex(
        (option) => option.value === defaultValue
      );
      setDefaultValueIndex(index);
    }
  }, [defaultValue, options]);

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
      padding: "0 0 0 8px",
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
      color: state.isSelected ? "black" : "black",
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
    <div className={styles.cmsSelect}>
      <label>
        {label}
        {required && <span className={styles.cmsSelect__required}>&#42;</span>}
      </label>
      <Select
        styles={customStyles}
        placeholder={placeholder}
        name={name}
        options={options}
        value={options[defaultValueIndex]}
        onChange={controller ? (selected) => setSelect(selected.value) : ""}
      />
    </div>
  );
}
