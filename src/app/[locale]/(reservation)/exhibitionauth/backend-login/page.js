"use client";
import { useState, useEffect } from "react";
import Input from "@/components/global/input";
import Button from "@/components/global/button";
import styles from "../exhibitionLogin.module.scss";

import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { setAuthToken, getAuthToken } from "@/utils/common";

// api
import { API_LoginByAdmin } from "@/api/api";

export default function ExhibitionBackendLogin() {
  const Swal = require("sweetalert2");
  const router = useRouter();
  const [isLogin, setIslogin] = useState(getAuthToken().token);
  const t = useTranslations("Login");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
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
  };

  // 登入
  const handleLogin = async () => {
    try {
      const data = {
        email: loginData.email,
        password: loginData.password,
      };
      const res = await API_LoginByAdmin(JSON.stringify(data));

      if (res === null) {
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

      if (!res.token) {
        Swal.fire({
          icon: "error",
          title: locale === "zh" ? "登入失敗" : "Login Fail",
          text:
            locale === "zh"
              ? "帳號或密碼輸入錯誤"
              : "Incorrect email or password",
          showConfirmButton: true,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: locale === "zh" ? "登入成功" : "Login Successful",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        setAuthToken(res.token, 1);
        setIslogin(res.token);
        router.push(`/${locale}/exhibition-backend/market-manege`);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title:
          locale === "zh"
            ? "異常狀況，請稍後再試"
            : "An exception occurred, please try again later.",
        timer: 2000,
        showConfirmButton: false,
      });
      console.log("Login Fail:", error.message);
    }
  };

  // 如果有登入的話，跳到exhibition-backend
  useEffect(() => {
    if (isLogin) {
      router.push(`/${locale}/exhibition-backend/market-manege`);
    }
  }, [isLogin]);

  return (
    <div className="authPageWrapper">
      <div className="authPageWrapper__container">
        <h1 className="authPageWrapper__title">{t("LoginTitle")}</h1>
        <p className="authPageWrapper__secTitle">{t("LoginSecTitle_2")}</p>

        <div className={styles.exhibitionlogin}>
          <Input
            type="text"
            labelName={t("LoginLabel_1")}
            placeholder="Email"
            onChange={handleChange}
            value={loginData.email}
            name={"email"}
          />

          <Input
            type="password"
            labelName={t("LoginLabel_2")}
            placeholder="Password"
            onChange={handleChange}
            value={loginData.password}
            name={"password"}
          />

          <div className={styles.exhibitionlogin__buttonWrapper}>
            <Button
              linkText={t("LoginButton")}
              btntype={"auth"}
              onClick={handleLogin}
            />
          </div>

          {/* <Link href={"/exhibitionauth/resetpasswordrequest"}>
                        <p className={styles.exhibitionlogin__forgetText}>{t("LoginForgetText")}?</p>
                    </Link> */}
        </div>
      </div>
    </div>
  );
}
