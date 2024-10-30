"use server";
import moment from "moment";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "../../../navigation";
import {
  _settingMeetingRule,
  _searchReserveMember,
  _createCalendarEvent,
  _deleteEvent,
  _searchMemberAvailableTime,
  _getMemberAvailableLocation,
  _updateMeetingTimeLimit,
  _updateCalendarEvent,
} from "./_meeting-reservation";
import {
  _getMeetingSubject,
  _searchEntityOverList,
  _serachMeetingExhibitPassMemberList,
} from "./_meeting-detail";
export async function reserveMeeting(prevState, formData) {
  let errors = {};
  let msg = {};
  const fields = [
    {
      key: "meetingLocation",
      message: "請選擇會議地點",
    },
    {
      key: "inteeMember",
      message: "請選擇會議人員",
    },
  ];

  fields.forEach(({ key, message }) => {
    if (!formData.get(key)) {
      errors[key] = message;
    }
  });

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const data = {
    InteeMemberId: formData.get("inteeMember").split("_")[0],
    InteeEmail: formData.get("inteeMember").split("_")[1],
    EntityId: formData.get("entityId"),
    MeetingType: formData.get("meetingLocation").split("#@#")[0],
    location: formData.get("meetingLocation").split("#@#")[1],
    MeetingLocationId: formData.get("meetingLocation").split("#@#")[2],
    Subject: formData.get("subject"),
    StartDateTime: formData.get("startDateTime"),
    EndDateTime: formData.get("endDateTime"),
    Description: formData.get("description"),
  };

  console.log(data);

  const response = await _createCalendarEvent(data);
  if (response && response.message) {
    if (response.message.includes("無法預約自己")) {
      msg["message"] = response.message;
      return msg;
    } else {
      revalidatePath("/exhibition/meeting");
      redirect("/exhibition/meeting");
    }
  }

  // console.log(result);

  // revalidatePath("/exhibition/meeting");
  // redirect("/exhibition/meeting");
}

export async function reserveMeetingFunction(status, prevState, formData) {
  // 查詢會議時間
  if (status === "date") {
    return searchMemberAvailableTime(prevState, formData);
  } else {
    return searchMeetingMemberAndLocation(prevState, formData);
  }
}

