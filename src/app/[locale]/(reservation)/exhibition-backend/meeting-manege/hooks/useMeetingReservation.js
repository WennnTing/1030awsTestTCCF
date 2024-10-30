import { useState, useEffect } from "react";
import {
    API_GetMeetingCalendarByAdmin,
    API_GetMeetingTimeLimitByAdmin,
    API_GetEntityOverviewList,
    API_SearchMemberAvailableTimeByAdmin,
    API_GetMemberAvailableLocationByAdmin,
    API_CreateCalendarEventByAdmin,
    API_SettingMeetingRuleByAdmin
} from "@/api/api";

export const useMeetingReservation = (memberId) => {
    const [events, setEvents] = useState([]);
    const [meetingTimeLimit, setMeetingTimeLimit] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [availableData, setAvailableData] = useState([]);
    const [entityList, setEntityList] = useState([]);

    // 取得所有專案/公司
    const getAllEntity = async () => {
        try {
            const res = await API_GetEntityOverviewList();
            if (Array.isArray(res)) {
                const formattedData = res.map((item) => ({
                    value: item.entityId,
                    label: item.subject,
                    type: item.entiryOverviewType,
                    description: item.description,
                }));
                setEntityList(formattedData);
            } else {
                console.error("Expected an array but got:", res);
            }
        } catch (error) {
            console.error("Error getting entity list", error);
        }
    };


    // 取得會員會議日曆
    // 避免渲染出錯，所以會判斷是否為陣列，如果有錯誤則設定為空陣列
    const getMeetingData = async () => {
        try {
            const response = await API_GetMeetingCalendarByAdmin(memberId);
            setEvents(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error("Error fetching meeting data:", error);
            setEvents([]);
        }
    };

    // 取得會員會議限制時段
    const getLimitTimeData = async () => {
        try {
            const response = await API_GetMeetingTimeLimitByAdmin(memberId);
            setMeetingTimeLimit(response || []);
        } catch (error) {
            console.error("Error fetching meeting time limits:", error);
        }
    };

    // 獲取可預約時間
    const fetchAvailableTimes = async (requestData) => {
        try {
            const times = await API_SearchMemberAvailableTimeByAdmin(JSON.stringify(requestData));

            if (times && times.message) {
                return { message: times.message };
            }

            setAvailableTimes(times);
            return times;
        } catch (error) {
            console.error("Error fetching available times:", error);
            return null;
        }
    };


    // 創建會議預約
    const createCalendarEvent = async (requestData) => {
        try {
            const response = await API_CreateCalendarEventByAdmin(JSON.stringify(requestData));
            return response;
        } catch (error) {
            console.error("Error creating calendar event:", error);
            throw error;
        }
    };

    // 獲取可預約人員和地點
    const fetchAvailableLocationsAndMembers = async (requestData) => {
        try {
            const response = await API_GetMemberAvailableLocationByAdmin(JSON.stringify(requestData));
            const formattedLocationOptions = [
                ...(response.inviteeLocation ? [response.inviteeLocation] : []),
                ...(response.inviterLocation ? [response.inviterLocation] : []),
                ...(response.vipRooms || []),
                ...(response.otherLocation ? [response.otherLocation] : []),
            ].map((location) => ({
                value: location.meetingLocationId,
                label: location.location,
            }));

            const availableMembers = response.availableReserveMemberDetails?.map((member) => ({
                memberId: member.memberId,
                nameZH: member.nameZH,
                nameEN: member.nameEN,
                jobTitle: member.jobTitle,
                phone: member.phone,
                email: member.email,
            })) || [];

            setAvailableData({
                members: availableMembers,
                locations: formattedLocationOptions,
            });
        } catch (error) {
            console.error("Error fetching available members and locations:", error);
        }
    };

    // 開通會議
    const settingMeeting = async (requestData) => {
        try {
            const response = await API_SettingMeetingRuleByAdmin(JSON.stringify(requestData));
            return response;
        } catch (error) {
            console.error("Error setting meeting:", error);
            throw error;
        }
    };

    useEffect(() => {
        getAllEntity();
        getMeetingData();
        getLimitTimeData();
    }, [memberId]);

    return {
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
        settingMeeting
    };
};
