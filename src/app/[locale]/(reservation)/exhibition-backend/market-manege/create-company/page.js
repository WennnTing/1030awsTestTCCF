// Market 參展資訊 ( 公司資訊頁面 )
"use client";
import React, { useState, useEffect } from "react";
import styles from "../edit/[companyId]/edit.module.scss";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import ExhibitionPage from '../../exhibition-backendPages.module.scss';
import customStyles from "@/(reservation)/exhibition-backend/_components/ReactSelect/reactSelectStyles";

// options
import {
  NATURE_OF_BUSINESS,
  ZONE,
  PARTICIPANT_TARGET
} from '@/utils/options';

// api
import {
  API_CreateCompany,
  API_AddCompanyLogo,
  API_DeleteCompanyLogo,
  API_UploadCompanyPrintLogo,
  API_DeleteCompanyPrintLogo,
  API_UploadCompanyPrintPoster,
  API_DeleteCompanyPrintPoster,
  API_GetAllMembers,
  API_GetAllCountries
} from "@/api/api";

// icon
import { FaRegSave } from "react-icons/fa";

// components
import Button from "@/(reservation)/exhibition/components/Button/Button";
import InputComponent from "@/(reservation)/exhibition/components/Input/Input";
import MultipleSelect from "@/(reservation)/exhibition/exhibitioninfo/components/MultipleSelect";
import NormalSelect from "@/(reservation)/exhibition/exhibitioninfo/components/NormalSelect";
import Loading from "@/(reservation)/exhibition/components/Loading/Loading";
import Select from "react-select";

// alert
const showWarningAlert = (message) => {
  return Swal.fire({
    icon: "warning",
    text: message,
    showConfirmButton: true,
  });
};

