"use server";

import { getCookies } from "./auth";
import { fetchWithErrorHandling } from "@/utils/fetcher";

export async function getPagesBySidebarId(id) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sidebar-pages/pages?sidebarId=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
  return response;
}

export async function getSidebarPageRelationships(id) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sidebar-pages/relationships?sidebarId=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }
  );
  return response;
}

export async function createSidebarPage(data) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sidebar-pages`,
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

export async function deleteSidebarPage(id, uuid) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sidebar-pages?sidebarId=${id}&page_uuid=${uuid}`,
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
