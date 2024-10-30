"use server";

import { cookies } from "next/headers";
import { redirect } from "../../../navigation";

import { _loginByUser, _loginByAdmin } from "./auth";

export async function login(type, prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  let errors = {};

  if (!email || email.trim() === "") {
    errors.email = "Email不得為空";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Email格式不正確";
    }
  }

  if (!password || password.trim().length < 6) {
    errors.password = "密碼長度必須在6到100字元之間";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  // try {
  //   const data = {
  //     email,
  //     password,
  //   };
  //   const result =
  //     type === "admin" ? await _loginByAdmin(data) : await _loginByUser(data);
  //   // const oneHour = 60 * 60 * 1000;
  //   const oneDay = 24 * 60 * 60 * 1000;

  //   const cookieName = type === "admin" ? "tccf" : "tccf_exhibition";

  //   cookies().set(cookieName, result.token, {
  //     expires: new Date(Date.now() + oneDay),
  //   });

  //   const path =
  //     type === "admin" ? "/backend/article-list" : "/exhibition/meeting";

  //   console.log("path", path);
  //   console.log(result);
  //   redirect(path);
  // } catch (error) {
  //   console.log(error);
  //   return {
  //     errors: {
  //       username: "帳號或密碼錯誤",
  //     },
  //   };
  // }

  const data = {
    email,
    password,
  };
  const result =
    type === "admin" ? await _loginByAdmin(data) : await _loginByUser(data);
  // const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * 60 * 60 * 1000;

  const cookieName = type === "admin" ? "tccf" : "tccf_exhibition";

  cookies().set(cookieName, result.token, {
    expires: new Date(Date.now() + oneDay),
    sameSite: "strict",
  });

  const path =
    type === "admin"
      ? "/backend/content/article-list"
      : "/exhibition/memberInfo";

  if (result) {
    if (result?.message) {
      return {
        errors: {
          username: "帳號或密碼錯誤",
        },
      };
    } else {
      redirect(path);
    }
  }
}

export async function logout() {
  cookies().delete("tccf_exhibition");
  cookies().delete("tccf");
  redirect("/");
}

export async function logoutByAdmin() {
  cookies().delete("tccf");
  redirect("/backend");
}

export async function logoutByUser() {
  console.log("這裡");
  cookies().delete("tccf_exhibition");
  cookies().delete("popupShown");
  redirect("/exhibition-login");
}
