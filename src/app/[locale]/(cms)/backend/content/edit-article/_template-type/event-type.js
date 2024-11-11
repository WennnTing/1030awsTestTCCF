import { useState } from "react";
import styles from "../[uuid]/article-content.module.scss";
import { ControllerInput } from "@/components/cms/input";
import { ControllerRadioButton } from "@/components/cms/radio-button";
import ArticleEventCalendar from "@/components/cms/article-event-calendar";
import { RxPlus } from "react-icons/rx";
import { Alert } from "@/components/cms/swal";
import EventMember from "./_event-type/event-member";
import dynamic from "next/dynamic";
const ControlEditor = dynamic(() => import("@/components/cms/control-editor"), {
  ssr: false,
});
import ImageUpload from "@/components/cms/image-upload";
import SlideImageUpload from "@/components/cms/slide-image-upload";
import ArticleEventTime from "@/components/cms/article-event-time";
import SelectComponent from "@/components/cms/select";
import { nanoid } from "nanoid";

const EnTemplate = ({
  locale,
  themeInfo,
  setThemeInfo,
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
  registrationEndDate,
  setRegistrationEndDate,
  activityStartDate,
  setActivityStartDate,
  activityEndDate,
  setActivityEndDate,
  activityStartTime,
  setActivityStartTime,
  activityEndTime,
  setActivityEndTime,
  activitStartTimeOptions,
  activitEndTimeOptions,
  maxParticipants,
  setMaxParticipants,
  data,

  member,
  setMember,
  handleToggleMember,
  handleIncreaseMember,
  handleDeleteMember,
}) => {
  const [tag, setTag] = useState(data?.tag?.[0]?.fieldTextEn);
  const [title, setTitle] = useState(data?.title?.[0]?.fieldTextEn);
  const [summary, setSummary] = useState(data?.summary?.[0]?.fieldTextEn);
  const [kv, setKv] = useState(data?.kv?.[0]?.fieldTextEn);
  const [location, setLocation] = useState(data?.location?.[0]?.fieldTextEn);
  const [editorContent, setEditorContent] = useState(
    data?.content?.[0]?.fieldTextEn
  );
  const [file, setFile] = useState(data?.fileEn?.[0]?.fieldValue);

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

  const slideData = Object.entries(data).filter(([key, value]) =>
    key.includes("slide_image")
  );

  return (
    <div
      style={{
        display: locale === "en" ? "" : "none",
      }}
    >
      <div className={styles.cmsUpdateArticleContent__container}>
        <ControllerInput
          label={"標籤"}
          elementId={"tagEn"}
          value={tag}
          onChangeFun={setTag}
          placeholder={"請輸入標籤"}
        />
        <h3>活動資訊</h3>
        <ControllerRadioButton
          elementId="contentInfoEn"
          label={"內文資訊"}
          required={true}
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
        <ControllerRadioButton
          elementId="memberInfoEn"
          label={"人員資訊"}
          required={true}
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
        <ControllerRadioButton
          elementId="locationInfoEn"
          label={"地點資訊"}
          required={true}
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

        <h3>主題資訊</h3>
        <ControllerInput
          label={"標題"}
          required={true}
          elementId={"titleEn"}
          value={title}
          onChangeFun={setTitle}
          placeholder={"請輸入標題"}
        />
        <ControllerInput
          label={"企劃案概要"}
          elementId={"summaryEn"}
          value={summary}
          onChangeFun={setSummary}
          placeholder={"請輸入企劃案概要"}
        />
        <ImageUpload
          label={"主視覺"}
          required={true}
          elementId={"kvEn"}
          value={kv}
          onChangeFun={setKv}
          state={data?.kv?.[0]?.imageUrl}
        />

        <SelectComponent
          label={"地點"}
          required={true}
          name={"locationEn"}
          placeholder={"請選擇地點"}
          options={locationOptions}
          controller={true}
          defaultValue={location}
          setSelect={setLocation}
        />

        <ControllerRadioButton
          elementId="eventTypeEn"
          label={"活動性質"}
          required={true}
          value={eventType}
          onChangeFun={setEventType}
          info={"於詳細頁面顯示活動資訊的團隊詳細介紹等區塊"}
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
        <div className={styles.cmsUpdateArticleContent__container_twoColumn}>
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
            value={maxParticipants}
            onChangeFun={setMaxParticipants}
          />
        </div>
        <h3>內文資訊</h3>
        <ControlEditor
          elementId={"contentEn"}
          content={editorContent}
          setContent={setEditorContent}
        />
        <SlideImageUpload label={"輪播圖片"} type={"en"} state={slideData} />
        <ControllerInput
          label={"附件"}
          elementId={"fileEn"}
          value={file}
          onChangeFun={setFile}
          placeholder={"請輸入附件連結"}
        />

        {memberInfo == "true" && <h3>人員資訊</h3>}
        {memberInfo == "true" && (
          <div className={styles.cmsUpdateArticleContent__container_increase}>
            {member.map((data, index) => (
              <EventMember
                data={data}
                index={index}
                member={member}
                setMember={setMember}
                handleDeleteMember={handleDeleteMember}
                handleToggleMember={handleToggleMember}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                locale={"_En"}
                key={data.id}
              />
            ))}
            <button
              className={styles.cmsArticleContent__container_increase}
              style={{ outline: "none", border: "none" }}
              onClick={handleIncreaseMember}
            >
              <div className={styles.cmsArticleContent__container_increase__icon}>
                <RxPlus />
              </div>
              <span>增加人員資訊</span>
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

const ZhTemplate = ({
  locale,
  themeInfo,
  setThemeInfo,
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
  registrationEndDate,
  setRegistrationEndDate,
  activityStartDate,
  setActivityStartDate,
  activityEndDate,
  setActivityEndDate,
  activityStartTime,
  setActivityStartTime,
  activityEndTime,
  setActivityEndTime,
  activitStartTimeOptions,
  activitEndTimeOptions,
  maxParticipants,
  setMaxParticipants,
  data,

  member,
  setMember,
  handleIncreaseMember,
  handleDeleteMember,
  handleToggleMember,
}) => {
  const [tag, setTag] = useState(data?.tag?.[0]?.fieldTextZh);
  const [title, setTitle] = useState(data?.title?.[0]?.fieldTextZh);
  const [summary, setSummary] = useState(data?.summary?.[0]?.fieldTextZh);
  const [kv, setKv] = useState(data?.kv?.[0]?.fieldTextZh);
  const [location, setLocation] = useState(data?.location?.[0]?.fieldTextZh);
  const [editorContent, setEditorContent] = useState(
    data?.content?.[0]?.fieldTextZh
  );

  const [file, setFile] = useState(data?.file?.[0]?.fieldValue);

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

  const slideData = Object.entries(data).filter(([key, value]) =>
    key.includes("slide_image")
  );

  return (
    <div
      style={{
        display: locale === "zh" ? "" : "none",
      }}
    >
      <div className={styles.cmsUpdateArticleContent__container}>
        <ControllerInput
          label={"標籤"}
          elementId={"tag"}
          value={tag}
          onChangeFun={setTag}
          placeholder={"請輸入標籤"}
        />
        <h3>活動資訊</h3>

        <ControllerRadioButton
          elementId="contentInfo"
          label={"內文資訊"}
          required={true}
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
        <ControllerRadioButton
          elementId="memberInfo"
          label={"人員資訊"}
          required={true}
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
        <ControllerRadioButton
          elementId="locationInfo"
          label={"地點資訊"}
          required={true}
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

        <h3>主題資訊</h3>
        <ControllerInput
          label={"標題"}
          required={true}
          elementId={"title"}
          value={title}
          onChangeFun={setTitle}
          placeholder={"請輸入標題"}
        />
        <ControllerInput
          label={"企劃案概要"}
          elementId={"summary"}
          value={summary}
          onChangeFun={setSummary}
          placeholder={"請輸入企劃案概要"}
        />

        <ImageUpload
          label={"主視覺"}
          required={true}
          elementId={"kv"}
          value={kv}
          onChangeFun={setKv}
          state={data?.kv?.[0]?.imageUrl}
        />

        <SelectComponent
          label={"地點"}
          required={true}
          name={"location"}
          placeholder={"請選擇地點"}
          options={locationOptions}
          controller={true}
          defaultValue={location}
          setSelect={setLocation}
        />

        <ControllerRadioButton
          elementId="eventType"
          label={"活動性質"}
          required={true}
          value={eventType}
          onChangeFun={setEventType}
          info={"於詳細頁面顯示活動資訊的團隊詳細介紹等區塊"}
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
        <div className={styles.cmsUpdateArticleContent__container_twoColumn}>
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
            value={maxParticipants}
            onChangeFun={setMaxParticipants}
          />
        </div>
        <h3>內文資訊</h3>
        <ControlEditor
          elementId={"content"}
          content={editorContent}
          setContent={setEditorContent}
        />
        <SlideImageUpload label={"輪播圖片"} type={"zh"} state={slideData} />
        <ControllerInput
          label={"附件"}
          elementId={"file"}
          value={file}
          onChangeFun={setFile}
          placeholder={"請輸入附件連結"}
        />

        {memberInfo == "true" && <h3>人員資訊</h3>}

        {memberInfo == "true" && (
          <div className={styles.cmsUpdateArticleContent__container_increase}>
            {member.map((data, index) => (
              <EventMember
                data={data}
                index={index}
                member={member}
                setMember={setMember}
                handleDeleteMember={handleDeleteMember}
                handleToggleMember={handleToggleMember}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
                locale={""}
                key={data.id}
              />
            ))}

            <button
              className={styles.cmsArticleContent__container_increase}
              style={{ outline: "none", border: "none" }}
              onClick={handleIncreaseMember}
            >
              <div className={styles.cmsArticleContent__container_increase__icon}>
                <RxPlus />
              </div>
              <span>增加人員資訊</span>
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default function EventType({ pageData, locale }) {
  const data = pageData.reduce((acc, item) => {
    if (!acc[item.elementId]) {
      acc[item.elementId] = [];
    }
    acc[item.elementId].push(item);
    return acc;
  }, {});

  console.log(pageData);

  const [themeInfo, setThemeInfo] = useState(
    data?.title?.length > 0 ? "true" : "false"
  );
  const [contentInfo, setContentInfo] = useState(
    data?.content?.length > 0 ? "true" : "false"
  );

  const [memberInfo, setMemberInfo] = useState(
    Object.keys(data).some((key) => key.includes("member")) ? "true" : "false"
  );

  const [locationInfo, setLocationInfo] = useState(
    data.location?.length > 0 ? "true" : "false"
  );

  const [eventType, setEventType] = useState(data.eventType?.[0]?.fieldValue);
  const [maxParticipants, setMaxParticipants] = useState(
    data.maxParticipants?.[0]?.fieldValue
  );
  const [registrationStartDate, setRegistrationStartDate] = useState(
    data.registrationStartDate?.[0]?.fieldValue
  );
  const [registrationEndDate, setRegistrationEndDate] = useState(
    data.registrationEndDate?.[0]?.fieldValue
  );

  const [activityStartDate, setActivityStartDate] = useState(
    data.activityStartDate?.[0]?.fieldValue
  );
  const [activityEndDate, setActivityEndDate] = useState(
    data.activityEndDate?.[0]?.fieldValue
  );

  const [activityStartTime, setActivityStartTime] = useState(
    data.activityStartTime?.[0]?.fieldValue
  );
  const [activityEndTime, setActivityEndTime] = useState(
    data.activityEndTime?.[0]?.fieldValue
  );

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

  const memberData = Object.entries(data)
    .filter(([key, value]) => key.includes("member_"))
    ?.reduce((acc, item) => {
      const match = item[0].match(/^[^_]*_[^_]*_(.*)$/);
      if (match) {
        const key = match[1];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
      }
      return acc;
    }, {});

  const memberkDataArray = Object.values(memberData || {});

  console.log(memberkDataArray);

  const [member, setMember] = useState(
    memberkDataArray.length > 0
      ? memberkDataArray.map((item, index) =>
        item.reduce((acc, [key, value]) => {
          acc[key] = value;
          return {
            ...acc,
            ...{
              open: true,
              id: index + 1,
              key: key.match(/^[^_]*_[^_]*_(.*)$/)[1],
            },
          };
        }, {})
      )
      : [{ id: 1, open: true, key: nanoid() }]
  );

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

  const showSingleMemberAlert = () => {
    Alert({
      icon: "error",
      title: "刪除失敗",
      text: "人員資訊不可少於一項",
      showCancelButton: false,
      confirmButtonText: "確認",
    });
  };

  const showDeleteConfirmationAlert = (id) => {
    Alert({
      icon: "warning",
      title: "確定刪除此區塊？",
      showCancelButton: false,
      confirmButtonText: "確認",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMember(id);
      }
    });
  };

  const removeMember = (id) => {
    setMember((prev) => prev.filter((data) => data.id !== id));
  };

  const handleDeleteMember = (id) => {
    if (member.length === 1) {
      showSingleMemberAlert();
    } else {
      showDeleteConfirmationAlert(id);
    }
  };


  return (
    <div>
      <ZhTemplate
        locale={locale}
        themeInfo={themeInfo}
        setThemeInfo={setThemeInfo}
        contentInfo={contentInfo}
        setContentInfo={setContentInfo}
        memberInfo={memberInfo}
        setMemberInfo={setMemberInfo}
        locationInfo={locationInfo}
        setLocationInfo={setLocationInfo}
        eventType={eventType}
        setEventType={setEventType}
        maxParticipants={maxParticipants}
        setMaxParticipants={setMaxParticipants}
        registrationStartDate={registrationStartDate}
        setRegistrationStartDate={setRegistrationStartDate}
        registrationEndDate={registrationEndDate}
        setRegistrationEndDate={setRegistrationEndDate}
        activityStartDate={activityStartDate}
        setActivityStartDate={setActivityStartDate}
        activityEndDate={activityEndDate}
        setActivityEndDate={setActivityEndDate}
        activityStartTime={activityStartTime}
        setActivityStartTime={setActivityStartTime}
        activityEndTime={activityEndTime}
        setActivityEndTime={setActivityEndTime}
        activitStartTimeOptions={activitStartTimeOptions}
        activitEndTimeOptions={activitEndTimeOptions}
        data={data}
        member={member}
        setMember={setMember}
        handleToggleMember={handleToggleMember}
        handleIncreaseMember={handleIncreaseMember}
        handleDeleteMember={handleDeleteMember}
      />

      <EnTemplate
        locale={locale}
        themeInfo={themeInfo}
        setThemeInfo={setThemeInfo}
        contentInfo={contentInfo}
        setContentInfo={setContentInfo}
        memberInfo={memberInfo}
        setMemberInfo={setMemberInfo}
        locationInfo={locationInfo}
        setLocationInfo={setLocationInfo}
        eventType={eventType}
        setEventType={setEventType}
        maxParticipants={maxParticipants}
        setMaxParticipants={setMaxParticipants}
        registrationStartDate={registrationStartDate}
        setRegistrationStartDate={setRegistrationStartDate}
        registrationEndDate={registrationEndDate}
        setRegistrationEndDate={setRegistrationEndDate}
        activityStartDate={activityStartDate}
        setActivityStartDate={setActivityStartDate}
        activityEndDate={activityEndDate}
        setActivityEndDate={setActivityEndDate}
        activityStartTime={activityStartTime}
        setActivityStartTime={setActivityStartTime}
        activityEndTime={activityEndTime}
        setActivityEndTime={setActivityEndTime}
        activitStartTimeOptions={activitStartTimeOptions}
        activitEndTimeOptions={activitEndTimeOptions}
        data={data}
        member={member}
        setMember={setMember}
        handleToggleMember={handleToggleMember}
        handleIncreaseMember={handleIncreaseMember}
        handleDeleteMember={handleDeleteMember}
      />
      <input type="hidden" name="templateId" value={5} />
    </div>
  );
}
