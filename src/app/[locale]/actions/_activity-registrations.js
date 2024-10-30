"use server";

import { getExhibitionCookies } from "./auth";
import { fetchWithErrorHandling } from "@/utils/fetcher";

export async function _registerForActivity(id) {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/activity-registrations/register?activityId=${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

export async function _unregisterFromActivity(id) {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/activity-registrations/unregister?activityId=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

export async function _checkRegistration(id) {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/activity-registrations/check-registration/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

export async function _getActivityRegistrationList() {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/activity-registrations/get-activity-registration-list`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}
