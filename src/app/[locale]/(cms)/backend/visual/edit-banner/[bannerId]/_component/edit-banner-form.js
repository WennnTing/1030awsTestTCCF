"use client";
import styles from "../edit-banner.module.scss";
import { Input } from "@/components/cms/input";
import { useFormState } from "react-dom";
import ImageUpload from "@/components/cms/image-upload";
import EditBannerFormSubmit from "./edit-banner-form-submit";
import { updateBanner } from "@/actions/banner";
import { useState } from "react";
export default function EditBannerForm({ banner }) {
  const [uploadState, setUploadState] = useState(false);
  const [state, formAction] = useFormState(
    updateBanner.bind(null, banner?.bannerId, uploadState),
    {}
  );
  return (
    <form action={formAction}>
      <div className={styles.cmsEditBanner__container}>
        <Input
          label={"標題"}
          required={true}
          elementId={"title"}
          type={"text"}
          defaultValue={banner?.title}
          placeholder={"請輸入標題"}
        />
        <Input
          label={"路徑"}
          required={true}
          elementId={"redirectUrl"}
          type={"text"}
          defaultValue={banner?.redirectUrl}
          placeholder={"請輸入路徑"}
        />
        <Input
          label={"排序"}
          elementId={"sortOrder"}
          type={"number"}
          defaultValue={banner?.sortOrder}
          placeholder={"請輸入排序"}
        />
      </div>
      <ImageUpload
        label={"圖片"}
        required={true}
        elementId={"image"}
        state={banner?.imageUrl}
        stateFun={setUploadState}
      />
      {state?.errors && (
        <ul className={styles.cmsEditBanner__container_error}>
          {Object.keys(state.errors).map((key) => (
            <li key={key}>{state.errors[key]}</li>
          ))}
        </ul>
      )}
      <div className={styles.cmsEditBanner__container_actionButton}>
        <EditBannerFormSubmit />
      </div>
    </form>
  );
}
