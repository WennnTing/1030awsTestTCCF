"use server";

import { fetchWithErrorHandling } from "@/utils/fetcher";
import { cookies } from "next/headers";

export async function getCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get("tccf")?.value;
  return token;
}

export async function getExhibitionCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get("tccf_exhibition")?.value;
  return token;
}

export async function loginAuth(data) {
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/admin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}

export async function _loginByUser(data) {
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}

export async function _loginByAdmin(data) {
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/admin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
}

export async function getProfile() {
  const token = (await getCookies()) || (await getExhibitionCookies());
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
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

export async function _getAdminProfile() {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
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

export async function _getUserProfile() {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
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

export async function changePassword(data) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`,
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
