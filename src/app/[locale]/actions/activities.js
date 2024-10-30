"use server";

import { redirect } from "../../../navigation";
import { revalidatePath } from "next/cache";

import {
  _registerForActivity,
  _unregisterFromActivity,
} from "./_activity-registrations";
import { _getActivities } from "./_activities";
import { getExhibitionCookies } from "./auth";
import { headers } from "next/headers";

export async function registerActivity(props) {
  let msg = {};
  const auth = await getExhibitionCookies();

  if (props.type === "site") {
    if (auth === undefined) {
      msg["auth"] = false;
    } else {
      const response = await _registerForActivity(props.id);
      const currentPath = headers().get("x-current-path");
      revalidatePath(currentPath.replace(/^\/(en|zh)/, ""));
      if (response && response.message) {
        if (response.message.includes("成功")) {
          return "success";
        } else if (response.message.includes("時間已過")) {
          msg["message"] = "closed";
        } else if (response.message.includes("人數已滿")) {
          msg["message"] = "full";
        } else if (response.message.includes("時間重疊")) {
          msg["message"] = "overlapping";
        } else if (response.message.includes("重複報名")) {
          msg["message"] = "repeat";
        } else {
          msg["message"] = response.message;
        }
      }
    }

    return {
      msg,
    };
  } else {
    const response = await _registerForActivity(props.id);
    revalidatePath("/exhibition/activities");

    if (response && response.message) {
      if (response.message.includes("成功")) {
        redirect("/exhibition/activities");
        return "success";
      } else if (response.message.includes("時間已過")) {
        msg["message"] = "closed";
      } else if (response.message.includes("人數已滿")) {
        msg["message"] = "full";
      } else if (response.message.includes("時間重疊")) {
        msg["message"] = "overlapping";
      } else if (response.message.includes("重複報名")) {
        msg["message"] = "repeat";
      } else {
        msg["message"] = response.message;
      }
    }
    return {
      msg,
    };
  }
}

export async function unregisterActivity(id) {
  const response = await _unregisterFromActivity(id);

  if (response && response.message.includes("成功")) {
    revalidatePath("/exhibition/activities");
    return "success";
  } else {
    revalidatePath("/exhibition/activities");
    return response;
  }
}

export async function searchActivities(prevState, formData) {
  const text = formData.get("SearchText");
  const location = formData.get("location");
  const activities = await _getActivities();

  const filteredActivities = () => {
    if (text === "" && location === "") {
      return activities?.data;
    } else if (text && !location) {
      return activities?.data?.filter(
        (activity) =>
          activity.activityName.includes(text) ||
          activity.activityNameEn.includes(text)
      );
    } else if (location && !text) {
      return activities?.data?.filter(
        (activity) =>
          activity.location.includes(location) ||
          activity.locationEn.includes(location)
      );
    } else {
      return activities?.data?.filter(
        (activity) =>
          (activity.activityName.includes(text) ||
            activity.activityNameEn.includes(text)) &&
          (activity.location.includes(location) ||
            activity.locationEn.includes(location))
      );
    }
  };

  return filteredActivities();
}
