import { useState } from "react";
import { PiPaperclipLight } from "react-icons/pi";
import styles from "./file-upload.module.scss";
export default function FileUpload({ required, label, elementId }) {
  const [file, setFile] = useState(null);

  const handleUploadFile = (e) => {
    if (!e.target.files[0]) return;
    setFile(e.target.files);
  };

  return (
    <div className={styles.cmsFileUpload}>
      <label>
        {label}
        {required && (
          <span className={styles.cmsFileUpload__required}>&#42;</span>
        )}
      </label>
      <div className={styles.cmsFileUpload__container}>
        <label
          htmlFor={elementId}
          className={styles.cmsFileUpload__container_upload}
        >
          <div className={styles.cmsFileUpload__container_upload__text}>
            {file ? file[0].name : "請上傳附件"}
          </div>
          <input
            id={elementId}
            name={elementId}
            type="file"
            data-target="file-uploader"
            accept=".xls,.xlsx,image/*,.pdf"
            onChange={handleUploadFile}
            // value={file}
          />
        </label>
        <div className={styles.cmsFileUpload__container_icon}>
          <PiPaperclipLight />
        </div>
      </div>
    </div>
  );
}