const CreateCompanyPages = () => {
  const Swal = require("sweetalert2");
  const [companyLogoForPrinting, setCompanyLogoForPrinting] = useState(""); // 印刷用公司logo
  const [posterForPrinting, setPosterForPrinting] = useState(""); // 印刷用參展作品海報或直式視覺
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 儲存時加載
  const [formData, setFormData] = useState({
    companyNameZh: "",                                  // 公司名稱(中文)
    companyNameEn: "",                                  // Company Name
    companyCategory: 0,                                 // 公司行業別
    exhibitionRole: 0,                                  // 參展角色     (不在畫面上)
    participationGoals: [0],                            // 參展目標
    companyProfileZh: "",                               // 公司簡介(中文)
    companyProfileEn: "",                               // Company Profile
    websiteUrl: "",                                     // 公司網址
    companyPhone: "",                                   // 公司電話
    companyEmail: "",                                   // 公司Email
    exhibitionZone: 0,                                  // 市場展五大區
    registrationCountryId: 0,                           // 國別
    contactPersonNameZh: "",                            // 版權聯絡窗口姓名
    contactPersonNameEn: "",                            // Sales Contact Name
    contactPersonTitleZh: "",                           // 版權聯絡窗口職稱
    contactPersonTitleEn: "",                           // Sales Contact Title
    contactPersonPhone: "",                             // 版權聯絡窗口電話
    contactPersonEmail: "",                             // 版權聯絡窗口Email
    passCount: 4,                                       // 展證數量
    boothRawSpace: "10x10",                             // 攤位購買數量
    networkingEvent: "Evening Mixer",                   // ？？？？      (不在畫面上)
    mainStageTime: "MainStageTime",                     // 主舞台時段    (不在畫面上)
    salonStageTime: "SalonStageTime",                   // 沙龍舞台時段  (不在畫面上)
    taxId: null,                                        // 統一編號     (不在畫面上)
    invoiceHeader: "",                                  // 發票抬頭     (不在畫面上)
    invoiceNotes: "For the event participation",        // 發票備註     (不在畫面上)
    tags: "",                                           // 標籤
    happyHour: "Available",                             // 快樂小時     (不在畫面上)
    paymentMethods: 0,                                  // 付款方式     (不在畫面上)
    logoUrl: "",                                        // 公司logo
  });
  const [memberOptions, setMemberOptions] = useState([]);
  const [countryList, setCountryList] = useState([]);   // 國家列表
  const t = useTranslations("ExhibitionInfo");
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

  // 一進入頁面，先打 API，取得所有會員
  // 塞到 memberOptions
  useEffect(() => {
    const getAllmembers = async () => {
      try {
        const res = await API_GetAllMembers();
        if (res && res.message && res.message.includes("查詢成功!")) {
          const formattedData = res.data.map((member) => ({
            value: member.memberId,
            label: member.email,
          }));
          setMemberOptions(formattedData);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    getAllmembers();
    fetchCountryList();
  }, []);

  // 更新 input 的值
  // const handleInputChange = (name, eventOrValue) => {
  //   let value;

  //   if (Array.isArray(eventOrValue)) {
  //     value = eventOrValue;
  //   } else if (
  //     eventOrValue &&
  //     typeof eventOrValue === "object" &&
  //     eventOrValue.target
  //   ) {
  //     value = eventOrValue.target.value;
  //   } else {
  //     value = eventOrValue;
  //   }

  //   // 處理 companyLogoForPrinting 和 posterForPrinting
  //   if (name === "companyLogoForPrinting") {
  //     setCompanyLogoForPrinting(value);
  //     return; // 返回，避免影響原有的邏輯
  //   }

  //   if (name === "posterForPrinting") {
  //     setPosterForPrinting(value);
  //     return; // 返回，避免影響原有的邏輯
  //   }

  //   // 只允許數字和 + - 符號的正則表達式
  //   if (name === "companyPhone" || name === "contactPersonPhone") {
  //     const phoneRegex = /^[\d+\-\s#]*$/; // 允許數字、+、-、# 和空格
  //     if (!phoneRegex.test(value)) {
  //       return; // 如果輸入不符合規則，則不進行更新
  //     }
  //   }

  //   // 英文正規表達式，允許逗號和空格
  //   const regex = /^[a-zA-Z, ]*$/;

  //   // 如果是 contactPersonNameEn，則檢查是否符合正規表達式
  //   if (name === "contactPersonNameEn") {
  //     if (regex.test(value)) {
  //       const parts = value.split(",");

  //       if (parts.length > 0) {
  //         // 處理逗號前的部分：首字母大寫，其他保持原樣
  //         parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  //       }

  //       if (parts.length > 1) {
  //         // 處理逗號後的部分：所有字母大寫
  //         parts[1] = parts[1].toUpperCase();
  //       }

  //       value = parts.join(",");
  //     } else {
  //       return;
  //     }
  //   }

  //   // 如果是 taxId 且值為空字串，設為 null
  //   if (name === "taxId" && value === "") {
  //     value = null;
  //   }

  //   // 更新 formData
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  // 處理特定字段的更新
  const handleSpecificFieldUpdate = (name, value) => {
    if (name === "companyLogoForPrinting") {
      setCompanyLogoForPrinting(value);
      return true;
    }
    if (name === "posterForPrinting") {
      setPosterForPrinting(value);
      return true;
    }
    return false;
  };

  // 處理電話字段
  const isValidPhone = (name, value) => {
    const phoneRegex = /^[\d+\-\s#]*$/;
    if (name === "companyPhone" || name === "contactPersonPhone") {
      return phoneRegex.test(value);
    }
    return true;
  };

  // 處理英文名稱格式化
  const formatContactPersonNameEn = (name, value) => {
    const regex = /^[a-zA-Z, ]*$/;
    if (name === "contactPersonNameEn" && regex.test(value)) {
      const parts = value.split(",");
      if (parts.length > 0) {
        parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      }
      if (parts.length > 1) {
        parts[1] = parts[1].toUpperCase();
      }
      return parts.join(",");
    }
    return value;
  };

  // 處理空值為 null 的特殊字段
  const handleEmptyToNull = (name, value) => {
    if (name === "taxId" && value === "") {
      return null;
    }
    return value;
  };

  // 更新 input 的值
  const handleInputChange = (name, eventOrValue) => {
    let value = Array.isArray(eventOrValue)
      ? eventOrValue
      : eventOrValue && typeof eventOrValue === "object" && eventOrValue.target
        ? eventOrValue.target.value
        : eventOrValue;

    // 檢查並更新特定字段
    if (handleSpecificFieldUpdate(name, value)) return;

    // 驗證電話號碼
    if (!isValidPhone(name, value)) return;

    // 格式化英文名稱
    value = formatContactPersonNameEn(name, value);

    // 處理空值為 null
    value = handleEmptyToNull(name, value);

    // 更新 formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  // 檢查必填欄位有無填寫
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

    console.log(newErrors);
    setShowError(newErrors); // 更新錯誤狀態

    return isValid;
  };

  // 儲存與創建公司資訊 API_UpdateCompany
  // 創建完畢後，再打 API_AddCompanyLogo 更新公司LOGO
  // 全部完成後，才跳success通知
  // 上傳圖片的輔助函數
  const uploadImages = async (uploadFn, deleteFn, images, companyId) => {
    try {
      await deleteFn(companyId);
      for (const image of images) {
        const imageData = { ImageBase64: image };
        const res = await uploadFn(JSON.stringify(imageData), companyId);
        if (!res.message.includes("Image uploaded successfully.")) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Error uploading images:", error);
      return false;
    }
  };

  // 處理創建成功的結果
  const handleCreateSuccess = async (locale, router) => {
    await Swal.fire({
      icon: "success",
      title: locale === "zh" ? "創建成功" : "Success",
      showConfirmButton: false,
      timer: 2000,
    });
    router.push(`/${locale}/exhibition-backend/market-manege`);
  };

  const prepareCompanyData = (formData) => ({
    OwnerMemberId: formData.ownerId || null,
    CompanyNameEn: formData.companyNameEn,
    CompanyNameZh: formData.companyNameZh,
    CompanyCategory: formData.companyCategory,
    ExhibitionRole: formData.exhibitionRole,
    ParticipationGoals: formData.participationGoals,
    CompanyProfileZh: formData.companyProfileZh,
    CompanyProfileEn: formData.companyProfileEn,
    WebsiteUrl: formData.websiteUrl,
    CompanyPhone: formData.companyPhone,
    CompanyEmail: formData.companyEmail,
    ExhibitionZone: formData.exhibitionZone,
    RegistrationCountryId: formData.registrationCountryId,
    ContactPersonNameZh: formData.contactPersonNameZh,
    ContactPersonNameEn: formData.contactPersonNameEn,
    ContactPersonTitleZh: formData.contactPersonTitleZh,
    ContactPersonTitleEn: formData.contactPersonTitleEn,
    ContactPersonPhone: formData.contactPersonPhone,
    ContactPersonEmail: formData.contactPersonEmail,
    PassCount: formData.passCount,
    BoothRawSpace: formData.boothRawSpace,
    NetworkingEvent: formData.networkingEvent,
    MainStageTime: formData.mainStageTime,
    SalonStageTime: formData.salonStageTime,
    TaxId: formData.taxId,
    InvoiceHeader: formData.invoiceHeader,
    InvoiceNotes: formData.invoiceNotes,
    Tags: formData.tags,
    HappyHour: formData.happyHour,
    PaymentMethods: formData.paymentMethods,
  });

  // 主函數
  const handleSave = async () => {
    try {
      setIsLoading(true);

      if (!validateFields(formData)) {
        setIsLoading(false);
        return;
      }

      const companyData = prepareCompanyData(formData);
      const response = await API_CreateCompany(JSON.stringify(companyData));

      if (response?.message.includes("該用戶已經擁有一家公司。")) {
        await showWarningAlert(locale === "zh" ? "該用戶已經擁有一家公司。" : "The user already owns a company.");
        setIsLoading(false);
        return;
      } else if (response?.message.includes("創建成功!")) {
        const companyId = response.data.companyId;

        const printLogoSuccess = formData.logo ? await uploadImages(API_AddCompanyLogo, API_DeleteCompanyLogo, formData.logo, companyId) : true;
        const printPosterSuccess = posterForPrinting ? await uploadImages(API_UploadCompanyPrintPoster, API_DeleteCompanyPrintPoster, posterForPrinting, companyId) : true;
        const printLogoForPrintingSuccess = companyLogoForPrinting ? await uploadImages(API_UploadCompanyPrintLogo, API_DeleteCompanyPrintLogo, companyLogoForPrinting, companyId) : true;

        if (!printLogoSuccess || !printPosterSuccess || !printLogoForPrintingSuccess) {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was an issue uploading some files. Please try again.",
            showConfirmButton: true,
          });
          setIsLoading(false);
          return;
        }

        await handleCreateSuccess(locale, router);
        setIsLoading(false);
      } else {
        console.error("Failed to create company");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating company:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className={ExhibitionPage.exhibitionBackendPage}>
      {loading && <Loading />}
      <div className={ExhibitionPage.exhibitionBackendPage__container}>
        <div
          className={ExhibitionPage.exhibitionBackendPage__contentWrapper}>
          <div
            className={ExhibitionPage.exhibitionBackendPage__mainWrapper}>
            <div style={{ width: "94%" }}>
              <div>
                <div className={styles.architecture}>
                  <div className={styles.architecture__header}>
                    <h1>新增公司</h1>
                  </div>

                  <div className={styles.architecture__inputBlock}>

                    {/* 展證張數 */}
                    {/* 對應API是passcount */}
                    <InputComponent
                      type="text"
                      label={t("infobox.BadgeQuantity")}
                      name="passCount"
                      value={formData?.passCount}
                      onChange={(e) => handleInputChange("passCount", e)}
                    />

                    {/* Company Name */}
                    <InputComponent
                      type="text"
                      label={t("infobox.EnglishCompanyName")}
                      name="companyNameEn"
                      value={formData.companyNameEn}
                      onChange={(e) => handleInputChange("companyNameEn", e)}
                      require={true}
                      showError={showError.companyNameEn}
                    />

                    {/* 公司名稱 */}
                    <InputComponent
                      type="text"
                      label={t("infobox.ChineseCompanyName")}
                      name="companyNameZh"
                      value={formData.companyNameZh}
                      onChange={(e) => handleInputChange("companyNameZh", e)}
                    // disabled={true}
                    />
                  </div>

                  <div className={styles.architecture__companyinfo}>
                    {/* <h3>{t("marketInfo")}</h3> */}
                    <div className={styles.architecture__inputBlock}>
                      <div>
                        <label className={styles.architecture__ownerLabel}>
                          選擇Owner
                        </label>
                        <Select
                          value={
                            memberOptions.find(
                              (option) => option.value === formData.ownerId
                            ) || null
                          }
                          onChange={(selectedOption) =>
                            handleInputChange("ownerId", selectedOption?.value)
                          }
                          options={memberOptions}
                          placeholder={"請選擇Owner"}
                          isClearable
                          isSearchable
                          styles={customStyles}
                        />
                      </div>

                      <NormalSelect
                        label="Nature of Business｜公司行業別"
                        options={NATURE_OF_BUSINESS}
                        require={true}
                        name="industry"
                        value={formData.companyCategory}
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
                        name="exhibitArea"
                        value={formData.exhibitionZone}
                        defaultText={"請選擇市場展五大區"}
                        onChange={(e) =>
                          handleInputChange("exhibitionZone", e.target.value)
                        }
                      />

                      <NormalSelect
                        label="Country｜國別"
                        options={countryList}
                        require={true}
                        disabled={false}
                        name="registrationCountryId"
                        value={formData.registrationCountryId}
                        defaultText={"請選擇國別"}
                        onChange={(e) =>
                          handleInputChange(
                            "registrationCountryId",
                            e.target.value
                          )
                        }
                      />

                      <InputComponent
                        type="number"
                        label={"Tax ID｜統一編號"}
                        name="taxID"
                        value={formData.taxId}
                        onChange={(e) => handleInputChange("taxId", e)}
                        placeholder={"請輸入統一編號"}
                      />

                      <InputComponent
                        type="text"
                        label={"Invoice Header｜發票抬頭"}
                        name="invoiceHeader"
                        value={formData.invoiceHeader}
                        onChange={(e) => handleInputChange("invoiceHeader", e)}
                        placeholder={"請輸入發票抬頭"}
                      />

                      <MultipleSelect
                        label="Participation Goal｜參展目標"
                        options={PARTICIPANT_TARGET}
                        name="participationGoals"
                        maxSelection={3}
                        defaultText="請選擇參展目標"
                        value={formData.participationGoals || []}
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

                      <InputComponent
                        type="text"
                        label={"Company Website｜公司網站"}
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={(e) => handleInputChange("websiteUrl", e)}
                        placeholder={"請輸入公司網站"}
                      />
                    </div>
                  </div>

                  <div className={styles.architecture__inputBlock}>
                    <InputComponent
                      type="textarea"
                      label="Company Profile"
                      name="companyProfileEn"
                      value={formData.companyProfileEn}
                      onChange={(e) => handleInputChange("companyProfileEn", e)}
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
                      value={formData.companyProfileZh}
                      onChange={(e) => handleInputChange("companyProfileZh", e)}
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
                        handleInputChange("companyLogoForPrinting", e)
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
                        handleInputChange("posterForPrinting", e)
                      }
                    />

                    <InputComponent
                      type="image"
                      label={"Company Logo ｜ 公司Logo"}
                      name="logo"
                      value={formData.logoUrl}
                      placeholder={"請上傳公司Logo"}
                      onChange={(e) => handleInputChange("logoUrl", e)}
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
                      value={formData.companyPhone}
                      onChange={(e) => handleInputChange("companyPhone", e)}
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
                      value={formData.companyEmail}
                      onChange={(e) => handleInputChange("companyEmail", e)}
                      placeholder={"請輸入公司信箱"}
                    />

                    <InputComponent
                      type="text"
                      label="Tag｜搜尋標籤"
                      name="tags"
                      value={formData.tags || ""}
                      onChange={(e) => handleInputChange("tags", e)}
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
                      value={formData.contactPersonNameEn}
                      onChange={(e) =>
                        handleInputChange("contactPersonNameEn", e)
                      }
                      placeholder={"請輸入全名"}
                      message={"first name, LAST NAME"}
                      showError={showError.contactPersonNameEn}
                    />

                    <InputComponent
                      type="text"
                      label={"版權聯絡窗口姓名"}
                      name="contactPersonNameZh"
                      value={formData.contactPersonNameZh}
                      onChange={(e) =>
                        handleInputChange("contactPersonNameZh", e)
                      }
                      placeholder={"請輸入版權聯絡窗口姓名"}
                      message={"中文：姓         名"}
                    />

                    <InputComponent
                      type="text"
                      label={"Sales Contact Position"}
                      name="contactPersonTitleEn"
                      value={formData.contactPersonTitleEn}
                      onChange={(e) =>
                        handleInputChange("contactPersonTitleEn", e)
                      }
                      placeholder={"請輸入職稱"}
                    />

                    <InputComponent
                      type="text"
                      label={"版權聯絡窗口職稱"}
                      name="contactPersonTitleZh"
                      value={formData.contactPersonTitleZh}
                      onChange={(e) =>
                        handleInputChange("contactPersonTitleZh", e)
                      }
                      placeholder={"請輸入版權聯絡窗口職稱"}
                    />

                    <InputComponent
                      type="text"
                      label={"Sales Contact Number｜版權聯絡窗口電話"}
                      name="contactPersonPhone"
                      value={formData.contactPersonPhone}
                      onChange={(e) =>
                        handleInputChange("contactPersonPhone", e)
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
                      value={formData.contactPersonEmail}
                      onChange={(e) =>
                        handleInputChange("contactPersonEmail", e)
                      }
                      placeholder={"請輸入版權聯絡窗口Email"}
                      showError={showError.contactPersonEmail}
                    />
                  </div>

                  <div className={styles.architecture__buttonWrapper}>
                    <Button
                      text={t("save")}
                      icon={<FaRegSave />}
                      onClick={handleSave}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyPages;