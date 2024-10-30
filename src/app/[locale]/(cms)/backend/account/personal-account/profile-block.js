"use client";
import { useState } from "react";
import { DefaultInput } from "@/components/cms/input";
import styles from "./personal-account.module.scss";
import { useFormState } from "react-dom";
import { updateAccount } from "@/actions/account";
import UpdateMemberFormSubmit from "@/components/cms/update-member-form-submit";
export default function ProfileBlock({ data }) {
  const [state, formAction] = useFormState(updateAccount, {});

  const [username, setUsername] = useState(data.username);
  const [email, setEmail] = useState(data.password);
  const [password, setPassword] = useState(data.email);
  const [type, setType] = useState(data.type);

  return (
    <form action={formAction}>
      <div className={styles.cmsPersonalAccount__container}>
        <h3>基本資料</h3>
        <DefaultInput
          label={"使用者名稱"}
          value={data.username}
          onChangeFun={setUsername}
          name={"Username"}
        />
        {/* <DefaultInput
          label={"密碼"}
          required={true}
          name={"Password"}
          value={data.password}
          onChangeFun={setPassword}
        /> */}
        <DefaultInput
          label={"電子信箱"}
          required={true}
          value={data.email}
          onChangeFun={setEmail}
          name={"Email"}
        />
        <DefaultInput
          label={"所屬單位"}
          required={true}
          value={data.type}
          onChangeFun={setType}
          name={"Type"}
        />
        <input type="hidden" name="userId" value={data.userId} />
      </div>
      {state?.errors && (
        <ul className={styles.cmsPersonalAccount__container_error}>
          {Object.keys(state.errors).map((key) => (
            <li key={key}>{state.errors[key]}</li>
          ))}
        </ul>
      )}

      <div className={styles.cmsPersonalAccount__container_actionButton}>
        <UpdateMemberFormSubmit />
      </div>
    </form>
  );
}
