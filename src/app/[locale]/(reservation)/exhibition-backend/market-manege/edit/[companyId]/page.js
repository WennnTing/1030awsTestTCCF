// Market 參展資訊 ( 公司資訊頁面 )
"use client";
import React, { useState, useEffect } from "react";
import styles from "./edit.module.scss";
import pageStyles from '../../../exhibition-backendPages.module.scss';
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

// options
import {
  PAYMENT_METHODS,
  NATURE_OF_BUSINESS,
  ZONE,
  PARTICIPANT_TARGET
} from '@/utils/options';

// api
import {
  API_GetCompanyDetail,
  API_UpdateCompany,
  API_AddCompanyLogo,
  API_DeleteCompanyLogo,
  API_UploadCompanyPrintLogo,
  API_DeleteCompanyPrintLogo,
  API_UploadCompanyPrintPoster,
  API_DeleteCompanyPrintPoster,
  API_GetMembersByCompanyId,
  API_RemoveCompanyMember,
  API_DeleteExhibitPass,
  API_AddExhibitPass,
  API_SendActivationMailForCompanyByAdmin,
  API_GetAllCountries
} from "@/api/api";

// icon
import { FaRegSave } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoPeopleSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

// components
import Button from "@/(reservation)/exhibition/components/Button/Button";
import ImageLoader from "@/components/global/image-loader";
import InputComponent from "@/(reservation)/exhibition/components/Input/Input";
import MultipleSelect from "@/(reservation)/exhibition/exhibitioninfo/components/MultipleSelect";
import NormalSelect from "@/(reservation)/exhibition/exhibitioninfo/components/NormalSelect";
import Dialog from "@/(reservation)/exhibition/components/Dialog/Dialog";
import Loading from "@/(reservation)/exhibition/components/Loading/Loading";

