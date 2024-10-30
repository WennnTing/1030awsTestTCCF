"use client";

import NavLink from "./nav-link";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./side-bar.module.scss";
import BranchBar from "./branch-bar";
import { Fragment, useState, useEffect } from "react";
import { localeToUpperCase } from "@/utils";

export default function SideBarToggle({ sidebar, params, branches }) {
  const locale = localeToUpperCase(params.locale);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (params) {
      params.slug.some((slug) => {
        if (branches.data.some((branch) => branch.routerName === slug)) {
          setIsOpen(true);
        }
      });
    }
  }, [params]);

  return (
    <Fragment>
      <div className={styles.sideBar__menuList_menuItem__wrapper_container}>
        <NavLink href={`${params.slug[0]}/${sidebar.routerName}`}>
          {sidebar[`sidebarName${locale}`]}
        </NavLink>
        {branches.data.length > 0 && (
          <div
            className={
              styles.sideBar__menuList_menuItem__wrapper_container__icon
            }
          >
            <IoIosArrowForward
              onClick={() => setIsOpen(!isOpen)}
              style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            />
          </div>
        )}
      </div>
      <BranchBar
        branches={branches}
        sideBarRouter={sidebar.routerName}
        locale={locale}
        params={params}
        isOpen={isOpen}
      />
    </Fragment>
  );
}
