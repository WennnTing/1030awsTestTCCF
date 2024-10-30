"use client";
import { useEffect, useState, Fragment, Suspense } from "react";
import { usePathname } from "next/navigation";
import styles from "./meetingEdit.module.scss";
import Swal from "sweetalert2";
import moment from "moment";
import customStyles from "@/(reservation)/exhibition-backend/_components/ReactSelect/reactSelectStyles";

// icons
import { BiCalendarCheck } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";

// components
import Button from "@/(reservation)/exhibition/components/Button/Button";
import Dialog from "@/(reservation)/exhibition/components/Dialog/Dialog";
import { TimeRadioBox } from "@/components/reservation/radio-box";
import LoadingScreen from "@/components/reservation/loading-screen";
import { BackendFullCalendar } from "@/(reservation)/exhibition-backend/_components/FullCalendar/Backend-full-calendar";
import BackendCalendar from "@/(reservation)/exhibition-backend/_components/Calendar/backendCalendar";
import NormalSelect from "@/(reservation)/exhibition/exhibitioninfo/components/NormalSelect";
import { BackendRadioBox, BackendTimeRadioBox } from "@/(reservation)/exhibition-backend/_components/RadioBox/BackendRadioBox";
import Select from 'react-select';

// hooks
import { useMeetingReservation } from "../../hooks/useMeetingReservation";

