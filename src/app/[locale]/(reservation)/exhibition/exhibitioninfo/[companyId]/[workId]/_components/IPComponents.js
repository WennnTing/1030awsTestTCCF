"use client";
import React, { useState, useEffect, use } from "react";
import styles from "./TVComponents.module.scss";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

// components
import NormalSelect from "../../../components/NormalSelect";
import InputComponent from "@/(reservation)/exhibition/components/Input/Input";
import MultipleSelect from "../../../components/MultipleSelect";

// 作品類別
const IPcontentSubtype = [
  { label: "Book｜出版", value: 0 },
  { label: "Performance Arts｜表演藝術", value: 1 },
  { label: "Game｜遊戲", value: 2 },
  { label: "Others｜其它", value: 3 },
];

// 主題/類型
const themeOptions = [
  { label: "Romance|愛情", value: 0 },
  { label: "Comedy|喜劇", value: 1 },
  { label: "Family|家庭", value: 2 },
  { label: "Fantasy|奇幻", value: 3 },
  { label: "Sci-fi|科幻", value: 4 },
  { label: "Action|動作", value: 5 },
  { label: "Crime|犯罪", value: 6 },
  { label: "Horror|恐怖", value: 7 },
  { label: "Mystery|懸疑", value: 8 },
  { label: "Thriller|驚悚", value: 9 },
  { label: "Coming of Age|青少年成長", value: 10 },
  { label: "LGBTQIA+|多元性別", value: 11 },
  { label: "Politics|政治", value: 12 },
  { label: "History|歷史", value: 13 },
  { label: "War|戰爭", value: 14 },
  { label: "Social Issue|社會議題", value: 15 },
  { label: "Workplace Drama|職人", value: 16 },
  { label: "Period Drama|時代 / 古裝劇", value: 17 },
  { label: "Music|音樂", value: 18 },
  { label: "Food|美食", value: 19 },
  { label: "Sports|運動", value: 20 },
  { label: "Travel|旅遊", value: 21 },
  { label: "Animation|動畫", value: 22 },
  { label: "Environment|環境生態", value: 23 },
  { label: "Lifestyle|生活風格", value: 24 },
  { label: "Talk Show|談話性節目", value: 25 },
  { label: "Reality Show|實境節目", value: 26 },
  { label: "Variety|綜藝節目", value: 27 },
  { label: "Others|其他", value: 28 },
];

