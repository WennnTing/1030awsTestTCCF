"use client";
import styles from "../add-banner.module.scss";
import { Input } from "@/components/cms/input";
import { useFormState } from "react-dom";
import AddBannerFormSubmit from "./add-banner-form-submit";
import ImageUpload from "@/components/cms/image-upload";
import { createBanner } from "@/actions/banner";
export default function AddBannerForm() {
  const [state, formAction] = useFormState(createBanner, {});
  return (
    <form action={formAction}>
      <div className={styles.cmsAddBanner__container}>
        <Input
          label={"標題"}
          required={true}
          elementId={"title"}
          type={"text"}
          placeholder={"請輸入標題"}
        />
        <Input
          label={"路徑"}
          required={true}
          elementId={"redirectUrl"}
          type={"text"}
          placeholder={"請輸入路徑"}
        />
        <Input
          label={"排序"}
          elementId={"sortOrder"}
          type={"number"}
          placeholder={"請輸入排序"}
        />
      </div>
      <ImageUpload label={"圖片"} required={true} elementId={"image"} />
      {state?.errors && (
        <ul className={styles.cmsAddBanner__container_error}>
          {Object.keys(state.errors).map((key) => (
            <li key={key}>{state.errors[key]}</li>
          ))}
        </ul>
      )}
      <div className={styles.cmsAddBanner__container_actionButton}>
        <AddBannerFormSubmit />
      </div>
    </form>
  );
}
