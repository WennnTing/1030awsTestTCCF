"use server";

import moment from "moment";
import { redirect } from "../../../navigation";
import { revalidatePath } from "next/cache";
import { articelKeysFilter } from "@/utils";

import { getAllHeaders, getSidebarsByHeaderID } from "./header";
import { getAllSidebars } from "./sidebar";
import { getAllBranches } from "./branch";
import { getAllFooters } from "./footer";

import { getPagesByHeaderId } from "./header-page";
import { getPagesBySidebarId } from "./sidebar-page";
import { getPagesByBranchId } from "./branch-page";
import { getPagesByFooterId } from "./footer-page";

import {
  getAllPages,
  getPageByID,
  createPage,
  deletePage,
  updatePage,
} from "./pages";

import {
  getPageFieldValuesByPageUUID,
  batchCreatePageFieldValues,
  updatePageFieldValue,
  deletePageFieldValue,
} from "./page-field-values";

import {
  _createActivity,
  _getActivitiesByPageUuId,
  _updateActivity,
} from "./_activities";

import { convertBase64 } from "@/utils";

export async function test(content, prevState, formData) {
  // const data = [
  //   {
  //     elementId: "element1",
  //     fieldTextZh: formData.get("content"),
  //     fieldTextEn: "",
  //     fieldValue: "",
  //   },
  // ];

  // const result = await batchCreatePageFieldValues(
  //   data,
  //   "62369013-78e5-4146-879d-cb816bc24504"
  // );
  // console.log(result);
  const page = {
    templateId: 1,
    pageNameZh: "新頁面",
    pageNameEn: "New Page",
    routerName: "new-page-test",
    pageTag: "news",
    publishDate: "2024-07-01T00:00:00",
    unpublishDate: "2024-12-31T00:00:00",
  };
  const result = await createPage(page);
  redirect("/backend/content/article-list");
}

export async function findHeaderId(router) {
  const headers = await getAllHeaders();
  const headerId = headers.data.find(
    (item) => item.routerName === router[0]
  )?.headerId;
  return headerId;
}

export async function findSidebarId(router) {
  const sidebars = await getAllSidebars();
  const sidebarId = sidebars.data.find(
    (item) => item.routerName === router[1]
  )?.sidebarId;
  return sidebarId;
}

export async function findBranchId(router) {
  const branches = await getAllBranches();
  const branchId = branches.data.find(
    (item) => item.routerName === router[2]
  )?.branchId;
  return branchId;
}

export async function findFooterId(router) {
  const footers = await getAllFooters();
  const footerId = footers.data.find(
    (item) => item.routerName === router[0]
  )?.footerId;
  return footerId;
}

export async function findPageId(router) {
  const pages = await getAllPages();
  const pageId = pages.data.find(
    (item) => item.routerName === router[0]
  )?.pageUuid;
  return pageId;
}

export async function getPrimaryPageUuid(id) {
  const pageInfo = await getPagesByHeaderId(id);
  const uuid = pageInfo?.data?.[0]?.pageUuid;
  return uuid;
}

// footer index page
export async function getFooterPageUuid(id) {
  const pageInfo = await getPagesByFooterId(id);
  const uuid = pageInfo?.data?.[0]?.pageUuid;
  return uuid;
}

export async function getSecondaryPageUuid(id) {
  const pageInfo = await getPagesBySidebarId(id);
  const uuid = pageInfo?.data?.[0]?.pageUuid;
  return uuid;
}

export async function getTertiaryPageUuid(id) {
  const pageInfo = await getPagesByBranchId(id);
  const uuid = pageInfo?.data?.[0]?.pageUuid;
  return uuid;
}

export async function getPageContentByUuid(uuid) {
  const content = await getPageFieldValuesByPageUUID(uuid);
  return content;
}

export async function checkIsHeaderFooterOrPage(router) {
  const promises = [
    findHeaderId(router.slug),
    findFooterId(router.slug),
    findPageId(router.slug),
  ];
  const result = Promise.allSettled(promises).then((responses) => {
    return responses;
  });
  return result;
}

export async function getPageInfo(router) {
  switch (router.slug.length) {
    case 1:
      // 可能是Header Index
      // 可能是Footer Index
      // 可能是未綁定的頁面
      const result = await checkIsHeaderFooterOrPage(router);

      if (result[0].value) {
        console.log(result);
        const headerId = result[0].value;
        const primaryPageUuid = await getPrimaryPageUuid(headerId);
        const primaryPageInfo = await getPageByID(primaryPageUuid);
        console.log(primaryPageInfo);
        return primaryPageInfo;
      } else if (result[1].value) {
        const pageId = result[1].value;
        const primaryPageUuid = await getFooterPageUuid(pageId);
        const primaryPageInfo = await getPageByID(primaryPageUuid);
        console.log(primaryPageInfo);
        return primaryPageInfo;
      } else {
        const pageId = result[2].value;
        const primaryPageInfo = await getPageByID(pageId);
        return primaryPageInfo;
      }

    case 2:
      const sidebarId = await findSidebarId(router.slug);
      const secondaryPageUuid = await getSecondaryPageUuid(sidebarId);
      const secondaryPageInfo = await getPageByID(secondaryPageUuid);
      console.log(secondaryPageInfo);
      return secondaryPageInfo;
    case 3:
      const branchId = await findBranchId(router.slug);
      const tertiaryPageUuid = await getTertiaryPageUuid(branchId);
      const tertiaryPageInfo = await getPageByID(tertiaryPageUuid);
      console.log(tertiaryPageInfo);
      return tertiaryPageInfo;

    default:
      break;
  }
}

