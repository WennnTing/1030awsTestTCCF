"use client";
import styles from "./error.module.scss";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useRouter } from "../../../navigation";
import MainHeader from "@/components/frontend/main-header";
import MainFooter from "@/components/frontend/main-footer";
export default function GlobalError({ error, reset }) {
  const [errorCode, setErrorCode] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setErrorCode(error.message);
  }, [error]);

  return (
    <div className={styles.errorPage}>
      <MainHeader />
      <div className={styles.errorPage__container}>
        <div className={styles.errorPage__container_errorMessage}>
          <h1>500 - Internal server error</h1>
          <p>伺服器錯誤，請稍候再試</p>
        </div>

        <button
          onClick={() => router.push("/")}
          className={styles.errorPage__container_redirect}
        >
          返回首頁
        </button>
      </div>
      <MainFooter />
    </div>
  );
}
