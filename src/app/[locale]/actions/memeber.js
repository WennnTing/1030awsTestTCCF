"use server";

import { getCookies } from "./auth";
import { fetchWithErrorHandling } from "@/utils/fetcher";

export async function getAllMembers() {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/member`,
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

export async function addMember(data) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/member`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    }
  );
  return response;
}

export async function deleteMember(id) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/member/${id}`,
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

export async function updateMember(data, id) {
  const token = await getCookies();
  const response = await fetchWithErrorHandling(
    `${process.env.NEXT_PUBLIC_API_URL}/api/member/${id}`,
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

// export async function deleteUser(id) {
//   console.log(id);
//   await deleteMember(id);
//   revalidatePath("/backend/account/account-list");
//   redirect("/backend/account/account-list");
// }

// export async function createUser(preState, formData) {
//   const username = formData.get("Username");
//   const email = formData.get("Email");
//   const password = formData.get("Password");
//   const data = {
//     Username: username,
//     Email: email,
//     Password: password,
//     type: 0,
//   };

//   let errors = {};
//   if (!username || username.trim() === "") {
//     errors.username = "帳號不得為空";
//   }

//   if (!password || password.trim().length < 6) {
//     errors.password = "密碼長度必須在6到100字元之間";
//   }
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!email || !emailRegex.test(email)) {
//     errors.email = "請輸入正確的電子郵件格式";
//   }

//   if (Object.keys(errors).length > 0) {
//     return {
//       errors,
//     };
//   }

//   console.log(data);
//   const result = await addMember(data);
//   revalidatePath("/backend/account/account-list");
//   redirect("/backend/account/account-list");
// }

// export async function updateUser(preState, formData) {
//   const username = formData.get("Username");
//   const email = formData.get("Email");
//   const password = formData.get("Password");
//   const userId = formData.get("userId");
//   console.log(formData);
//   const data = {
//     Username: username,
//     Email: email,
//     // Password: password,
//     Type: 0,
//   };

//   let errors = {};
//   if (!username || username.trim() === "") {
//     errors.username = "帳號不得為空";
//   }

//   // if (!password || password.trim().length < 6) {
//   //   errors.password = "密碼長度必須在6到100字元之間";
//   // }
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!email || !emailRegex.test(email)) {
//     errors.email = "請輸入正確的電子郵件格式";
//   }

//   if (Object.keys(errors).length > 0) {
//     return {
//       errors,
//     };
//   }

//   console.log(data);
//   const result = await updateMember(data, userId);
//   console.log(result);
//   revalidatePath("/backend/account/personal-account");
//   redirect("/backend/account/personal-account");
// }