export async function getPageContent(router) {
  switch (router.slug.length) {
    case 1:
      // 可能是Header Index
      // 可能是Footer Index
      // 可能是未綁定的頁面
      const result = await checkIsHeaderFooterOrPage(router);

      if (result[0].value) {
        const headerId = result[0].value;
        const primaryPageUuid = await getPrimaryPageUuid(headerId);
        const primaryPageContent = await getPageFieldValuesByPageUUID(
          primaryPageUuid
        );
        return primaryPageContent;
      } else if (result[1].value) {
        const pageId = result[1].value;
        const primaryPageUuid = await getFooterPageUuid(pageId);
        const primaryPageContent = await getPageFieldValuesByPageUUID(
          primaryPageUuid
        );
        return primaryPageContent;
      } else {
        const pageId = result[2].value;
        const primaryPageContent = await getPageFieldValuesByPageUUID(pageId);
        return primaryPageContent;
      }

    case 2:
      const sidebarId = await findSidebarId(router.slug);
      const secondaryPageUuid = await getSecondaryPageUuid(sidebarId);
      const secondaryPageContent = await getPageFieldValuesByPageUUID(
        secondaryPageUuid
      );
      return secondaryPageContent;
    case 3:
      const branchId = await findBranchId(router.slug);
      const tertiaryPageUuid = await getTertiaryPageUuid(branchId);
      const tertiaryPageContent = await getPageFieldValuesByPageUUID(
        tertiaryPageUuid
      );
      return tertiaryPageContent;

    default:
      break;
  }
}

export async function getSideBar(router) {
  const result = await checkIsHeaderFooterOrPage(router);
  if (result[0].value) {
    const headerId = result[0].value;
    const sidebars = await getSidebarsByHeaderID(headerId);
    return sidebars.data;
  } else {
    return [];
  }
}

