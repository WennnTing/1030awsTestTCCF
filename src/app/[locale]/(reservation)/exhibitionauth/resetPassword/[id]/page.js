// 重設密碼 > 設定新密碼
"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import Input from "@/components/global/input";
import Button from "@/components/global/button";
import styles from "../../exhibitionLogin.module.scss";
import { Link } from "../../../../../../navigation";
import ImageLoader from "@/components/global/image-loader";
import { usePathname, useRouter } from "next/navigation";

import { API_ResetPassword } from "@/api/api";
import { clearAuthToken } from "@/utils/common";

export default function SetNewPasswordPage() {
  const Swal = require("sweetalert2");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const router = useRouter();
  const t = useTranslations("SetNewPassWord");

  const getToken = pathname.split("/").pop(); // 取得token

  // console.log(getToken);

  const [passwordData, setPasswordData] = useState({
    newpassword: "",
    confirmnewpassword: "",
  });

  const [token, setToken] = useState("");

  useEffect(() => {
    clearAuthToken();
    setToken(getToken);
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const resetPassword = async () => {
    // 密碼格式驗證:8-16位英文大小寫字母和數字，至少包含一個特殊符號
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./<>?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,16}$/;

    // 驗證新密碼格式
    if (!passwordPattern.test(passwordData.newpassword)) {
      Swal.fire({
        icon: "error",
        title:
          locale === "zh"
            ? "密碼必須是8到16個字元，包含大小寫字母和數字和一個特殊符號"
            : "Password: 8-16 characters, including at least 1  uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    // 驗證新密碼與確認密碼是否一致
    if (passwordData.newpassword !== passwordData.confirmnewpassword) {
      Swal.fire({
        icon: "error",
        title:
          locale === "zh"
            ? "輸入的密碼不一致"
            : "The password entered is inconsistent",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    // 都通過後，打重設密碼API
    const data = {
      Token: token,
      NewPassword: passwordData.newpassword,
    };

    const res = await API_ResetPassword(JSON.stringify(data));
    console.log(res);
    if (res && res.message && res.message.includes("密碼已成功重置。")) {
      setIsSubmitted(true);

      setTimeout(() => {
        // router.push(`/${locale}/exhibitionauth/login`);
        router.push(`/${locale}/exhibition`);
      }, 5000);
    } else {
      // 出現情境：token過期
      Swal.fire({
        icon: "error",
        title: locale === "zh" ? "密碼重設失敗" : "Password reset failed",
        text: locale === "zh" ? "請重新再試。" : "Please try again.",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <div className="authPageWrapper">
      <div className="authPageWrapper__container">
        <div className="authPageWrapper__container_contentWrapper__content">
          {isSubmitted ? (
            <div className="authPageWrapper__container_contentWrapper__content__login">
              <div className="authPageWrapper__container_contentWrapper__content__login__image">
                <ImageLoader
                  src={"/images/auth/completed.png"}
                  alt={"mail Success"}
                  sizes={"100%"}
                  style={{ width: "100%", height: "200px" }}
                />
              </div>
              <h1 className="authPageWrapper__title">
                {t("SetNewPassWordTitle")}
              </h1>
              <p className={styles.exhibitionlogin__forgetMailText}>
                {t("SetNewPassWordSecTitle_1")}
              </p>
              <p className={styles.exhibitionlogin__forgetMailText}>
                {t("SetNewPassWordSecTitle_2")}
              </p>
              <p className={styles.exhibitionlogin__forgetMailText}>
                {t("SetNewPassWordSecTitle_3")}
              </p>
            </div>
          ) : (
            <div className="authPageWrapper__container_contentWrapper__content__login">
              <h1 className="authPageWrapper__title">
                {t("SetNewPassWordFirstTitle")}
              </h1>
              <p className="authPageWrapper__secTitle">
                {t("SetNewPassWordSecTitle")}
              </p>

              <div className={styles.login}>
                <Input
                  labelName={t("SetNewPassWordLabel_1")}
                  type="password"
                  name="newpassword"
                  placeholder="password"
                  value={passwordData.newpassword}
                  onChange={handleChange}
                  passwordRWD={true}
                  message={
                    locale === "zh"
                      ? "密碼必須是8到16個字元，包含大小寫字母和數字和一個特殊符號"
                      : "8-16 characters, including at least 1  uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
                  }
                />

                <Input
                  labelName={t("SetNewPassWordLabel_2")}
                  type="password"
                  name="confirmnewpassword"
                  placeholder="password"
                  value={passwordData.confirmnewpassword}
                  onChange={handleChange}
                />

                <Button
                  linkText={t("SetNewPassWordButton")}
                  btntype={"auth"}
                  onClick={resetPassword}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