const EditCompanyPages = () => {
  const Swal = require("sweetalert2");
  const [companyLogoForPrinting, setCompanyLogoForPrinting] = useState(""); // 印刷用公司logo
  const [posterForPrinting, setPosterForPrinting] = useState("");   // 印刷用參展作品海報或直式視覺
  const [inviteEmail, setInviteEmail] = useState("");               // 邀請信箱
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);  // 邀請Dialog是否打開
  const [selectedCompanyId, setSelectedCompanyId] = useState("");   // 選擇的公司ID
  const [loading, setLoading] = useState(false);                    // 是否正在加載
  const [memberPassChanges, setMemberPassChanges] = useState({});   // 會員展證變更
  const [idToEmailMap, setIdToEmailMap] = useState({});             // id 與 email 的對應
  const [countryList, setCountryList] = useState([]);               // 國家列表
  const t = useTranslations("ExhibitionInfo");
  const btn = useTranslations("SwalButton");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const router = useRouter();

  // error 紅框
  const [showError, setShowError] = useState({
    companyNameEn: false,
    companyProfileEn: false,
    contactPersonNameEn: false,
    contactPersonEmail: false,
    industry: false,
    registrationCountryId: false,
  });

  const [company, setCompany] = useState(null);
  const companyId = pathname.split("/").pop();

  // 字數計算
  const [charCount, setCharCount] = useState({
    companyNameEn: 0,
    companyNameZh: 0,
  });

  const maxCompanyNameEnLength = 34;
  const maxCompanyNameZhLength = 40;

  // 計算字數：區分全形、半形
  const calculateCharacterLength = (str) => {
    let length = 0;
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if (charCode > 255) {
        length += 2; // 全形字元計算兩個
      } else {
        length += 1; // 半形字元計算一個
      }
    }
    return length;
  };

  // 取得國家列表
  const fetchCountryList = async () => {
    try {
      const response = await API_GetAllCountries();
      if (response && response.data) {
        const formattedCountries = response.data.map(country => ({
          label: `${country.countryNameEn}｜${country.countryNameZh}`,
          value: country.countryId,
        }));
        setCountryList(formattedCountries);
      }
    } catch (error) {
      console.error("Error fetching country list:", error);
    }
  }

  useEffect(() => {
    if (company) {
      setCharCount({
        companyNameEn: calculateCharacterLength(company.companyNameEn || ""),
        companyNameZh: calculateCharacterLength(company.companyNameZh || ""),
      });
    }
  }, [company]);

  const fetchCompanyDetails = async () => {
    try {
      const response = await API_GetCompanyDetail(companyId);
      if (response && response.data) {
        // 取得member
        const memberDataResponse = await API_GetMembersByCompanyId(
          response.data.companyId
        );

        // member 與 company 資料合併
        const combinedData = {
          ...response.data,
          members: memberDataResponse.data || [],
        };

        setCompany(combinedData);

        // 建立 memberId 和 email 的對照表
        const emailMap = {};
        memberDataResponse.data.forEach((member) => {
          emailMap[member.memberId] = member.email;
        });
        setIdToEmailMap(emailMap); // 儲存對照表到狀態
      }
    } catch (error) {
      console.error("Error fetching company details or members:", error);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
    fetchCountryList();
  }, [companyId]);

  // 前往作品
  const goProject = (companyId) => {
    router.push(
      `/${locale}/exhibition-backend/market-manege/portfolio/${companyId}`
    );
  };

  // 更新 input 的值
  const handleInputChange = (name, eventOrValue) => {
    let value;

    if (Array.isArray(eventOrValue)) {
      value = eventOrValue;
    } else if (eventOrValue.target) {
      value = eventOrValue.target.value;
    } else {
      value = eventOrValue;
    }

    // 處理字數限制
    if (name === "companyNameEn") {
      const charLength = calculateCharacterLength(value);
      setCharCount((prev) => ({
        ...prev,
        companyNameEn: charLength,
      }));
    } else if (name === "companyNameZh") {
      const charLength = calculateCharacterLength(value);
      setCharCount((prev) => ({
        ...prev,
        companyNameZh: charLength,
      }));
    }

    // 處理 companyLogoForPrinting 和 posterForPrinting
    if (name === "companyLogoForPrinting") {
      setCompanyLogoForPrinting(value);
      return; // 返回，避免影響原有的邏輯
    }

    if (name === "posterForPrinting") {
      setPosterForPrinting(value);
      return; // 返回，避免影響原有的邏輯
    }

    // 只允許數字和 + - 符號的正則表達式
    if (name === "companyPhone" || name === "contactPersonPhone") {
      const phoneRegex = /^[\d+\-\s#]*$/; // 允許數字、+、-、# 和空格
      if (!phoneRegex.test(value)) {
        return; // 如果輸入不符合規則，則不進行更新
      }
    }

    // 英文正規表達式，允許逗號和空格
    const regex = /^[a-zA-Z, ]*$/;

    // 如果是 contactPersonNameEn，則檢查是否符合正規表達式
    if (name === "contactPersonNameEn") {
      if (regex.test(value)) {
        const parts = value.split(",");

        if (parts.length > 0) {
          // 處理逗號前的部分：首字母大寫，其他保持原樣
          parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        }

        if (parts.length > 1) {
          // 處理逗號後的部分：所有字母大寫
          parts[1] = parts[1].toUpperCase();
        }

        value = parts.join(",");
      } else {
        return;
      }
    }

    // 如果是 taxId 且值為空字串，設為 null
    if (name === "taxId" && value === "") {
      value = null;
    }

    // 如果是 marketRef，當值為空字串時設為 null，保留其他值原本的型別
    if (name === "marketRef") {
      value = value === "" ? null : value; // 空值處理為 null，其他值保持原樣
    }


    // 更新本地的 company 狀態
    setCompany((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = (company) => {
    const requiredFields = [
      { field: "registrationCountryId", label: t("labelTitle.label_1") },
      { field: "participationGoals", label: t("labelTitle.label_2") },
      { field: "companyCategory", label: t("labelTitle.label_6") },
      { field: "companyNameEn", label: "Company Name" },
    ];

    let isValid = true;
    const newErrors = { ...showError };

    requiredFields.forEach(({ field, label }) => {
      const value = company[field];

      if (value === undefined || value === null || value === "") {
        newErrors[field] = true;
        isValid = false;
        Swal.fire({
          icon: "error",
          title: t("swalError.title"),
          text: `${label} ${t("swalError.label_1")}`,
          showConfirmButton: true,
        });
      } else if (
        field === "participationGoals" &&
        Array.isArray(value) &&
        value.length === 0
      ) {
        newErrors[field] = true;
        isValid = false;
        Swal.fire({
          icon: "error",
          title: t("swalError.title"),
          text: `${label} ${t("swalError.label_1")}`,
          showConfirmButton: true,
        });
      } else {
        newErrors[field] = false; // 清除錯誤狀態
      }
    });

    setShowError(newErrors); // 更新錯誤狀態

    return isValid;
  };

  // 刪除成員
  const deleteMember = async (companyId, memberId) => {
    Swal.fire({
      title: "確定要刪除這位成員嗎？",
      text: "刪除後將無法恢復！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f8fd0",
      cancelButtonColor: "#D2D2D2",
      confirmButtonText: "確定",
      cancelButtonText: "取消",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await API_RemoveCompanyMember(companyId, memberId);
          Swal.fire({
            title: "刪除成功",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            fetchCompanyDetails();
          });
        } catch (error) {
          console.error("刪除失敗:", error);
          Swal.fire("刪除失敗", "無法刪除成員，請稍後再試。", "error");
        }
      }
    });
  };

  // 儲存與更新公司資訊 API_UpdateCompany
  // 更新完畢後，再打 API_AddCompanyLogo 更新公司LOGO
  // 全部完成後，才跳success通知
  const handleSave = async () => {
    try {
      setLoading(true);
      // 直接使用 `company` 狀態
      const selectedCompany = company;

      if (!selectedCompany) {
        console.error("Company not found");
        setLoading(false);
        return;
      }

      // 字數限制檢查
      if (
        selectedCompany.companyProfileZh &&
        selectedCompany.companyProfileZh.length > 165
      ) {
        Swal.fire({
          icon: "error",
          text:
            locale === "zh"
              ? "公司介紹不得超過165字"
              : "Company Profile (Chinese) cannot exceed 165 characters",
          showConfirmButton: true,
        }).then(() => {
          setLoading(false);
        });
        return;
      }

      if (charCount.companyNameEn > maxCompanyNameEnLength) {
        Swal.fire({
          icon: "error",
          text:
            locale === "zh"
              ? "Company Name 超過字數限制"
              : "Company Name exceeds the character limit",
          showConfirmButton: true,
        });
        setLoading(false);
        return;
      }

      if (charCount.companyNameZh > maxCompanyNameZhLength) {
        Swal.fire({
          icon: "error",
          text:
            locale === "zh"
              ? "公司名稱超過字數限制"
              : "Company Name exceeds the character limit",
          showConfirmButton: true,
        });
        setLoading(false);
        return;
      }

      if (!validateFields(selectedCompany)) {
        setLoading(false);
        return;
      }

      // 更新公司資訊
      const response = await API_UpdateCompany(
        JSON.stringify(selectedCompany),
        selectedCompany.companyId
      );
      if (
        response &&
        response.message &&
        response.message.includes("更新成功!")
      ) {
        let printLogoSuccess = true;
        let printPosterSuccess = true;

        if (selectedCompany.logo) {
          await API_DeleteCompanyLogo(selectedCompany.companyId);
          for (const logo of selectedCompany.logo) {
            const logoData = {
              ImageBase64: logo,
            };
            await API_AddCompanyLogo(
              JSON.stringify(logoData),
              selectedCompany.companyId
            );
          }
        }

        // 上傳 companyLogoForPrinting
        if (companyLogoForPrinting) {
          await API_DeleteCompanyPrintLogo(selectedCompany.companyId);
          try {
            for (const printinglogo of companyLogoForPrinting) {
              const printlogo = {
                ImageBase64: printinglogo,
              };
              const res = await API_UploadCompanyPrintLogo(
                JSON.stringify(printlogo),
                selectedCompany.companyId
              );
              if (!res.message.includes("Image uploaded successfully.")) {
                printLogoSuccess = false;
              }
            }
          } catch (error) {
            printLogoSuccess = false;
            console.error("Error uploading logo:", error);
          }
        }

        // 上傳 posterForPrinting
        if (posterForPrinting) {
          await API_DeleteCompanyPrintPoster(selectedCompany.companyId);
          try {
            for (const posterItem of posterForPrinting) {
              const poster = {
                ImageBase64: posterItem,
              };
              const res = await API_UploadCompanyPrintPoster(
                JSON.stringify(poster),
                selectedCompany.companyId
              );
              if (!res.message.includes("Image uploaded successfully.")) {
                printPosterSuccess = false;
              }
            }
          } catch (error) {
            printPosterSuccess = false;
            console.error("Error uploading poster:", error);
          }
        }

        // 處理companyLogoForPrinting / posterForPrinting 上傳失敗的結果
        if (!printLogoSuccess) {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: "Company Logo for Printing upload failed",
            showConfirmButton: true,
          }).then(() => {
            setLoading(false);
          });
          return;
        }

        if (!printPosterSuccess) {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: "Exhibited Work Poster or Vertical Key Art for Printing upload failed",
            showConfirmButton: true,
          }).then(() => {
            setLoading(false);
          });
          return;
        }

        // 如果所有上傳都成功，顯示成功提示
        if (printLogoSuccess && printPosterSuccess) {
          Swal.fire({
            icon: "success",
            title: locale === "zh" ? "儲存成功" : "Success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            setLoading(false);
          });
        }
      } else if (response.message.includes("該統一編號已經被使用。")) {
        Swal.fire({
          icon: "error",
          text: "該統一編號已經被使用",
          showConfirmButton: true,
        }).then(() => {
          setCompany((prevCompany) => ({
            ...prevCompany,
            taxId: null,
          }));
          setLoading(false);
        });
      } else if (response.message.includes("此公司暫無攤位資料，如需添加請聯繫系統人員。")) {

      } else {
        console.error("Failed to update company information");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating company information:", error);
      setLoading(false);
    }
  };

  // 打開邀請成員的dialog
  // 設定當前選擇的公司 ID
  const dialogOpen = (companyId) => {
    setSelectedCompanyId(companyId);
    setInviteDialogOpen(true);
  };

  // 關閉邀請成員的dialog
  const dialogClose = () => {
    setInviteDialogOpen(false);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // 邀請成員
  const inviteMember = async () => {
    // 信箱不得為空
    if (!inviteEmail.trim()) {
      Swal.fire({
        icon: "warning",
        title: locale === "zh" ? "請輸入信箱" : "Please enter an email address",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    if (!emailRegex.test(inviteEmail)) {
      Swal.fire({
        icon: "warning",
        title: locale === "zh" ? "請輸入正確的信箱格式，，且不得包含空格" : "Please enter a valid email address",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setLoading(true);
    const data = {
      email: inviteEmail,
    };

    const res = await API_SendActivationMailForCompanyByAdmin(
      JSON.stringify(data),
      selectedCompanyId
    );
    if (res && res.message && res.message.includes("已發送開通信件!")) {
      dialogClose();
      Swal.fire({
        icon: "success",
        title: locale === "zh" ? "寄送成功" : "Success",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        setInviteEmail("");
        setLoading(false);
      });
    } else if (res && res.message && res.message.includes("Email 已經存在")) {
      Swal.fire({
        icon: "error",
        title:
          locale === "zh" ? "Email 已經存在" : "This email is already exists",
        showConfirmButton: true,
      }).then(() => {
        setLoading(false);
      });
    } else {
      // console.log(res)
    }
  };

  // 展證 select 狀態
  const handleSelectChange = (memberId, hasExhibitPass) => {
    setMemberPassChanges((prevChanges) => ({
      ...prevChanges,
      [memberId]: hasExhibitPass, // 更新對應 memberId 的展證狀態
    }));
  };

  // 儲存展證變更
  const saveExhibitPassChanges = async () => {
    try {
      const memberPassChangesArray = Object.entries(memberPassChanges); // 轉換為可迭代的鍵值對陣列
      const failedAdditions = []; // 用於儲存新增失敗的會員
      const failedDeletions = []; // 用於儲存刪除失敗的會員

      console.log("Saving exhibit pass changes:", memberPassChanges);

      for (const [memberId, hasExhibitPass] of memberPassChangesArray) {
        try {
          if (hasExhibitPass === "true") {
            const data = {
              memberId: memberId,
            };
            const response = await API_AddExhibitPass(JSON.stringify(data));
            if (response.message.includes("新增失敗")) {
              failedAdditions.push(memberId); // 新增失敗，將 memberId 加入失敗陣列
            }
          } else {
            // 調用 API_DeleteExhibitPass，傳遞 memberId
            const response = await API_DeleteExhibitPass(memberId);
            if (response.message.includes("無法刪除")) {
              failedDeletions.push(memberId); // 刪除失敗，將 memberId 加入失敗陣列
            }
          }
        } catch (apiError) {
          console.error(`Error processing memberId: ${memberId}`, apiError);
        }
      }

      // 根據失敗的情況顯示不同的提示
      if (failedAdditions.length > 0 || failedDeletions.length > 0) {
        let failureMessage = "";

        // 使用 idToEmailMap 將 memberId 轉換為 email
        const failedAdditionEmails = failedAdditions.map(id => idToEmailMap[id] || id);
        const failedDeletionEmails = failedDeletions.map(id => idToEmailMap[id] || id);

        if (failedAdditionEmails.length > 0) {
          failureMessage +=
            locale === "zh"
              ? `新增展證失敗的會員:\n${failedAdditionEmails.join("\n")}`
              : `Failed to add exhibit pass for members: ${failedAdditionEmails.join(", ")}. Please contact system administrator.`;
        }
        if (failedDeletionEmails.length > 0) {
          failureMessage +=
            (failureMessage ? "\n" : "") +
            (locale === "zh"
              ? `刪除展證失敗的會員:\n${failedDeletionEmails.join("\n")} `
              : `Failed to delete exhibit pass for members: ${failedDeletionEmails.join(", ")}. Please contact system administrator.`);
        }

        // 顯示失敗的提示
        Swal.fire({
          icon: "error",
          title: locale === "zh" ? "部分操作失敗，請洽系統人員" : "Some operations failed",
          text: failureMessage,
          showConfirmButton: true,
        });
      } else {
        // 處理所有成功後的邏輯，例如顯示提示
        Swal.fire({
          icon: "success",
          title: locale === "zh" ? "展證修改成功" : "Exhibit pass changes saved!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error saving exhibit pass changes:", error);
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
  };

  const uniqueMembers = company?.members?.length
    ? company.members.filter(
      (member, index, self) =>
        index === self.findIndex((m) => m.memberId === member.memberId)
    )
    : [];

  if (!company) {
    return <p>Loading...</p>;
  }

  return (
    <div className={pageStyles.exhibitionBackendPage}>
      {loading && <Loading />}
      <div className={pageStyles.exhibitionBackendPage__container}>
        <div className={pageStyles.exhibitionBackendPage__contentWrapper}>
          <div className={pageStyles.exhibitionBackendPage__mainWrapper}>
            <div style={{ width: "94%" }}>
              <div key={company.companyId}>
                <div className={styles.architecture}>
                  <div className={styles.architecture__header}>
                    <h3>{t("title")}</h3>
                    <Button
                      text={locale === "zh" ? "邀請成員" : "Invite"}
                      icon={<IoPeopleSharp />}
                      onClick={() => dialogOpen(company.companyId)}
                    />
                  </div>

                  <div className={styles.architecture__inputBlock}>
                    {/* 展位號碼 */}
                    <InputComponent
                      type="text"
                      label={t("infobox.booth")}
                      name="marketRef"
                      value={company?.marketRef ?? ""}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 展證張數 */}
                    <InputComponent
                      type="text"
                      label={t("infobox.BadgeQuantity")}
                      name="passCount"
                      value={company?.passCount ?? ""}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* Company Name */}
                    <div>
                      <InputComponent
                        type="text"
                        label={t("infobox.EnglishCompanyName")}
                        name="companyNameEn"
                        value={company?.companyNameEn}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        require={true}
                        showError={showError.companyNameEn}
                      />
                      <span className="exhibitionpage__characterLength">
                        Company Name規格： {charCount.companyNameEn}/
                        {maxCompanyNameEnLength}，超過此數字請編輯至符合規範
                      </span>
                    </div>

                    <div>
                      {/* 公司名稱 */}
                      <InputComponent
                        type="text"
                        label={t("infobox.ChineseCompanyName")}
                        name="companyNameZh"
                        value={company?.companyNameZh}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                      />
                      <span className="exhibitionpage__characterLength">
                        公司名稱規格：{charCount.companyNameZh}/
                        {maxCompanyNameZhLength}，超過此數字請編輯至符合規範
                      </span>
                    </div>
                  </div>

                  <div className={styles.architecture__structure}>
                    <div className={styles.architecture__structureheader}>
                      <span>{t("member")}</span>
                      <span>{t("badges")}</span>
                    </div>

                    <div>
                      {uniqueMembers.map((member, index) => (
                        <div
                          className={styles.architecture__accordionContainer}
                          key={member.memberId}
                          style={{
                            backgroundColor:
                              company.ownerMemberId === member.memberId
                                ? "#DEE1E6"
                                : "#F3F4F6",
                          }}
                        >
                          <div className={styles.architecture__accordionContent}>
                            <div className={styles.architecture__accordionImg}>
                              <ImageLoader
                                src={"/images/exhibition/userPhoto.jpg"}
                                sizes={"100%"}
                                style={{ width: "auto", height: "100%" }}
                                alt={"member"}
                              />
                            </div>

                            <div className={styles.architecture__accordionInfo}>
                              <span>{member.email}</span>
                            </div>
                          </div>

                          <div
                            className={styles.architecture__selectBlock}
                            style={{
                              paddingRight: index === 0 ? "44px" : "0px",
                            }}
                          >
                            <select
                              name="hasExhibitPass"
                              value={
                                memberPassChanges[member.memberId] !== undefined
                                  ? memberPassChanges[member.memberId]
                                  : String(member.hasExhibitPass)
                              }
                              onChange={(e) =>
                                handleSelectChange(
                                  member.memberId,
                                  e.target.value
                                )
                              }
                            >
                              <option value="true">{t("yes")}</option>
                              <option value="false">{t("no")}</option>
                            </select>

                            {company.ownerMemberId !== member.memberId && (
                              <FaRegTrashAlt
                                className={styles.architecture__trashIcon}
                                onClick={() =>
                                  deleteMember(
                                    company.companyId,
                                    member.memberId
                                  )
                                }
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>


                  <div className={styles.architecture__passBtn}>
                    <Button
                      text={"確認修改展證"}
                      icon={<FaRegSave />}
                      onClick={saveExhibitPassChanges}
                    />
                  </div>

                  <div className={styles.architecture__companyinfo}>
                    {/* <h3>{t("marketInfo")}</h3> */}
                    <div className={styles.architecture__inputBlock}>
                      <NormalSelect
                        label="Nature of Business｜公司行業別"
                        showError={showError.industry}
                        options={NATURE_OF_BUSINESS}
                        require={true}
                        name="industry"
                        value={company?.companyCategory}
                        defaultText={
                          locale === "zh"
                            ? "請選擇公司行業別"
                            : "Please select the nature of business"
                        }
                        onChange={(e) =>
                          handleInputChange("companyCategory", e.target.value)
                        }
                      />

                      <NormalSelect
                        label="Zone｜市場展五大區"
                        options={ZONE}
                        require={true}
                        name="exhibitionZone"
                        value={company?.exhibitionZone}
                        defaultText={"請選擇市場展五大區"}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                      />

                      <NormalSelect
                        label="Country｜國別"
                        showError={showError.registrationCountryId}
                        options={countryList}
                        require={true}
                        disabled={false}
                        name="registrationCountryId"
                        value={company?.registrationCountryId}
                        defaultText={"請選擇國別"}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                      />

                      <MultipleSelect
                        label="Participation Goal｜參展目標"
                        showError={showError.participationGoals}
                        options={PARTICIPANT_TARGET}
                        name="participationGoals"
                        maxSelection={3}
                        defaultText="請選擇參展目標"
                        value={company?.participationGoals || []}
                        onChange={(value) =>
                          handleInputChange("participationGoals", value)
                        }
                        message={
                          locale === "zh"
                            ? "複選，至多三項"
                            : "Multiple choice, up to three options."
                        }
                        require={true}
                      />

                      <NormalSelect
                        label="付款方式"
                        options={PAYMENT_METHODS}
                        name="paymentMethods"
                        value={company?.paymentMethods}
                        defaultText={
                          locale === "zh"
                            ? "請選擇付款方式"
                            : "Please select the nature of business"
                        }
                        onChange={(e) =>
                          handleInputChange("paymentMethods", e.target.value)
                        }
                      />

                      <InputComponent
                        type="number"
                        label={"統一編號"}
                        name="taxId"
                        value={company.taxId}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        placeholder={"請輸入統一編號"}
                      />

                      <InputComponent
                        type="text"
                        label={"發票抬頭"}
                        name="invoiceHeader"
                        value={company.invoiceHeader}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        placeholder={"請輸入發票抬頭"}
                      />

                      <InputComponent
                        type="text"
                        label={"發票備註"}
                        name="invoiceNotes"
                        value={company.invoiceNotes}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        placeholder={"請輸入發票備註"}
                      />

                      <InputComponent
                        type="text"
                        label={"Company Website｜公司網站"}
                        name="websiteUrl"
                        value={company?.websiteUrl}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        placeholder={"請輸入公司網站"}
                      />

                      <InputComponent
                        type="text"
                        label={"NetWorking Event"}
                        name="networkingEvent"
                        value={company?.networkingEvent}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        placeholder={"請輸入NetWorking Event"}
                      />

                      <InputComponent
                        type="text"
                        label={"MainStageTime｜主舞台時段"}
                        name="mainStageTime"
                        value={company?.mainStageTime}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        placeholder={"請輸入主舞台時段"}
                      />

                      <InputComponent
                        type="text"
                        label={"SalonStageTime｜沙龍舞台時段"}
                        name="salonStageTime"
                        value={company?.salonStageTime}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        placeholder={"請輸入主舞台時段"}
                      />
                    </div>
                  </div>

                  <div className={styles.architecture__inputBlock}>
                    <InputComponent
                      type="textarea"
                      label="Company Profile"
                      name="companyProfileEn"
                      value={company.companyProfileEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      placeholder={"Company Profile"}
                      message={
                        "Up to 550 characters, including punctuation and spaces. If the character limit is exceeded, the text will be edited as necessary without notification.<br/>If the profile mentions any works, please use quotation marks, and capitalize all first letters in the title except propositions such as the, for, by, at, etc., unless there is a specific purpose.<br/>Example:“Spider-Man: Across the Spider-Verse, Anatomy of a Fall”"
                      }
                      maxLength={550}
                      companyProfile={true}
                      showError={showError.companyProfileEn}
                    />

                    <InputComponent
                      type="textarea"
                      label="公司簡介"
                      name="companyProfileZh"
                      value={company.companyProfileZh}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      placeholder={"請輸入公司介紹"}
                      message={
                        "165 個字為限，含標點符號及空格，若超過字數限制，將視情況編輯，恕不另行通知；若簡介內提到作品名稱，請使用書名號《》。"
                      }
                      maxLength={165}
                    />
                  </div>

                  <div className={styles.architecture__inputBlock}>
                    {/* // 1. 印刷用公司logo */}
                    <InputComponent
                      type="file"
                      label={
                        locale === "zh"
                          ? "印刷用公司logo"
                          : "Company Logo for Printing"
                      }
                      name="companyLogoForPrinting"
                      message={
                        locale === "zh"
                          ? "上傳檔案格式須為 AI 檔（全彩，底色為白色）"
                          : "The uploaded file must be in AI format (full color, transparent background"
                      }
                      allowedExtensions={["ai"]}
                      value={companyLogoForPrinting}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* // 2. 印刷用參展作品海報或直式視覺 */}
                    <InputComponent
                      type="file"
                      label={
                        locale === "zh"
                          ? "印刷用參展作品海報或直式視覺"
                          : "Exhibited Work Poster or Vertical Key Art for Printing"
                      }
                      name="posterForPrinting"
                      message={
                        locale === "zh"
                          ? "如參展作品為一部以上，請自其中挑選一部作品，上傳該作品海報或直式視覺，以供製作市場展參展商名錄。<br/>上傳檔案規格：<br/>格式：TIFF、JPG、PNG<br/>尺寸： 25mmx35mm （295Ｘ 413像素）<br/>解析度：300 dpi<br/>大小：2MB 以下"
                          : "If there is more than one exhibited work, please select one of the works and upload its poster or vertical key art for the TCCF MARKETarket catalog.<br/>File requirements：<br/>Format: TIFF, JPG, PNG<br/>Image Size: 25mm x 35mm (295Ｘ 413pixel)<br/>Resolution: 300 dpi<br/>Size: Under 2MB"
                      }
                      allowedExtensions={["tiff", "jpg", "png"]}
                      value={posterForPrinting}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    <InputComponent
                      type="image"
                      label={"Company Logo ｜ 公司Logo"}
                      name="logo"
                      value={company.logoUrl}
                      placeholder={"請上傳公司Logo"}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      message={
                        locale === "zh"
                          ? "上傳檔案格式須為 PNG/ JPG，解析度為300dpi ，建議為透明背景。"
                          : "The uploaded file must be in PNG/JPG format with a resolution of 300 dpi, and a transparent background is recommended."
                      }
                    />

                    <InputComponent
                      type="text"
                      label={"Company Telephone Number ｜ 公司電話"}
                      name="companyPhone"
                      value={company.companyPhone}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      placeholder={"請輸入公司電話"}
                      message={
                        locale === "zh"
                          ? "填寫範例：+886-x-xxxx-xxxx ext. xxxx 或 +886-xxx-xxx-xxx"
                          : "Example: +886-x-xxxx-xxxx ext. xxxx or +886-xxx-xxx-xxx"
                      }
                    />

                    <InputComponent
                      type="text"
                      label={"Company Email｜公司信箱"}
                      name="companyEmail"
                      value={company.companyEmail}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      placeholder={"請輸入公司信箱"}
                    />

                    <InputComponent
                      type="text"
                      label="Tag｜搜尋標籤"
                      name="tags"
                      value={company.tags || ""}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      placeholder={"請輸入搜尋標籤"}
                      message={
                        locale === "zh"
                          ? "請分別輸入中文用戶和英文用戶希望查找的詞彙，詞彙之間請使用逗號分隔。"
                          : "Please enter the keywords separately for Mandarin and non-Mandarin users, and separate the keywords with commas."
                      }
                    />

                    <InputComponent
                      type="text"
                      label={"Sales Contact Name"}
                      name="contactPersonNameEn"
                      value={company.contactPersonNameEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      placeholder={"請輸入全名"}
                      message={"first name, LAST NAME"}
                      showError={showError.contactPersonNameEn}
                    />

                    <InputComponent
                      type="text"
                      label={"版權聯絡窗口姓名"}
                      name="contactPersonNameZh"
                      value={company?.contactPersonNameZh}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      placeholder={"請輸入版權聯絡窗口姓名"}
                      message={"中文：姓         名"}
                    />

                    <InputComponent
                      type="text"
                      label={"Sales Contact Position"}
                      name="contactPersonTitleEn"
                      value={company?.contactPersonTitleEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      placeholder={"請輸入職稱"}
                    />

                    <InputComponent
                      type="text"
                      label={"版權聯絡窗口職稱"}
                      name="contactPersonTitleZh"
                      value={company.contactPersonTitleZh}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      placeholder={"請輸入版權聯絡窗口職稱"}
                    />

                    <InputComponent
                      type="text"
                      label={"Sales Contact Number｜版權聯絡窗口電話"}
                      name="contactPersonPhone"
                      value={company.contactPersonPhone}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      placeholder={"請輸入版權聯絡窗口電話"}
                      message={
                        "Example: +886-x-xxxx-xxxx ext. xxxx or +886-xxx-xxx-xxx<br/>填寫範例：+886-x-xxxx-xxxx ext. xxxx 或 +886-xxx-xxx-xxx"
                      }
                    />

                    <InputComponent
                      type="text"
                      label={"Sales Contact Email｜版權聯絡窗口 Email"}
                      name="contactPersonEmail"
                      value={company.contactPersonEmail}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      placeholder={"請輸入版權聯絡窗口Email"}
                      showError={showError.contactPersonEmail}
                    />
                  </div>

                  <div className={styles.architecture__buttonWrapper}>
                    <Button
                      text={t("save")}
                      icon={<FaRegSave />}
                      onClick={() => handleSave(company.companyId)}
                    />
                    <Button
                      text={t("goExhibit")}
                      icon={<HiOutlineSquares2X2 />}
                      onClick={() => goProject(company.companyId)}
                    />
                  </div>
                </div>
              </div>

              <Dialog
                open={inviteDialogOpen}
                title={t("inviteDialog.label_1")}
                buttonText1={btn("cancel")}
                buttonText2={btn("submit")}
                onClose={dialogClose}
                onClick={inviteMember}
              >
                {loading && <Loading />}

                <InputComponent
                  type={"text"}
                  label={t("inviteDialog.label_2")}
                  name={"inviteEmail"}
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyPages;
