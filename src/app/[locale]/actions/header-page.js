"use server";

import { getCookies } from "./auth";
import { fetchWithErrorHandling } from "@/utils/fetcher";

export async function getPagesByHeaderId(id) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/header-pages/pages?headerId=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      cache: "no-cache",
    }
  );
  return response;
}

export async function getHeaderPageRelationships(id) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/header-pages/relationships?headerId=${id}`,
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

export async function createHeaderPage(data) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/header-pages`,
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

export async function deleteHeaderPage(id, uuid) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/header-pages?headerId=${id}&page_uuid=${uuid}`,
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
