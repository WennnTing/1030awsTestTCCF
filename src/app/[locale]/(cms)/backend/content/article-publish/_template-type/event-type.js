import styles from "../article-content.module.scss";
import {
  Input,
  ButtonInput,
  FileInput,
  DefaultInput,
  ControllerInput,
} from "@/components/cms/input";

import { RadioButton } from "@/components/cms/radio-button";
import ArticleCalendar from "@/components/cms/article-calendar";
import { useState } from "react";
import dynamic from "next/dynamic";
import EventMember from "./_event-type/event-member";
import { Alert } from "@/components/cms/swal";
import { RxPlus } from "react-icons/rx";
import ArticleEventCalendar from "@/components/cms/article-event-calendar";
import ArticleEventTime from "@/components/cms/article-event-time";
import ImageUpload from "@/components/cms/image-upload";
import { useEffect } from "react";
import moment from "moment";
import FileUpload from "@/components/cms/file-upload";
import SlideImageUpload from "@/components/cms/slide-image-upload";
import SelectComponent from "@/components/cms/select";
import { nanoid } from "nanoid";

const CustomEditor = dynamic(() => import("@/components/cms/custom-editor"), {
  ssr: false,
});

const EnTemplate = ({
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  locale,
  contentInfo,
  setContentInfo,
  memberInfo,
  setMemberInfo,
  locationInfo,
  setLocationInfo,
  eventType,
  setEventType,
  registrationStartDate,
  setRegistrationStartDate,
  activityStartTime,
  setActivityStartTime,
  registrationEndDate,
  setRegistrationEndDate,
  activityEndTime,
  setActivityEndTime,
  activityStartDate,
  setActivityStartDate,
  activityEndDate,
  setActivityEndDate,
  maxParticipants,
  setMaxParticipants,
  activitStartTimeOptions,
  activitEndTimeOptions,

  member,
  setMember,
  handleToggleMember,
  handleIncreaseMember,
  handleDeleteMember,
}) => {
  const [editorContent, setEditorContent] = useState([]);

  // const [member, setMember] = useState([
  //   {
  //     id: 1,
  //     open: true,
  //     locale: "_En",
  //   },
  // ]);

  const locationOptions = [
    {
      value: "Main Stage",
      label: "Main Stage",
    },
    {
      value: "Salon Stage",
      label: "Salon Stage",
    },
    {
      value: "Pitching Stage",
      label: "Pitching Stage",
    },
  ];

  // const handleToggleMember = (id) => {
  //   setMember((prev) =>
  //     prev.map((data) => {
  //       if (data.id === id) {
  //         return { ...data, open: !data.open };
  //       } else {
  //         return data;
  //       }
  //     })
  //   );
  // };

  // const handleIncreaseMember = () => {
  //   setMember((prev) =>
  //     prev.concat({
  //       id: prev[prev.length - 1].id + 1,
  //       open: true,
  //       locale: "_En",
  //     })
  //   );
  // };

  // const handleDeleteMember = (id) => {
  //   if (member.length === 1) {
  //     Alert({
  //       icon: "error",
  //       title: "刪除失敗",
  //       text: "人員資訊不可少於一項",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     });
  //   } else {
  //     Alert({
  //       icon: "warning",
  //       title: "確定刪除此區塊？",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         setMember((prev) => prev.filter((data) => data.id !== id));
  //       }
  //     });
  //   }
  // };

  return (
    <div
      style={{
        display: locale === "en" ? "" : "none",
      }}
    >
      <div className={styles.cmsArticleContent__container}>
        <h3>活動型文章設定</h3>
        <Input label={"標籤"} elementId={"tagEn"} placeholder={"請輸入標籤"} />
      </div>

      <div className={styles.cmsArticleContent__container}>
        <h3>活動資訊</h3>
        {/* <RadioButton
          label={"主題資訊"}
          elementId={"themeInfoEn"}
          required={true}
          state={themeInfo}
          value={themeInfo}
          onChangeFun={setThemeInfo}
          info={
            "於詳細頁面顯示活動資訊名稱、地點、報名日期與額滿人數、劇情概要(logline)、主視覺與活動性質區塊"
          }
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        /> */}
        <RadioButton
          label={"內文資訊"}
          elementId={"contentInfoEn"}
          required={true}
          state={contentInfo}
          value={contentInfo}
          onChangeFun={setContentInfo}
          info={"於詳細頁面顯示活動資訊的內容、輪播圖與附件區塊"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
        <RadioButton
          label={"人員資訊"}
          elementId={"memberInfoEn"}
          required={true}
          state={memberInfo}
          value={memberInfo}
          onChangeFun={setMemberInfo}
          info={"於詳細頁面顯示活動資訊的團隊詳細介紹等區塊"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
        <RadioButton
          label={"地點資訊"}
          elementId={"locationInfoEn"}
          required={true}
          state={locationInfo}
          value={locationInfo}
          onChangeFun={setLocationInfo}
          info={"於詳細頁面顯示活動資訊的地點顯示區塊"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
      </div>

      <div className={styles.cmsArticleContent__container}>
        <h3>主題資訊</h3>
        <Input
          label={"標題"}
          required={true}
          elementId={"titleEn"}
          placeholder={"請輸入標題"}
        />
        <Input
          label={"企劃案概要"}
          elementId={"summaryEn"}
          placeholder={"請輸入企劃概要"}
        />
        <ImageUpload label={"主視覺"} required={true} elementId={"kvEn"} />

        <SelectComponent
          label={"地點"}
          required={true}
          name={"locationEn"}
          placeholder={"請選擇地點"}
          options={locationOptions}
          controller={false}
        />
        {/* {locationInfo == "true" && (
            <RadioButton
              label={"地點呈現方式"}
              elementId={"locationDisplayTypeEn"}
              elementValueId={"locationDisplayTypeValueEn"}
              state={locationDisplayType}
              value={locationDisplayType}
              onChangeFun={setLocationDisplayType}
              required={true}
              input={true}
              options={[
                {
                  value: "googlemap",
                  label: "Google地圖",
                },
                {
                  value: "image",
                  label: "圖片",
                },
              ]}
            />
          )} */}

        <RadioButton
          label={"活動性質"}
          elementId={"eventTypeEn"}
          value={eventType}
          onChangeFun={setEventType}
          required={true}
          options={[
            {
              value: "apply",
              label: "報名入場",
            },
            {
              value: "badge",
              label: "憑展證入場",
            },
          ]}
        />
        <ArticleEventTime
          required={true}
          label={"活動時間"}
          startDatePlaceholder={"活動開始日期"}
          endDatePlaceholder={"活動結束日期"}
          startTimePlaceholder={"活動開始時間"}
          endTimePlaceholder={"活動結束時間"}
          startTimeOptions={activitStartTimeOptions}
          endTimeOptions={activitEndTimeOptions}
          startDate={activityStartDate}
          setStartDate={setActivityStartDate}
          endDate={activityEndDate}
          setEndDate={setActivityEndDate}
          startDateName={"activityStartDate"}
          endDateName={"activityEndDate"}
          startTimeName={"activityStartTime"}
          endTimeName={"activityEndTime"}
          startTime={activityStartTime}
          endTime={activityEndTime}
          setActivityStartTime={setActivityStartTime}
          setActivityEndTime={setActivityEndTime}
        />

        {/* <div className={styles.cmsArticleContent__container_twoColumn}>
            <ArticleEventCalendar
              required={true}
              label={"活動日期"}
              startDate={activityStartTime}
              setStartDate={setActivityStartTime}
              endDate={activityEndTime}
              setEndDate={setActivityEndTime}
              startElementId={"activityStartTime"}
              endElementId={"activityEndTime"}
              startPlaceholder={"活動開始日期"}
              endPalceholder={"活動結束日期"}
            />
          </div> */}

        <div className={styles.cmsArticleContent__container_twoColumn}>
          <ArticleEventCalendar
            required={true}
            label={"報名日期"}
            startDate={registrationStartDate}
            setStartDate={setRegistrationStartDate}
            endDate={registrationEndDate}
            setEndDate={setRegistrationEndDate}
            startElementId={"registrationStartDate"}
            endElementId={"registrationEndDate"}
            startPlaceholder={"報名開始日期"}
            endPalceholder={"報名截止日期"}
          />

          <ControllerInput
            label={"滿額人數"}
            required={true}
            elementId={"maxParticipants"}
            value={maxParticipants.replace(/[^\d]/g, "")}
            onChangeFun={setMaxParticipants}
            placeholder={"請輸入滿額人數"}
          />
        </div>
      </div>

      {contentInfo == "true" && (
        <div className={styles.cmsArticleContent__container}>
          <h3>內文資訊</h3>
          <CustomEditor
            elementId={"contentEn"}
            content={editorContent}
            setContent={setEditorContent}
          />

          <SlideImageUpload label={"輪播圖片"} type={"en"} />
          {/* <FileUpload label={"附件"} required={true} elementId={"fileEn"} /> */}
          <Input
            label={"附件"}
            elementId={"fileEn"}
            placeholder={"請輸入附件連結"}
          />
        </div>
      )}

      {memberInfo == "true" && (
        <div className={styles.cmsArticleContent__container}>
          <h3>人員資訊</h3>
          <div
            className={
              styles.cmsArticleContent__container_increaseBlockContainer
            }
          >
            {member.map((data, index) => (
              <EventMember
                data={data}
                index={index}
                member={member}
                setMember={setMember}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                handleDeleteMember={handleDeleteMember}
                handleToggleMember={handleToggleMember}
                key={data.id}
                locale={"_En"}
              />
            ))}
            <div
              className={styles.cmsArticleContent__container_increase}
              onClick={handleIncreaseMember}
            >
              <div
                className={styles.cmsArticleContent__container_increase__icon}
              >
                <RxPlus />
              </div>
              <span>增加人員資訊</span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.cmsArticleContent__container}>
        <h3>共用設定</h3>
        <ArticleCalendar
          label={"上架期間"}
          required={true}
          publishDate={publishDate}
          setPublishDate={setPublishDate}
          unpublishDate={unpublishDate}
          setUnpublishDate={setUnpublishDate}
        />
      </div>
    </div>
  );
};

const ZhTemplate = ({
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  locale,
  contentInfo,
  setContentInfo,
  memberInfo,
  setMemberInfo,
  locationInfo,
  setLocationInfo,
  eventType,
  setEventType,
  registrationStartDate,
  setRegistrationStartDate,
  activityStartTime,
  setActivityStartTime,
  registrationEndDate,
  setRegistrationEndDate,
  activityEndTime,
  setActivityEndTime,
  activityStartDate,
  setActivityStartDate,
  activityEndDate,
  setActivityEndDate,
  maxParticipants,
  setMaxParticipants,
  activitStartTimeOptions,
  activitEndTimeOptions,

  member,
  setMember,
  handleToggleMember,
  handleIncreaseMember,
  handleDeleteMember,
}) => {
  const [editorContent, setEditorContent] = useState([]);
  // const [member, setMember] = useState([
  //   {
  //     id: 1,
  //     open: true,
  //     locale: "",
  //   },
  // ]);

  const locationOptions = [
    {
      value: "主舞台",
      label: "主舞台",
    },
    {
      value: "沙龍舞台",
      label: "沙龍舞台",
    },
    {
      value: "提案舞台",
      label: "提案舞台",
    },
  ];

  // const handleToggleMember = (id) => {
  //   setMember((prev) =>
  //     prev.map((data) => {
  //       if (data.id === id) {
  //         return { ...data, open: !data.open };
  //       } else {
  //         return data;
  //       }
  //     })
  //   );
  // };

  // const handleIncreaseMember = () => {
  //   setMember((prev) =>
  //     prev.concat({
  //       id: prev[prev.length - 1].id + 1,
  //       open: true,
  //       locale: "",
  //     })
  //   );
  // };

  // const handleDeleteMember = (id) => {
  //   if (member.length === 1) {
  //     Alert({
  //       icon: "error",
  //       title: "刪除失敗",
  //       text: "人員資訊不可少於一項",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     });
  //   } else {
  //     Alert({
  //       icon: "warning",
  //       title: "確定刪除此區塊？",
  //       showCancelButton: false,
  //       confirmButtonText: "確認",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         setMember((prev) => prev.filter((data) => data.id !== id));
  //       }
  //     });
  //   }
  // };

  return (
    <div
      style={{
        display: locale === "zh" ? "" : "none",
      }}
    >
      <div className={styles.cmsArticleContent__container}>
        <h3>活動型文章設定</h3>
        <Input label={"標籤"} elementId={"tag"} placeholder={"請輸入標籤"} />
      </div>

      <div className={styles.cmsArticleContent__container}>
        <h3>活動資訊</h3>
        {/* <RadioButton
          label={"主題資訊"}
          elementId={"themeInfo"}
          required={true}
          state={themeInfo}
          value={themeInfo}
          onChangeFun={setThemeInfo}
          info={
            "於詳細頁面顯示活動資訊名稱、地點、報名日期與額滿人數、劇情概要(logline)、主視覺與活動性質區塊"
          }
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        /> */}
        <RadioButton
          label={"內文資訊"}
          elementId={"contentInfo"}
          required={true}
          state={contentInfo}
          value={contentInfo}
          onChangeFun={setContentInfo}
          info={"於詳細頁面顯示活動資訊的內容、輪播圖與附件區塊"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
        <RadioButton
          label={"人員資訊"}
          elementId={"memberInfo"}
          required={true}
          state={memberInfo}
          value={memberInfo}
          onChangeFun={setMemberInfo}
          info={"於詳細頁面顯示活動資訊的團隊詳細介紹等區塊"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
        <RadioButton
          label={"地點資訊"}
          elementId={"locationInfo"}
          required={true}
          state={locationInfo}
          value={locationInfo}
          onChangeFun={setLocationInfo}
          info={"於詳細頁面顯示活動資訊的地點顯示區塊"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
      </div>

      <div className={styles.cmsArticleContent__container}>
        <h3>主題資訊</h3>
        <Input
          label={"標題"}
          required={true}
          elementId={"title"}
          placeholder={"請輸入標題"}
        />
        <Input
          label={"企劃案概要"}
          elementId={"summary"}
          placeholder={"請輸入企劃概要"}
        />
        <ImageUpload label={"主視覺"} required={true} elementId={"kv"} />

        <SelectComponent
          label={"地點"}
          required={true}
          name={"location"}
          placeholder={"請選擇地點"}
          options={locationOptions}
          controller={false}
        />
        {/* {locationInfo == "true" && (
            <RadioButton
              label={"地點呈現方式"}
              elementId={"locationDisplayType"}
              elementValueId={"locationDisplayTypeValue"}
              state={locationDisplayType}
              value={locationDisplayType}
              onChangeFun={setLocationDisplayType}
              required={true}
              input={true}
              options={[
                {
                  value: "googlemap",
                  label: "Google地圖",
                },
                {
                  value: "image",
                  label: "圖片",
                },
              ]}
            />
          )} */}

        <RadioButton
          label={"活動性質"}
          elementId={"eventType"}
          value={eventType}
          onChangeFun={setEventType}
          required={true}
          options={[
            {
              value: "apply",
              label: "報名入場",
            },
            {
              value: "badge",
              label: "憑展證入場",
            },
          ]}
        />
        <ArticleEventTime
          required={true}
          label={"活動時間"}
          startDatePlaceholder={"活動開始日期"}
          endDatePlaceholder={"活動結束日期"}
          startTimePlaceholder={"活動開始時間"}
          endTimePlaceholder={"活動結束時間"}
          startTimeOptions={activitStartTimeOptions}
          endTimeOptions={activitEndTimeOptions}
          startDate={activityStartDate}
          setStartDate={setActivityStartDate}
          endDate={activityEndDate}
          setEndDate={setActivityEndDate}
          startDateName={"activityStartDate"}
          endDateName={"activityEndDate"}
          startTimeName={"activityStartTime"}
          endTimeName={"activityEndTime"}
          startTime={activityStartTime}
          endTime={activityEndTime}
          setActivityStartTime={setActivityStartTime}
          setActivityEndTime={setActivityEndTime}
        />
        <div className={styles.cmsArticleContent__container_twoColumn}>
          <ArticleEventCalendar
            required={true}
            label={"報名日期"}
            startDate={registrationStartDate}
            setStartDate={setRegistrationStartDate}
            endDate={registrationEndDate}
            setEndDate={setRegistrationEndDate}
            startElementId={"registrationStartDate"}
            endElementId={"registrationEndDate"}
            startPlaceholder={"報名開始日期"}
            endPalceholder={"報名截止日期"}
          />

          <ControllerInput
            label={"滿額人數"}
            required={true}
            elementId={"maxParticipants"}
            value={maxParticipants.replace(/[^\d]/g, "")}
            onChangeFun={setMaxParticipants}
            placeholder={"請輸入滿額人數"}
          />
        </div>
      </div>

      {contentInfo == "true" && (
        <div className={styles.cmsArticleContent__container}>
          <h3>內文資訊</h3>
          <CustomEditor
            elementId={"content"}
            content={editorContent}
            setContent={setEditorContent}
          />

          <SlideImageUpload label={"輪播圖片"} type={"zh"} />

          {/* <FileUpload label={"附件"} required={true} elementId={"file"} /> */}

          <Input
            label={"附件"}
            elementId={"file"}
            placeholder={"請輸入附件連結"}
          />
        </div>
      )}

      {memberInfo == "true" && (
        <div className={styles.cmsArticleContent__container}>
          <h3>人員資訊</h3>
          <div
            className={
              styles.cmsArticleContent__container_increaseBlockContainer
            }
          >
            {member.map((data, index) => (
              <EventMember
                data={data}
                index={index}
                member={member}
                setMember={setMember}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                handleDeleteMember={handleDeleteMember}
                handleToggleMember={handleToggleMember}
                key={data.id}
                locale={""}
              />
            ))}
            <div
              className={styles.cmsArticleContent__container_increase}
              onClick={handleIncreaseMember}
            >
              <div
                className={styles.cmsArticleContent__container_increase__icon}
              >
                <RxPlus />
              </div>
              <span>增加人員資訊</span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.cmsArticleContent__container}>
        <h3>共用設定</h3>
        <ArticleCalendar
          label={"上架期間"}
          required={true}
          publishDate={publishDate}
          setPublishDate={setPublishDate}
          unpublishDate={unpublishDate}
          setUnpublishDate={setUnpublishDate}
        />
      </div>
    </div>
  );
};

export default function EventType({
  publishDate,
  setPublishDate,
  unpublishDate,
  setUnpublishDate,
  locale,
}) {
  // 需共用設定
  // 主題資訊
  // 內文資訊
  // 人員資訊
  // 地點資訊
  // 地點呈現方式
  // 活動性質
  // 報名日期
  // 滿額人數
  // 報名日期2
  // 滿額人數2

  const [contentInfo, setContentInfo] = useState("true");
  const [memberInfo, setMemberInfo] = useState("true");
  const [locationInfo, setLocationInfo] = useState("true");
  const [locationDisplayType, setLocationDisplayType] = useState("googlemap");
  const [eventType, setEventType] = useState("apply");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [registrationStartDate, setRegistrationStartDate] = useState(null);
  const [activityStartTime, setActivityStartTime] = useState(null);
  const [activityStartDate, setActivityStartDate] = useState(null);
  const [registrationEndDate, setRegistrationEndDate] = useState(null);
  const [activityEndTime, setActivityEndTime] = useState(null);
  const [activityEndDate, setActivityEndDate] = useState(null);

  const activitStartTimeOptions = Array.from({ length: 180 }, (_, index) => {
    const hour = 9 + Math.floor(index / 12);
    const minute = (index % 12) * 5;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return {
      label: `${formattedHour}:${formattedMinute}`,
      value: `${formattedHour}:${formattedMinute}`,
    };
  });

  const activitEndTimeOptions = Array.from({ length: 180 }, (_, index) => {
    const hour = 9 + Math.floor((index + 1) / 12);
    const minute = ((index + 1) % 12) * 5;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return {
      label: `${formattedHour}:${formattedMinute}`,
      value: `${formattedHour}:${formattedMinute}`,
    };
  });

  useEffect(() => {
    if (moment(registrationStartDate).isAfter(registrationEndDate)) {
      Alert({
        icon: "error",
        title: "開始日期不可晚於結束日期",
        showCancelButton: false,
        confirmButtonText: "確認",
      }).then(() => {
        setRegistrationStartDate(null);
        setRegistrationEndDate(null);
      });
    }

    if (moment(activityStartTime).isAfter(activityEndTime)) {
      Alert({
        icon: "error",
        title: "開始日期不可晚於結束日期",
        showCancelButton: false,
        confirmButtonText: "確認",
      }).then(() => {
        setActivityStartTime(null);
        setActivityEndTime(null);
      });
    }
  }, [
    registrationStartDate,
    activityStartTime,
    registrationEndDate,
    activityEndTime,
  ]);

  const [member, setMember] = useState([
    {
      id: 1,
      open: true,
      key: nanoid(),
    },
  ]);

  const handleToggleMember = (id) => {
    setMember((prev) =>
      prev.map((data) => {
        if (data.id === id) {
          return { ...data, open: !data.open };
        } else {
          return data;
        }
      })
    );
  };

  const handleIncreaseMember = () => {
    setMember((prev) =>
      prev.concat({
        id: prev[prev.length - 1].id + 1,
        open: true,
        key: nanoid(),
      })
    );
  };

  const handleDeleteMember = (id) => {
    if (member.length === 1) {
      Alert({
        icon: "error",
        title: "刪除失敗",
        text: "人員資訊不可少於一項",
        showCancelButton: false,
        confirmButtonText: "確認",
      });
    } else {
      Alert({
        icon: "warning",
        title: "確定刪除此區塊？",
        showCancelButton: false,
        confirmButtonText: "確認",
      }).then((result) => {
        if (result.isConfirmed) {
          setMember((prev) => prev.filter((data) => data.id !== id));
        }
      });
    }
  };

  return (
    <div>
      <ZhTemplate
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        unpublishDate={unpublishDate}
        setUnpublishDate={setUnpublishDate}
        locale={locale}
        contentInfo={contentInfo}
        setContentInfo={setContentInfo}
        memberInfo={memberInfo}
        setMemberInfo={setMemberInfo}
        locationInfo={locationInfo}
        setLocationInfo={setLocationInfo}
        locationDisplayType={locationDisplayType}
        setLocationDisplayType={setLocationDisplayType}
        eventType={eventType}
        setEventType={setEventType}
        registrationStartDate={registrationStartDate}
        setRegistrationStartDate={setRegistrationStartDate}
        activityStartTime={activityStartTime}
        setActivityStartTime={setActivityStartTime}
        activityStartDate={activityStartDate}
        setActivityStartDate={setActivityStartDate}
        registrationEndDate={registrationEndDate}
        setRegistrationEndDate={setRegistrationEndDate}
        activitStartTimeOptions={activitStartTimeOptions}
        activitEndTimeOptions={activitEndTimeOptions}
        activityEndTime={activityEndTime}
        setActivityEndTime={setActivityEndTime}
        activityEndDate={activityEndDate}
        setActivityEndDate={setActivityEndDate}
        maxParticipants={maxParticipants}
        setMaxParticipants={setMaxParticipants}
        member={member}
        setMember={setMember}
        handleToggleMember={handleToggleMember}
        handleIncreaseMember={handleIncreaseMember}
        handleDeleteMember={handleDeleteMember}
      />
      <EnTemplate
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        unpublishDate={unpublishDate}
        setUnpublishDate={setUnpublishDate}
        locale={locale}
        contentInfo={contentInfo}
        setContentInfo={setContentInfo}
        memberInfo={memberInfo}
        setMemberInfo={setMemberInfo}
        locationInfo={locationInfo}
        setLocationInfo={setLocationInfo}
        locationDisplayType={locationDisplayType}
        setLocationDisplayType={setLocationDisplayType}
        eventType={eventType}
        setEventType={setEventType}
        registrationStartDate={registrationStartDate}
        setRegistrationStartDate={setRegistrationStartDate}
        activityStartTime={activityStartTime}
        setActivityStartTime={setActivityStartTime}
        activityStartDate={activityStartDate}
        setActivityStartDate={setActivityStartDate}
        registrationEndDate={registrationEndDate}
        setRegistrationEndDate={setRegistrationEndDate}
        activitStartTimeOptions={activitStartTimeOptions}
        activitEndTimeOptions={activitEndTimeOptions}
        activityEndTime={activityEndTime}
        setActivityEndTime={setActivityEndTime}
        activityEndDate={activityEndDate}
        setActivityEndDate={setActivityEndDate}
        maxParticipants={maxParticipants}
        setMaxParticipants={setMaxParticipants}
        member={member}
        setMember={setMember}
        handleToggleMember={handleToggleMember}
        handleIncreaseMember={handleIncreaseMember}
        handleDeleteMember={handleDeleteMember}
      />
      {/* <div className={styles.cmsArticleContent__container}>
        <h3>活動型文章設定</h3>
        <Input label={"標籤名稱"} elementId={"tag"} />
      </div>

      <div className={styles.cmsArticleContent__container}>
        <h3>活動資訊</h3>
        <RadioButton
          label={"主題資訊"}
          elementId={"themeInfo"}
          required={true}
          state={themeInfo}
          onChangeFun={setThemeInfo}
          info={
            "於詳細頁面顯示活動資訊名稱、地點、報名日期與額滿人數、劇情概要(logline)、主視覺與活動性質區塊"
          }
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
        <RadioButton
          label={"內文資訊"}
          elementId={"contentInfo"}
          required={true}
          state={contentInfo}
          onChangeFun={setContentInfo}
          info={"於詳細頁面顯示活動資訊的內容、輪播圖與附件區塊"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
        <RadioButton
          label={"人員資訊"}
          elementId={"memberInfo"}
          required={true}
          state={memberInfo}
          onChangeFun={setMemberInfo}
          info={"於詳細頁面顯示活動資訊的團隊詳細介紹等區塊"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
        <RadioButton
          label={"地點資訊"}
          elementId={"locationInfo"}
          required={true}
          state={locationInfo}
          onChangeFun={setLocationInfo}
          info={"於詳細頁面顯示活動資訊的地點顯示區塊"}
          options={[
            {
              value: "true",
              label: "顯示",
              checked: true,
            },
            {
              value: "false",
              label: "不顯示",
            },
          ]}
        />
      </div>

      {themeInfo == "true" && (
        <div className={styles.cmsArticleContent__container}>
          <h3>主題資訊</h3>
          <Input label={"標題"} required={true} elementId={"title"} />
          <Input label={"企劃案概要"} required={true} elementId={"summary"} />
          <Input label={"主視覺"} required={true} elementId={"kv"} />

          {locationInfo == "true" && (
            <Input label={"地點"} required={true} elementId={"location"} />
          )}
          {locationInfo == "true" && (
            <RadioButton
              label={"地點呈現方式"}
              elementId={"locationDisplayType"}
              elementValueId={"locationDisplayTypeValue"}
              state={locationDisplayType}
              onChangeFun={setLocationDisplayType}
              required={true}
              input={true}
              options={[
                {
                  value: "googlemap",
                  label: "Google地圖",
                },
                {
                  value: "image",
                  label: "圖片",
                },
              ]}
            />
          )}

          <RadioButton
            label={"活動性質"}
            elementId={"eventType"}
            required={true}
            options={[
              {
                value: "apply",
                label: "報名入場",
              },
              {
                value: "badge",
                label: "憑展證入場",
              },
            ]}
          />
          <div className={styles.cmsArticleContent__container_twoColumn}>
            <ArticleEventCalendar
              required={true}
              label={"報名日期"}
              startDate={registrationStartDate}
              setStartDate={setRegistrationStartDate}
              endDate={registrationEndDate}
              setEndDate={setRegistrationEndDate}
              startElementId={"registrationStartDate"}
              endElementId={"registrationEndDate"}
              startPlaceholder={"報名開始日期"}
              endPalceholder={"報名截止日期"}
            />

            <Input label={"滿額人數"} required={true} elementId={"maxParticipants"} />

            <ArticleEventCalendar
              label={"報名日期2"}
              startDate={activityStartTime}
              setStartDate={setActivityStartTime}
              endDate={activityEndTime}
              setEndDate={setActivityEndTime}
              startElementId={"activityStartTime"}
              endElementId={"activityEndTime"}
              startPlaceholder={"報名開始日期"}
              endPalceholder={"報名截止日期"}
            />
            <Input label={"滿額人數2"} elementId={"quota2"} />
          </div>
        </div>
      )}

      {contentInfo == "true" && (
        <div className={styles.cmsArticleContent__container}>
          <h3>內文資訊</h3>
          <CustomEditor
            elementId={"content"}
            content={editorContent}
            setContent={setEditorContent}
          />
          <Input label={"輪播圖片"} />

          <FileInput label={"上傳附件"} required={true} elementId={"file"} />
        </div>
      )}

      {memberInfo == "true" && (
        <div className={styles.cmsArticleContent__container}>
          <h3>人員資訊</h3>
          {member.map((data, index) => (
            <EventMember
              data={data}
              index={index}
              member={member}
              setMember={setMember}
              editorContent={editorContent}
              setEditorContent={setEditorContent}
              handleDeleteMember={handleDeleteMember}
              handleToggleMember={handleToggleMember}
            />
          ))}
          <div
            className={styles.cmsArticleContent__container_increase}
            onClick={handleIncreaseMember}
          >
            <div className={styles.cmsArticleContent__container_increase__icon}>
              <RxPlus />
            </div>
            <span>增加人員資訊</span>
          </div>
        </div>
      )}

      <div className={styles.cmsArticleContent__container}>
        <h3>共用設定</h3>
        <ArticleCalendar
          label={"上架期間"}
          required={true}
          publishDate={publishDate}
          setPublishDate={setPublishDate}
          unpublishDate={unpublishDate}
          setUnpublishDate={setUnpublishDate}
        />
      </div> */}
    </div>
  );
}
