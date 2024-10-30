"use client";
import React, { useEffect, useState } from "react";
import styles from "../market-manege/market-manege.module.scss";
import { useRouter, usePathname } from "next/navigation";

// icons
import { GrEdit } from "react-icons/gr"; // 編輯
import { BiSearch } from "react-icons/bi"; // 搜尋
import { AiOutlineHome } from "react-icons/ai"; // 首頁

// components
import TableComponent from "../_components/Table/Table";

// api
import { API_GetAllActivities } from "@/api/api";

const headers = ["活動名稱", "位置", "報名人數/上限人數"];

const ActivitiesManegePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activitesNameQuery, setActivitesNameQuery] = useState(""); // 公司名稱搜尋

  // 取得所有活動的資料
  const getAllActivites = async () => {
    try {
      const res = await API_GetAllActivities();
      if (res && res.data) {
        const formattedData = res.data.map((activities) => ({
          activityName: activities.activityName || "",
          location: activities.location || "",
          activityId: activities.activityId,
          signUp: `${activities.currentParticipants || 0} / ${activities.maxParticipants || 0}`,
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    getAllActivites();
  }, []);

  const handleSearch = () => {
    const filtered = data.filter((activities) =>
      (activities.activityName || "").includes(activitesNameQuery)
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [activitesNameQuery]);

  const renderActions = (row) => (
    <div className={styles.marketWrapper__actionButtons}>
      <span
        className={styles.marketWrapper__actionIcon}
        onClick={() => handleEdit(row)}
      >
        <GrEdit />
      </span>
    </div>
  );

  const handleEdit = (row) => {
    router.push(
      `/${locale}/exhibition-backend/activities-manege/edit/${row.activityId}`
    );
  };

  return (
    <div className="exhibitionBackend">
      <div className="exhibitionBackend__container">
        <div className="exhibitionBackend__contentWrapper">
          <h1 className="exhibitionBackend__contentWrapper__title">
            活動管理
          </h1>

          {/* 搜尋框區域 */}
          <div className={styles.marketWrapper__searchWrapper}>
            <div className={styles.marketWrapper__searchInputContainer}>
              <BiSearch className={styles.marketWrapper__searchIcon} />
              <input
                type="text"
                value={activitesNameQuery}
                onChange={(e) => setActivitesNameQuery(e.target.value)}
                placeholder="搜尋活動名稱"
                className={styles.marketWrapper__searchInput}
              />
            </div>
          </div>

          {/* 標題區域 */}
          <div className={styles.marketWrapper__mainTitleBlock}>
            <div className={styles.marketWrapper__titleIcon}>
              <AiOutlineHome className={styles.marketWrapper__icon} />
              <h3>活動清單</h3>
            </div>
          </div>

          <div className={styles.marketWrapper}>
            <TableComponent
              headers={headers}
              data={filteredData}
              renderActions={renderActions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesManegePage;
