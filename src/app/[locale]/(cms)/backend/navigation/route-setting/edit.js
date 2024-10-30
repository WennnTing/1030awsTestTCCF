import EditNav from "./edit-nav";

import { getAllPages } from "@/actions/pages";

import { getHeaderByID } from "@/actions/header";
import { getSidebarByID } from "@/actions/sidebar";
import { getBranchByID } from "@/actions/branch";
import { getFooterByID } from "@/actions/footer";

import { getPagesByHeaderId } from "@/actions/header-page";
import { getPagesBySidebarId } from "@/actions/sidebar-page";
import { getPagesByBranchId } from "@/actions/branch-page";
import { getPagesByFooterId } from "@/actions/footer-page";

export default async function EditForm({ searchParams }) {
  const pages = await getAllPages();

  const queryElement = searchParams.element;
  const queryElementId = searchParams.id;
  const queryType = searchParams.type;

  // 取得該路徑的資料
  let routeData;
  // 取得該路徑綁定的文章
  let pageData;

  if (queryType === "edit") {
    switch (queryElement) {
      case "header":
        routeData = await getHeaderByID(queryElementId);
        pageData = await getPagesByHeaderId(queryElementId);
        break;

      case "sidebar":
        routeData = await getSidebarByID(queryElementId);
        pageData = await getPagesBySidebarId(queryElementId);
        break;

      case "branch":
        routeData = await getBranchByID(queryElementId);
        pageData = await getPagesByBranchId(queryElementId);
        break;

      case "footer":
        routeData = await getFooterByID(queryElementId);
        pageData = await getPagesByFooterId(queryElementId);
        break;
    }
  }

  return <EditNav pages={pages} routeData={routeData} pageData={pageData} />;
}
