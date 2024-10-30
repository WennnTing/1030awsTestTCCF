import { useEffect, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import styles from "./image-upload.module.scss";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
export default function ImageUpload({
  required,
  label,
  elementId,
  displayLabel = true,
  state,
  stateFun,
}) {
  const [pickedImage, setPickedImage] = useState(null);

  useEffect(() => {
    if (state) {
      setPickedImage(state);
    }
  }, [state]);

  const handleImageChange = (e) => {
    if (stateFun) {
      stateFun(true);
    }
    const file = e.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setPickedImage(null);
    stateFun(false);
  };

  return (
    <div className={styles.cmsImageUpload}>
      {displayLabel && (
        <label>
          {label}
          {required && (
            <span className={styles.cmsImageUpload__required}>&#42;</span>
          )}
        </label>
      )}

      <div className={styles.cmsImageUpload__container}>
        <div className={styles.cmsImageUpload__container_box}>
          {pickedImage && (
            <div
              className={
                styles.cmsImageUpload__container_box__upload_preview__delete
              }
              onClick={handleDeleteImage}
            >
              <RxCross2 />
            </div>
          )}
          <label
            htmlFor={elementId}
            className={styles.cmsImageUpload__container_box__upload}
          >
            {pickedImage ? (
              <div
                className={styles.cmsImageUpload__container_box__upload_preview}
              >
                <Image
                  src={pickedImage}
                  alt="The image selected by the user."
                  style={{ objectFit: "contain" }}
                  fill={true}
                />
              </div>
            ) : (
              <div
                className={styles.cmsImageUpload__container_box__upload_text}
              >
                <div className={styles.cmsImageUpload__container_icon}>
                  <IoImageOutline />
                </div>
                請上傳圖片
              </div>
            )}

            <input
              id={elementId}
              name={elementId}
              type="file"
              accept="images/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
