"use client";
import { useState, useEffect } from "react";
import styles from "./openaccount.module.scss";

// components
import Input from "@/components/global/input";
import Button from "@/components/global/button";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LoginDialog from "@/(reservation)/exhibition/components/Dialog/LoginDialog";

import { setAuthToken, getAuthToken, clearAuthToken } from "@/utils/common";
import { QuestionSwal } from "@/components/global/CustomSweetAlert";

// icons
import { FaGoogle } from "react-icons/fa";

// api
import { API_Register, API_GetEmailByToken } from "@/api/api";

export default function OpenAccountPage({ params }) {
  const Swal = require("sweetalert2");
  const [passwordData, setPasswordData] = useState({
    email: "",
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [isLogin, setIslogin] = useState(getAuthToken().token);
  const t = useTranslations("Register");
  const [dialogOpen, setDialogOpen] = useState(false);

  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  // 即時更新輸入的資料
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  // 呼叫開通會員API
  const handleSavePassword = async () => {
    const result = await QuestionSwal({
      title:
        locale === "zh" ? "確認送出嗎?" : "Are you sure you want to submit?",
      canceltext: locale === "zh" ? "取消" : "Cancel",
      confirmtext: locale === "zh" ? "確認" : "Confirm",
    });

    if (result.isConfirmed) {
      try {
        const data = {
          ActivationToken: passwordData.token,
          Password: passwordData.newPassword,
        };
        const response = await API_Register(JSON.stringify(data));

        // 如果response是null，代表網路訊號不佳
        // 詳細見api.js裡面的try fetch，有設定為!navigator.online會return null
        if (response === null) {
          Swal.fire({
            icon: "error",
            title: locale === "zh" ? "網路訊號不佳" : "Poor Internet Signal",
            text:
              locale === "zh"
                ? "請檢查您的網路連接"
                : "Please check your internet connection.",
            showConfirmButton: true,
          });
          return;
        }

        // 選擇確認後，打 API_Register 來開通會員
        // 如果開通成功，就會跳轉到memberinfo頁面
        // 如果失敗，可能是token過期
        if (response.message && response.message.includes("用戶註冊成功")) {
          Swal.fire({
            icon: "success",
            title: locale === "zh" ? "開通成功" : "Success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // router.push(`/${locale}/exhibitionauth/login`);
            router.push(`/${locale}/exhibition`);
          });
        } else if (
          response.message &&
          response.message.includes("無效或過期的Token")
        ) {
          // token 過期
          Swal.fire({
            icon: "error",
            title:
              locale === "zh"
                ? "此連結已失效"
                : "This link is not valid anymore.",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            // router.push(`/${locale}/exhibitionauth/login`);
            router.push(`/${locale}/exhibition`);
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title:
            locale === "zh"
              ? "異常狀況，請稍後再試"
              : "An exception occurred, please try again later.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  // 開通按鈕
  // 按下去時打開Dialog
  // 先做驗證，驗證失敗則跳出錯誤訊息
  // 驗證成功才出現Dialog
  const openAccountSubmit = () => {
    // 密碼格式驗證:8-16位英文大小寫字母和數字，至少包含一個特殊符號
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./<>?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,16}$/;

    // 驗證新密碼格式
    if (!passwordPattern.test(passwordData.newPassword)) {
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
    if (passwordData.newPassword !== passwordData.confirmPassword) {
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

    // 開啟Dialog
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  // 進入頁面第一件事：清除token
  // 第二件事：抓取split最後面一串的token，塞到data裡
  useEffect(() => {
    // 先清除token，再進行下一步，避免已有token，造成衝突
    clearAuthToken();

    // 抓取split最後面一串的token，塞到data裡
    const getToken = pathname.split("/").pop(); // 取得token

    const getEmailByToken = async () => {
      try {
        const response = await API_GetEmailByToken(getToken);
        // 確保使用最新的 passwordData 狀態
        setPasswordData((prev) => ({
          ...prev,
          token: getToken, // 更新 token
          email: response.data, // 同時更新 email
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getEmailByToken();
  }, [pathname]);

  return (
    <div className="authPageWrapper">
      <div className="authPageWrapper__container">
        <h1 className="authPageWrapper__title">{t("RegisterTitle")}</h1>
        <p className="authPageWrapper__secTitle">{t("RegisterSecTitle")}</p>

        <div className={styles.openaccount}>
          <Input
            type="text"
            labelName={t("RegisterLabel_1")}
            placeholder="Email"
            onChange={handleChange}
            value={passwordData.email}
            name={"email"}
            disabled={true}
          />

          <Input
            type="password"
            labelName={t("RegisterLabel_2")}
            placeholder="Password"
            onChange={handleChange}
            value={passwordData.newPassword}
            name={"newPassword"}
            message={
              locale === "zh"
                ? "密碼必須是8到16個字元，包含大小寫字母和數字和一個特殊符號"
                : "Password: 8-16 characters, including at least 1  uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
            }
            passwordRWD={true}
          />

          <Input
            type="password"
            labelName={t("RegisterLabel_3")}
            placeholder="confirm Password"
            onChange={handleChange}
            value={passwordData.confirmPassword}
            name={"confirmPassword"}
          />

          <div className={styles.openaccount__buttonWrapper}>
            <Button
              linkText={t("RegisterButton")}
              btntype={"auth"}
              onClick={openAccountSubmit}
            />
          </div>

          {/* <p className={styles.openaccount__text}>{t("RegisterThirdParty")}</p>

                    <div className={styles.openaccount__buttonWrapper}>
                        <span className={styles.openaccount__socialLogin}>
                            <FaGoogle />
                            Google
                        </span>
                    </div> */}

          {/* <div className={styles.openaccount__bottomText}>
                        <p className={styles.openaccount__text}>
                            {t.rich("RegisterRegister_1", {
                                link: (chunks) => (
                                    <Link
                                        href="/auth/register"
                                        style={{ color: "#51BA97" }}
                                    >
                                        {chunks}
                                    </Link>
                                ),
                            })}
                        </p>
                    </div> */}
        </div>
      </div>

      <LoginDialog
        open={dialogOpen}
        onSubmit={handleSavePassword}
        closeDialog={closeDialog}
        passwordData={passwordData}
        locale={locale}
      />
    </div>
  );
}
