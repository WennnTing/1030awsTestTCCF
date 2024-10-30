"use server";

import { getCookies } from "./auth";
import { fetchWithErrorHandling } from "@/utils/fetcher";

export async function getAllHeaders() {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/header`,
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

// 前台取得所有可見的 header
export async function _getAllVisibleHeaders() {
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/header/visible`,
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

export async function getHeaderByID(id) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/header/${id}`,
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

export async function getSidebarsByHeaderID(id) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/header/sidebars?headerId=${id}`,
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

export async function createHeader(data) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/header`,
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

export async function deleteHeader(id) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/header/${id}`,
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

export async function updateHeader(data, id) {
  const token = await getCookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/header/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}
