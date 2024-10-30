"use client";
import React, { useState } from 'react';
import { BsHouseDoor, BsTerminalPlus } from "react-icons/bs";
import { GrProjects } from "react-icons/gr";
import { IoChatboxOutline } from "react-icons/io5";
import { VscOpenPreview } from "react-icons/vsc";       // Preview
import styles from './exhibitionsidebar.module.scss';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Sidebar = () => {
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const t = useTranslations('ExhibitionNav');
    const [listData, setListData] = useState([
        {
            id: 1,
            title: 'Information',
            sectitle: 'Information',
            path: "exhibitioninfo",
            link: '/exhibition/exhibitioninfo',
            icon: <GrProjects />
        },
        {
            id: 2,
            title: 'Appointments',
            sectitle: 'Management',
            path: "meeting",
            link: '/exhibition/meeting',
            icon: <IoChatboxOutline />
        },
        {
            id: 3,
            title: 'Activities',
            path: "activity",
            link: '/exhibition/activity',
            icon: <BsTerminalPlus />
        },
        {
            id: 4,
            title: 'Preview',
            path: "reserve",
            link: '/exhibition/reserve',
            icon: <VscOpenPreview />
        }
    ]);

    return (
        <div className={styles.sidebarWrapper}>
            <ul className={styles.sidebarWrapper__menuList}>
                {listData.map((menu) => {
                    const currentPath = pathname.split('/')[3];
                    const isActive = currentPath === menu.path;
                    return (
                        <li key={menu.id}
                            className={`${styles.sidebarWrapper__menuList__menuItemContainer} 
                        ${isActive ? styles.active : ''}`}>
                            <Link href={`/${locale}${menu.link}`}>
                                <div className={styles.sidebarWrapper__menuList__icon}>
                                    {menu.icon}
                                </div>
                                <div className={styles.sidebarWrapper__menuList__text}>
                                    <span>{menu.title}</span>
                                    {/* <span>{menu.sectitle}</span> */}
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div >
    );
}

export default Sidebar;