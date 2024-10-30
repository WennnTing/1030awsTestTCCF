"use server";
import { redirect } from "../../../navigation";
import { revalidatePath } from "next/cache";

import {
  createHeader,
  updateHeader,
  deleteHeader,
  getHeaderByID,
} from "./header";

import {
  createSidebar,
  updateSidebar,
  deleteSidebar,
  getSidebarByID,
} from "./sidebar";

import {
  createFooter,
  updateFooter,
  deleteFooter,
  getFooterByID,
} from "./footer";

import {
  createBranch,
  updateBranch,
  deleteBranch,
  getBranchByID,
} from "./branch";

import {
  createHeaderPage,
  deleteHeaderPage,
  getHeaderPageRelationships,
} from "./header-page";
import {
  createSidebarPage,
  deleteSidebarPage,
  getSidebarPageRelationships,
} from "./sidebar-page";
import {
  createBranchPage,
  deleteBranchPage,
  getBranchPageRelationships,
} from "./branch-page";
import {
  createFooterPage,
  deleteFooterPage,
  getFooterPageRelationships,
} from "./footer-page";

import { checkRouterName } from "./page";

export async function updateNavigation(
  queryStr,
  queryType,
  prevState,
  formData
) {
  // 如果有selfId = update, 沒有selfId = create
  let result;
  let createData;
  let errors = {};

  if (!formData.get("selfId")) {
    // 檢查路由名稱是否重複
    const checkRouterNameResult = await checkRouterName(
      formData.get("routerName")
    );

    if (checkRouterNameResult) {
      errors["routerName"] = "路由名稱已存在";
    }

    switch (formData.get("element")) {
      case "header":
        // console.log("這裡");
        const createHeaderResult = await createHeader({
          headerNameZh: formData.get("headerNameZh"),
          headerNameEn: formData.get("headerNameEn"),
          routerName: formData.get("routerName"),
          sortOrder: Number(formData.get("sortOrder") ?? 0),
          isVisible: formData.get("isVisible") ? true : false,
        });

        if (formData.get("pageUuid")) {
          const headerId = createHeaderResult.data.headerId;
          const createHeaderPageResult = await createHeaderPage({
            headerId: headerId,
            pageUuid: formData.get("pageUuid"),
            sortOrder: Number(formData.get("sortOrder") ?? 0),
            isVisible: formData.get("isVisible") ? true : false,
          });
          console.log(createHeaderPageResult);
        }

        break;
      case "sidebar":
        const createSidebarResult = await createSidebar({
          headerId: Number(formData.get("parentId")),
          sidebarNameZh: formData.get("sidebarNameZh"),
          sidebarNameEn: formData.get("sidebarNameEn"),
          routerName: formData.get("routerName"),
          sortOrder: Number(formData.get("sortOrder") ?? 0),
          isVisible: formData.get("isVisible") ? true : false,
        });

        if (formData.get("pageUuid")) {
          const sidebarId = createSidebarResult.data.sidebarId;
          const createSidebarPageResult = await createSidebarPage({
            sidebarId: sidebarId,
            pageUuid: formData.get("pageUuid"),
            sortOrder: Number(formData.get("sortOrder") ?? 0),
            isVisible: formData.get("isVisible") ? true : false,
          });
          console.log(createSidebarPageResult);
        }

        break;
      case "branch":
        const createBranchResult = await createBranch({
          sidebarId: Number(formData.get("parentId")),
          branchNameZh: formData.get("branchNameZh"),
          branchNameEn: formData.get("branchNameEn"),
          routerName: formData.get("routerName"),
          sortOrder: Number(formData.get("sortOrder") ?? 0),
          isVisible: formData.get("isVisible") ? true : false,
        });
        console.log(createBranchResult);

        if (formData.get("pageUuid")) {
          const branchId = createBranchResult.data.branchId;
          const createBranchPageResult = await createBranchPage({
            branchId: branchId,
            pageUuid: formData.get("pageUuid"),
            sortOrder: Number(formData.get("sortOrder") ?? 0),
            isVisible: formData.get("isVisible") ? true : false,
          });

          console.log(createBranchPageResult);
        }

        break;
      case "footer":
        const createFooterResult = await createFooter({
          FooterNameZh: formData.get("footerNameZh"),
          FooterNameEn: formData.get("footerNameEn"),
          RouterName: formData.get("routerName"),
          SortOrder: Number(formData.get("sortOrder") ?? 0),
          isVisible: formData.get("isVisible") ? true : false,
        });
        console.log(createFooterResult);

        if (formData.get("pageUuid")) {
          const footerId = createFooterResult.data.footerId;
          const createFooterPageResult = await createFooterPage({
            footerId: footerId,
            pageUuid: formData.get("pageUuid"),
            sortOrder: Number(formData.get("sortOrder") ?? 0),
            isVisible: formData.get("isVisible") ? true : false,
          });

          console.log(createFooterPageResult);
        }

        break;

      default:
        break;
    }
  } else {
    // 編輯
    switch (formData.get("element")) {
      case "header":
        try {
          // 先取得原本頁面的routerName
          const originalRouterName = await getHeaderByID(
            formData.get("selfId")
          );

          if (
            originalRouterName.data.routerName !== formData.get("routerName")
          ) {
            // 檢查路由名稱是否重複
            const checkRouterNameResult = await checkRouterName(
              formData.get("routerName")
            );

            if (checkRouterNameResult) {
              errors["routerName"] = "路由名稱已存在";
            }
          }

          // 取得原本頁面的uuid
          const originalPageUuid = await getHeaderPageRelationships(
            formData.get("selfId")
          );

          // 如果原本有 page 先刪除
          if (originalPageUuid.data.length > 0) {
            if (
              originalPageUuid?.data[0]?.pageUuid !== formData.get("pageUuid")
            ) {
              // 先刪除再新增
              const deleteHeaderPageResult = await deleteHeaderPage(
                formData.get("selfId"),
                originalPageUuid?.data[0]?.pageUuid
              );
              const createHeaderPageResult = await createHeaderPage({
                headerId: formData.get("selfId"),
                pageUuid: formData.get("pageUuid"),
                sortOrder: Number(formData.get("sortOrder") ?? 0),
                isVisible: formData.get("isVisible") ? true : false,
              });
            }
          } else {
            if (formData.get("pageUuid")) {
              const createHeaderPageResult = await createHeaderPage({
                headerId: formData.get("selfId"),
                pageUuid: formData.get("pageUuid"),
                sortOrder: Number(formData.get("sortOrder") ?? 0),
                isVisible: formData.get("isVisible") ? true : false,
              });
            }
          }
          const updateHeaderResult = await updateHeader(
            {
              headerNameZh: formData.get("headerNameZh"),
              headerNameEn: formData.get("headerNameEn"),
              routerName: formData.get("routerName"),
              sortOrder: Number(formData.get("sortOrder") ?? 0),
              isVisible: formData.get("isVisible") ? true : false,
            },
            formData.get("selfId")
          );
        } catch (error) {
          console.error("An error occurred", error);
        }

        break;
      case "sidebar":
        // 取得原本頁面的uuid
        try {
          // 先取得原本頁面的routerName
          const originalRouterName = await getSidebarByID(
            formData.get("selfId")
          );

          if (
            originalRouterName.data.routerName !== formData.get("routerName")
          ) {
            // 檢查路由名稱是否重複
            const checkRouterNameResult = await checkRouterName(
              formData.get("routerName")
            );

            if (checkRouterNameResult) {
              errors["routerName"] = "路由名稱已存在";
            }
          }

          const originalPageUuid = await getSidebarPageRelationships(
            formData.get("selfId")
          );

          if (originalPageUuid.data.length > 0) {
            if (
              originalPageUuid?.data[0]?.pageUuid !== formData.get("pageUuid")
            ) {
              const deleteSidebarPageResult = await deleteSidebarPage(
                formData.get("selfId"),
                originalPageUuid?.data[0]?.pageUuid
              );
              console.log(deleteSidebarPageResult);
              const createSidebarPageResult = await createSidebarPage({
                sidebarId: formData.get("selfId"),
                pageUuid: formData.get("pageUuid"),
                sortOrder: Number(formData.get("sortOrder") ?? 0),
                isVisible: formData.get("isVisible") ? true : false,
              });
              console.log(createSidebarPageResult);
            }
          } else {
            if (formData.get("pageUuid")) {
              const createSidebarPageResult = await createSidebarPage({
                sidebarId: formData.get("selfId"),
                pageUuid: formData.get("pageUuid"),
                sortOrder: Number(formData.get("sortOrder") ?? 0),
                isVisible: formData.get("isVisible") ? true : false,
              });
              console.log(createSidebarPageResult);
            }
          }

          const updateSidebarResult = await updateSidebar(
            {
              headerId: Number(formData.get("parentId")),
              sidebarNameZh: formData.get("sidebarNameZh"),
              sidebarNameEn: formData.get("sidebarNameEn"),
              routerName: formData.get("routerName"),
              sortOrder: Number(formData.get("sortOrder") ?? 0),
              isVisible: formData.get("isVisible") ? true : false,
            },
            formData.get("selfId")
          );
          console.log(updateSidebarResult);
        } catch (error) {
          console.error("An error occurred", error);
        }

        break;
      case "branch":
        try {
          // 先取得原本頁面的routerName
          const originalRouterName = await getBranchByID(
            formData.get("selfId")
          );

          if (
            originalRouterName.data.routerName !== formData.get("routerName")
          ) {
            // 檢查路由名稱是否重複
            const checkRouterNameResult = await checkRouterName(
              formData.get("routerName")
            );

            if (checkRouterNameResult) {
              errors["routerName"] = "路由名稱已存在";
            }
          }

          const originalPageUuid = await getBranchPageRelationships(
            formData.get("selfId")
          );

          if (originalPageUuid.data.length > 0) {
            if (
              originalPageUuid?.data[0]?.pageUuid !== formData.get("pageUuid")
            ) {
              const deleteBranchPageResult = await deleteBranchPage(
                formData.get("selfId"),
                originalPageUuid?.data[0]?.pageUuid
              );
              console.log(deleteBranchPageResult);
              const createBranchPageResult = await createBranchPage({
                branchId: formData.get("selfId"),
                pageUuid: formData.get("pageUuid"),
                sortOrder: Number(formData.get("sortOrder") ?? 0),
                isVisible: formData.get("isVisible") ? true : false,
              });
              console.log(createBranchPageResult);
            }
          } else {
            if (formData.get("pageUuid")) {
              const createBranchPageResult = await createBranchPage({
                branchId: formData.get("selfId"),
                pageUuid: formData.get("pageUuid"),
                sortOrder: Number(formData.get("sortOrder") ?? 0),
                isVisible: formData.get("isVisible") ? true : false,
              });
            }
          }

          const updateBranchResult = await updateBranch(
            {
              sidebarId: Number(formData.get("parentId")),
              branchNameZh: formData.get("branchNameZh"),
              branchNameEn: formData.get("branchNameEn"),
              routerName: formData.get("routerName"),
              sortOrder: Number(formData.get("sortOrder") ?? 0),
              isVisible: formData.get("isVisible") ? true : false,
            },
            formData.get("selfId")
          );
        } catch (error) {
          console.error("An error occurred", error);
        }

        break;
      case "footer":
        try {
          // 先取得原本頁面的routerName
          const originalRouterName = await getFooterByID(
            formData.get("selfId")
          );

          if (
            originalRouterName.data.routerName !== formData.get("routerName")
          ) {
            // 檢查路由名稱是否重複
            const checkRouterNameResult = await checkRouterName(
              formData.get("routerName")
            );

            if (checkRouterNameResult) {
              errors["routerName"] = "路由名稱已存在";
            }
          }

          // 取得原本頁面的uuid
          const originalPageUuid = await getFooterPageRelationships(
            formData.get("selfId")
          );

          // 如果原本有 page 先判斷有沒有要刪除頁面
          if (originalPageUuid.data.length > 0) {
            // 確認原本的pageUuid和現在的pageUuid是否一樣
            // 如果不ㄧ樣就刪除原本的pageUuid
            if (
              originalPageUuid?.data[0]?.pageUuId !== formData.get("pageUuid")
            ) {
              // 只有footer的pageUuid的I是大寫
              const deleteFooterPageResult = await deleteFooterPage(
                formData.get("selfId"),
                originalPageUuid?.data[0]?.pageUuId
              );

              console.log(deleteFooterPageResult);
              const createFooterPageResult = await createFooterPage({
                footerId: formData.get("selfId"),
                pageUuid: formData.get("pageUuid"),
                sortOrder: Number(formData.get("sortOrder") ?? 0),
                isVisible: formData.get("isVisible") ? true : false,
              });
              console.log(createFooterPageResult);
            }
          } else {
            if (formData.get("pageUuid")) {
              const createFooterPageResult = await createFooterPage({
                footerId: formData.get("selfId"),
                pageUuid: formData.get("pageUuid"),
                sortOrder: Number(formData.get("sortOrder") ?? 0),
                isVisible: formData.get("isVisible") ? true : false,
              });
            }
          }

          const updateFooterResult = await updateFooter(
            {
              footerNameZh: formData.get("footerNameZh"),
              footerNameEn: formData.get("footerNameEn"),
              routerName: formData.get("routerName"),
              sortOrder: Number(formData.get("sortOrder") ?? 0),
              isVisible: formData.get("isVisible") ? true : false,
            },
            formData.get("selfId")
          );
          console.log(updateFooterResult);
        } catch (error) {
          console.error("An error occurred", error);
        }

        // result = await updateFooter(
        //   {
        //     footerNameZh: formData.get("footerNameZh"),
        //     footerNameEn: formData.get("footerNameEn"),
        //     routerName: formData.get("routerName"),
        //     sortOrder: Number(formData.get("sortOrder") ?? 0),
        //   },
        //   formData.get("selfId")
        // );
        // console.log(result);
        break;

      default:
        break;
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  revalidatePath("/backend/navigation/route-setting");
  redirect(
    queryType === "edit"
      ? `/backend/navigation/route-setting?${queryStr}`
      : "/backend/navigation/route-setting"
  );
}

export async function deleteNavigation(element, id) {
  switch (element) {
    case "header":
      const deleteHeaderResult = await deleteHeader(id);
      console.log(deleteHeaderResult);
      break;
    case "sidebar":
      const deleteSidebarResult = await deleteSidebar(id);
      console.log(deleteSidebarResult);
      break;
    case "branch":
      const deleteBranchResult = await deleteBranch(id);
      console.log(deleteBranchResult);
      break;
    case "footer":
      const deleteFooterResult = await deleteFooter(id);
      console.log(deleteFooterResult);
      break;

    default:
      break;
  }

  revalidatePath("/backend/navigation/route-setting");
  redirect("/backend/navigation/route-setting");
}
