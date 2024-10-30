"use client";
import { useState, useEffect } from "react";
import Input from "@/components/global/input";
import Button from "@/components/global/button";
import styles from "../exhibitionLogin.module.scss";
import { FaGoogle } from "react-icons/fa";
import { Link } from "../../../../../navigation";

import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { setAuthToken, getAuthToken } from "@/utils/common";

import Swal from "sweetalert2";

// api
import { API_Login } from "@/api/api";

export default function ExhibitionLogin() {
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
      const res = await API_Login(JSON.stringify(data));

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
        router.push(`/${locale}/exhibition/memberinfo`);
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

  useEffect(() => {
    if (isLogin) {
      router.push(`/${locale}/exhibition/memberinfo`);
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

          <Link href={"/exhibitionauth/resetpasswordrequest"}>
            <p className={styles.exhibitionlogin__forgetText}>
              {t("LoginForgetText")}?
            </p>
          </Link>

          {/* <p className={styles.exhibitionlogin__text}>{t("LoginThirdParty")}</p> */}

          {/* <div className={styles.exhibitionlogin__buttonWrapper}>
                        <span className={styles.exhibitionlogin__socialLogin}>
                            <FaGoogle />
                            Google
                        </span>
                    </div> */}

          {/* <div className={styles.exhibitionlogin__bottomText}>
                        <p className={styles.exhibitionlogin__text}>
                            {t.rich("LoginRegister_1", {
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
    </div>
  );
}
