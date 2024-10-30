"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./accupass.module.scss";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import { QuestionSwal } from "@/components/global/CustomSweetAlert";
import { useRouter } from "next/navigation";

// components
import Input from "@/components/global/input";
import Button from "@/components/global/button";
import LoginDialog from "@/(reservation)/exhibition/components/Dialog/LoginDialog";

// api
import { API_AccupassRegister, API_CheckEmail } from "@/api/api";

const AccupassActivatePage = () => {
  const Swal = require("sweetalert2");
  const emailRef = useRef(null);
  const t = useTranslations("Accupass");
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [emailError, setEmailError] = useState(false); // Email 是否註冊過
  const [errorMessage, setErrorMessage] = useState(""); // 錯誤消息
  const [emailTimeout, setEmailTimeout] = useState(null); // Email 驗證的 timeout

  const [accupassData, setAccupassData] = useState({
    name: "",
    phone: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    token: "",
  });

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 檢查 Email 格式並且打 API 檢查 Email 是否有重複
  const checkEmail = async (email) => {
    if (!emailPattern.test(email)) {
      setEmailError(true);
      setErrorMessage(
        locale === "zh" ? "Email 格式不正確" : "Incorrect email format"
      );
      return;
    }

    // 如果格式正確，清除錯誤提示
    setEmailError(false);
    setErrorMessage("");

    const res = await API_CheckEmail(JSON.stringify(email));

    if (res.message === true) {
      setEmailError(false);
      setErrorMessage("");
    } else {
      setEmailError(true);
      setErrorMessage(
        locale === "zh" ? "此 Email 已註冊過" : "This email has been registered"
      );
      emailRef.current.focus();
    }
  };

  const handleBlur = () => {
    const email = accupassData.email;
    if (email && !emailError) {
      checkEmail(email);
    }
  };

  // 關閉dialog
  const closeDialog = () => {
    setDialogOpen(false);
  };

  // 即時更新輸入的資料
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccupassData({
      ...accupassData,
      [name]: value,
    });
  };

  // 開通按鈕
  // 驗證密碼格式、密碼是否一致
  const openAccountSubmit = () => {
    // 密碼格式驗證:8-16位英文大小寫字母和數字，至少包含一個特殊符號
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./<>?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,16}$/;

    // 驗證新密碼格式
    if (!passwordPattern.test(accupassData.newPassword)) {
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
    if (accupassData.newPassword !== accupassData.confirmPassword) {
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

  // Accupass 外部API
  const fetchTicketInfo = async () => {
    try {
      const ticketId = pathname.split("/").pop();
      const response = await fetch(
        `https://accu-mice-vvr3kr7cwa-de.a.run.app/facepass/3thParty/TCCF/ticketInfo?ticketId=${ticketId}`,
        {
          method: "GET",
          headers: {
            // 'Content-Type': 'application/json',
            "x-api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6ZXIiOiJhZHZhbnRlY2giLCJpYXQiOjE1NTYyNDI1OTUsImV4cCI6MTU1NjI0NjE5NX0.qqWV4I6M24-eib9SrHh_T9VoD_5Mm_abeJZWKESbU2w",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.data && Object.keys(data.data).length > 0) {
        // 如果data物件存在且不為空
        setAccupassData((prevData) => ({
          ...prevData,
          name: data.data.name,
          phone: data.data.tel,
          email: data.data.email,
          token: ticketId,
        }));
      } else if (data.msg === "No Ticket") {
        // 如果data.msg是 "No Ticket"
        Swal.fire({
          icon: "error",
          title: locale === "zh" ? "票號異常" : "Invalid ticket number",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          router.push(`/${locale}/exhibitionauth/login`);
        });
      } else {
        // 處理其他可能的情況，例如 data 是空對象或其他錯誤消息
        Swal.fire({
          icon: "error",
          title:
            locale === "zh"
              ? "無法獲取票號信息"
              : "Unable to retrieve ticket information",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          // router.push(`/${locale}/exhibitionauth/login`);
        });
      }
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
      console.log(error.message);
    }
  };

  // 開通帳號
  // 打accupass api
  const accupassRegister = async () => {
    const result = await QuestionSwal({
      title:
        locale === "zh" ? "確認送出嗎?" : "Are you sure you want to submit?",
      canceltext: locale === "zh" ? "取消" : "Cancel",
      confirmtext: locale === "zh" ? "確認" : "Confirm",
    });

    if (result.isConfirmed) {
      try {
        console.log("accupassData before API call:", accupassData);

        const data = {
          TicketId: accupassData.token,
          Email: accupassData.email,
          Password: accupassData.newPassword,
          FullnameZh: accupassData.name,
          Phone: accupassData.phone,
        };

        const response = await API_AccupassRegister(JSON.stringify(data));

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

        if (
          response &&
          response.message &&
          response.message.includes("用戶註冊成功")
        ) {
          Swal.fire({
            icon: "success",
            title: locale === "zh" ? "開通成功" : "Success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            router.push(`/${locale}/exhibitionauth/login`);
          });
        } else if (
          response &&
          response.message &&
          response.message.includes("該票券已經註冊過")
        ) {
          console.log("response", response);
          Swal.fire({
            icon: "error",
            title:
              locale === "zh"
                ? "該票券已經註冊過"
                : "The ticket has already been registered",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            router.push(`/${locale}/exhibitionauth/login`);
          });
        } else if (
          response &&
          response.message &&
          response.message.includes("該Email帳號已經註冊過")
        ) {
          console.log("response", response);
          Swal.fire({
            icon: "error",
            title: locale === "zh" ? "開通失敗" : "Failed",
            text:
              locale === "zh"
                ? "此帳號已存在於系統，請重新填寫與會人信箱"
                : "This account already exists in the system. Please enter a different attendee email.",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: locale === "zh" ? "開通失敗" : "Failed",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error updating password:", error);
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

  useEffect(() => {
    fetchTicketInfo();
    setAccupassData({
      ...accupassData,
      token: pathname.split("/").pop(),
    });
  }, []);

  useEffect(() => {
    if (emailTimeout) {
      clearTimeout(emailTimeout);
    }

    if (accupassData.email) {
      const timeoutId = setTimeout(() => {
        checkEmail(accupassData.email);
      }, 500);

      setEmailTimeout(timeoutId);
    }
  }, [accupassData.email]);

  return (
    <div className="authPageWrapper">
      <div className="authPageWrapper__container">
        <h1 className="authPageWrapper__title">{t("title")}</h1>
        <p className="authPageWrapper__secTitle">{t("label_1")}</p>

        <div className={styles.accupass}>
          <Input
            type="text"
            labelName={t("Inputdata.label_3")}
            placeholder="Enter your email"
            value={accupassData.email}
            onChange={handleChange}
            name="email"
            onBlur={handleBlur}
            ref={emailRef}
            setError={emailError}
            errorMessage={errorMessage}
          />

          <Input
            type="text"
            labelName={t("Inputdata.label_1")}
            placeholder="Name"
            onChange={handleChange}
            value={accupassData.name}
            name={"name"}
            disabled={emailError}
          />

          <Input
            type="text"
            labelName={t("Inputdata.label_2")}
            placeholder="Phone"
            onChange={handleChange}
            value={accupassData.phone}
            name={"phone"}
            disabled={emailError}
          />

          <Input
            type="password"
            labelName={t("Inputdata.label_4")}
            placeholder="Password"
            onChange={handleChange}
            value={accupassData.newPassword}
            name={"newPassword"}
            message={
              locale === "zh"
                ? "密碼必須是8到16個字元，包含大小寫字母和數字和一個特殊符號"
                : "Password: 8-16 characters, including at least 1  uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
            }
            passwordRWD={true}
            disabled={emailError}
          />

          <Input
            type="password"
            labelName={t("Inputdata.label_5")}
            placeholder="confirm Password"
            onChange={handleChange}
            value={accupassData.confirmPassword}
            name={"confirmPassword"}
            disabled={emailError}
          />

          <div className={styles.accupass__buttonWrapper}>
            <Button
              linkText={t("Inputdata.label_6")}
              btntype={"auth"}
              onClick={openAccountSubmit}
            />
          </div>

          {/* <p className={styles.accupass__text}>{t("RegisterThirdParty")}</p>

                  <div className={styles.accupass__buttonWrapper}>
                      <span className={styles.accupass__socialLogin}>
                          <FaGoogle />
                          Google
                      </span>
                  </div> */}

          {/* <div className={styles.accupass__bottomText}>
                      <p className={styles.accupass__text}>
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
        onSubmit={accupassRegister}
        closeDialog={closeDialog}
        locale={locale}
      />
    </div>
  );
};

export default AccupassActivatePage;
