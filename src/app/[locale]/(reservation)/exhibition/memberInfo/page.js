"use client";
import React, { useState, useEffect } from "react";
import InputComponent from "../components/Input/Input";
import { FaEdit } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { BsCheckCircle } from "react-icons/bs";
// components
import MultipleSelect from "../exhibitioninfo/components/MultipleSelect";
import Button from "../components/Button/Button";
import TagInput from "../components/Input/TagInput";

import Dialog from "../components/Dialog/Dialog";
import {
  ConfirmSwal,
  QuestionSwal,
} from "@/components/global/CustomSweetAlert";

// cookie紀錄彈窗，若有顯示過，則不再顯示
import { isPopupShown, setPopupShown } from "@/utils/common";

// context
import { useUser } from "@/context/exhibition/UserContext";

// api
import { API_UpdateMemberDetails, API_ChangePassword } from "@/api/api";

const MemberInfo = () => {
  const Swal = require("sweetalert2");
  const { user, setUser } = useUser();
  const t = useTranslations("MemberInfo");
  const d = useTranslations("LoginDialog");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [isAccountInfoOpen, setIsAccountInfoOpen] = useState(false); //修改個人資訊
  const [isPasswordOpen, setIsPasswordOpen] = useState(false); //修改密碼
  const [nameLength, setNameLength] = useState(0); //名字字數計算
  const [showRemindDialog, setShowRemindDialog] = useState(false);

  // 新密碼、密碼確認
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formData, setFormData] = useState({
    chineseName: "", // 中文姓名
    englishName: "", // 英文姓名
    email: "", // 電子信箱
    phone: "", // 聯絡電話
    title: "", // 職稱
    badgeRole: "", // 展證身份
    systemRole: [], // 參展身份
    exhibitionTarget: [], // 參展目標
    badgeChineseName: "", // 展證顯示中文姓名
    badgeEnglishName: "", // 展證顯示英文姓名
    nickname: "", // 暱稱
  });

  const [tempFormData, setTempFormData] = useState(formData);
  const [tempImage, setTempImage] = useState(""); // 用於預覽的臨時圖片

  // 參展目標
  const target = [
    { label: d("goal_list.list_item_1"), value: 0 },
    { label: d("goal_list.list_item_2"), value: 1 },
    { label: d("goal_list.list_item_3"), value: 2 },
    { label: d("goal_list.list_item_4"), value: 3 },
    { label: d("goal_list.list_item_5"), value: 4 },
    { label: d("goal_list.list_item_6"), value: 5 },
    { label: d("goal_list.list_item_7"), value: 6 },
    { label: d("goal_list.list_item_8"), value: 7 },
    { label: d("goal_list.list_item_9"), value: 8 },
  ];

  const mapValuesToLabels = (values) => {
    if (!Array.isArray(values)) {
      return [];
    }

    return values.map((value) => {
      const foundTarget = target.find((option) => option.value === value);
      return foundTarget ? foundTarget.label : value;
    });
  };

  // 計算名字字數
  const getCharacterLength = (str) => {
    let length = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      if (char.charCodeAt(0) > 255) {
        length += 2;
      } else {
        length += 1;
      }
    }
    return length;
  };

  const handleChange = (name, value) => {
    if (name === "exhibitionTarget") {
      // 這裡直接處理 MultipleSelect 傳遞的值
      setTempFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === "englishName") {
      // 只允許輸入英文與逗號
      let sanitizedValue = value.replace(/[^a-zA-Z,\s]/g, "");

      // 逗號後的字母全部轉大寫，逗號前面大小寫不影響
      sanitizedValue = sanitizedValue
        .replace(/,\s*/g, ",")
        .replace(/,([^,]*)/g, (match, p1) => `,${p1.toUpperCase()}`);
      setTempFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
      // 更新英文姓名，計算字串長度
      const chineseLength = getCharacterLength(tempFormData.chineseName || "");
      const englishLength = getCharacterLength(sanitizedValue);
      setNameLength(chineseLength + englishLength);
    } else if (name === "chineseName") {
      // 更新中文姓名，計算字串長度
      setTempFormData((prev) => ({ ...prev, [name]: value }));
      const chineseLength = getCharacterLength(value);
      const englishLength = getCharacterLength(tempFormData.englishName || "");
      setNameLength(chineseLength + englishLength);
    } else {
      setTempFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const normalizeMemberDetails = (memberDetails) => ({
    fullnameZh: memberDetails.FullnameZh || memberDetails.fullnameZh || "",
    fullnameEn: memberDetails.FullnameEn || memberDetails.fullnameEn || "",
    mobilePhone: memberDetails.MobilePhone || memberDetails.mobilePhone || "",
    jobTitle: memberDetails.JobTitle || memberDetails.jobTitle || "",
    participationGoals:
      memberDetails.ParticipationGoals ||
      memberDetails.participationGoals ||
      [],
    passnameZh: memberDetails.PassnameZh || memberDetails.passnameZh || "",
    passnameEn: memberDetails.PassnameEn || memberDetails.passnameEn || "",
    nickname: memberDetails.nickname || "",
  });

  useEffect(() => {
    if (user.memberDetails) {
      const normalizedDetails = normalizeMemberDetails(user.memberDetails);

      const determineBadgeRole = (systemRole) => {
        if (systemRole.includes("Market") || systemRole.includes("Pitching")) {
          return "Exhibitor";
        } else if (
          systemRole.includes("Award Sponsor") ||
          systemRole.includes("Buyer") ||
          systemRole.includes("VIP") ||
          systemRole.includes("Speaker") ||
          systemRole.includes("Decision Maker")
        ) {
          return "Delegate";
        } else if (systemRole.includes("Professional")) {
          return "Professional";
        } else if (systemRole.includes("Press")) {
          return "Press";
        } else {
          return "";
        }
      };

      const updatedFormData = {
        chineseName: normalizedDetails.fullnameZh,
        englishName: normalizedDetails.fullnameEn,
        email: user.email || "",
        phone: normalizedDetails.mobilePhone,
        title: normalizedDetails.jobTitle,
        badgeRole: determineBadgeRole(user.roles || []),
        systemRole: user.roles || [],
        exhibitionTarget: normalizedDetails.participationGoals,
        badgeChineseName: normalizedDetails.passnameZh,
        badgeEnglishName: normalizedDetails.passnameEn,
        nickname: normalizedDetails.nickname,
      };

      setFormData(updatedFormData);
      setTempFormData(updatedFormData);

      // console.log("Normalized Member details:", normalizedDetails);
    }
  }, [user]);

  // 關閉修改個人資訊
  const handleCloseAccountInfo = () => {
    setIsAccountInfoOpen(false);
  };

  // 開啟修改個人資訊
  const handleOpenAccountInfo = () => {
    setIsAccountInfoOpen(true);
    setTempImage(formData.image);
  };

  // 關密修改密碼
  const handleClosePassword = () => {
    setIsPasswordOpen(false);
  };

  // 開啟修改密碼
  const handleOpenPassword = () => {
    setIsPasswordOpen(true);
  };

  // 驗證必填欄位
  const validateFields = () => {
    const requiredFields = [];
    const missingFields = [];

    if (locale === "zh") {
      // 中文網頁需要檢查的必填欄位
      requiredFields.push({ name: "chineseName", label: "中文姓名" });
      requiredFields.push({ name: "englishName", label: "英文姓名" });
      requiredFields.push({ name: "phone", label: "手機號碼" });
      requiredFields.push({ name: "exhibitionTarget", label: "參展目標" });
    } else {
      // 英文網頁需要檢查的必填欄位
      requiredFields.push({
        name: "englishName",
        label: "Participant’s English Name",
      });
      requiredFields.push({
        name: "phone",
        label: "Participant’s Mobile Number",
      });
      requiredFields.push({
        name: "exhibitionTarget",
        label: "Participation’s Goal",
      });
    }

    for (const field of requiredFields) {
      if (
        !tempFormData[field.name] ||
        (Array.isArray(tempFormData[field.name])
          ? tempFormData[field.name].length === 0
          : tempFormData[field.name].trim() === "")
      ) {
        missingFields.push(field.label);
      }
    }

    if (missingFields.length > 0) {
      Swal.fire({
        icon: "error",
        title:
          locale === "zh"
            ? "有未填寫的必填欄位"
            : "Some required fields are missing",
        text:
          locale === "zh"
            ? `未填寫之欄位：\n${missingFields.join("、")}`
            : `Please make sure the following required fields are filled out:\n${missingFields.join(
              ", "
            )}`,
        showConfirmButton: true,
      });
      return false;
    }

    return true;
  };

  // ====== 儲存個人資訊 ======
  const handleSaveAccountInfo = async () => {
    // 計算中英文姓名總長度，中文2字元，英文1字元
    // 不得超過27字元
    const chineseLength = getCharacterLength(tempFormData.chineseName || "");
    const englishLength = getCharacterLength(tempFormData.englishName || "");
    const totalLength = chineseLength + englishLength;

    // (中英文)超過27字，return
    if (totalLength > 27) {
      Swal.fire({
        icon: "warning",
        title: locale === "zh" ? "字數超過限制" : "Character limit exceeded",
        text:
          locale === "zh"
            ? `中文與英文姓名總長度不可超過27字，當前字數為 ${totalLength}/27`
            : `The total length of Chinese and English names cannot exceed 27 characters. Current length is ${totalLength}/27.`,
        showConfirmButton: true,
      });
      return; // 阻止繼續提交
    }

    // 在儲存之前先檢查必填欄位
    if (!validateFields()) {
      return;
    }

    const updatedDetails = {
      FullnameZh: tempFormData.chineseName,
      FullnameEn: tempFormData.englishName,
      MobilePhone: tempFormData.phone,
      JobTitle: tempFormData.title,
      PassnameZh: tempFormData.badgeChineseName,
      PassnameEn: tempFormData.badgeEnglishName,
      ParticipationGoals: tempFormData.exhibitionTarget,
    };

    ConfirmSwal({
      title: locale === "zh" ? "確認送出資訊嗎?" : "Confirm Submission?",
      text:
        locale === "zh"
          ? "若您開始進行預約後即不得更換展證資訊"
          : "Please note that once you start making reservations, you will not be able to change the badge information.",
      canceltext: locale === "zh" ? "取消" : "Cancel",
      confirmtext: locale === "zh" ? "確認" : "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await API_UpdateMemberDetails(
            JSON.stringify(updatedDetails),
            user.userId
          );
          console.log(res);

          if (res && res.message && res.message.includes("更新成功!")) {
            setUser((prevUser) => ({
              ...prevUser,
              memberDetails: {
                ...prevUser.memberDetails,
                ...updatedDetails,
              },
            }));

            setFormData(updatedDetails);

            Swal.fire({
              icon: "success",
              title: locale === "zh" ? "修改成功" : "Update successful",
              showConfirmButton: false,
              timer: 1000,
            });

            setIsAccountInfoOpen(false);
          } else {
            Swal.fire({
              icon: "error",
              title: locale === "zh" ? "修改失敗" : "Update failed",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        } catch (error) {
          console.error("Error updating member details:", error);
          Swal.fire({
            icon: "error",
            title: "修改失敗",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    });
  };

  // 選擇圖片時預覽
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 儲存密碼
  const handleSavePassword = async () => {
    // 密碼格式驗證:8-16位英文大小寫字母和數字，至少包含一個特殊符號
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./<>?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,16}$/;

    // 驗證新密碼格式
    if (!passwordPattern.test(passwords.newPassword)) {
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
    if (passwords.newPassword !== passwords.confirmPassword) {
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

    setIsPasswordOpen(false);

    const result = await QuestionSwal({
      title:
        locale === "zh" ? "確認修改嗎?" : "Are you sure you want to submit?",
      canceltext: locale === "zh" ? "取消" : "Cancel",
      confirmtext: locale === "zh" ? "確認" : "Confirm",
    });

    if (result.isConfirmed) {
      try {
        const passwordData = {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        };
        const response = await API_ChangePassword(JSON.stringify(passwordData));

        if (response.message && response.message.includes("更新成功")) {
          Swal.fire({
            icon: "success",
            title:
              locale === "zh" ? "修改成功" : "Password updated successfully",
            showConfirmButton: false,
            timer: 1000,
          });

          setPasswords({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          // 舊密碼驗證失敗錯誤
          Swal.fire({
            icon: "error",
            title: locale === "zh" ? "無法更新密碼" : "Password update failed",
            text:
              locale === "zh"
                ? "請確認輸入的密碼是否正確。"
                : "Please check if the entered password is correct.",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        // 處理錯誤
        console.error("Error updating password:", error);
        Swal.fire({
          icon: "error",
          title: locale === "zh" ? "修改失敗" : "Update failed",
          text: locale === "zh" ? "請稍後再試。" : "Please try again later.",
          showConfirmButton: true,
        });
      }
    }
  };

  useEffect(() => {
    if (isAccountInfoOpen) {
      const chineseLength = getCharacterLength(tempFormData.chineseName || "");
      const englishLength = getCharacterLength(tempFormData.englishName || "");
      setNameLength(chineseLength + englishLength);
    }
  }, [isAccountInfoOpen, tempFormData]);

  const dialogClose = () => {
    setShowRemindDialog(false);
  }

  useEffect(() => {
    if (!isPopupShown()) {
      setShowRemindDialog(true);
      setPopupShown();
    }
  }, []);

  return (
    <div className="exhibitionpage">
      <Dialog
        open={showRemindDialog}
        title={locale === 'zh' ? "提醒" : 'Notice'}
        buttonText2={locale === 'zh' ? "確定" : "OK"}
        onClose={dialogClose}
        onClick={dialogClose}
      >
        <div>
          <p>{locale === 'zh' ? '11 月 1 日 18:00（台灣時間 UTC+8）將關閉會議線上預約功能，敬請把握時間多加利用。' : 'Online appointment scheduling functions will close at 18:00 (Taiwan time UTC+8) on November 1, 2024, so please make the most of the time available.'}</p>
          <p>{locale === 'zh' ? 'TCCF 展會期間如欲預約空間開會，請至「商務會議中心服務台」進行預約。' : 'If you would like to reserve a meeting space during the TCCF event period, please visit the Business Center Reception at the venue.'}</p>
        </div>
      </Dialog>
      <div className="exhibitionpage__container">
        <div className="exhibitionpage__contentWrapper">
          <h1 className="exhibitionpage__contentWrapper__innertitle">
            {t("title")}
          </h1>

          <div className="exhibitionpage__mainWrapper">
            <div className="exhibitionpage__leftBlock">
              <div className="exhibitionpage__memberPage">
                <div className="exhibitionpage__titleBlock">
                  <div className="exhibitionpage__exhibitpassBlock">
                    <h2>{t("sectitle")}</h2>
                    <span
                      className={`exhibitionpage__exhibitpass ${user.hasExhibitPass ? "hasPass" : "noPass"
                        }`}
                    >
                      <BsCheckCircle />
                      {locale === "zh" ? "展證" : "Badge"}
                    </span>
                  </div>
                  <Button
                    text={t("editButton")}
                    icon={<FaEdit />}
                    onClick={handleOpenAccountInfo}
                  />
                </div>
                <div className="exhibitionpage__infoBlock">
                  <div className="exhibitionpage__inputBlock">
                    {/* 英文姓名 / 預設展證英文姓名 */}
                    {/* <InputComponent
                                          type="checkbox"
                                          label={t("englishName")}
                                          name="englishName"
                                          checkboxName="showEnglishNameOnBadge"
                                          value={formData.englishName}
                                          checkboxInput={t("englishRadio")}
                                          checked={formData.showEnglishNameOnBadge}
                                          disabled={true}
                                          require={true}
                                          message={"first name, LAST NAME"}
                                      /> */}

                    <InputComponent
                      type="text"
                      label={t("englishName")}
                      name="englishName"
                      value={formData.englishName}
                      disabled={true}
                      require={true}
                      message={"first name, LAST NAME"}
                    />

                    {/* 英文版本不顯示展證英文名稱 */}
                    {/* {locale === 'zh' && (
                                          <InputComponent
                                              type="text"
                                              label={t("exhibitionEnglishName")}
                                              name="badgeEnglishName"
                                              value={formData.badgeEnglishName}
                                              disabled={true}
                                              require={true}
                                              message={"first name, LAST NAME"}
                                          />
                                      )} */}

                    {/* 中文姓名 / 預設展證中文姓名 */}
                    {/* 預設英文版本不顯示這兩筆欄位 */}
                    {locale === "zh" && (
                      <>
                        {/* <InputComponent
                                                  type="checkbox"
                                                  label={t("mandarinName")}
                                                  name="chineseName"
                                                  checkboxName="showChineseNameOnBadge"
                                                  checkboxInput={t("mandarinRadio")}
                                                  value={formData.chineseName}
                                                  checked={formData.showChineseNameOnBadge}
                                                  disabled={true}
                                                  message={"姓＿名＿"}
                                              // require={true}
                                              /> */}

                        <InputComponent
                          type="text"
                          label={"中文姓名"}
                          name="chineseName"
                          value={formData.chineseName}
                          disabled={true}
                          require={true}
                          message={"姓＿名＿"}
                        />
                      </>
                    )}

                    <InputComponent
                      type="text"
                      name="email"
                      label={t("email")}
                      value={user.email}
                      onChange={handleChange}
                      disabled={true}
                    />

                    <InputComponent
                      type="text"
                      label={t("phone")}
                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setTempFormData({
                          ...tempFormData,
                          phone: e.target.value,
                        })
                      }
                      require={true}
                      disabled={true}
                      message={t("message.label_1")}
                    />

                    <InputComponent
                      type="text"
                      label={t("position")}
                      name="title"
                      value={formData.title}
                      onChange={(e) =>
                        setTempFormData({
                          ...tempFormData,
                          title: e.target.value,
                        })
                      }
                      disabled={true}
                    />

                    <InputComponent
                      type="text"
                      label={t("exhibitionRole")}
                      name="role"
                      value={formData.badgeRole}
                      onChange={handleChange}
                      disabled={true}
                    />

                    <TagInput
                      tags={formData.systemRole}
                      label={t("roletype")}
                    />

                    <TagInput
                      tags={mapValuesToLabels(formData.exhibitionTarget)}
                      label={t("goal")}
                      message={t("message.label_2")}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="exhibitionpage__memberPage">
                <div className="exhibitionpage__titleBlock">
                  <h2>{t("password_title")}</h2>
                  <Button
                    text={"修改密碼"}
                    icon={<FaEdit />}
                    onClick={handleOpenPassword}
                  />
                </div>
                <div className="exhibitionpage__infoBlock">
                  <div className="exhibitionpage__inputBlock">
                    <InputComponent
                      type="text"
                      // label={t("password")}
                      name="password"
                      value={"●●●●●●●●"}
                      onChange={handleChange}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dialog
            title={t("editButton")}
            onClose={handleCloseAccountInfo}
            onClick={handleSaveAccountInfo}
            open={isAccountInfoOpen}
            buttonText1={t("cancel")}
            buttonText2={t("submit")}
          >
            <div className="exhibitionpage__memberinfoDialog">
              {/* <InputComponent
                              type="checkbox"
                              label={t("mandarinName")}
                              name="chineseName"
                              checkboxName="showChineseNameOnBadge"
                              checkboxInput="預設為展證顯示中文姓名"
                              value={tempFormData.chineseName}
                              checked={tempFormData.showChineseNameOnBadge}
                              onChange={handleChange}
                          /> */}

              {locale === "zh" && (
                <InputComponent
                  type="text"
                  label={t("exhibitionName")}
                  name="chineseName"
                  value={tempFormData.chineseName}
                  onChange={(e) => handleChange("chineseName", e.target.value)}
                  require={true}
                  message={"姓＿名＿"}
                  placeholder={t("placeholder.label_1")}
                />
              )}

              {/* <InputComponent
                              type="checkbox"
                              label={t("englishName")}
                              name="englishName"
                              checkboxName="showEnglishNameOnBadge"
                              value={tempFormData.englishName}
                              checkboxInput="預設為展證顯示英文姓名"
                              checked={tempFormData.showEnglishNameOnBadge}
                              onChange={handleChange}
                          /> */}

              <div>
                <InputComponent
                  type="text"
                  label={t("englishName")}
                  name="englishName"
                  value={tempFormData.englishName}
                  onChange={(e) => handleChange("englishName", e.target.value)}
                  message={"first name, LAST NAME"}
                  require={true}
                  placeholder={t("placeholder.label_2")}
                  showTooltipOnFocus={true}
                />
                <span className="exhibitionpage__characterLength">
                  {locale === "zh"
                    ? `名字印製規格： ${nameLength}/27，超過此數字請編輯至符合規範`
                    : `Name Printing Specifications: ${nameLength}/27. Please edit to comply with the standard if this limit is exceeded.`}
                </span>
              </div>

              <InputComponent
                type="text"
                label={t("email")}
                name="email"
                value={tempFormData.email}
                onChange={handleChange}
                disabled={true}
              />

              <InputComponent
                type="text"
                label={t("phone")}
                name="phone"
                value={tempFormData.phone}
                onChange={(e) => {
                  const regex = /^[0-9+\-]*$/; // 只允許數字、+、-
                  if (regex.test(e.target.value)) {
                    setTempFormData({ ...tempFormData, phone: e.target.value });
                  }
                }}
                message={t("message.label_1")}
                require={true}
                placeholder={"+886-x-xxxx-xxxx ext. xxxx  +886-xxx-xxx-xxx"}
                showTooltipOnFocus={true}
              />

              <InputComponent
                type="text"
                label={t("position")}
                name="title"
                value={tempFormData.title}
                onChange={(e) =>
                  setTempFormData({ ...tempFormData, title: e.target.value })
                }
                placeholder={t("placeholder.label_3")}
              />

              {/* 參展目標 */}
              <MultipleSelect
                label={d("goal")}
                defaultText={d("goal_placeholder")}
                options={target}
                require={true}
                value={tempFormData.exhibitionTarget}
                onChange={(e) =>
                  handleChange("exhibitionTarget", e.target.value)
                }
                maxSelection={3}
              />

              {/* 展證身份 */}
              <InputComponent
                type="text"
                label={t("exhibitionRole")}
                name="role"
                value={tempFormData.badgeRole}
                onChange={handleChange}
                disabled={true}
              />

              {/* 參展身份 */}
              <TagInput tags={tempFormData.systemRole} label={t("roletype")} />
            </div>
          </Dialog>

          <Dialog
            title={t("editpassword")}
            onClose={handleClosePassword}
            onClick={handleSavePassword}
            open={isPasswordOpen}
            buttonText1={t("cancel")}
            buttonText2={t("submit")}
          >
            <InputComponent
              type="password"
              label={locale === "zh" ? "舊密碼" : "Old Password"}
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              require={true}
            />

            <InputComponent
              type="password"
              label={t("passwordRemind")}
              name="newPassword"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              require={true}
            />

            <InputComponent
              type="password"
              label={t("newPassword")}
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, confirmPassword: e.target.value })
              }
              require={true}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
