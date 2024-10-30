import { useState, useEffect } from "react";
import styles from "./slide-image-upload.module.scss";
import { IoImageOutline, IoAddOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { Alert } from "@/components/cms/swal";

export default function SlideImageUpload({
  required,
  label,
  type,
  displayLabel = true,
  state,
}) {
  const [pickedImageList, setPickedImageList] = useState([
    {
      id: 1,
      image: null,
    },
  ]);

  useEffect(() => {
    if (state?.length > 0) {
      setPickedImageList(
        state.map((data, index) => {
          return {
            id: index + 1,
            image: data?.[1]?.[0]?.imageUrl,
          };
        })
      );
    }
  }, [state]);

  const handleImageChange = (e, id) => {
    const file = e.target.files[0];

    if (!file) {
      setPickedImageList(
        pickedImageList.map((data) => {
          if (data.id === id) {
            return {
              ...data,
              image: null,
            };
          }
          return data;
        })
      );
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImageList(
        pickedImageList.map((data) => {
          if (data.id === id) {
            return {
              ...data,
              image: fileReader.result,
            };
          }
          return data;
        })
      );
    };

    fileReader.readAsDataURL(file);
  };

  const handleAddImage = () => {
    setPickedImageList((prev) => {
      return prev.concat({
        id: prev[prev.length - 1]?.id + 1,
        image: null,
      });
    });
  };

  //   useEffect(() => {
  //     console.log(pickedImageList);
  //   }, [pickedImageList]);

  const handleDeleteImage = (id) => {
    Alert({
      icon: "warning",
      title: "確定刪除此圖片？",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "確認",
    }).then((result) => {
      if (result.isConfirmed) {
        setPickedImageList((prev) => prev.filter((data) => data.id !== id));
      }
    });
  };

  return (
    <div className={styles.cmsSlideImageUpload}>
      {displayLabel && (
        <label>
          {label}
          {required && (
            <span className={styles.cmsSlideImageUpload__required}>&#42;</span>
          )}
        </label>
      )}
      <div className={styles.cmsSlideImageUpload__container}>
        {pickedImageList.map((data) => (
          <div
            className={styles.cmsSlideImageUpload__container_box}
            key={data.id}
          >
            {data.image && (
              <div
                className={
                  styles.cmsSlideImageUpload__container_box__upload_preview__delete
                }
                onClick={() => handleDeleteImage(data.id)}
              >
                <RxCross2 />
              </div>
            )}

            <label
              htmlFor={
                type === "en"
                  ? `slide_image_${data.id}_En`
                  : `slide_image_${data.id}`
              }
              className={styles.cmsSlideImageUpload__container_box__upload}
            >
              {data.image ? (
                <div
                  className={
                    styles.cmsSlideImageUpload__container_box__upload_preview
                  }
                >
                  <Image
                    src={data.image}
                    alt="The image selected by the user."
                    style={{ objectFit: "contain" }}
                    fill={true}
                  />
                </div>
              ) : (
                <div
                  className={
                    styles.cmsSlideImageUpload__container_box__upload_text
                  }
                >
                  <div className={styles.cmsSlideImageUpload__container_icon}>
                    <IoImageOutline />
                  </div>
                  請上傳圖片
                </div>
              )}
            </label>
            <input
              type="file"
              id={
                type === "en"
                  ? `slide_image_${data.id}_En`
                  : `slide_image_${data.id}`
              }
              accept="images/*"
              name={
                type === "en"
                  ? `slide_image_${data.id}_En`
                  : `slide_image_${data.id}`
              }
              onChange={(e) => handleImageChange(e, data.id)}
            />
          </div>
        ))}
        {pickedImageList.length < 6 && (
          <div
            className={styles.cmsSlideImageUpload__container_add}
            onClick={handleAddImage}
          >
            <div className={styles.cmsSlideImageUpload__container_icon}>
              <IoAddOutline />
            </div>
            增加輪播圖片
          </div>
        )}
      </div>
    </div>
  );
}
