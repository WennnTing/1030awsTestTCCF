import Select from "react-select";
import { useState, useEffect } from "react";
import styles from "./select.module.scss";

export default function NavSelect({ label, required, pages, pageData }) {
  const [options, setOptions] = useState(null);
  const [defaultValueIndex, setDefaultValueIndex] = useState();

  useEffect(() => {
    if (pages) {
      setOptions(
        pages.data.map((item) => ({
          value: item.pageUuid,
          label: item.pageNameZh,
        }))
      );
    }
    if (pageData) {
      const index = pages.data.findIndex(
        (item) => item.pageUuid === pageData?.data?.[0]?.pageUuid
      );
      setDefaultValueIndex(index);
    }
  }, [pages]);

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
      background: "#f6f6f6",
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
  };

  return (
    <div className={styles.cmsSelect}>
      <label>
        {label}
        {required && <span className={styles.cmsInput__required}>&#42;</span>}
      </label>
      {options && defaultValueIndex !== "" && (
        <Select
          options={options}
          name="pageUuid"
          styles={customStyles}
          placeholder=""
          defaultValue={options[defaultValueIndex]}
        />
      )}
    </div>
  );
}
