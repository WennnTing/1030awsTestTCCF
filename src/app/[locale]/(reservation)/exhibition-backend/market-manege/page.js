"use client";
import React, { useEffect, useState } from "react";
import styles from "./market-manege.module.scss";
import { useRouter, usePathname } from "next/navigation";

// icons
import { GrEdit } from "react-icons/gr"; // 編輯
import { BiSearch } from "react-icons/bi"; // 搜尋
import { AiOutlineHome } from "react-icons/ai"; // 首頁
import { IoMdAdd } from "react-icons/io"; // 新增
import { AiOutlineProduct } from "react-icons/ai"; // 前往作品

// components
import TableComponent from "../_components/Table/Table";
import Button from "../../exhibition/components/Button/Button";

// api
import { API_GetAllCompanies } from "@/api/api";

const headers = ["展位", "公司中文名稱", "展證張數"];

const MarketManegePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [nameQuery, setNameQuery] = useState(""); // 公司名稱搜尋

  // 取得所有公司的資料
  const getAllCompanies = async () => {
    try {
      const res = await API_GetAllCompanies();
      if (res && res.data) {
        const formattedData = res.data.map((company) => ({
          marketRef: company.marketRef || "",
          companyName: company.companyNameZh || "",
          badgeCount: company.passCount || "",
          companyId: company.companyId, // 保留 companyId 但不渲染
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  const handleSearch = () => {
    const filtered = data.filter((company) =>
      (company.companyName || "").includes(nameQuery)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearch(); // 當任何一個搜尋框的值改變時，調用 handleSearch 進行篩選
  }, [nameQuery]);

  const renderActions = (row) => (
    <div className={styles.marketWrapper__actionButtons}>
      <span
        className={styles.marketWrapper__actionIcon}
        onClick={() => handleDelete(row)}
      >
        <AiOutlineProduct />
      </span>
      <span
        className={styles.marketWrapper__actionIcon}
        onClick={() => handleEdit(row)}
      >
        <GrEdit />
      </span>
    </div>
  );

  const handleEdit = (row) => {
    // console.log('編輯:', row);
    router.push(
      `/${locale}/exhibition-backend/market-manege/edit/${row.companyId}`
    );
  };

  const handleDelete = (row) => {
    router.push(
      `/${locale}/exhibition-backend/market-manege/portfolio/${row.companyId}`
    );
  };

  const routeToCreate = () => {
    router.push(`/${locale}/exhibition-backend/market-manege/create-company`);
  };

  return (
    <div className="exhibitionBackend">
      <div className="exhibitionBackend__container">
        <div className="exhibitionBackend__contentWrapper">
          <h1 className="exhibitionBackend__contentWrapper__title">
            市場展管理
          </h1>

          {/* 搜尋框區域 */}
          <div className={styles.marketWrapper__searchWrapper}>
            <div className={styles.marketWrapper__searchInputContainer}>
              <BiSearch className={styles.marketWrapper__searchIcon} />
              <input
                type="text"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                placeholder="搜尋公司名稱"
                className={styles.marketWrapper__searchInput}
              />
            </div>
          </div>

          {/* 標題區域 */}
          <div className={styles.marketWrapper__mainTitleBlock}>
            <div className={styles.marketWrapper__titleIcon}>
              <AiOutlineHome className={styles.marketWrapper__icon} />
              <h3>公司清單</h3>
            </div>

            <div className={styles.marketWrapper__btnBlock}>
              <Button
                text={"新增公司"}
                icon={<IoMdAdd />}
                onClick={routeToCreate}
              />
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

export default MarketManegePage;
