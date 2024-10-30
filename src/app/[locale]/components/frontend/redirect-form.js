"use client";
import { logout } from "@/actions/login";
import { useFormState } from "react-dom";
import styles from "../../(frontend)/error.module.scss";
export default function RedirectForm() {
  const [state, formAction] = useFormState(logout, {});
  return (
    <form action={formAction}>
      <button
        // onClick={
        //   // Attempt to recover by trying to re-render the segment
        //   () => handleRedirect()
        // }
        className={styles.errorPage__container_redirect}
      >
        重新登入
      </button>
    </form>
  );
}
