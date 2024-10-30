"use server";

import { getExhibitionCookies } from "./auth";
import { fetchWithErrorHandling } from "@/utils/fetcher";

export async function _getMeetingCalendar() {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/MeetingDetails/get-meeting-calendar`,
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

export async function _getEntityOverviewList() {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/MeetingDetails/get-entity-overview-list`,
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

export async function _getEntityOverviewDetail(data) {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/MeetingDetails/get-entity-overview-detail`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}

export async function _getMeetingSubject(id) {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/MeetingDetails/get-meeting-subject/${id}`,
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

export async function _searchEntityOverList(data) {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/MeetingDetails/search-entity-over-list`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}

export async function _getMeetingExhibitPassMemberList() {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/MeetingDetails/get-meeting-exhibit-pass-member-list`,
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

export async function _serachMeetingExhibitPassMemberList(data) {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/MeetingDetails/serach-meeting-exhibit-pass-member-list`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}
