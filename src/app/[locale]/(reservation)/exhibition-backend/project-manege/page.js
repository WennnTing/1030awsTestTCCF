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
import { API_GetAllProjects } from "@/api/api";

const headers = ["專案名稱", "桌號"];

const ProjectManegePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [titleQuery, setTitleQuery] = useState(""); // 專案名稱
  const [locationQuery, setLocationQuery] = useState(""); // 桌號

  // 取得所有專案的資料
  const getAllProject = async () => {
    try {
      const res = await API_GetAllProjects();
      if (res.length > 0) {
        const formattedData = res.map((project) => ({
          projectTitle: project.projectTitle || "",
          location: project.location || "",
          projectId: project.projectId, // 保留 projectId，但不渲染
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getAllProject();
  }, []);

  const handleSearch = () => {
    const filtered = data.filter(
      (project) =>
        (project.projectTitle
          .toLowerCase()
          .includes(titleQuery.toLowerCase()) ||
          titleQuery === "") &&
        (project.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
          locationQuery === "")
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [titleQuery, locationQuery]);

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
      `/${locale}/exhibition-backend/project-manege/edit/${row.projectId}`
    );
  };

  return (
    <div className="exhibitionBackend">
      <div className="exhibitionBackend__container">
        <div className="exhibitionBackend__contentWrapper">
          <h1 className="exhibitionBackend__contentWrapper__title">
            提案大會管理
          </h1>

          {/* 搜尋框區域 */}
          <div className={styles.marketWrapper__searchWrapper}>
            <div className={styles.marketWrapper__searchInputContainer}>
              <BiSearch className={styles.marketWrapper__searchIcon} />
              <input
                type="text"
                value={titleQuery}
                onChange={(e) => setTitleQuery(e.target.value)}
                placeholder="搜尋專案名稱"
                className={styles.marketWrapper__searchInput}
              />
            </div>
            <div className={styles.marketWrapper__searchInputContainer}>
              <BiSearch className={styles.marketWrapper__searchIcon} />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="搜尋桌號"
                className={styles.marketWrapper__searchInput}
              />
            </div>
          </div>

          {/* 標題區域 */}
          <div className={styles.marketWrapper__mainTitleBlock}>
            <div className={styles.marketWrapper__titleIcon}>
              <AiOutlineHome className={styles.marketWrapper__icon} />
              <h3>專案清單</h3>
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

export default ProjectManegePage;