export async function searchMemberAvailableTime(prevState, formData) {
  let errors = {};
  let result = {};
  let errorMsg = {};
  if (!formData.get("meetingDate")) {
    errors["date"] = "請選擇會議日期";
  }

  // EntityId
  // BussinessType
  // Date

  const data = {
    EntityId: formData.get("entityId"),
    BussinessType: formData.get("entiryOverviewType"),
    Date: moment(formData.get("meetingDate"), "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    ),
  };

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const response = await _searchMemberAvailableTime(data);
  console.log(response);

  if (response) {
    if (response?.message) {
      errorMsg["message"] = response.message;
      return {
        errorMsg,
      };
    } else {
      result["timeResult"] = response;
      return result;
    }
  }
}

export async function searchMeetingMemberAndLocation(prevState, formData) {
  let errors = {};
  let result = {};
  let errorMsg = {};
  // if (!formData.get("meetingDate")) {
  //   errors["date"] = "請選擇會議日期";
  // }

  if (!formData.get("startTime") || !formData.get("endTime")) {
    errors["time"] = "請選擇會議開始與結束時間";
  } else if (
    moment(formData.get("endTime"), "YYYY-MM-DDTHH:mm:ss").isSameOrBefore(
      moment(formData.get("startTime"), "YYYY-MM-DDTHH:mm:ss")
    )
  ) {
    errors["time"] = "會議結束時間不可以早於開始時間";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const data = {
    EntityId: formData.get("entityId"),
    BussinessType: formData.get("entiryOverviewType"),
    StartDateTime: formData.get("startTime"),
    EndDateTime: formData.get("endTime"),
  };

  const response = await _getMemberAvailableLocation(data);
  console.log(response);

  if (response) {
    if (response?.message) {
      errorMsg["message"] = response.message;
      return {
        errorMsg,
      };
    } else {
      result["result"] = response;
      result["startDateTime"] = formData.get("startTime");
      result["endDateTime"] = formData.get("endTime");
      result["subject"] = await Promise.all(
        response.availableReserveMemberDetails.map(async (data) => {
          return {
            memberId: data.memberId,
            message: await _getMeetingSubject(data.memberId),
          };
        })
      );

      return result;
    }
  }
}

export async function setBusyDateAndTime(type, prevState, formData) {
  console.log(type);
  let obj = {};
  let msg = {};
  const contrast = [
    {
      busy_date: "忙碌日期",
      busy_startTime: "忙碌開始時間",
      busy_endTime: "忙碌結束時間",
    },
  ];

  if (type === "busy") {
    Array.from(formData.entries())
      .filter(([key]) => key.includes("busy_"))
      .forEach(([key, value]) => {
        if (value === "") {
          const matchedKey = Object.entries(contrast[0]).find(([item]) =>
            key.includes(item)
          );
          if (matchedKey) {
            obj[key] = `請填寫${matchedKey[1]}欄位`;
          }
        } else {
          if (key.includes("busy_startTime")) {
            if (
              moment(
                formData.get(`busy_endTime_${key.split("_")[2]}`),
                "HH:mm"
              ).isSameOrBefore(moment(formData.get(key), "HH:mm"))
            ) {
              obj["time"] = "忙碌結束時間不可以早於開始時間";
            }
          }
        }
      });
    if (Object.keys(obj).length > 0) {
      const uniqueValues = [...new Set(Object.values(obj))];
      const errors = {};
      uniqueValues.forEach((value) => {
        const key = Object.keys(obj).find((key) => obj[key] === value);
        errors[key] = value;
      });
      return {
        errors,
      };
    }
    const object = {};
    Array.from(formData.entries())
      .filter(([key]) => key.includes("busy_"))
      .forEach(([key, value]) => {
        const match = key.match(/_(\d+)$/);
        if (match) {
          const key = match[1];
          if (!object[key]) {
            object[key] = [];
          }
          object[key].push(value);
        }
      });
    const transformedData = {
      LimiteDateTimeRanges: Object.values(object).map(
        ([date, startTime, endTime]) => ({
          StartDateTime: `${moment(date, "YYYY/MM/DD").format(
            "YYYY-MM-DD"
          )}T${startTime}:00`,
          EndDateTime: `${moment(date, "YYYY/MM/DD").format(
            "YYYY-MM-DD"
          )}T${endTime}:00`,
        })
      ),
    };
    const response = await _settingMeetingRule(transformedData);
    if (response && response.message) {
      msg["message"] = response.message;
      return msg;
    }
  } else {
    const emptyData = {
      LimiteDateTimeRanges: [],
    };
    const response = await _settingMeetingRule(emptyData);
    if (response && response.message) {
      msg["message"] = response.message;
      return msg;
    }
  }

  revalidatePath("/exhibition/meeting");
  redirect("/exhibition/meeting");
}

export async function updateBusyDateAndTime(prevState, formData) {
  let obj = {};

  const contrast = [
    {
      busy_date: "忙碌日期",
      busy_startTime: "忙碌開始時間",
      busy_endTime: "忙碌結束時間",
    },
  ];

  Array.from(formData.entries())
    .filter(([key]) => key.includes("busy_"))
    .forEach(([key, value]) => {
      if (value === "") {
        const matchedKey = Object.entries(contrast[0]).find(([item]) =>
          key.includes(item)
        );
        if (matchedKey) {
          obj[key] = `請填寫${matchedKey[1]}欄位`;
        }
      } else {
        if (key.includes("busy_startTime")) {
          console.log(formData.get(`busy_endTime_${key.split("_")[2]}`));
          if (
            moment(
              formData.get(`busy_endTime_${key.split("_")[2]}`),
              "HH:mm"
            ).isSameOrBefore(moment(formData.get(key), "HH:mm"))
          ) {
            obj["time"] = "忙碌結束時間不可以早於開始時間";
          }
        }
      }
    });

  if (Object.keys(obj).length > 0) {
    const uniqueValues = [...new Set(Object.values(obj))];
    const errors = {};

    uniqueValues.forEach((value) => {
      const key = Object.keys(obj).find((key) => obj[key] === value);
      errors[key] = value;
    });

    return {
      errors,
    };
  }

  const object = {};
  Array.from(formData.entries())
    .filter(([key]) => key.includes("busy_"))
    .forEach(([key, value]) => {
      const match = key.match(/_(\d+)$/);
      if (match) {
        const key = match[1];
        if (!object[key]) {
          object[key] = [];
        }
        object[key].push(value);
      }
    });
  const transformedData = Object.values(object).map(
    ([date, startTime, endTime]) => ({
      StartDateTime: `${moment(date, "YYYY/MM/DD").format(
        "YYYY-MM-DD"
      )}T${startTime}:00`,
      EndDateTime: `${moment(date, "YYYY/MM/DD").format(
        "YYYY-MM-DD"
      )}T${endTime}:00`,
    })
  );

  const result = await _updateMeetingTimeLimit(transformedData);
  console.log(result);
  revalidatePath("/exhibition/meeting");
  redirect("/exhibition/meeting");
}

export async function setCallendarPermission() {
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("tccf_callendar", "true", {
    expires: new Date(Date.now() + oneDay),
  });
}

export async function removeCallendarPermission() {
  cookies().delete("tccf_callendar");
}

export async function deleteMeeting(id) {
  const result = await _deleteEvent(id);
  revalidatePath("/exhibition/meeting");
  return result;
}

export async function updateMeeting(data) {
  console.log(data);
  const result = await _updateCalendarEvent(data);

  revalidatePath("/exhibition/meeting");
  return result;
  // redirect("/exhibition/meeting");
}

export async function searchEntityList(prevState, formData) {
  console.log(formData);
  let result;
  const entries = Array.from(formData.entries());
  const searchText = formData.get("SearchText");
  const searchMarket = entries.filter(([name, value]) =>
    name.includes("SearchMarket")
  );
  const searchProject = entries.filter(([name, value]) =>
    name.includes("SearchProject")
  );

  const serachMember = entries.filter(([name, value]) =>
    name.includes("SearchMember")
  );

  const searchMarketData = searchMarket.reduce((acc, [name, value]) => {
    const key = name.split("_")[1];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(value.replace(/\s+/g, ""));
    return acc;
  }, {});

  const searchProjectData = searchProject.reduce((acc, [name, value]) => {
    const key = name.split("_")[1];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(value.replace(/\s+/g, ""));
    return acc;
  }, {});

  const searchMemberData = serachMember.reduce((acc, [name, value]) => {
    const key = name.split("_")[1];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(value.replace(/\s+/g, ""));
    return acc;
  }, {});

  if (searchProjectData.TaiccaSchool) {
    searchProjectData.TaiccaSchool = true;
  }

  // 如果有選擇展證身份
  if (Object.keys(searchMemberData).length > 0) {
    searchMarketData.OwnerRole = searchMemberData.RoleType;
  }

  const memberData = {
    SearchText: searchText,
    SearchMember:
      Object.keys(searchMemberData).length > 0 ? searchMemberData : null,
  };

  const data = {
    SearchText: searchText,
    SearchMarket: searchMarketData,
    SearchProject: searchProjectData,
  };
  // 去除空值和空物件
  const removeEmptyValues = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([key, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined &&
          !(typeof value === "object" && Object.keys(value).length === 0)
      )
    );
  };

  const filteredEntityData = removeEmptyValues(data);

  const filteredMemberData = removeEmptyValues(memberData);

  if (Object.keys(searchMemberData).length > 0) {
    // entity member
    const entityResponse = await _searchEntityOverList(filteredEntityData);
    const memberResponse = await _serachMeetingExhibitPassMemberList(
      filteredMemberData
    );

    const entityResponseWithType = entityResponse?.map((data) => {
      return {
        ...data,
        type: "entity",
      };
    });

    const memberResponseWithType = memberResponse?.map((data) => {
      return {
        ...data,
        type: "member",
      };
    });

    const response = [...entityResponseWithType, ...memberResponseWithType];

    if (response.length > 0) {
      result = response;
    } else {
      result = [];
    }

    return result;
  } else if (Object.keys(filteredEntityData).length > 0) {
    // entity
    const entityResponse = await _searchEntityOverList(filteredEntityData);
    const entityResponseWithType = entityResponse.map((data) => {
      return {
        ...data,
        type: "entity",
      };
    });

    const response = entityResponseWithType;

    if (response.length > 0) {
      result = response;
    } else {
      result = [];
    }
    return result;
  } else {
    return {};
  }

  //   if (
  //     Object.keys(searchMemberData).length === 0 &&
  //     Object.keys(filteredEntityData).length > 0
  //   ) {
  //     const response = await _searchEntityOverList(filteredEntityData);

  //     if (response) {
  //       result = response;
  //     }

  //     console.log(response);
  //     return result;
  //   } else if (Object.keys(filteredMemberData).length > 0) {
  //     const memberResponse = await _serachMeetingExhibitPassMemberList(
  //       filteredMemberData
  //     );

  //     console.log(memberResponse);
  //   } else {
  //     return {};
  //   }
}
