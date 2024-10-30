"use client";
import React, { useEffect, useState } from "react";
import styles from "../market-manege/market-manege.module.scss";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";

// icons
import { GrEdit } from "react-icons/gr"; // 編輯
import { BiSearch } from "react-icons/bi"; // 搜尋
import { AiOutlineHome } from "react-icons/ai"; // 首頁

// components
import TableComponent from "../_components/Table/Table";

// api
import {
    API_GetAllMembers,
    API_GetAllRoles,
} from "@/api/api";

const headers = ["電子信箱", "Role"];

const AccountManagePages = () => {
    const Swal = require("sweetalert2");
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split("/")[1];
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchRole, setSearchRole] = useState("");       // 用戶角色搜尋
    const [searchEmail, setSearchEmail] = useState("");     // 電子信箱搜尋
    const [roleData, setRoleData] = useState([]);
    const [addMemberData, setAddMemberData] = useState({
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
    });

    // 取得所有會員資料
    // 抓取 電子信箱 和 角色
    const getAllmembers = async () => {
        try {
            const res = await API_GetAllMembers();
            console.log("res:", res);
            if (res && res.data) {
                const formattedData = res.data.map((member) => ({
                    email: member.email || "",
                    role: (member.roles || []).join(", "), // 將 roles 陣列轉換成逗號分隔的字串
                    memberId: member.memberId,
                }));
                setData(formattedData);
                setFilteredData(formattedData);
            }
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    // 取得所有角色資料，用於新增帳號時的下拉選單
    // 抓取 roleId 和 roleName
    const getAllRoles = async () => {
        try {
            const res = await API_GetAllRoles();
            if (Array.isArray(res) && res.length > 0) {
                // 將返回的資料格式化為 { value, label } 結構
                const formattedRoles = res.map((role) => ({
                    value: role.roleId,
                    label: role.roleName,
                }));

                setRoleData(formattedRoles); // 更新角色資料到狀態中
            } else {
                console.log("未獲取到角色資料或資料為空");
            }
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    useEffect(() => {
        getAllmembers();
        getAllRoles();
    }, []);

    // 搜尋功能
    // 以 email 和 role 進行搜尋
    const handleSearch = () => {
        const filtered = data.filter((member) => {
            const emailString = String(member.email || "").toLowerCase();
            const roleString = String(member.role || "").toLowerCase();
            return (
                emailString.includes(searchEmail.toLowerCase()) &&
                roleString.includes(searchRole.toLowerCase())
            );
        });

        setFilteredData(filtered);
    };

    useEffect(() => {
        handleSearch();
    }, [searchRole, searchEmail]);

    useEffect(() => {
        console.log("addMemberData:", addMemberData);
    }, [addMemberData]);

    // table 按鈕
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
            `/${locale}/exhibition-backend/meeting-manege/edit/${row.memberId}`
        );
    };

    return (
        <div className="exhibitionBackend">
            <div className="exhibitionBackend__container">
                <div className="exhibitionBackend__contentWrapper">
                    <h1 className="exhibitionBackend__contentWrapper__title">
                        會議管理
                    </h1>

                    {/* 搜尋框區域 */}
                    <div className={styles.marketWrapper__searchWrapper}>
                        <div className={styles.marketWrapper__searchInputContainer}>
                            <BiSearch className={styles.marketWrapper__searchIcon} />
                            <input
                                type="text"
                                value={searchRole}
                                onChange={(e) => setSearchRole(e.target.value)}
                                placeholder={
                                    locale === "zh" ? "搜尋用戶角色" : "Search User Role"
                                }
                                className={styles.marketWrapper__searchInput}
                            />
                        </div>
                        <div className={styles.marketWrapper__searchInputContainer}>
                            <BiSearch className={styles.marketWrapper__searchIcon} />
                            <input
                                type="text"
                                value={searchEmail}
                                onChange={(e) => setSearchEmail(e.target.value)}
                                placeholder={locale === "zh" ? "搜尋電子郵件" : "Search Email"}
                                className={styles.marketWrapper__searchInput}
                            />
                        </div>
                    </div>

                    {/* 標題區域 */}
                    <div className={styles.marketWrapper__mainTitleBlock}>
                        <div className={styles.marketWrapper__titleIcon}>
                            <AiOutlineHome className={styles.marketWrapper__icon} />
                            <h3>帳號清單</h3>
                        </div>
                        {/* <div className={styles.marketWrapper__btnBlock}>
                            <Button
                                text={"新增帳號"}
                                icon={<IoMdAdd />}
                                onClick={openDialog}
                            />
                        </div> */}
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

export default AccountManagePages;
