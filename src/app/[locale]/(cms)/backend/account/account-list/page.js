import styles from "./account-list.module.scss";
import Table from "@/components/cms/table";
import { Button } from "@/components/cms/button";
import Pagination from "@/components/cms/pagination";
import { getAllMembers } from "@/actions/memeber";
import { Suspense } from "react";
import LoadingScreen from "@/components/cms/loading-screen";

async function MemberList({ page = 1 }) {
  const members = await getAllMembers();
  const memberData = members?.data?.slice((page - 1) * 10, page * 10);
  const tableHeader = [
    {
      id: 1,
      name: "使用者名稱",
      value: "username",
    },
    {
      id: 2,
      name: "電子信箱",
      value: "email",
    },
    {
      id: 3,
      name: "角色分類",
      value: "type",
    },
    {
      id: 4,
      name: "用戶角色",
      value: "",
    },
    {
      id: 5,
      name: "創建時間",
      value: "createdAt",
    },
    {
      id: 7,
      name: "",
      value: "action",
    },
  ];
  return <Table header={tableHeader} data={memberData} type={"account"} />;
}

export default async function AccountListPage({ searchParams }) {
  const page = searchParams.page;
  const members = await getAllMembers();
  return (
    <div>
      <h2>帳號管理 / 帳號列表</h2>
      <div className="cmsPage__container">
        <div className="cmsPage__container__header">
          <div className={styles.cmsAccountList}>
            <div className={styles.cmsAccountList__header}>
              <h3 className={styles.cmsAccountList__header_title}>帳號清單</h3>

              <Button
                text={"新增帳號"}
                type={"primary"}
                href={"add-account"}
                action={"nav"}
              />
            </div>

            <Suspense fallback={<LoadingScreen />}>
              <MemberList page={page} />
            </Suspense>
          </div>
        </div>
        <Pagination total={members.data.length} perPage={10} />
      </div>
    </div>
  );
}
