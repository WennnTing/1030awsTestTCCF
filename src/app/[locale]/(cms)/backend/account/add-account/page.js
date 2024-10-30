"use client";

import styles from "./add-account.module.scss";
import { Input } from "@/components/cms/input";
import { createAccount } from "@/actions/account";
import { useFormState } from "react-dom";
import AddMemberFormSubmit from "@/components/cms/add-member-form-submit";

export default function AddAcccountPage() {
  const [state, formAction] = useFormState(createAccount, {});

  return (
    <div>
      <h2>帳號管理 / 新增帳號</h2>
      <div className="cmsPage__container">
        <div className={styles.cmsAddAccount}>
          <form action={formAction}>
            <div className={styles.cmsAddAccount__container}>
              <Input
                label={"帳號"}
                required={true}
                elementId={"Username"}
                type={"text"}
              />
              <Input label={"密碼"} required={true} elementId={"Password"} />
              <Input
                label={"電子信箱"}
                required={true}
                elementId={"Email"}
                type={"email"}
              />
              <Input label={"所屬單位"} required={true} elementId={"Type"} />
            </div>

            {state?.errors && (
              <ul className={styles.cmsAddAccount__container_error}>
                {Object.keys(state.errors).map((key) => (
                  <li key={key}>{state.errors[key]}</li>
                ))}
              </ul>
            )}

            <div className={styles.cmsAddAccount__container_actionButton}>
              <AddMemberFormSubmit />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