export default function MeetingEditPage() {
    const Swal = require("sweetalert2");
    const pathname = usePathname();
    const memberId = pathname.split("/").pop();
    const {
        events,
        meetingTimeLimit,
        availableTimes,
        availableData,
        entityList,
        getMeetingData,
        getLimitTimeData,
        fetchAvailableTimes,
        fetchAvailableLocationsAndMembers,
        createCalendarEvent,
        settingMeeting,
    } = useMeetingReservation(memberId);

    const [loading, setLoading] = useState({
        isLoading: false,
        meetingLoading: false
    })
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [selectedStartTime, setSelectedStartTime] = useState(null);
    const [selectedEndTime, setSelectedEndTime] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const startTime = Array.isArray(availableTimes) ? availableTimes.map((slot, index) => ({
        id: index + 1,
        value: slot.startDateTime,
        isLocationCustom: slot.isLocationCustom,
    })) : [];

    const endTime = Array.isArray(availableTimes) ? availableTimes.map((slot, index) => ({
        id: index + 1,
        value: slot.endDateTime,
        isLocationCustom: slot.isLocationCustom,
    })) : [];

    // 取得日曆資訊
    const fetchEvents = async () => {
        setLoading((prev) => ({ ...prev, isLoading: true }));
        await getMeetingData();
        setLoading((prev) => ({ ...prev, isLoading: false }));
    };

    // 重置預約流程
    const resetReservationProcess = () => {
        setSelectedDate(null);
        setSelectedEntity(null);
        setSelectedStartTime(null);
        setSelectedEndTime(null);
        setSelectedMember(null);
        setSelectedLocation(null);
        setCurrentStep(1); // 重置到第一步
    };

    useEffect(() => {
        getLimitTimeData();
        fetchEvents();
    }, [memberId]);

    // 開關 Dialog
    const toggleDialog = () => {
        if (dialogOpen) {
            resetReservationProcess();
        }
        setDialogOpen((prev) => !prev);
    };

    // 開通會議
    const handleSettingMeeting = async () => {
        try {
            const requestData = {
                UserId: memberId,   // 只傳入 memberId
                LimiteDateTimeRanges: []  // 空的時間範圍
            };
            setLoading((prev) => ({ ...prev, meetingLoading: true }));

            const response = await settingMeeting(requestData);  // 調用 settingMeeting API

            if (response && response.message && response.message.includes("服務已申請成功，請至Email點擊同意。")) {
                Swal.fire({
                    icon: "success",
                    title: "開通成功",
                    showConfirmButton: true
                }).then(() => {
                    getMeetingData();
                    getLimitTimeData();
                    setLoading((prev) => ({ ...prev, meetingLoading: false }));

                });
            } else if (response && response.message && response.message.includes("會員已申請會議功能。")) {
                Swal.fire({
                    icon: "warning",
                    title: "此會員已開通日曆功能",
                    showConfirmButton: true
                }).then(() => {
                    setLoading((prev) => ({ ...prev, meetingLoading: false }));
                });
            } else if (response && response.message && response.message.includes("該會員無展證資訊")) {
                Swal.fire({
                    icon: "warning",
                    title: "該會員無展證資訊，無法開通",
                    showConfirmButton: true
                }).then(() => {
                    setLoading((prev) => ({ ...prev, meetingLoading: false }));
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "開通失敗，請稍後再試",
                    showConfirmButton: true
                }).then(() => {
                    setLoading((prev) => ({ ...prev, meetingLoading: false }));
                });
            }
        } catch (error) {
            console.error("Error setting meeting:", error);
            Swal.fire({
                icon: "error",
                title: "開通失敗，請稍後再試",
                showConfirmButton: true
            }).then(() => {
                setLoading((prev) => ({ ...prev, meetingLoading: false }));
            });
        }
    };

    // Step 1: 選擇日期和專案 /公司，取得可預約時間
    const handleStep1Next = async () => {
        if (selectedDate && selectedEntity) {
            const requestData = {
                MemberId: memberId,
                EntityId: selectedEntity.value,
                BussinessType: selectedEntity.type,
                Date: selectedDate,
            };
            const response = await fetchAvailableTimes(requestData);
            if (response && response.message === "該時段無可預約人員") {
                Swal.fire({
                    icon: "warning",
                    title: "該時段無可預約人員",
                    showConfirmButton: true
                });
            } else {
                setCurrentStep(2);
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: "請選擇日期和專案/公司",
                showConfirmButton: true
            });
        }
    };

    // Step 2: 選擇開始和結束時間，取得可預約人員和地點
    // 使用 moment 來比較時間
    const handleStep2Next = async () => {
        if (selectedStartTime && selectedEndTime) {
            const startMoment = moment(selectedStartTime);
            const endMoment = moment(selectedEndTime);

            if (startMoment.isSameOrAfter(endMoment)) {
                // 防呆：如果開始時間比結束時間晚或相同，顯示錯誤提示
                Swal.fire({
                    icon: "warning",
                    text: "開始時間不能晚於或等於結束時間",
                    showConfirmButton: true,
                });
                return;
            }

            const requestData = {
                MemberId: memberId,
                EntityId: selectedEntity.value,
                BussinessType: selectedEntity.type,
                startDateTime: selectedStartTime,
                endDateTime: selectedEndTime,
            };

            await fetchAvailableLocationsAndMembers(requestData);
            setCurrentStep(3);
        }
    };

    // Step 3: 預約
    const handleStep3Submit = async () => {
        setLoading((prev) => ({ ...prev, isLoading: true }));

        const inviterMemberId = memberId;
        const entityId = selectedEntity?.value;
        const meetingType = selectedEntity?.type;
        const subject = selectedEntity?.label;
        const description = selectedEntity?.description || '';
        const startDateTime = selectedStartTime;
        const endDateTime = selectedEndTime;
        const meetingLocationId = selectedLocation?.value;
        const location = selectedLocation?.label;

        const requestData = {
            InviterMemberId: inviterMemberId,
            InteeMemberId: selectedMember?.memberId,
            InteeEmail: selectedMember?.email,
            EntityId: entityId,
            MeetingType: meetingType,
            Subject: subject,
            Description: description,
            StartDateTime: startDateTime,
            EndDateTime: endDateTime,
            MeetingLocationId: meetingLocationId,
            location: location,
        };

        try {
            const response = await createCalendarEvent(requestData);
            if (response.message === "success") {
                Swal.fire({
                    icon: "success",
                    title: "預約成功",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    getMeetingData();
                    toggleDialog();
                    setLoading((prev) => ({ ...prev, isLoading: false }));

                });
            } else if (response.message === "您該時段已預約") {
                Swal.fire({
                    icon: "warning",
                    title: "該時段已被預約",
                    showConfirmButton: true,
                }).then(() => {
                    setLoading((prev) => ({ ...prev, isLoading: false }));
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "預約失敗，請稍後再試",
                    showConfirmButton: true,
                }).then(() => {
                    setLoading((prev) => ({ ...prev, isLoading: false }));
                });
            }
        } catch (error) {
            console.error("Error creating calendar event:", error);
            Swal.fire({
                icon: "error",
                title: "系統錯誤，請稍後再試",
                showConfirmButton: true,
            });
            setLoading((prev) => ({ ...prev, isLoading: false }));
        }
    };

    // 選擇日期的處理
    const handleDateChange = (date) => {
        const formattedDate = moment(date).format("YYYY-MM-DD");
        setSelectedDate(formattedDate);
    };

    return (
        <div className={styles.reservationMeeting}>
            {loading.meetingLoading && <LoadingScreen />}
            <div className={styles.reservationMeeting__calendar}>
                <div className={styles.reservationMeeting__calendar_header}>
                    <h2 className={styles.reservationMeeting__calendar_header__title}>
                        會議行程表
                    </h2>
                    {Array.isArray(meetingTimeLimit) && (
                        <div className={styles.reservationMeeting__calendar_header__buttons}>
                            <Button text={"會議預約"} icon={<BiCalendarCheck />} onClick={toggleDialog} />
                        </div>
                    )}

                    <Dialog
                        open={dialogOpen}
                        title={"會議預約"}
                        onClose={toggleDialog}
                    >
                        {/* 階段 1: 選擇日期和專案/公司 */}
                        {currentStep === 1 && (
                            <Fragment>

                                <Select
                                    value={selectedEntity}
                                    options={entityList}
                                    placeholder={"請選擇預約專案/公司"}
                                    isClearable
                                    isSearchable
                                    styles={customStyles}
                                    onChange={(entity) => setSelectedEntity(entity)}
                                />

                                <BackendCalendar
                                    label={"會議日期"}
                                    required={true}
                                    name={"meetingDate"}
                                    placeholder={"請選擇會議日期"}
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />

                                <div className={styles.reservationMeeting__dialogButton}>
                                    <Button text={"下一步"} onClick={handleStep1Next} />
                                </div>
                            </Fragment>
                        )}

                        {/* 階段 2: 選擇開始和結束時間 */}
                        {currentStep === 2 && (
                            <Fragment>
                                <BackendTimeRadioBox
                                    label={"會議開始時間"}
                                    name={"startTime"}
                                    required={true}
                                    option={startTime}
                                    onChange={(startTime) => setSelectedStartTime(startTime)}
                                />
                                <BackendTimeRadioBox
                                    label={"會議結束時間"}
                                    name={"endTime"}
                                    required={true}
                                    option={endTime}
                                    onChange={(endTime) => setSelectedEndTime(endTime)}
                                />
                                <div className={styles.reservationMeeting__dialogButton}>
                                    <Button text={"下一步"} onClick={handleStep2Next} />
                                </div>
                            </Fragment>
                        )}

                        {/* 階段 3: 選擇預約人員和地點 */}
                        {currentStep === 3 && (
                            <Fragment>
                                {loading.isLoading && <LoadingScreen />}

                                <NormalSelect
                                    label={"預約人員"}
                                    options={availableData?.members?.map((member) => ({
                                        label: member.nameEN && member.nameEN.trim() !== ""
                                            ? member.nameEN
                                            : "該帳號尚未更新名稱",
                                        value: member.memberId,
                                    })) || []}
                                    value={selectedMember?.memberId || ''}
                                    onChange={(event) => {
                                        const memberId = event.target.value;
                                        const selected = availableData?.members?.find(m => m.memberId === parseInt(memberId, 10));
                                        if (selected) {
                                            setSelectedMember(selected);
                                        }
                                    }}
                                    defaultText={"請選擇預約人員"}
                                />

                                <BackendRadioBox
                                    label={"會議地點"}
                                    name={"meetingLocation"}
                                    required={true}
                                    options={availableData?.locations || []}
                                    onChange={(locationId) => {
                                        const selectedLocationObj = availableData?.locations?.find(
                                            (loc) => loc.value === parseInt(locationId, 10)
                                        );

                                        if (selectedLocationObj) {
                                            setSelectedLocation(selectedLocationObj);
                                            console.log("Selected Location Object:", selectedLocationObj);
                                        }
                                    }}
                                />

                                <div className={styles.reservationMeeting__dialogButton}>
                                    <Button
                                        text={"確認預約"}
                                        onClick={handleStep3Submit}
                                    />
                                </div>
                            </Fragment>
                        )}
                    </Dialog>
                </div>

                {/* 判斷 events 是否有值 */}
                {
                    Array.isArray(meetingTimeLimit) ? (
                        <Suspense fallback={<LoadingScreen />}>
                            <BackendFullCalendar
                                events={events}
                                timeLimit={meetingTimeLimit}
                                onMeetingDeleted={fetchEvents}
                            />
                        </Suspense>
                    ) : (
                        <div className={styles.reservationMeeting__noCalendar}>
                            <span><FaRegCalendarAlt /></span>
                            <p>此會員尚未開通日曆</p>
                            <Button
                                text={"開通日曆"}
                                onClick={handleSettingMeeting}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}
