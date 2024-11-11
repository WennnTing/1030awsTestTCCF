"use client";
import React, { useState, useEffect } from "react";
import InputComponent from "@/(reservation)/exhibition/components/Input/Input";
import { FaEdit } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

// components
import MultipleSelect from "../../../../exhibition/exhibitioninfo/components/MultipleSelect";
import Button from "@/(reservation)/exhibition/components/Button/Button";
import TagInput from "@/(reservation)/exhibition/components/Input/TagInput";
import Dialog from "@/(reservation)/exhibition/components/Dialog/Dialog";
import { QuestionSwal } from "@/components/global/CustomSweetAlert";
import styles from '../../../exhibition-backendPages.module.scss';

import Swal from "sweetalert2";

// api
import {
  API_UpdateMemberDetails,
  API_GetMemberDetails,
  API_GetRolesByMemberId,
  API_ChangePasswordByAdmin
} from "@/api/api";

// alert 
const showAlert = (icon, title, timer = 1000) => {
  Swal.fire({
    icon,
    title,
    showConfirmButton: false,
    timer,
  });
};

// 密碼格式驗證函數
const isPasswordValid = (password) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./<>?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,16}$/;
  return passwordPattern.test(password);
};

// 驗證密碼一致性函數
const arePasswordsMatching = (newPassword, confirmPassword) => {
  return newPassword === confirmPassword;
};

