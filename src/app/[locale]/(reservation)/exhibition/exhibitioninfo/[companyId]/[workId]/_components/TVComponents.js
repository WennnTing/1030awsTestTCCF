"use client";
import React, { useState, useEffect } from "react";
import styles from "./TVComponents.module.scss";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

// components
import NormalSelect from "../../../components/NormalSelect";
import InputComponent from "@/(reservation)/exhibition/components/Input/Input";
import MultipleSelect from "../../../components/MultipleSelect";

// 作品類別
const contentSubtype = [
  { label: "TV Series｜電視劇集", value: 0 },
  { label: "Factual｜紀實節目", value: 1 },
  { label: "Entertainment｜娛樂", value: 2 },
  { label: "Kids｜兒童節目", value: 3 },
  { label: "TV Film｜電視電影", value: 4 },
];

// 製作進度
const status = [
  { label: "Completed｜已完成 ", value: 0 },
  { label: "Pre-Production｜前製", value: 1 },
  { label: "In Production｜拍攝中", value: 2 },
  { label: "Post-Production｜後製", value: 3 },
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

const TVComponents = ({
  work,
  onDataChange,
  onImageDataChange,
  onValidationChange,
}) => {
  const [formData, setFormData] = useState({
    contentSubtype: "", // Type | 類別
    genre: [], // Theme / genre｜主題/類型
    status: "", // 製作進度
    expectedCompletionDate: "",
    ExpectedCompletionYear: "",
    ExpectedCompletionMonth: "",
    runningTimeMinutes: 0, // 片長
    episodeCount: 0, // 總集數
    descriptionEn: "", // Synopsis
    descriptionZh: "", // 劇情介紹
    awardsEn: "", // Festival & Award
    awardsZh: "", // 提案、參展與獲獎紀錄
    posterImages: [], // 主視覺海報或橫式劇照
    trailerUrl: "", // 預告片連結
    trailerImage: "", // 預告片圖片
    directorNameEn: "", // 導演英文名
    directorNameZh: "", // 導演中文名
    producerNameEn: "", // 製作人英文名
    producerNameZh: "", // 製作人中文名
    hostCastEn: "", // 卡司英文
    hostCastZh: "", // 卡司中文
  });

  const [imageData, setImageData] = useState({});
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const p = useTranslations("worksPopup");

  // 必填欄位檢查 props
  const validateFormData = () => {
    const requiredFields = [
      { key: "titleEn", label: "Title" },
      { key: "contentSubtype", label: p("label_1") },
      { key: "genre", label: p("label_2") },
      { key: "status", label: p("label_3") },
      { key: "ExpectedCompletionYear", label: "Year" },
      { key: "ExpectedCompletionMonth", label: "Month" },
      { key: "runningTimeMinutes", label: p("label_5") },
      { key: "descriptionEn", label: p("label_6") },
      { key: "producerNameEn", label: "Producer's Name" },
    ];

    const missingFields = requiredFields
      .filter(
        (field) =>
          formData[field.key] === undefined ||
          formData[field.key] === null ||
          (Array.isArray(formData[field.key]) &&
            formData[field.key].length === 0) ||
          formData[field.key] === ""
      )
      .map((field) => field.label);

    const isValid = missingFields.length === 0;
    onValidationChange(isValid, missingFields);

    return isValid;
  };

  useEffect(() => {
    validateFormData();
    // console.log("TVComponents validation:", isValid);
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

        // 處理接收到的expectedCompletionDate
        // 切割到ExpectedCompletionYear和ExpectedCompletionMonth
        ExpectedCompletionYear: work.expectedCompletionDate
          ? work.expectedCompletionDate.split("-")[0]
          : "",
        ExpectedCompletionMonth: work.expectedCompletionDate
          ? work.expectedCompletionDate.split("-")[1]
          : "",
      };
      setFormData(updatedWork);
      console.log("Updated work:", updatedWork);
    }
  }, [work]);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  useEffect(() => {
    onImageDataChange(imageData);
  }, [imageData, onImageDataChange]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const t = useTranslations("TVPlaceholder");

  const handleChange = (name, value) => {
    console.log(`Changing ${name} to`, value);
    if (name === "runningTimeMinutes" || name === "episodeCount") {
      value = parseInt(value, 10);
      if (isNaN(value)) {
        value = "";
      }
    } else if (
      name === "genre" &&
      value.target &&
      Array.isArray(value.target.value)
    ) {
      value = value.target.value;
    } else if (name === "posterImages" || name === "trailerImage") {
      setImageData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (["directorNameEn", "producerNameEn"].includes(name)) {
      // 處理 directorNameEn 和 producerNameEn 的情況
      if (value) {
        value = value.replace(
          /([^,]+)(,?)(.*)/,
          (match, beforeComma, comma, afterComma) => {
            // 首字母大寫，其他保持不變
            beforeComma = beforeComma.trim();
            beforeComma =
              beforeComma.charAt(0).toUpperCase() + beforeComma.slice(1);
            // 逗號後面的部分全部轉大寫
            if (afterComma) {
              afterComma = afterComma.trim().toUpperCase();
            }
            return `${beforeComma}${comma}${afterComma}`;
          }
        );
      }
    } else if (name === "hostCastEn") {
      // 處理 Key Cast 的情況
      // 情境：first name A, LAST NAME A/first name B,LAST NAME B/first name C,LAST NAME C
      // 處理 Key Cast 的情況
      value = value
        .split("/")
        .map((pair) => {
          // 處理每一對 name, LAST NAME
          return pair.replace(
            /([^,]+),\s*([^,]+)/,
            (match, firstName, lastName) => {
              // 首字母大寫，其他保持不變
              firstName = firstName.trim();
              firstName =
                firstName.charAt(0).toUpperCase() + firstName.slice(1);
              // 逗號後面的部分全部轉大寫
              lastName = lastName.trim().toUpperCase();
              return `${firstName},${lastName}`;
            }
          );
        })
        .join("/");
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.television}>
      <h2>TV ｜ 電視作品</h2>
      <div className={styles.television__title}>
        <HiOutlineNewspaper className={styles.television__icon} />
        <h3>Title Overview ｜ 作品簡介</h3>
      </div>

      <div className={styles.television__mainWrapper}>
        <div className={styles.television__gridBlock}>
          <NormalSelect
            label="Type | 類別"
            options={contentSubtype}
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

          <NormalSelect
            label="Production Status ｜ 製作進度"
            options={status}
            onChange={(e) => handleChange("status", e.target.value)}
            value={formData.status}
            defaultText={t("status")}
            require={true}
          />
          <div>
            <label className={styles.television__dateLabel}>
              (Expected) Completed Year｜ 影片（預計）完成年分/月分
              <span style={{ color: "red" }}> *</span>
            </label>
            <div className={styles.television__dateInput}>
              <InputComponent
                type="number"
                label={""}
                placeholder={"YYYY"}
                name="ExpectedCompletionYear"
                value={formData.ExpectedCompletionYear}
                onChange={(e) =>
                  handleChange("ExpectedCompletionYear", e.target.value)
                }
              />

              <InputComponent
                type="number"
                label={""}
                placeholder={"MM"}
                name="ExpectedCompletionMonth"
                value={formData.ExpectedCompletionMonth}
                onChange={(e) =>
                  handleChange("ExpectedCompletionMonth", e.target.value)
                }
              />
            </div>
          </div>

          <InputComponent
            type="number"
            label={"Running Time (Min)｜片長（分鐘）"}
            placeholder={t("runningtime")}
            name="runningTimeMinutes"
            value={formData.runningTimeMinutes}
            onChange={(e) => handleChange("runningTimeMinutes", e.target.value)}
            require={true}
          />

          <InputComponent
            type="number"
            label={"Episodes ｜ 總集數"}
            placeholder={t("ep")}
            name="episodeCount"
            value={formData.episodeCount}
            onChange={(e) => handleChange("episodeCount", e.target.value)}
          />
        </div>

        <div className={styles.television__textAreaBlock}>
          <InputComponent
            type="textarea"
            label="Synopsis"
            name="descriptionEn"
            value={formData.descriptionEn}
            onChange={(e) => handleChange("descriptionEn", e.target.value)}
            message="Up to 600 characters, including punctuation and spaces. If the character limit is exceeded, the text will be edited as necessary without notification."
            maxLength={600}
            // placeholder={"please enter the synopsis"}
            require={true}
            isLongTextTooltip={true}
          />

          <InputComponent
            type="textarea"
            label="劇情介紹"
            name="descriptionZh"
            value={formData.descriptionZh}
            onChange={(e) => handleChange("descriptionZh", e.target.value)}
            message="150 個字為限（含標點符號），若超過字數限制，將視情況編輯，恕不另行通知"
            maxLength={150}
            // placeholder={"請輸入劇情介紹"}
          />

          <InputComponent
            type="textarea"
            label="Festival & Award"
            name="awardsEn"
            value={formData.awardsEn}
            onChange={(e) => handleChange("awardsEn", e.target.value)}
            message="Up to three awards/festivals. Please list the year, festival name, and/or award, separated by slashes.<br/>Example:  2022 Golden Horse Awards, Best Director/Best Supporting Actress – Winner/2022 Hong Kong Asian Film Festival/2022 Hawaii International Film Festival "
            // placeholder={"please enter the festival and awards"}
            isawardText={true}
          />

          <InputComponent
            type="textarea"
            label="提案、參展與獲獎紀錄"
            name="awardsZh"
            value={formData.awardsZh}
            onChange={(e) => handleChange("awardsZh", e.target.value)}
            message="至多三項，請註明年分、影展、獎項，並使用斜杠（/）做分隔<br/>填寫範例： 2022 金馬獎最佳導演、女配角/2022 香港亞洲電影節/2022 夏威夷國際影展"
            // placeholder={"請輸入提案、參展與獲獎紀錄"}
          />
        </div>

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

        <div className={styles.television__title}>
          <HiOutlineNewspaper className={styles.television__icon} />
          <h3>Main Crew｜主創團隊</h3>
        </div>

        <div className={styles.television__mixedInputBlock}>
          <div className={styles.television__gridBlock}>
            <InputComponent
              type="text"
              label="Producer"
              placeholder="Please enter producer's name"
              message={"first name, LAST NAME"}
              name="producerNameEn"
              value={formData.producerNameEn}
              onChange={(e) => handleChange("producerNameEn", e.target.value)}
              require={true}
            />

            <InputComponent
              type="text"
              label="製作人"
              placeholder="請輸入製作人姓名"
              message={"中文：姓＿名＿     "}
              name="producerNameZh"
              value={formData.producerNameZh}
              onChange={(e) => handleChange("producerNameZh", e.target.value)}
            />

            <InputComponent
              type="text"
              label="Director"
              placeholder="Please enter director name"
              message={"first name, LAST NAME"}
              name="directorNameEn"
              value={formData.directorNameEn}
              onChange={(e) => handleChange("directorNameEn", e.target.value)}
            />

            <InputComponent
              type="text"
              label="導演"
              placeholder="請輸入導演姓名"
              message={"中文：姓＿名＿     "}
              name="directorNameZh"
              value={formData.directorNameZh}
              onChange={(e) => handleChange("directorNameZh", e.target.value)}
            />

            <InputComponent
              type="text"
              label="Host / Key Cast"
              placeholder="Please enter the name of the host or key cast"
              message={
                "first name, LAST NAME<br/>Up to three Host / Key Cast names, separated by commas.<br/>Example:<br/>first name A last name A, first name B last name B"
              }
              name="englishName"
              value={formData.hostCastEn}
              onChange={(e) => handleChange("hostCastEn", e.target.value)}
              castLongText={true}
            />

            <InputComponent
              type="text"
              label="主持人 / 卡司"
              placeholder="請輸入主持人/卡司姓名"
              message={
                "中文：姓         名<br/>至多三位，使用(/)分隔。<br/>填寫範例：姓名A/姓名B/姓名C"
              }
              name="chineseName"
              value={formData.hostCastZh}
              onChange={(e) => handleChange("hostCastZh", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVComponents;
