"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "../../../navigation";

import { _createBanner, _deleteBanner, _updateBannerInfo } from "./_banner";
import { convertBase64 } from "@/utils";

export async function deleteBanner(id) {
  await _deleteBanner(id);
  revalidatePath("/backend/visual/visual-setting");
  redirect("/backend/visual/visual-setting");
}

export async function createBanner(prevState, formData) {
  const title = formData.get("title");
  const sortOrder = formData.get("sortOrder");
  const redirectUrl = formData.get("redirectUrl");
  const image = formData.get("image");
  const data = {
    title: title,
    sortOrder: sortOrder,
    redirectUrl: redirectUrl,
    imageBase64: await convertBase64(image),
  };

  let errors = {};
  if (!title || title.trim() === "") {
    errors.title = "標題不得為空";
  }

  if (!redirectUrl || redirectUrl.trim() === "") {
    errors.url = "路徑不得為空";
  }

  if (!image || image.size === 0) {
    errors.image = "請上傳圖片";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  await _createBanner(data);
  revalidatePath("/backend/visual/visual-setting");
  redirect("/backend/visual/visual-setting");
}

export async function updateBanner(bannerId, uploadState, prevState, formData) {
  console.log(uploadState);

  const title = formData.get("title");
  const sortOrder = formData.get("sortOrder");
  const redirectUrl = formData.get("redirectUrl");
  const image = formData.get("image");

  let errors = {};
  if (!title || title.trim() === "") {
    errors.title = "標題不得為空";
  }

  if (!redirectUrl || redirectUrl.trim() === "") {
    errors.url = "路徑不得為空";
  }

  if ((!image || image.size === 0) && uploadState) {
    errors.image = "請上傳圖片";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  if (image.size > 0) {
    // 先刪除
    await _deleteBanner(bannerId);
    // 再新增
    const data = {
      title: title,
      sortOrder: sortOrder,
      redirectUrl: redirectUrl,
      imageBase64: await convertBase64(image),
    };

    await _createBanner(data);
  } else {
    // 更新橫幅資訊
    const info = {
      title: title,
      sortOrder: sortOrder,
      redirectUrl: redirectUrl,
    };
    await _updateBannerInfo(info, bannerId);
  }

  revalidatePath("/backend/visual/visual-setting");
  redirect("/backend/visual/visual-setting");
}
