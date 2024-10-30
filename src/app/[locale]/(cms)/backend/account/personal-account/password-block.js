"use client";

import { DefaultInput } from "@/components/cms/input";
import { useFormState } from "react-dom";
import { updatePassword } from "@/actions/account";
import UpdatePasswordFormSubmit from "@/components/cms/update-passwor-form-submit";
import styles from "./personal-account.module.scss";

export default function PasswordBlock() {
  const [state, formAction] = useFormState(updatePassword, {});

  return (
    <form action={formAction}>
      <div className={styles.cmsPersonalAccount__container}>
        <h3>帳號密碼</h3>
        <DefaultInput
          type="password"
          name="oldPassword"
          label={"舊密碼"}
          required={true}
          placeholder={"請輸入舊密碼"}
        />
        <DefaultInput
          type="password"
          name="newPassword"
          label={"新密碼"}
          required={true}
          placeholder={"8~16字元，含大小寫英文及數字的密碼"}
        />
        <DefaultInput
          type="password"
          name="confirmPassword"
          label={"再次輸入新密碼"}
          required={true}
          placeholder={"請再次輸入新密碼"}
        />
      </div>
      {state?.errors && (
        <ul className={styles.cmsPersonalAccount__container_error}>
          {Object.keys(state.errors).map((key) => (
            <li key={key}>{state.errors[key]}</li>
          ))}
        </ul>
      )}
      <div className={styles.cmsPersonalAccount__container_actionButton}>
        <UpdatePasswordFormSubmit />
      </div>
    </form>
  );
}
