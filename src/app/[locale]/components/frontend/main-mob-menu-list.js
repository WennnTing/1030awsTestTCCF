"use client";
import styles from "./main-mob-menu.module.scss";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useRouter } from "../../../../navigation";
import { useLocale } from "next-intl";
import { localeToUpperCase } from "@/utils";
export default function MainMobMenuList({ headers, sidebars, branches }) {
  const locale = useLocale();

  const router = useRouter();
  const [navData, setNavData] = useState(
    headers.data
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((header) => {
        return {
          ...header,
          isOpen: false,
          sidebars: sidebars.data
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((sidebar) => {
              if (sidebar.headerId === header.headerId) {
                return {
                  ...sidebar,
                  isOpen: false,
                  branches: branches.data
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((branch) => {
                      if (branch.sidebarId === sidebar.sidebarId) {
                        return {
                          ...branch,
                        };
                      }
                    })
                    .filter((branch) => branch),
                };
              }
            })
            .filter((sidebar) => sidebar),
        };
      })
  );

  const handleToggle = (element, id) => {
    if ("header" === element) {
      setNavData((prev) =>
        prev.map((item) => {
          if (item.headerId === id) {
            return { ...item, isOpen: !item.isOpen };
          } else {
            return item;
          }
        })
      );
    } else {
      setNavData((prev) =>
        prev.map((header) => {
          return {
            ...header,
            sidebars: header.sidebars.map((sidebar) => {
              if (sidebar.sidebarId === id) {
                return {
                  ...sidebar,
                  isOpen: !sidebar.isOpen,
                };
              } else {
                return sidebar;
              }
            }),
          };
        })
      );
    }
  };

  const handleRedirect = (path) => {
    router.push(`/${path}`);
  };

  return (
    <div className={styles.mainMobMenu__container}>
      <ul className={styles.mainMobMenu__container_headerList}>
        {navData.map((header) => {
          return (
            <li
              key={header.headerId}
              className={styles.mainMobMenu__container_headerList__item}
            >
              <div
                className={
                  styles.mainMobMenu__container_headerList__item_mainItem
                }
                onClick={() =>
                  header.sidebars.length > 0
                    ? handleToggle("header", header.headerId)
                    : handleRedirect(header.routerName)
                }
              >
                <div
                  className={
                    styles.mainMobMenu__container_headerList__item_mainItem__text
                  }
                >
                  {header[`headerName${localeToUpperCase(locale)}`]}
                </div>

                {header.sidebars.length > 0 && (
                  <div
                    className={
                      styles.mainMobMenu__container_headerList__item_mainItem__icon
                    }
                  >
                    <IoIosArrowForward
                      style={{
                        transform: header.isOpen
                          ? "rotate(90deg) "
                          : "rotate(0deg)",
                      }}
                    />
                  </div>
                )}
              </div>

              <ul
                className={styles.mainMobMenu__container_sidebarList}
                style={{ gridTemplateRows: header.isOpen ? "1fr " : "0fr" }}
              >
                <div
                  className={
                    styles.mainMobMenu__container_sidebarList__container
                  }
                >
                  <li
                    className={styles.mainMobMenu__container_sidebarList__item}
                  >
                    <div
                      onClick={() => handleRedirect(`${header.routerName}`)}
                      className={
                        styles.mainMobMenu__container_sidebarList__item_mainItem
                      }
                    >
                      <div
                        className={
                          styles.mainMobMenu__container_sidebarList__item_mainItem_text
                        }
                      >
                        {header[`headerName${localeToUpperCase(locale)}`]}
                      </div>
                    </div>
                  </li>

                  {header.sidebars.map((sidebar) => (
                    <div
                      key={sidebar.sidebarId}
                      onClick={() =>
                        sidebar.branches.length > 0
                          ? handleToggle("sidebar", sidebar.sidebarId)
                          : handleRedirect(
                              `${header.routerName}/${sidebar.routerName}`
                            )
                      }
                      className={
                        styles.mainMobMenu__container_sidebarList__item
                      }
                    >
                      <div
                        className={
                          styles.mainMobMenu__container_sidebarList__item_mainItem
                        }
                      >
                        <div
                          className={
                            styles.mainMobMenu__container_sidebarList__item_mainItem__text
                          }
                        >
                          {sidebar[`sidebarName${localeToUpperCase(locale)}`]}
                        </div>
                        {sidebar.branches.length > 0 && (
                          <div
                            className={
                              styles.mainMobMenu__container_sidebarList__item_mainItem__icon
                            }
                          >
                            <IoIosArrowForward
                              style={{
                                transform: header.isOpen
                                  ? "rotate(90deg) "
                                  : "rotate(0deg)",
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <ul
                        className={styles.mainMobMenu__container_branchList}
                        style={{
                          gridTemplateRows: sidebar.isOpen ? "1fr " : "0fr",
                        }}
                      >
                        <div
                          className={
                            styles.mainMobMenu__container_branchList__container
                          }
                        >
                          {sidebar.branches.length > 0 && (
                            <li
                              className={
                                styles.mainMobMenu__container_branchList__item
                              }
                            >
                              <div
                                onClick={() =>
                                  handleRedirect(
                                    `${header.routerName}/${sidebar.routerName}`
                                  )
                                }
                                className={
                                  styles.mainMobMenu__container_branchList__item_mainItem
                                }
                              >
                                <div
                                  className={
                                    styles.mainMobMenu__container_branchList__item_mainItem_text
                                  }
                                >
                                  {
                                    sidebar[
                                      `sidebarName${localeToUpperCase(locale)}`
                                    ]
                                  }
                                </div>
                              </div>
                            </li>
                          )}

                          {sidebar?.branches.map((branch) => (
                            <li
                              key={branch.branchId}
                              className={
                                styles.mainMobMenu__container_branchList__item
                              }
                              onClick={() =>
                                handleRedirect(
                                  `${header.routerName}/${sidebar.routerName}/${branch.routerName}`
                                )
                              }
                            >
                              <div
                                className={
                                  styles.mainMobMenu__container_branchList__item_mainItem
                                }
                              >
                                <div
                                  className={
                                    styles.mainMobMenu__container_branchList__item_mainItem__text
                                  }
                                >
                                  {
                                    branch[
                                      `branchName${localeToUpperCase(locale)}`
                                    ]
                                  }
                                </div>
                              </div>
                            </li>
                          ))}
                        </div>
                      </ul>
                    </div>
                  ))}
                </div>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
