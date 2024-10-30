import Select from "react-select";
import { useState, useEffect } from "react";
import styles from "./select.module.scss";

export default function AnnouncementSelect({
  label,
  required,
  pages,
  articleType,
  elementId,
  defaultValue,
}) {
  const [options, setOptions] = useState(null);
  const [defaultValueIndex, setDefaultValueIndex] = useState();

  // tempalte 1 = 一般型
  // tempalte 5 = 活動型

  useEffect(() => {
    if (pages) {
      const articleTypeId = articleType === "event" ? 5 : 1;
      setOptions(
        pages.data
          .filter((page) => page.templateId == articleTypeId)
          .map((item) => ({
            value: item.pageUuid,
            label: item.pageNameZh,
          }))
      );
    }

    if (defaultValue) {
      const articleTypeId = articleType === "event" ? 5 : 1;
      const index = pages.data
        .filter((page) => page.templateId == articleTypeId)
        .findIndex((page) => page.pageUuid === defaultValue);

      setDefaultValueIndex(index);
    }
  }, [pages, articleType, defaultValue]);

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
      color: state.isSelected ? "black" : "black",
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
        {required && <span className={styles.cmsSelect__required}>&#42;</span>}
      </label>

      {options && defaultValueIndex !== "" && (
        <Select
          options={options}
          name={elementId}
          styles={customStyles}
          placeholder="請選擇文章"
          defaultValue={options[defaultValueIndex]}
        />
      )}
    </div>
  );
}