const ExhibitionBackendMemberInfo = () => {
  const Swal = require("sweetalert2");
  const t = useTranslations("MemberInfo");
  const d = useTranslations("LoginDialog");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const memberId = pathname.split("/").pop();                         // 會員ID，抓取網址最後一個參數
  const [isAccountInfoOpen, setIsAccountInfoOpen] = useState(false);  //修改個人資訊
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);        //修改密碼

  // 新密碼、密碼確認
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const tags = ["MARKET"];

  const [formData, setFormData] = useState({
    chineseName: "",        // 中文姓名
    englishName: "",        // 英文姓名
    email: "",              // 電子信箱
    phone: "",              // 聯絡電話
    title: "",              // 職稱
    badgeRole: "",          // 展證身份
    systemRole: [],         // 參展身份
    exhibitionTarget: [],   // 參展目標
    badgeChineseName: "",   // 展證顯示中文姓名
    badgeEnglishName: "",   // 展證顯示英文姓名
    nickname: "",           // 暱稱
  });

  const [tempFormData, setTempFormData] = useState(formData);

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

  // 將參展目標的值轉換成對應的標籤
  const mapValuesToLabels = (values) => {
    if (!Array.isArray(values)) {
      return [];
    }

    return values.map((value) => {
      const foundTarget = target.find((option) => option.value === value);
      return foundTarget ? foundTarget.label : value;
    });
  };

  const handleChange = (name, value) => {
    console.log(name);
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

  const fetchMemberDetails = async () => {
    try {
      const res = await API_GetMemberDetails(memberId);
      if (res && res.data) {
        const normalizedDetails = normalizeMemberDetails(res.data);
        const rolesRes = await API_GetRolesByMemberId(memberId);
        const roleNamesArray = rolesRes.map((role) => role.roleName);

        // 動態決定 badgeRole 根據 systemRole 的值
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
          email: res.data.email || "",
          phone: normalizedDetails.mobilePhone,
          title: normalizedDetails.jobTitle,
          badgeRole: determineBadgeRole(roleNamesArray), // 動態決定 badgeRole
          systemRole: roleNamesArray || [],
          exhibitionTarget: normalizedDetails.participationGoals,
          badgeChineseName: normalizedDetails.passnameZh,
          badgeEnglishName: normalizedDetails.passnameEn,
          nickname: normalizedDetails.nickname,
        };

        setFormData(updatedFormData);
        setTempFormData(updatedFormData);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.error("Error fetching member details:", error);
    }
  };

  // 在 useEffect 時打 Member API
  useEffect(() => {
    fetchMemberDetails();
  }, [memberId]); // 監聽 memberId 的變化

  // 關閉修改個人資訊
  const handleCloseAccountInfo = () => {
    setIsAccountInfoOpen(false);
  };

  // 開啟修改個人資訊
  const handleOpenAccountInfo = () => {
    setIsAccountInfoOpen(true);
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
      requiredFields.push({ name: "englishName", label: "英文姓名" });
    } else {
      // 英文網頁需要檢查的必填欄位
      requiredFields.push({
        name: "englishName",
        label: "Participant’s English Name",
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

    try {
      const res = await API_UpdateMemberDetails(
        JSON.stringify(updatedDetails),
        memberId
      );
      if (res && res.message && res.message.includes("更新成功!")) {
        setFormData(tempFormData);
        Swal.fire({
          icon: "success",
          title: locale === "zh" ? "修改成功" : "Update successful",
          showConfirmButton: false,
          timer: 1000,
        });
        fetchMemberDetails();
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
        title: locale === "zh" ? "修改失敗" : "Update failed",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  // 儲存密碼
  const handleSavePassword = async () => {
    // 驗證新密碼格式
    if (!isPasswordValid(passwords.newPassword)) {
      showAlert(
        "error",
        locale === "zh"
          ? "密碼必須是8到16個字元，包含大小寫字母和數字和一個特殊符號"
          : "Password: 8-16 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
      return;
    }

    // 驗證新密碼與確認密碼是否一致
    if (!arePasswordsMatching(passwords.newPassword, passwords.confirmPassword)) {
      showAlert(
        "error",
        locale === "zh" ? "輸入的密碼不一致" : "The password entered is inconsistent"
      );
      return;
    }

    setIsPasswordOpen(false);

    const result = await QuestionSwal({
      title: locale === "zh" ? "確認修改嗎?" : "Are you sure you want to submit?",
      canceltext: locale === "zh" ? "取消" : "Cancel",
      confirmtext: locale === "zh" ? "確認" : "Confirm",
    });

    if (!result.isConfirmed) return;

    try {
      const passwordData = { newPassword: passwords.newPassword };
      const response = await API_ChangePasswordByAdmin(
        JSON.stringify(passwordData),
        memberId
      );

      if (response.message && response.message.includes("更新成功")) {
        showAlert(
          "success",
          locale === "zh" ? "修改成功" : "Password updated successfully"
        );

        setPasswords({
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        showAlert(
          "error",
          locale === "zh" ? "無法更新密碼" : "Password update failed",
          1500
        );
      }
    } catch (error) {
      console.error("Error updating password:", error);
      Swal.fire({
        icon: "error",
        title: locale === "zh" ? "修改失敗" : "Update failed",
        text: locale === "zh" ? "請稍後再試。" : "Please try again later.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className={styles.exhibitionBackendPage}>
      <div
        className={styles.exhibitionBackendPage__container}
        style={{ padding: "50px 0 150px 0" }}
      >
        <div className={styles.exhibitionBackendPage__contentWrapper}>
          <h1 className={styles.exhibitionBackendPage__contentWrapper__innertitle}>
            {t("title")}
          </h1>

          <div className={styles.exhibitionBackendPage__mainWrapper}>
            <div className={styles.exhibitionBackendPage__leftBlock}>
              <div className={styles.exhibitionBackendPage__memberPage}>
                <div className={styles.exhibitionBackendPage__titleBlock}>
                  <h2>{t("sectitle")}</h2>
                  <Button
                    text={t("editButton")}
                    icon={<FaEdit />}
                    onClick={handleOpenAccountInfo}
                  />
                </div>
                <div className={styles.exhibitionBackendPage__infoBlock}>
                  <div className={styles.exhibitionBackendPage__inputBlock}>

                    <InputComponent
                      type="text"
                      label={t("englishName")}
                      name="englishName"
                      value={formData.englishName}
                      disabled={true}
                      require={true}
                      message={"first name, LAST NAME"}
                    />

                    {locale === "zh" && (
                      <>
                        <InputComponent
                          type="text"
                          label={"中文姓名"}
                          name="chineseName"
                          value={formData.chineseName}
                          disabled={true}
                          message={"姓＿名＿"}
                        />
                      </>
                    )}

                    <InputComponent
                      type="text"
                      name="email"
                      label={t("email")}
                      value={formData.email}
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
              {locale === "zh" && (
                <InputComponent
                  type="text"
                  label={t("exhibitionName")}
                  name="chineseName"
                  value={tempFormData.chineseName}
                  onChange={(e) => handleChange("chineseName", e.target.value)}
                  message={"姓＿名＿"}
                  placeholder={t("placeholder.label_1")}
                />
              )}

              <InputComponent
                type="text"
                label={t("englishName")}
                name="englishName"
                value={tempFormData.englishName}
                onChange={(e) => handleChange("englishName", e.target.value)}
                message={" first name, LAST NAME"}
                require={true}
                placeholder={t("placeholder.label_2")}
                showTooltipOnFocus={true}
              />

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

export default ExhibitionBackendMemberInfo;