export async function createArticle(prevState, formData) {
  let errors = {};
  let fields = [];

  fields = [
    { key: "pageNameZh", message: "請填寫中文名稱" },
    { key: "pageNameEn", message: "請填寫英文名稱" },
    { key: "routerName", message: "請填寫路由名稱" },
  ];

  fields.forEach(({ key, message }) => {
    if (!formData.get(key)) {
      errors[key] = message;
    }
  });

  // 檢查路由名稱是否重複
  const checkRouterNameResult = await checkRouterName(
    formData.get("routerName")
  );

  if (checkRouterNameResult) {
    errors["routerName"] = "路由名稱已存在";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const createData = {
    templateId: formData.get("templateId"),
    pageNameZh: formData.get("pageNameZh"),
    pageNameEn: formData.get("pageNameEn"),
    routerName: formData.get("routerName"),
    pageTag: formData.get("tag"),
    publishDate: moment(formData.get("publishDate")).format(
      "YYYY-MM-DDTHH:mm:ss"
    ),
    unpublishDate: moment(formData.get("unpublishDate")).format(
      "YYYY-MM-DDTHH:mm:ss"
    ),
  };

  const createPageResult = await createPage(createData);
  const uuid = createPageResult.data.pageUuid;
  const filteredData = await articelKeysFilter(
    Number(formData.get("templateId")),
    formData
  );

  // 只回傳有值的欄位
  const result = await batchCreatePageFieldValues(
    filteredData.filter((item) => {
      if (!item) return false;
      return !(
        item.fieldTextZh === "" &&
        item.fieldTextEn === "" &&
        item.fieldValue === "" &&
        (item.ImageBase64 === "" || !item.ImageBase64)
      );
    }),
    uuid
  );

  // 如果為活動型文章 需一同新增活動
  if (formData.get("templateId") === "5") {
    const startTimeStr = `${formData.get("activityStartDate")} ${formData.get(
      "activityStartTime"
    )}`;
    const endTimeStr = `${formData.get("activityEndDate")} ${formData.get(
      "activityEndTime"
    )}`;
    const activityData = {
      pageUuid: uuid,
      activityName: formData.get("title"),
      activityNameEn: formData.get("titleEn"),
      registrationStartDate: moment(
        formData.get("registrationStartDate"),
        "YYYY/MM/DD"
      ).format("YYYY-MM-DD"),
      registrationEndDate: moment(
        formData.get("registrationEndDate"),
        "YYYY/MM/DD"
      ).format("YYYY-MM-DD"),
      activityStartTime: moment(startTimeStr, "YYYY/MM/DD HH:mm").format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
      activityEndTime: moment(endTimeStr, "YYYY/MM/DD HH:mm").format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
      maxParticipants: formData.get("maxParticipants"),
      location: formData.get("location"),
      locationEn: formData.get("locationEn"),
    };

    const activitiesResult = await _createActivity(activityData);
  }

  console.log(result);
  revalidatePath("/backend/content/article-list");
  redirect("/backend/content/article-list");
}

export async function deleteArticle(uuid) {
  await deletePage(uuid);
  revalidatePath("/backend/content/article-list");
  redirect("/backend/content/article-list");
}

export async function createArticleHandler(step, prevState, formData) {
  if (step === 3) {
    return createArticle(prevState, formData);
  }
  return validationcheck(prevState, formData);
}

export async function validationcheck(prevState, formData) {
  // console.log(formData.get("card_image_1"));

  // const base64 = await convertBase64(formData.get("card_image_1"));
  // console.log(base64);
  let errors = {};
  let contrast = [];
  let fields = [];
  let status = {};
  // template
  switch (Number(formData.get("templateId"))) {
    case 1:
      fields = [
        { key: "title", message: "請填寫中文標題欄位" },
        { key: "titleEn", message: "請填寫英文標題欄位" },
        { key: "content", message: "請填寫中文上架內容欄位" },
        { key: "contentEn", message: "請填寫英文上架內容欄位" },
        {
          key: "leftFooterButton",
          message: "請填寫中文左頁尾按鈕欄位",
          pairedKey: "leftFooterButtonValue",
        },
        {
          key: "leftFooterButtonEn",
          message: "請填寫英文左頁尾按鈕欄位",
          pairedKey: "leftFooterButtonValueEn",
        },
        {
          key: "rightFooterButton",
          message: "請填寫中文右頁尾按鈕欄位",
          pairedKey: "rightFooterButtonValue",
        },
        {
          key: "rightFooterButtonEn",
          message: "請填寫英文右頁尾按鈕欄位",
          pairedKey: "rightFooterButtonValueEn",
        },
      ];

      fields.forEach(({ key, message, pairedKey }) => {
        if (pairedKey) {
          if (
            (formData.get(key) && !formData.get(pairedKey)) ||
            (!formData.get(key) && formData.get(pairedKey))
          ) {
            errors[key] = message;
          }
        } else {
          if (!formData.get(key)) {
            errors[key] = message;
          }
        }
      });

      if (!formData.get("publishDate") || !formData.get("unpublishDate")) {
        errors["publish"] = "請填寫上架期間欄位";
      } else if (
        moment(formData.get("publishDate")).isSameOrAfter(
          formData.get("unpublishDate")
        )
      ) {
        errors["publish"] = "上架日期不可晚於下架日期";
      }

      break;

    case 2:
      fields = [
        { key: "title", message: "請填寫中文標題欄位" },
        { key: "titleEn", message: "請填寫英文標題欄位" },
        { key: "content", message: "請填寫中文上架內容欄位" },
        { key: "contentEn", message: "請填寫英文上架內容欄位" },
      ];
      fields.forEach(({ key, message }) => {
        if (!formData.get(key)) {
          errors[key] = message;
        }
      });

      contrast = [
        {
          block_title: "標題",
          block_subTitle: "副標題",
          block_content: "內容",
        },
      ];

      Array.from(formData.entries())
        .filter(([key]) => key.includes("block_"))
        .forEach(([key, value]) => {
          if (value === "") {
            const matchedKey = Object.entries(contrast[0]).find(([item]) =>
              key.includes(item)
            );
            if (matchedKey) {
              errors[key] = `請填寫${key.includes("En") ? "英文" : "中文"}區塊${
                matchedKey[1]
              }欄位`;
            }
          }
        });

      if (!formData.get("publishDate") || !formData.get("unpublishDate")) {
        errors["publish"] = "請填寫上架期間欄位";
      } else if (
        moment(formData.get("publishDate")).isSameOrAfter(
          formData.get("unpublishDate")
        )
      ) {
        errors["publish"] = "上架日期不可晚於下架日期";
      }

      break;

    case 3:
      fields = [
        { key: "title", message: "請填寫中文標題欄位" },
        { key: "titleEn", message: "請填寫英文標題欄位" },
        { key: "content", message: "請填寫中文上架內容欄位" },
        { key: "contentEn", message: "請填寫英文上架內容欄位" },
        {
          key: "leftFooterButton",
          message: "請填寫中文左頁尾按鈕連結欄位",
          pairedKey: "leftFooterButtonValue",
        },
        {
          key: "leftFooterButtonEn",
          message: "請填寫中文左頁尾按鈕連結欄位",
          pairedKey: "leftFooterButtonValueEn",
        },
        {
          key: "rightFooterButton",
          message: "請填寫中文右頁尾按鈕連結欄位",
          pairedKey: "rightFooterButtonValue",
        },
        {
          key: "rightFooterButtonEn",
          message: "請填寫中文右頁尾按鈕連結欄位",
          pairedKey: "rightFooterButtonValueEn",
        },
      ];

      fields.forEach(({ key, message, pairedKey }) => {
        if (pairedKey) {
          if (formData.get(key) && !formData.get(pairedKey)) {
            errors[key] = message;
          }
        } else {
          if (!formData.get(key)) {
            errors[key] = message;
          }
        }
      });

      //  如果有編號 確認編號欄位是否有填寫
      if (formData.get("header_serial") === "true") {
        ["header_serialValue", "header_serialValueEn"].forEach((key) => {
          if (!formData.get(key)) {
            errors[key] = `請填${
              key === "header_serialValue" ? "中文" : "英文"
            }編號表頭名稱欄位`;
          }
        });
      }

      // 如果有檢視按鈕 確認檢視按鈕欄位是否有填寫
      if (formData.get("header_view") === "true") {
        ["header_viewValue", "header_viewValueEn"].forEach((key) => {
          if (!formData.get(key)) {
            errors[key] = `請填寫${
              key === "header_viewValue" ? "中文" : "英文"
            }檢視按鈕表頭名稱欄位`;
          }
        });
      }

      if (!formData.get("publishDate") || !formData.get("unpublishDate")) {
        errors["publish"] = "請填寫上架期間欄位";
      } else if (
        moment(formData.get("publishDate")).isSameOrAfter(
          formData.get("unpublishDate")
        )
      ) {
        errors["publish"] = "上架日期不可晚於下架日期";
      }

      break;

    case 4:
      fields = [
        { key: "title", message: "請填寫中文標題欄位" },
        { key: "titleEn", message: "請填寫英文標題欄位" },
        {
          key: "buttonFunction",
          message: "請填寫中文按鈕功能文字",
          pairedKey: "buttonFunctionValue",
        },
        {
          key: "buttonFunctionEn",
          message: "請填寫按英文鈕功能文字",
          pairedKey: "buttonFunctionValueEn",
        },
        {
          key: "displayCardImage",
          message: "請填寫中文圖片欄位",
          pairedKey: "displayCardImageValue",
        },
        {
          key: "displayCardImageEn",
          message: "請填寫英文圖片欄位",
          pairedKey: "displayCardImageValueEn",
        },
      ];

      // 如果卡片功能是進入連結 確認按鈕功能
      fields.forEach(({ key, message, pairedKey }) => {
        if (pairedKey && formData.get("cardFunction") === "link") {
          console.log(key);
          if (formData.get(key) && !formData.get(pairedKey)) {
            errors[key] = message;
          }
        } else {
          if (!formData.get(key) && !pairedKey) {
            console.log(key);
            errors[key] = message;
          }
        }
      });

      contrast = [
        {
          card_article: "文章",
          card_title: "標題",
          card_location: "地點",
          card_button: "按鈕連結",
          card_image: "圖片",
          // card_tag: "標籤",
          card_order: "排序",
        },
      ];

      Array.from(formData.entries())
        .filter(([key]) => key.includes("card_"))
        .forEach(([key, value]) => {
          if (value === "") {
            const matchedKey = Object.entries(contrast[0]).find(([item]) =>
              key.includes(item)
            );
            if (matchedKey) {
              errors[key] = `請填寫${key.includes("En") ? "英文" : "中文"}卡片${
                matchedKey[1]
              }欄位`;
            }
          }
        });

      if (!formData.get("publishDate") || !formData.get("unpublishDate")) {
        errors["publish"] = "請填寫上架期間欄位";
      } else if (
        moment(formData.get("publishDate")).isSameOrAfter(
          formData.get("unpublishDate")
        )
      ) {
        errors["publish"] = "上架日期不可晚於下架日期";
      }

      break;

    case 5:
      fields = [
        { key: "title", message: "請填寫中文標題欄位" },
        { key: "titleEn", message: "請填寫英文標題欄位" },
        { key: "content", message: "請填寫中文上架內容欄位" },
        { key: "contentEn", message: "請填寫英文上架內容欄位" },
        { key: "location", message: "請填寫中文地點欄位" },
        { key: "locationEn", message: "請填寫英文地點欄位" },
        // {
        //   key: "locationDisplayTypeValue",
        //   message: "請填寫中文地點呈現方式欄位",
        // },
        // {
        //   key: "locationDisplayTypeValueEn",
        //   message: "請填寫英文地點呈現方式欄位",
        // },
        { key: "maxParticipants", message: "請填寫滿額人數欄位" },
        // {
        //   key: "slide_image_1",
        //   message: "請填寫中文輪播圖片欄位",
        //   isFile: true,
        // },
        // {
        //   key: "slide_image_1_En",
        //   message: "請填寫英文輪播圖片欄位",
        //   isFile: true,
        // },
        // { key: "slide", message: "請填寫中文輪播圖片欄位", isFile: true },
        // { key: "slideEn", message: "請填寫英文輪播圖片欄位", isFile: true },
      ];

      fields.forEach(({ key, message, isFile }) => {
        if (isFile) {
          if (!formData.get(key) || formData.get(key).size === 0) {
            errors[key] = message;
          }
        } else {
          if (!formData.get(key)) {
            errors[key] = message;
          }
        }
      });

      const registrationStartDate = formData.get("registrationStartDate");
      const registrationEndDate = formData.get("registrationEndDate");
      const activityStartDate = formData.get("activityStartDate");
      const activityEndDate = formData.get("activityEndDate");
      const activityStartTime = formData.get("activityStartTime");
      const activityEndTime = formData.get("activityEndTime");

      if (!registrationStartDate || !registrationEndDate) {
        errors["registrationStartDate"] = "請填寫報名期間欄位";
      } else if (
        moment(registrationStartDate).isSameOrAfter(registrationEndDate)
      ) {
        errors["registrationStartDate"] = "報名開始日期不可晚於報名截止日期";
      }

      if (
        !activityStartDate ||
        !activityEndDate ||
        !activityStartTime ||
        !activityEndTime
      ) {
        errors["activityDateTime"] = "請填寫活動期間欄位";
      } else if (
        moment(`${activityStartDate} ${activityStartTime}`).isSameOrAfter(
          `${activityEndDate} ${activityEndTime}`
        )
      ) {
        errors["activityDateTime"] = "活動開始時間不可晚於活動結束時間";
      }

      // 人員上架內容
      Array.from(formData.entries())
        .filter(([key, value]) => key.includes("member_content"))
        .forEach(([key, value]) => {
          if (value === "") {
            errors[key] = `請填寫${
              key.includes("En") ? "英文" : "中文"
            }人員上架內容欄位`;
          }
        });

      if (!formData.get("publishDate") || !formData.get("unpublishDate")) {
        errors["publish"] = "請填寫上架期間欄位";
      } else if (
        moment(formData.get("publishDate")).isSameOrAfter(
          formData.get("unpublishDate")
        )
      ) {
        errors["publish"] = "上架日期不可晚於下架日期";
      }

    default:
      break;
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  } else {
    return {
      status: {
        message: "success",
      },
    };
  }
}

export async function checkRouterName(routerName) {
  const pages = await getAllPages();
  const headers = await getAllHeaders();
  const footers = await getAllFooters();
  const pagesIsExist = pages.data.some(
    (item) => item.routerName === routerName
  );
  const headersIsExist = headers.data.some(
    (item) => item.routerName === routerName
  );
  const footersIsExist = footers.data.some(
    (item) => item.routerName === routerName
  );
  console.log(pagesIsExist, headersIsExist, footersIsExist);
  return pagesIsExist || headersIsExist || footersIsExist;
}

export async function updateArticle(
  pageData,
  pageInfo,
  mode,
  prevState,
  formData
) {
  let errors = {};
  let fields = [];
  let contrast = [];
  if (mode === "info") {
    // 如果是更新路由名稱
    // 檢查路由名稱是否重複
    if (formData.get("routerName") !== pageInfo.routerName) {
      const checkRouterNameResult = await checkRouterName(
        formData.get("routerName")
      );

      if (checkRouterNameResult) {
        errors["routerName"] = "路由名稱已存在";
      }
    }

    fields = [
      { key: "pageNameZh", message: "請填寫中文名稱" },
      { key: "pageNameEn", message: "請填寫英文名稱" },
      { key: "routerName", message: "請填寫路由名稱" },
    ];

    fields.forEach(({ key, message }) => {
      if (!formData.get(key)) {
        errors[key] = message;
      }
    });

    if (!formData.get("publishDate") || !formData.get("unpublishDate")) {
      errors["publish"] = "請填寫上架期間欄位";
    } else if (
      moment(formData.get("publishDate")).isSameOrAfter(
        formData.get("unpublishDate")
      )
    ) {
      errors["publish"] = "上架日期不可晚於下架日期";
    }

    if (Object.keys(errors).length > 0) {
      return {
        errors,
      };
    }
    const result = await updatePage(
      {
        pageNameZh: formData.get("pageNameZh"),
        pageNameEn: formData.get("pageNameEn"),
        routerName: formData.get("routerName"),
        pageTag: pageInfo.pageTag,
        publishDate: moment(formData.get("publishDate"), "YYYY/MM/DD").format(
          "YYYY-MM-DDTHH:mm:ss"
        ),
        unpublishDate: moment(
          formData.get("unpublishDate"),
          "YYYY/MM/DD"
        ).format("YYYY-MM-DDTHH:mm:ss"),
      },
      pageInfo.pageUuid
    );

    console.log(result);
  } else {
    // 原本的內容 pageData
    // 先取得所有有值的欄位
    switch (Number(formData.get("templateId"))) {
      case 1:
        fields = [
          { key: "title", message: "請填寫中文標題欄位" },
          { key: "titleEn", message: "請填寫英文標題欄位" },
          { key: "content", message: "請填寫中文上架內容欄位" },
          { key: "contentEn", message: "請填寫英文上架內容欄位" },
          {
            key: "leftFooterButton",
            message: "請填寫中文左頁尾按鈕欄位",
            pairedKey: "leftFooterButtonValue",
          },
          {
            key: "leftFooterButtonEn",
            message: "請填寫英文左頁尾按鈕欄位",
            pairedKey: "leftFooterButtonValueEn",
          },
          {
            key: "rightFooterButton",
            message: "請填寫中文右頁尾按鈕欄位",
            pairedKey: "rightFooterButtonValue",
          },
          {
            key: "rightFooterButtonEn",
            message: "請填寫英文右頁尾按鈕欄位",
            pairedKey: "rightFooterButtonValueEn",
          },
        ];

        fields.forEach(({ key, message, pairedKey }) => {
          if (pairedKey) {
            console.log(formData.get(key));
            console.log(formData.get(pairedKey));
            if (
              (formData.get(key) && !formData.get(pairedKey)) ||
              (!formData.get(key) && formData.get(pairedKey))
            ) {
              errors[key] = message;
            }
          } else {
            if (!formData.get(key)) {
              errors[key] = message;
            }
          }
        });

        break;

      case 2:
        fields = [
          { key: "title", message: "請填寫中文標題欄位" },
          { key: "titleEn", message: "請填寫英文標題欄位" },
          { key: "content", message: "請填寫中文上架內容欄位" },
          { key: "contentEn", message: "請填寫英文上架內容欄位" },
        ];
        fields.forEach(({ key, message }) => {
          if (!formData.get(key)) {
            errors[key] = message;
          }
        });

        contrast = [
          {
            block_title: "標題",
            block_subTitle: "副標題",
            block_content: "內容",
          },
        ];

        Array.from(formData.entries())
          .filter(([key]) => key.includes("block_"))
          .forEach(([key, value]) => {
            if (value === "") {
              const matchedKey = Object.entries(contrast[0]).find(([item]) =>
                key.includes(item)
              );
              if (matchedKey) {
                errors[key] = `請填寫${
                  key.includes("En") ? "英文" : "中文"
                }區塊${matchedKey[1]}欄位`;
              }
            }
          });

        break;

      case 3:
        fields = [
          { key: "title", message: "請填寫中文標題欄位" },
          { key: "titleEn", message: "請填寫英文標題欄位" },
          { key: "content", message: "請填寫中文上架內容欄位" },
          { key: "contentEn", message: "請填寫英文上架內容欄位" },
          {
            key: "leftFooterButton",
            message: "請填寫中文左頁尾按鈕連結欄位",
            pairedKey: "leftFooterButtonValue",
          },
          {
            key: "leftFooterButtonEn",
            message: "請填寫英文左頁尾按鈕連結欄位",
            pairedKey: "leftFooterButtonValueEn",
          },
          {
            key: "rightFooterButton",
            message: "請填寫中文右頁尾按鈕連結欄位",
            pairedKey: "rightFooterButtonValue",
          },
          {
            key: "rightFooterButtonEn",
            message: "請填寫英文右頁尾按鈕連結欄位",
            pairedKey: "rightFooterButtonValueEn",
          },
        ];

        fields.forEach(({ key, message, pairedKey }) => {
          if (pairedKey) {
            if (formData.get(key) && !formData.get(pairedKey)) {
              errors[key] = message;
            }
          } else {
            if (!formData.get(key)) {
              errors[key] = message;
            }
          }
        });

        if (formData.get("header_serial") === "true") {
          ["header_serialValue", "header_serialValueEn"].forEach((key) => {
            if (!formData.get(key)) {
              errors[key] = `請填${
                key === "header_serialValue" ? "中文" : "英文"
              }編號表頭名稱欄位`;
            }
          });
        }

        if (formData.get("header_view") === "true") {
          ["header_viewValue", "header_viewValueEn"].forEach((key) => {
            if (!formData.get(key)) {
              errors[key] = `請填寫${
                key === "header_viewValue" ? "中文" : "英文"
              }檢視按鈕表頭名稱欄位`;
            }
          });
        }

        break;

      case 4:
        fields = [
          { key: "title", message: "請填寫中文標題欄位" },
          { key: "titleEn", message: "請填寫英文標題欄位" },
          {
            key: "buttonFunction",
            message: "請填寫中文按鈕功能文字",
            pairedKey: "buttonFunctionValue",
          },
          {
            key: "buttonFunctionEn",
            message: "請填寫按英文鈕功能文字",
            pairedKey: "buttonFunctionValueEn",
          },
          {
            key: "displayCardImage",
            message: "請填寫中文圖片欄位",
            pairedKey: "displayCardImageValue",
          },
          {
            key: "displayCardImageEn",
            message: "請填寫英文圖片欄位",
            pairedKey: "displayCardImageValueEn",
          },
        ];

        fields.forEach(({ key, message, pairedKey }) => {
          if (pairedKey && formData.get("cardFunction") === "link") {
            console.log(key);
            if (formData.get(key) && !formData.get(pairedKey)) {
              errors[key] = message;
            }
          } else {
            if (!formData.get(key) && !pairedKey) {
              console.log(key);
              errors[key] = message;
            }
          }
        });

        contrast = [
          {
            card_article: "文章",
            card_title: "標題",
            card_location: "地點",
            card_button: "按鈕連結",
            card_image: "圖片",
            // card_tag: "標籤",
            card_order: "排序",
          },
        ];

        Array.from(formData.entries())
          .filter(([key]) => key.includes("card_"))
          .forEach(([key, value]) => {
            if (value === "") {
              const matchedKey = Object.entries(contrast[0]).find(([item]) =>
                key.includes(item)
              );
              if (matchedKey) {
                errors[key] = `請填寫${
                  key.includes("En") ? "英文" : "中文"
                }卡片${matchedKey[1]}欄位`;
              }
            }
          });

        break;

      case 5:
        fields = [
          { key: "title", message: "請填寫中文標題欄位" },
          { key: "titleEn", message: "請填寫英文標題欄位" },
          { key: "content", message: "請填寫中文上架內容欄位" },
          { key: "contentEn", message: "請填寫英文上架內容欄位" },
          { key: "location", message: "請填寫中文地點欄位" },
          { key: "locationEn", message: "請填寫英文地點欄位" },
          { key: "maxParticipants", message: "請填寫滿額人數欄位" },
          // {
          //   key: "slide_image_1",
          //   message: "請填寫中文輪播圖片欄位",
          //   isFile: true,
          // },
          // {
          //   key: "slide_image_1_En",
          //   message: "請填寫英文輪播圖片欄位",
          //   isFile: true,
          // },
        ];

        fields.forEach(({ key, message, isFile }) => {
          if (isFile) {
            if (!formData.get(key) || formData.get(key).size === 0) {
              errors[key] = message;
            }
          } else {
            if (!formData.get(key)) {
              errors[key] = message;
            }
          }
        });

        // 報名人數上限不可低於原本的報名人數上限
        const activityData = await _getActivitiesByPageUuId(pageInfo.pageUuid);
        if (
          formData.get("maxParticipants") < activityData?.data?.maxParticipants
        ) {
          errors["maxParticipants"] = "報名人數上限不可低於原本的報名人數上限";
        }

        const registrationStartDate = formData.get("registrationStartDate");
        const registrationEndDate = formData.get("registrationEndDate");
        const activityStartDate = formData.get("activityStartDate");
        const activityEndDate = formData.get("activityEndDate");
        const activityStartTime = formData.get("activityStartTime");
        const activityEndTime = formData.get("activityEndTime");

        if (!registrationStartDate || !registrationEndDate) {
          errors["registrationStartDate"] = "請填寫報名期間欄位";
        } else if (
          moment(registrationStartDate).isSameOrAfter(registrationEndDate)
        ) {
          errors["registrationStartDate"] = "報名開始日期不可晚於報名截止日期";
        }

        if (
          !activityStartDate ||
          !activityEndDate ||
          !activityStartTime ||
          !activityEndTime
        ) {
          errors["activityDateTime"] = "請填寫活動期間欄位";
        } else if (
          moment(`${activityStartDate} ${activityStartTime}`).isSameOrAfter(
            `${activityEndDate} ${activityEndTime}`
          )
        ) {
          errors["activityDateTime"] = "活動開始時間不可晚於活動結束時間";
        }

        // 人員上架內容
        Array.from(formData.entries())
          .filter(([key, value]) => key.includes("member_content"))
          .forEach(([key, value]) => {
            if (value === "") {
              errors[key] = `請填寫${
                key.includes("En") ? "英文" : "中文"
              }人員上架內容欄位`;
            }
          });
        break;
    }

    if (Object.keys(errors).length > 0) {
      return {
        errors,
      };
    }

    const filteredData = await articelKeysFilter(
      Number(formData.get("templateId")),
      formData,
      pageData
    );

    // 要新增的資料
    // 應該要抓頁面上所有的elementId

    const keys = new Set(pageData.map((item) => item.elementId));

    // 要新增的資料
    // 沒有在pageData裡面的elementId 表示是新的值
    // 過濾掉空值的資料
    const newData = filteredData
      ?.filter((item) => !keys.has(item?.elementId))
      ?.filter(
        (item) =>
          item !== undefined &&
          !(
            (item.fieldTextZh === "" || !item.fieldTextZh) &&
            (item.fieldTextEn === "" || !item.fieldTextEn) &&
            (item.fieldValue === "" || !item.fieldValue) &&
            (item.ImageBase64 === "" || !item.ImageBase64)
          )
      );

    // 要刪除的資料
    // 有在pageData裡面的elementId 但是頁面上沒有elementId
    const deleteData = pageData.filter((item) => {
      const filteredItem = filteredData?.find(
        (el) => el?.elementId === item.elementId
      );

      if (filteredItem === undefined) return item;

      return (
        filteredItem &&
        (filteredItem.fieldTextZh === "" || !filteredItem.fieldTextZh) &&
        (filteredItem.fieldTextEn === "" || !filteredItem.fieldTextEn) &&
        (filteredItem.fieldValue === "" || !filteredItem.fieldValue) &&
        (filteredItem.imageUrl === "" || !filteredItem.imageUrl)
      );
    });

    // 要更新的資料
    // 有在pageData裡面的elementId 且頁面上也有elementId
    // 但是值不一樣
    const differentData = pageData.filter((item) => {
      const filteredItem = filteredData?.find(
        (el) => el?.elementId === item.elementId
      );

      if (!filteredItem) return false;

      return (
        item.fieldTextZh !== filteredItem.fieldTextZh ||
        item.fieldTextEn !== filteredItem.fieldTextEn ||
        item.fieldValue !== filteredItem.fieldValue ||
        filteredItem.ImageBase64
      );
    });

    const updatedData = await Promise.all(
      differentData.map(async (data) => {
        // 都沒有值表示是更新圖片
        if (
          data.fieldTextZh === "" &&
          data.fieldTextEn === "" &&
          data.fieldValue === ""
        ) {
          return {
            valueId: data.valueId,
            pageUuId: data.pageUuId,
            elementId: data.elementId,
            fieldTextZh: "",
            fieldTextEn: "",
            fieldValue: "",
            ImageBase64: await convertBase64(formData.get(data.elementId)),
          };
        }

        if (
          data.fieldValue &&
          data.fieldTextZh === "" &&
          data.fieldTextEn === ""
        ) {
          return {
            ...data,
            fieldValue: formData.get(data.elementId),
          };
        }

        return {
          ...data,
          fieldTextZh: formData.get(data.elementId),
          fieldTextEn:
            formData.get(`${data.elementId}En`) ??
            formData.get(`${data.elementId}_En`),
          fieldValue:
            formData.get(`${data.elementId}Value`) ??
            formData.get(
              `${data.elementId.replace(/_\d+$/, "")}Value_${
                data.elementId.split("_")[2]
              }`
            ) ??
            "",
        };
      })
    );

    console.log("回傳回傳回傳回傳");
    console.log("刪除");
    console.log(deleteData);
    console.log("更新");
    console.log(updatedData);
    console.log("新增");
    console.log(newData);

    if (newData.length > 0) {
      // batch
      // function isFileObject(value) {
      //   return value instanceof File;
      // }

      // const result = await batchCreatePageFieldValues(
      //   newData.filter((item) => !isFileObject(item.fieldValue)),
      //   pageInfo.pageUuid
      // );

      const result = await batchCreatePageFieldValues(
        newData,
        pageInfo.pageUuid
      );
      console.log(result);
    }

    if (updatedData.length > 0) {
      // update
      updatedData.forEach(async (item) => {
        const data = {
          elementId: item.elementId,
          fieldTextZh: item.fieldTextZh,
          fieldTextEn: item.fieldTextEn,
          fieldValue: item.fieldValue,
          ImageBase64: item.ImageBase64,
        };

        const result = await updatePageFieldValue(data, item.valueId);
        console.log(result);
      });

      // 如果是活動型文章 需要更新活動狀態

      if (Number(formData.get("templateId")) === 5) {
        const startTimeStr = `${formData.get(
          "activityStartDate"
        )} ${formData.get("activityStartTime")}`;
        const endTimeStr = `${formData.get("activityEndDate")} ${formData.get(
          "activityEndTime"
        )}`;
        const activityData = {
          activityName: formData.get("title"),
          activityNameEn: formData.get("titleEn"),
          registrationStartDate: moment(
            formData.get("registrationStartDate"),
            "YYYY/MM/DD"
          ).format("YYYY-MM-DD"),
          registrationEndDate: moment(
            formData.get("registrationEndDate"),
            "YYYY/MM/DD"
          ).format("YYYY-MM-DD"),
          activityStartTime: moment(startTimeStr, "YYYY/MM/DD HH:mm").format(
            "YYYY-MM-DDTHH:mm:ss"
          ),
          activityEndTime: moment(endTimeStr, "YYYY/MM/DD HH:mm").format(
            "YYYY-MM-DDTHH:mm:ss"
          ),
          maxParticipants: formData.get("maxParticipants"),
          location: formData.get("location"),
          locationEn: formData.get("locationEn"),
        };
        console.log("activityData");
        console.log(activityData);
        const activityId = await _getActivitiesByPageUuId(pageInfo.pageUuid);
        const result = await _updateActivity(
          activityData,
          activityId?.data?.activityId
        );
        console.log(result);
      }
    }

    if (deleteData.length > 0) {
      // delete
      deleteData.forEach(async (item) => {
        console.log(item.valueId);
        const result = await deletePageFieldValue(item.valueId);
        console.log(result);
      });
    }
  }

  revalidatePath("/backend/content/article-list");
  redirect("/backend/content/article-list");
}
