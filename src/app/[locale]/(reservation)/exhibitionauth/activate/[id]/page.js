"use client";
import { useState, useEffect } from "react";
import styles from "./openaccount.module.scss";

// components
import Input from "@/components/global/input";
import Button from "@/components/global/button";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import LoginDialog from "@/(reservation)/exhibition/components/Dialog/LoginDialog";

import { setAuthToken, getAuthToken, clearAuthToken } from "@/utils/common";
import { QuestionSwal } from "@/components/global/CustomSweetAlert";

// icons
import { FaGoogle } from "react-icons/fa";

// api
import { API_Login, API_ChangePassword } from "@/api/api";

// 測試用的base 64: d2VuZHkuY2hpZW5AaW50ZXJzZW5zZS5jb20udHc=
const PASSWORD = process.env.NEXT_PUBLIC_ALL_PURPOSE_PASSWORD;

export default function OpenAccountPage({ params }) {
  const Swal = require("sweetalert2");
  const [passwordData, setPasswordData] = useState({
    password: PASSWORD,
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [isLogin, setIslogin] = useState(getAuthToken().token);
  const t = useTranslations("Register");
  const [emailBase64, setEmailBase64] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // 先解碼URL的base 64 再塞進來loginData
  const [loginData, setLoginData] = useState({
    email: emailBase64,
    password: PASSWORD,
  });
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  // 即時更新輸入的資料
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  // 呼叫修改密碼API
  // 這邊直接幫他把oldPassword帶入萬用密碼PASSWORD
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
          oldPassword: PASSWORD,
          newPassword: passwordData.newPassword,
        };
        const response = await API_ChangePassword(JSON.stringify(data));

        // 選擇確認後，打 API_ChangePassword 來換密碼
        // 如果出現更新成功，就會跳轉到memberinfo頁面
        // 如果失敗，
        if (response.message && response.message.includes("更新成功")) {
          Swal.fire({
            icon: "success",
            title: locale === "zh" ? "開通成功" : "Success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            router.push(`/${locale}/exhibition/memberInfo`);
          });
        } else {
          // 舊密碼驗證失敗錯誤
          console.log("response", response.message);
          Swal.fire({
            icon: "error",
            title: locale === "zh" ? "開通失敗" : "Activation failed",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error updating password:", error);
        Swal.fire({
          icon: "error",
          title: locale === "zh" ? "開通失敗" : "Activation failed",
          text: locale === "zh" ? "請重新再試。" : "Please try again.",
          timer: 1500,
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

  // 進去頁面就自動先登入
  useEffect(() => {
    // 先清除token，再進行下一步，避免已有token，造成衝突
    clearAuthToken();
    // 使用 split 來抓取 base64 字串
    // 這邊的 pathname 是 /zh/exhibitionauth/openaccount/{email base64}
    const parts = pathname.split("/");
    const base64String = parts[parts.length - 1];

    // 解碼
    // 得到 email
    const email = atob(base64String);
    setEmailBase64(email);
    setLoginData((prevData) => ({
      ...prevData,
      email: email,
    }));

    // 自動登入
    // 登入成功後，將 token 存入 cookie
    // 如果登入失敗，跳出錯誤訊息，並傳送登入頁面
    const autoLogin = async () => {
      const data = {
        email: email,
        password: PASSWORD,
      };
      const res = await API_Login(JSON.stringify(data));
      if (res.token) {
        setAuthToken(res.token, 1);
        setIslogin(res.token);
      } else {
        Swal.fire({
          icon: "error",
          title:
            locale === "zh"
              ? "此連結已失效"
              : "This link is not valid anymore.",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          //   router.push(`/${locale}/exhibitionauth/login`);
          router.push(`/${locale}/exhibition`);
        });
      }
    };
    autoLogin();
  }, []);

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
            value={loginData.email}
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
