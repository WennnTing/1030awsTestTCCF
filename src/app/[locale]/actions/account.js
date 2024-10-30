"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "../../../navigation";
import { deleteMember, addMember, updateMember } from "./memeber";
import { changePassword } from "./auth";

export async function deleteAccount(id) {
  await deleteMember(id);
  revalidatePath("/backend/account/account-list");
  redirect("/backend/account/account-list");
}

export async function createAccount(prevState, formData) {
  const username = formData.get("Username");
  const email = formData.get("Email");
  const password = formData.get("Password");
  const data = {
    Username: username,
    Email: email,
    Password: password,
    type: 0,
  };

  let errors = {};
  if (!username || username.trim() === "") {
    errors.username = "帳號不得為空";
  }

  if (!password || password.trim().length < 6) {
    errors.password = "密碼長度必須在6到100字元之間";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "請輸入正確的電子郵件格式";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  await addMember(data);
  revalidatePath("/backend/account/account-list");
  redirect("/backend/account/account-list");
}

export async function updateAccount(prevState, formData) {
  let errors = {};
  const username = formData.get("Username");
  const email = formData.get("Email");
  const password = formData.get("Password");
  const userId = formData.get("userId");
  const data = {
    Username: username,
    Email: email,
    // Password: password,
    Type: 0,
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "請輸入正確的電子郵件格式";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const result = await updateMember(data, userId);

  revalidatePath("/backend/account/personal-account");
  redirect("/backend/account/personal-account");
}

export async function updatePassword(prevState, formData) {
  let errors = {};
  const password = formData.get("oldPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  const data = {
    OldPassword: password,
    NewPassword: newPassword,
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

  if (!password || password.trim() === "") {
    errors.password = "舊密碼不得為空";
  }

  if (!newPassword || !passwordRegex.test(newPassword)) {
    errors.newPassword = "密碼長度必須在8~16字元之間，並包含大小寫英文及數字";
  }

  if (newPassword !== confirmPassword) {
    errors.confirmPassword = "新密碼不一致";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const result = await changePassword(data);

  revalidatePath("/backend/account/personal-account");
  redirect("/backend/account/personal-account");
}
