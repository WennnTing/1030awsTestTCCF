import styles from "./visual-setting.module.scss";
import Table from "@/components/cms/table";
import Pagination from "@/components/cms/pagination";
import { Button } from "@/components/cms/button";
import { _getAllBanners } from "@/actions/_banner";
import { Suspense } from "react";
import LoadingScreen from "@/components/cms/loading-screen";

async function BannerList({ page = 1, banner }) {
  const bannerData = banner?.data?.slice((page - 1) * 10, page * 10);
  const tableHeader = [
    {
      id: 1,
      name: "排序",
      value: "sortOrder",
      textAlign: "left",
    },
    {
      id: 2,
      name: "標題",
      value: "title",
      textAlign: "left",
    },
    {
      id: 3,
      name: "圖片",
      value: "imageUrl",
    },
    {
      id: 4,
      name: "路徑",
      value: "redirectUrl",
      textAlign: "left",
    },
    {
      id: 5,
      name: "",
      value: "action",
    },
  ];
  return <Table header={tableHeader} data={bannerData} type={"banner"} />;
}

export default async function VisualPage({ searchParams }) {
  const page = searchParams.page;
  const banners = await _getAllBanners();

  return (
    <div>
      <h2>視覺管理 / 視覺設定</h2>
      <div className="cmsPage__container">
        <div className={styles.cmsVisualSetting}>
          <div className={styles.cmsVisualSetting__header}>
            <h3>橫幅清單</h3>
            <Button
              text={"新增橫幅"}
              type={"primary"}
              href={"add-banner"}
              action={"nav"}
            />
          </div>

          <Suspense fallback={<LoadingScreen />}>
            <BannerList page={page} banner={banners} />
          </Suspense>
        </div>
        <Pagination total={banners?.data?.length} perPage={10} />
      </div>
    </div>
  );
}