const IPComponents = ({
  work,
  onDataChange,
  onImageDataChange,
  onValidationChange,
}) => {
  const t = useTranslations("IPplaceholder");
  const i = useTranslations("InputMessage");

  const p = useTranslations("worksPopup");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [formData, setFormData] = useState({
    contentSubtype: [], // Type | 類別
    genre: [], // Theme / genre | 主題/類型
    expectedCompletionDate: "", // Year  | 年分
    ExpectedCompletionYear: "",
    ExpectedCompletionMonth: 12, // 預設值設為12
    runningTimeMinutes: "", // Running Time(Min) ｜ 片長(分鐘)
    trailerImage: "", // Trailer / Teaser Thumbnail｜預告片／片花預覽圖
    trailerUrl: "", // Trailer / Teaser | 預告片／片花
    creatorFullNameEn: "", // Creator’s Name
    creatorFullNameZh: "", // 創作者姓名
    creatorBiographyEn: "", // Creator's Bio
    creatorBiographyZh: "", // 創作者簡介
  });

  const [imageData, setImageData] = useState({});

  // 必填欄位檢查 props
  const validateFormData = () => {
    const requiredFields = [
      { key: "titleEn", label: "Title" },
      { key: "contentSubtype", label: p("label_1") },
      { key: "genre", label: p("label_2") },
      { key: "ExpectedCompletionYear", label: p("label_11") },
      { key: "creatorFullNameEn", label: "Creator's Name" },
      { key: "creatorBiographyEn", label: "Creator's Profile" },
    ];

    const missingFields = requiredFields
      .filter(
        (field) =>
          !formData[field.key] ||
          (Array.isArray(formData[field.key]) &&
            formData[field.key].length === 0)
      )
      .map((field) => field.label);

    const isValid = missingFields.length === 0;
    onValidationChange(isValid, missingFields);

    return isValid;
  };

  useEffect(() => {
    validateFormData();
  }, [formData]);

  useEffect(() => {
    if (work) {
      const updatedWork = {
        ...work,
        genre: Array.isArray(work.genre)
          ? work.genre
              .map((themeValue) => {
                const themeOption = themeOptions.find(
                  (option) => option.value === themeValue
                );
                return themeOption !== undefined ? themeOption.value : null;
              })
              .filter((value) => value !== null && value !== undefined)
          : [],

        runningTimeMinutes: work.runningTimeMinutes
          ? parseInt(work.runningTimeMinutes, 10)
          : 0,

        ExpectedCompletionYear: work.expectedCompletionDate
          ? work.expectedCompletionDate.split("-")[0]
          : "",
        ExpectedCompletionMonth: work.expectedCompletionDate
          ? work.expectedCompletionDate.split("-")[1] || 12
          : 12,
      };
      setFormData(updatedWork);
      console.log("Updated work:", updatedWork);
    }
  }, [work]);

  useEffect(() => {
    onDataChange(formData);
    console.log(formData);
  }, [formData, onDataChange]);

  useEffect(() => {
    onImageDataChange(imageData);
  }, [imageData, onImageDataChange]);

  const handleChange = (name, value) => {
    if (Array.isArray(value)) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === "posterImages" || name === "trailerImage") {
      setImageData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === "creatorFullNameEn") {
      // 過濾非英文字符，只允許字母、逗號和空格
      value = value.replace(/[^a-zA-Z\s,]/g, "");

      // 處理每一個名字片段，首字母大寫，逗號後的字母全部轉大寫
      value = value.replace(
        /([^,]+),\s*([^,]*)/g,
        (match, beforeComma, afterComma) => {
          // 首字母大寫
          beforeComma = beforeComma.trim();
          beforeComma =
            beforeComma.charAt(0).toUpperCase() + beforeComma.slice(1);
          // 逗號後的部分全部轉大寫
          afterComma = afterComma.trim().toUpperCase();
          return `${beforeComma},${afterComma}`;
        }
      );

      // 更新表單數據
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className={styles.television}>
      <h2>IP｜IP作品</h2>
      <div className={styles.television__title}>
        <HiOutlineNewspaper className={styles.television__icon} />
        <h3>Title Overview｜作品簡介</h3>
      </div>

      <div className={styles.television__mainWrapper}>
        <div className={styles.television__gridBlock}>
          <NormalSelect
            label="Type | 類別"
            options={IPcontentSubtype}
            onChange={(e) => handleChange("contentSubtype", [e.target.value])}
            value={
              formData?.contentSubtype?.[0] !== undefined
                ? formData.contentSubtype[0]
                : ""
            }
            defaultText={t("type")}
            require={true}
          />

          <MultipleSelect
            label="Theme / Genre｜主題／類型"
            options={themeOptions}
            maxSelection={3}
            message={
              locale === "zh"
                ? "複選，至多三項。"
                : "Choose up to three options."
            }
            value={formData.genre}
            onChange={(selectedOptions) =>
              handleChange("genre", selectedOptions.target.value)
            }
            defaultText={t("theme")}
            require={true}
          />

          <InputComponent
            type="number"
            label={"Year  | 年分"}
            placeholder={t("years")}
            name="ExpectedCompletionYear"
            value={formData.ExpectedCompletionYear}
            onChange={(e) =>
              handleChange("ExpectedCompletionYear", e.target.value)
            }
            require={true}
          />

          <InputComponent
            type="number"
            label={"Running Time (Min)｜片長（分鐘）"}
            placeholder={t("runningtime")}
            name="runningTimeMinutes"
            value={formData.runningTimeMinutes}
            onChange={(e) => handleChange("runningTimeMinutes", e.target.value)}
          />

          <InputComponent
            type="image"
            label={
              "Key Visual Poster or Horizontal Stills ｜ 主視覺海報或橫式劇照"
            }
            message={
              locale === "en" ? "Up to three posters. " : "上傳檔案至多三張"
            }
            name="posterImages"
            value={formData.posterImages}
            onChange={(e) => handleChange("posterImages", e.target.value)}
            multiple={true}
          />

          <InputComponent
            type="image"
            label={"Trailer / Teaser Thumbnail｜預告片／片花預覽圖"}
            message={
              locale === "zh"
                ? "上傳檔案規格：<br/>格式：JPG、PNG<br/>尺寸：1920x1080 "
                : "File requirements: <br/>Format: JPG, PNG<br/>Image Size: 1920x1080"
            }
            name="trailerImage"
            value={formData.trailerImage}
            onChange={(e) => handleChange("trailerImage", e.target.value)}
          />

          <InputComponent
            type="text"
            label="Trailer / Teaser Link｜預告片／片花連結"
            placeholder={t("trailer")}
            message={
              locale === "zh"
                ? "如願意於 TCCF 會員系統上公開作品預告，瀏覽權限須設為公開。"
                : "If the exhibitor would like to provide the trailer/teaser on the TCCF official website for registered members to view, please set the viewing permission to public.<br/>"
            }
            name="trailerUrl"
            value={formData.trailerUrl}
            onChange={(e) => handleChange("trailerUrl", e.target.value)}
            trailerText={true}
          />
        </div>

        <div className={styles.television__title}>
          <HiOutlineNewspaper className={styles.television__icon} />
          <h3>Main Crew｜主創團隊</h3>
        </div>

        <div className={styles.television__mixedInputBlock}>
          <div className={styles.television__gridBlock}>
            <InputComponent
              type="text"
              label="Creator's Name"
              // placeholder="Please enter Creator’s Name"
              message={"first name, LAST NAME"}
              name="creatorFullNameEn"
              value={formData.creatorFullNameEn}
              onChange={(e) =>
                handleChange("creatorFullNameEn", e.target.value)
              }
              require={true}
            />

            <InputComponent
              type="text"
              label="創作者姓名"
              // placeholder="請輸入創作者姓名"
              message={"中文：姓         名  "}
              name="creatorFullNameZh"
              value={formData.creatorFullNameZh}
              onChange={(e) =>
                handleChange("creatorFullNameZh", e.target.value)
              }
            />
          </div>

          <InputComponent
            type="textarea"
            label="Creator's Profile"
            name="creatorBiographyEn"
            value={formData.creatorBiographyEn}
            onChange={(e) => handleChange("creatorBiographyEn", e.target.value)}
            message={
              "Up to 600 characters, including punctuation and spaces. If the character limit is exceeded, the text will be edited as necessary without notification.<br/>If the profile mentions any works, please italicize the title and capitalize all first letters in the title, excluding propositions such as the, for, by, at, etc., unless there is a specific purpose."
            }
            maxLength={600}
            // placeholder={"Please enter Creator's Profile"}
            require={true}
            isawardText={true}
          />

          <InputComponent
            type="textarea"
            label="創作者簡介"
            name="creatorBiographyZh"
            value={formData.creatorBiographyZh}
            onChange={(e) => handleChange("creatorBiographyZh", e.target.value)}
            message={
              "100 個字為限（含標點符號），若超過字數限制，將視情況編輯，恕不另行通知。"
            }
            maxLength={100}
            // placeholder={"請輸入創作者簡介"}
          />
        </div>
      </div>
    </div>
  );
};

export default IPComponents;
