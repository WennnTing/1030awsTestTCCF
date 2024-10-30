import styles from "./radio-button.module.scss";
import { FiInfo } from "react-icons/fi";
import { FileInput } from "./input";
import ImageUpload from "./image-upload";
const RadioButton = ({
  label,
  required,
  options,
  input,
  elementId,
  elementValueId,
  onChangeFun,
  info,
  state,
  placeholder,
  value,
  maxlength,
}) => {
  return (
    <div className={styles.cmsRadioButton}>
      <label>
        {label}
        {required && (
          <span className={styles.cmsRadioButton__required}>&#42;</span>
        )}
        {info && (
          <div className={styles.cmsRadioButton__info}>
            <div className={styles.cmsRadioButton__info_icon}>
              <FiInfo />
            </div>
            <span>{info}</span>
          </div>
        )}
      </label>

      <div className={styles.cmsRadioButton__option}>
        {options.map((option, index) => (
          <div className={styles.cmsRadioButton__option_item} key={index}>
            <input
              type="radio"
              name={elementId}
              value={option.value}
              id={`${elementId}-${option.value}`}
              // defaultChecked={option.checked}
              checked={value == option.value}
              onChange={onChangeFun ? (e) => onChangeFun(e.target.value) : null}
            />
            <label htmlFor={`${elementId}-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {input && state == "true" && (
        <input
          type="text"
          placeholder={placeholder}
          name={elementValueId}
          id={elementValueId}
          maxLength={maxlength}
        />
      )}

      {input && state == "googlemap" && (
        <input
          type="text"
          placeholder="google map 連結"
          name={elementValueId}
          id={elementValueId}
        />
      )}

      {input && state == "image" && (
        // <FileInput name={elementValueId} elementId={elementValueId} />

        <ImageUpload
          name={elementValueId}
          elementId={elementValueId}
          displayLabel={false}
        />
      )}
    </div>
  );
};

const ControllerRadioButton = ({
  label,
  required,
  info,
  options,
  input,
  elementId,
  elementValueId,
  value,
  onChangeFun,
  inputValue,
  inputOnChangeFun,
  placeholder,
  maxlength,
}) => {
  return (
    <div className={styles.cmsRadioButton}>
      <label>
        {label}
        {required && (
          <span className={styles.cmsRadioButton__required}>&#42;</span>
        )}
        {info && (
          <div className={styles.cmsRadioButton__info}>
            <div className={styles.cmsRadioButton__info_icon}>
              <FiInfo />
            </div>
            <span>{info}</span>
          </div>
        )}
      </label>

      <div className={styles.cmsRadioButton__option}>
        {options.map((option, index) => (
          <div className={styles.cmsRadioButton__option_item} key={index}>
            <input
              type="radio"
              name={elementId}
              value={option.value}
              id={`${elementId}-${option.value}`}
              // defaultChecked={option.checked}
              checked={value == option.value}
              onChange={(e) => onChangeFun(e.target.value)}
            />
            <label htmlFor={`${elementId}-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {input && value == "true" && !elementId.includes("Image") && (
        <input
          type="text"
          placeholder={placeholder}
          name={elementValueId}
          id={elementValueId}
          maxLength={maxlength}
          value={inputValue}
          onChange={(e) => inputOnChangeFun(e.target.value)}
        />
      )}

      {input && value == "googlemap" && (
        <input
          type="text"
          placeholder="google map 連結"
          name={elementValueId}
          id={elementValueId}
          value={inputValue}
          onChange={(e) => inputOnChangeFun(e.target.value)}
        />
      )}

      {((input && value == "image") ||
        (input && elementId.includes("Image") && value == "true")) && (
        // ||
        //   (input && elementId.includes("Image") && value == "true"

        // <FileInput name={elementValueId} elementId={elementValueId} />

        <ImageUpload
          name={elementValueId}
          elementId={elementValueId}
          displayLabel={false}
        />
      )}
    </div>
  );
};

export { RadioButton, ControllerRadioButton };
