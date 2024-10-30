import styles from "./input.module.scss";

const Input = ({
  label,
  required,
  elementId,
  state,
  onChangeFun,
  id,
  placeholder,
  type,
  defaultFun,
  defaultValue,
}) => {
  const handleTypeValue = (type, state) => {
    switch (type) {
      case "number":
        return state?.replace(/[^\d]/g, "").replace(/\s+/g, "");
      case "router":
        return state?.replace(/\s+/g, "");
      default:
        return state;
    }
  };
  return (
    <div className={styles.cmsInput}>
      <label htmlFor={elementId}>
        {label}
        {required && <span className={styles.cmsInput__required}>&#42;</span>}
      </label>
      <input
        type="text"
        name={elementId}
        id={elementId}
        value={handleTypeValue(type, state)}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={
          onChangeFun
            ? defaultFun
              ? (e) => onChangeFun(e.target.value)
              : (e) => onChangeFun(id, elementId, e.target.value)
            : null
        }
      />
    </div>
  );
};

const ButtonInput = ({
  label,
  required,
  elementId,
  elementValueId,
  state,
  valueState,
  onChangeFun,
  id,
  placeholderElement,
  placeholderValue,
}) => {
  return (
    <div className={styles.cmsInput}>
      <label>
        {label}
        {required && <span className={styles.cmsInput__required}>&#42;</span>}
      </label>
      <div className={styles.cmsInput__mutiInput}>
        <input
          type="text"
          placeholder={placeholderElement}
          name={elementId}
          defaultValue={state}
          id={elementId}
          onChange={
            onChangeFun
              ? (e) => onChangeFun(id, elementId, e.target.value)
              : null
          }
        />
        <input
          type="text"
          placeholder={placeholderValue}
          name={elementValueId}
          id={elementValueId}
          defaultValue={valueState}
          // value={valueState}
          onChange={
            onChangeFun
              ? (e) => onChangeFun(id, elementValueId, e.target.value)
              : null
          }
        />
      </div>
    </div>
  );
};

const FileInput = ({ label, required, elementId }) => {
  return (
    <div className={styles.cmsInput}>
      <label>
        {label}
        {required && <span className={styles.cmsInput__required}>&#42;</span>}
      </label>
      <input
        type="file"
        data-target="file-uploader"
        accept=".xls,.xlsx,image/*,.pdf"
        name={elementId}
        id={elementId}
      />
    </div>
  );
};

const DefaultInput = ({
  label,
  required,
  name,
  onChangeFun,
  type,
  value,
  placeholder,
}) => {
  return (
    <div className={styles.cmsInput}>
      <label>
        {label}
        {required && <span className={styles.cmsInput__required}>&#42;</span>}
      </label>
      <input
        defaultValue={value}
        type={type}
        name={name}
        id={name}
        onChange={onChangeFun}
        placeholder={placeholder}
      />
    </div>
  );
};

const ControllerInput = ({
  label,
  required,
  elementId,
  value,
  onChangeFun,
  placeholder,
  multi,
  defaultValue,
  id,
  type,
}) => {
  return (
    <div className={styles.cmsInput}>
      <label htmlFor={elementId}>
        {label}
        {required && <span className={styles.cmsInput__required}>&#42;</span>}
      </label>
      <input
        type="text"
        name={elementId}
        id={elementId}
        value={type === "router" ? value.replace(/\s+/g, "") : value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={
          multi
            ? (e) => onChangeFun(id, elementId, e.target.value)
            : (e) => onChangeFun(e.target.value)
        }
      />
    </div>
  );
};

const ControllerButtonInput = ({
  label,
  required,
  elementId,
  elementValueId,
  elementIdState,
  elementValueIdState,
  elementIdOnChangeFun,
  elementIdValueOnChangeFun,
  placeholderElement,
  placeholderValue,
}) => {
  return (
    <div className={styles.cmsInput}>
      <label>
        {label}
        {required && <span className={styles.cmsInput__required}>&#42;</span>}
      </label>
      <div className={styles.cmsInput__mutiInput}>
        <input
          type="text"
          name={elementId}
          value={elementIdState}
          id={elementId}
          onChange={(e) => elementIdOnChangeFun(e.target.value)}
          placeholder={placeholderElement}
        />
        <input
          type="text"
          name={elementValueId}
          id={elementValueId}
          value={elementValueIdState}
          onChange={(e) => elementIdValueOnChangeFun(e.target.value)}
          placeholder={placeholderValue}
        />
      </div>
    </div>
  );
};

export {
  Input,
  ButtonInput,
  FileInput,
  DefaultInput,
  ControllerInput,
  ControllerButtonInput,
};
