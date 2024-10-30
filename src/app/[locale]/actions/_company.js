"use server";
import { getExhibitionCookies } from "./auth";
import { fetchWithErrorHandling } from "@/utils/fetcher";

export async function _getCompanyByUserId(id) {
  const token = await getExhibitionCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/companies/user?userId=${id}`,
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
