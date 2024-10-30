// 忘記密碼頁面 > 輸入email > 送出
"use client";
import { useState, useEffect } from "react";
import Input from "@/components/global/input";
import Button from "@/components/global/button";
import styles from "../exhibitionLogin.module.scss";
import { Link } from "../../../../../navigation";
import ImageLoader from "@/components/global/image-loader";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { clearAuthToken } from "@/utils/common";

import { API_SendResetPasswordMail } from "@/api/api";

export default function ResetPasswordPage() {
  const Swal = require("sweetalert2");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const t = useTranslations("ForgetPassWord");

  const handleChange = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  };

  const sendEmail = async () => {
    const data = {
      Email: email,
    };
    const res = await API_SendResetPasswordMail(JSON.stringify(data));

    if (res && res.message && res.message.includes("已發送重置密碼郵件!")) {
      setIsSubmitted(true);
    } else if (
      res &&
      res.message &&
      res.message.includes("該電子郵件並無註冊帳戶")
    ) {
      Swal.fire({
        icon: "error",
        title: locale === "zh" ? "無法設定" : " Unable to reset password",
        text:
          locale === "zh"
            ? "系統查無此帳號，請聯絡客服團隊 contact@tccf.tw"
            : "The email address you entered was not found in our system. Please contact our customer service team at contact@tccf.tw",
      }).then(() => {
        setEmail("");
      });
      return;
    }
  };

  useEffect(() => {
    clearAuthToken();
  }, []);

  return (
    <div className="authPageWrapper">
      <div className="authPageWrapper__container">
        <div className="authPageWrapper__container_contentWrapper__content">
          {isSubmitted ? (
            <div className="authPageWrapper__container_contentWrapper__content__login">
              <div className="authPageWrapper__container_contentWrapper__content__login__image">
                <ImageLoader
                  src={"/images/auth/mail.png"}
                  alt={"mail Success"}
                  sizes={"100%"}
                  style={{ width: "100%", height: "200px" }}
                />
              </div>
              <h1 className="authPageWrapper__title">
                {t("ForgetPassWordTitle")}
              </h1>
              <p className={styles.exhibitionlogin__forgetMailText}>
                {t("ForgetPassWordSecTitle_1")}
              </p>
              <p className={styles.exhibitionlogin__forgetMailText}>
                {t("ForgetPassWordSecTitle_2")}
              </p>
              <p className={styles.exhibitionlogin__forgetMailText}>
                {t("ForgetPassWordSecTitle_3")}
              </p>

              <p className={styles.exhibitionlogin__forgetMailText}>
                {t("ForgetPassWordSecTitle_4")}
              </p>

              <div>
                <Button
                  link={"/exhibitionauth/login"}
                  target="_self"
                  linkText={t("ForgetPassWordLogin")}
                  btntype={"auth"}
                />
              </div>
            </div>
          ) : (
            <div className="authPageWrapper__container_contentWrapper__content__login">
              <h1 className="authPageWrapper__title">
                {t("ForgetPassWordFirstTitle")}
              </h1>
              <p className="authPageWrapper__secTitle">
                {t("ForgetPassWordSecTitle")}
              </p>

              <div className={styles.exhibitionlogin}>
                <Input
                  type="text"
                  name={"email"}
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                />

                <Button
                  linkText={t("ForgetPassWordButton")}
                  btntype={"auth"}
                  onClick={sendEmail}
                />

                <Link href={"/exhibition"}>
                  <p className={styles.exhibitionlogin__forgetText}>
                    {t("ForgetPassWordLogin_1")}
                  </p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
