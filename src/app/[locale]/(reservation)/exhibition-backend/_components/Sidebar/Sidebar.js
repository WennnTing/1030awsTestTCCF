"use client";
import styles from "./sidebar.module.scss";
import { Fragment, useState } from "react";
import { RiApps2Line } from "react-icons/ri";
import { GrCube } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { AiOutlineUsergroupDelete } from "react-icons/ai";  // 帳號管理
import { IoStorefrontOutline } from "react-icons/io5";      // Market 管理
import { CgExtension } from "react-icons/cg";               // Project管理
import { FaRegMessage } from "react-icons/fa6";             // 會議管理
import { BsBox } from "react-icons/bs";                     // 活動管理 
import { BiBarChartAlt2 } from "react-icons/bi";            // 日誌記錄
import { TbDatabaseImport } from "react-icons/tb";          // 匯入管理



export default function BackSidebar() {
    const pathname = usePathname();
    const currentPath = pathname.split("/")[3];
    const [menuDataList, setMenuDataList] = useState([
        {
            path: "account-manege",
            title: "帳號管理",
            icon: <AiOutlineUsergroupDelete />,
            link: "/zh/exhibition-backend/account-manege",
            id: 1,
            color: "#33A6B8"
        },
        {
            path: "market-manege",
            title: "市場展管理",
            icon: <IoStorefrontOutline />,
            link: "/zh/exhibition-backend/market-manege",
            id: 2,
            color: "#F69451"
        },
        {
            path: "project-manege",
            title: "提案大會管理",
            icon: <CgExtension />,
            id: 3,
            color: "#50BE9C"
        },
        {
            path: "meeting-manege",
            title: "會議管理",
            icon: <FaRegMessage />,
            id: 4,
            color: "#008FDC"
        },
        {
            path: "activities-manege",
            title: "活動管理",
            icon: <BsBox />,
            id: 5,
            color: "#33A6B8"
        },
        {
            path: "import-manege",
            title: "匯入管理",
            icon: <TbDatabaseImport />,
            id: 6,
            color: "#33A6B8"
        },

    ]);

    const toggleSubMenu = (e, id) => {
        e.stopPropagation();
        setMenuDataList(
            menuDataList.map((data) => {
                if (data.id === id) {
                    return {
                        ...data,
                        isOpen: !data.isOpen,
                    };
                } else {
                    return {
                        ...data,
                        isOpen: false,
                    };
                }
            })
        );
    };

    return (
        <div className={styles.sidebarWrapper}>
            <div className={styles.sidebarWrapper__logo}>
                {/* <img src="/path/to/logo.png" alt="TCCF Logo" /> */}
            </div>
            <ul className={styles.sidebarWrapper__menuList}>
                {menuDataList
                    .map((menuData) => (
                        <Fragment key={menuData.title}>
                            <li
                                className={styles.sidebarWrapper__menuList_menuItem}
                                onClick={(e) => toggleSubMenu(e, menuData.id)}
                            >
                                <div className={styles.sidebarWrapper__menuList_menuItem__menuItemContainer}>

                                    <Link
                                        href={menuData.menu ? menuData.menu[0].link : `/zh/exhibition-backend/${menuData.path}`}
                                        style={{
                                            fontWeight: currentPath === menuData.path ? "bold" : "normal",
                                            color: currentPath === menuData.path ? menuData.color : "",
                                        }}
                                    >
                                        <div className={styles.sidebarWrapper__menuList_menuItem__menuItemContainer_icon}>
                                            {menuData.icon}
                                        </div>
                                        <div className={styles.sidebarWrapper__menuList_menuItem__menuItemContainer_text}>
                                            {menuData.title}
                                        </div>
                                    </Link>
                                    {menuData.menu && (
                                        <div className={styles.sidebarWrapper__menuList_menuItem__menuItemContainer_arrow}>
                                            <IoIosArrowDown
                                                style={{
                                                    transform: menuData.isOpen ? "rotate(180deg)" : "",
                                                }}
                                            />
                                        </div>
                                    )}

                                </div>
                            </li>
                            {menuData.isOpen && menuData.menu && (
                                <ul className={styles.sidebarWrapper__menuList__subMenuList}>
                                    {menuData.menu.map((subMenu) => (
                                        <li
                                            key={subMenu.title}
                                            className={styles.sidebarWrapper__menuList__subMenuList__subMenuItem}
                                        >
                                            <Link href={`/zh/backend/${menuData.path}/${subMenu.path}`}>
                                                <div className={styles.sidebarWrapper__menuList__subMenuList__subMenuItem__subMenuItem_text}>
                                                    {subMenu.title}
                                                </div>
                                            </Link>
                                        </li>
                                    ))}

                                </ul>
                            )}
                        </Fragment>
                    ))}
            </ul>

        </div>
    );
}
