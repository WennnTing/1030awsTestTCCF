"use client";
import styles from "./navigation.module.scss";
import { Fragment, useState } from "react";
import { useLocale } from "next-intl";
import { localeToUpperCase } from "@/utils";
import ActionButton from "./action-button";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { deleteNavigation } from "@/actions/navigation";
import { Alert } from "@/components/cms/swal";

export default function Nav({ headers, sidebars, footers, branches }) {
  const router = useRouter();
  const locale = localeToUpperCase(useLocale());
  const [navData, setNavData] = useState(
    headers.data
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((header) => {
        return {
          ...header,
          isOpen: false,
          onClick: false,
          sidebars: sidebars.data
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((sidebar) => {
              if (sidebar.headerId === header.headerId) {
                return {
                  ...sidebar,
                  isOpen: false,
                  onClick: false,
                  branches: branches.data
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((branch) => {
                      if (branch.sidebarId === sidebar.sidebarId) {
                        return {
                          ...branch,
                          onClick: false,
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
  const [footerData, setFooterData] = useState(
    footers.data
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((footer) => {
        return {
          ...footer,
          onClick: false,
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

  const handleOnClick = (element, id, data) => {
    router.push(
      `/zh/backend/navigation/route-setting?type=edit&element=${element}&id=${id}`
    );

    if (element === "header") {
      setNavData((prev) =>
        prev.map((item) => {
          if (item.headerId === id) {
            return {
              ...item,
              onClick: true,
              sidebars: item.sidebars.map((sidebar) => ({
                ...sidebar,
                onClick: false,
                branches: sidebar.branches.map((branch) => ({
                  ...branch,
                  onClick: false,
                })),
              })),
            };
          } else {
            return {
              ...item,
              onClick: false,
              sidebars: item.sidebars.map((sidebar) => ({
                ...sidebar,
                onClick: false,
                branches: sidebar.branches.map((branch) => ({
                  ...branch,
                  onClick: false,
                })),
              })),
            };
          }
        })
      );
      setFooterData((prev) =>
        prev.map((footer) => ({ ...footer, onClick: false }))
      );
    } else if (element === "sidebar") {
      setNavData((prev) =>
        prev.map((item) => {
          return {
            ...item,
            onClick: false,
            sidebars: item.sidebars.map((sidebar) => {
              if (sidebar.sidebarId === id) {
                return {
                  ...sidebar,
                  onClick: true,
                  branches: sidebar.branches.map((branch) => {
                    return { ...branch, onClick: false };
                  }),
                };
              } else {
                return {
                  ...sidebar,
                  onClick: false,
                  branches: sidebar.branches.map((branch) => {
                    return { ...branch, onClick: false };
                  }),
                };
              }
            }),
          };
        })
      );
      setFooterData((prev) =>
        prev.map((footer) => ({ ...footer, onClick: false }))
      );
    } else if (element === "branch") {
      setNavData((prev) =>
        prev.map((item) => {
          return {
            ...item,
            onClick: false,
            sidebars: item.sidebars.map((sidebar) => {
              return {
                ...sidebar,
                onClick: false,
                branches: sidebar.branches.map((branch) => {
                  if (branch.branchId === id) {
                    return { ...branch, onClick: true };
                  } else {
                    return { ...branch, onClick: false };
                  }
                }),
              };
            }),
          };
        })
      );

      setFooterData((prev) =>
        prev.map((footer) => ({ ...footer, onClick: false }))
      );
    } else {
      setFooterData((prev) =>
        prev.map((footer) => {
          if (footer.footerId === id) {
            return { ...footer, onClick: true };
          } else {
            return { ...footer, onClick: false };
          }
        })
      );

      setNavData((prev) =>
        prev.map((item) => {
          return {
            ...item,
            onClick: false,
            sidebars: item.sidebars.map((sidebar) => {
              return {
                ...sidebar,
                onClick: false,
                branches: sidebar.branches.map((branch) => ({
                  ...branch,
                  onClick: false,
                })),
              };
            }),
          };
        })
      );
    }
  };

  const [titleStatus, setTitleStatus] = useState([
    {
      name: "header",
      isOpen: true,
    },
    {
      name: "footer",
      isOpen: true,
    },
  ]);

  const handleTitle = (element) => {
    setTitleStatus(
      titleStatus.map((data) => {
        if (data.name === element) {
          return { ...data, isOpen: !data.isOpen };
        } else {
          return data;
        }
      })
    );
  };

  const handleIncreaseRoute = (element, id) => {
    router.push(
      `/zh/backend/navigation/route-setting?type=create&element=${element}&id=${id}`
    );
  };

  const handleDeleteNavigation = (element, id) => {
    Alert({
      title: "確定刪除路由？",
      text: "此動作將無法復原",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "確認",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNavigation(element, id);
      }
    });
  };

  return (
    <div className={styles.cmsNavigation__container}>
      <div className={styles.cmsNavigation__container_routerList}>
        <div className={styles.cmsNavigation__container_routerList__mainTitle}>
          <div
            className={
              styles.cmsNavigation__container_list__item_container__action_icon
            }
            onClick={() => handleTitle("header")}
          >
            <IoIosArrowForward
              style={{
                transform: titleStatus?.filter(
                  (data) => data.name === "header"
                )?.[0]?.isOpen
                  ? "rotate(90deg) "
                  : "rotate(0deg)",
              }}
            />
          </div>

          <div
            className={
              styles.cmsNavigation__container_routerList__mainTitle_text
            }
          >
            頁首
          </div>

          <ActionButton
            onClickFun={() => handleIncreaseRoute("header", "")}
            type={"increase"}
          />
        </div>
        <ul
          className={styles.cmsNavigation__container_list}
          style={{
            gridTemplateRows: titleStatus?.filter(
              (data) => data.name === "header"
            )?.[0]?.isOpen
              ? "1fr"
              : "0fr",
          }}
        >
          <div className={styles.cmsNavigation__container_list__itemWrapper}>
            {navData.map((header) => (
              <Fragment key={header.headerId}>
                <li className={styles.cmsNavigation__container_list__item}>
                  <div
                    className={
                      styles.cmsNavigation__container_list__item_container
                    }
                    style={{
                      background: header.onClick ? "#F8F9FAFF" : "",
                    }}
                  >
                    <div
                      className={
                        styles.cmsNavigation__container_list__item_container__action_icon
                      }
                      onClick={() => handleToggle("header", header.headerId)}
                      style={{
                        visibility:
                          header.sidebars.length > 0 ? "visible" : "hidden",
                      }}
                    >
                      <IoIosArrowForward
                        style={{
                          transform: header.isOpen
                            ? "rotate(90deg) "
                            : "rotate(0deg)",
                        }}
                      />
                    </div>
                    <div
                      className={
                        styles.cmsNavigation__container_list__item_container__text
                      }
                      onClick={() =>
                        handleOnClick("header", header.headerId, header)
                      }
                    >
                      {header[`headerName${locale}`]}
                    </div>

                    <div
                      className={
                        styles.cmsNavigation__container_list__item_container__action
                      }
                    >
                      <ActionButton
                        onClickFun={() =>
                          handleDeleteNavigation("header", header.headerId)
                        }
                        type={"delete"}
                      />

                      <ActionButton
                        onClickFun={() =>
                          handleIncreaseRoute("sidebar", header.headerId)
                        }
                        type={"increase"}
                      />
                    </div>
                  </div>
                  <ul
                    className={styles.cmsNavigation__container_list}
                    style={{ gridTemplateRows: header.isOpen ? "1fr " : "0fr" }}
                  >
                    <div
                      className={
                        styles.cmsNavigation__container_list__itemWrapper
                      }
                    >
                      <hr />
                      {header.sidebars?.map((sidebar) => (
                        <li
                          key={sidebar.sidebarId}
                          className={styles.cmsNavigation__container_list__item}
                        >
                          <div
                            className={`${styles.cmsNavigation__container_list__item_container}
                         ${styles.sidebar}`}
                            style={{
                              background: sidebar.onClick ? "#F8F9FAFF" : "",
                            }}
                          >
                            <div
                              className={
                                styles.cmsNavigation__container_list__item_container__action_icon
                              }
                              onClick={() =>
                                handleToggle("sidbar", sidebar.sidebarId)
                              }
                              style={{
                                visibility:
                                  sidebar.branches.length > 0
                                    ? "visible"
                                    : "hidden",
                              }}
                            >
                              <IoIosArrowForward
                                style={{
                                  transform: sidebar.isOpen
                                    ? "rotate(90deg) "
                                    : "rotate(0deg)",
                                }}
                              />
                            </div>

                            <div
                              className={
                                styles.cmsNavigation__container_list__item_container__text
                              }
                              onClick={() =>
                                handleOnClick(
                                  "sidebar",
                                  sidebar.sidebarId,
                                  sidebar
                                )
                              }
                            >
                              {sidebar[`sidebarName${locale}`]}
                            </div>
                            <div
                              className={
                                styles.cmsNavigation__container_list__item_container__action
                              }
                            >
                              <ActionButton
                                onClickFun={() =>
                                  handleDeleteNavigation(
                                    "sidebar",
                                    sidebar.sidebarId
                                  )
                                }
                                type={"delete"}
                              />

                              <ActionButton
                                onClickFun={() =>
                                  handleIncreaseRoute(
                                    "branch",
                                    sidebar.sidebarId
                                  )
                                }
                                type={"increase"}
                              />
                            </div>
                          </div>
                          <ul
                            className={styles.cmsNavigation__container_list}
                            style={{
                              gridTemplateRows: sidebar.isOpen ? "1fr " : "0fr",
                            }}
                          >
                            <div
                              className={
                                styles.cmsNavigation__container_list__itemWrapper
                              }
                            >
                              <hr
                                style={{
                                  border: "1px solid #F8F9FAFF",
                                  left: "60px",
                                }}
                              />
                              {sidebar.branches?.map((branch) => (
                                <li
                                  key={branch.branchId}
                                  className={
                                    styles.cmsNavigation__container_list__item
                                  }
                                >
                                  <div
                                    className={`${styles.cmsNavigation__container_list__item_container}
                            ${styles.branch}`}
                                    style={{
                                      background: branch.onClick
                                        ? "#F8F9FAFF"
                                        : "",
                                    }}
                                  >
                                    <div
                                      className={
                                        styles.cmsNavigation__container_list__item_container__text
                                      }
                                      onClick={() =>
                                        handleOnClick(
                                          "branch",
                                          branch.branchId,
                                          branch
                                        )
                                      }
                                    >
                                      {branch[`branchName${locale}`]}
                                    </div>
                                    <div
                                      className={
                                        styles.cmsNavigation__container_list__item_container__action
                                      }
                                    >
                                      <ActionButton
                                        onClickFun={() =>
                                          handleDeleteNavigation(
                                            "branch",
                                            branch.branchId
                                          )
                                        }
                                        type={"delete"}
                                      />
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </div>
                          </ul>
                        </li>
                      ))}
                    </div>
                  </ul>
                </li>
                {/* sidebar */}
              </Fragment>
            ))}
          </div>

          {/* footer */}
          <div
            className={styles.cmsNavigation__container_routerList__mainTitle}
          >
            <div
              className={
                styles.cmsNavigation__container_list__item_container__action_icon
              }
              onClick={() => handleTitle("footer")}
            >
              <IoIosArrowForward
                style={{
                  transform: titleStatus?.filter(
                    (data) => data.name === "footer"
                  )?.[0]?.isOpen
                    ? "rotate(90deg) "
                    : "rotate(0deg)",
                }}
              />
            </div>

            <div
              className={
                styles.cmsNavigation__container_routerList__mainTitle_text
              }
            >
              頁尾
            </div>
            <ActionButton
              onClickFun={() => handleIncreaseRoute("footer", "")}
              type={"increase"}
            />
          </div>

          <ul
            className={styles.cmsNavigation__container_list}
            style={{
              gridTemplateRows: titleStatus?.filter(
                (data) => data.name === "footer"
              )?.[0]?.isOpen
                ? "1fr"
                : "0fr",
            }}
          >
            <div className={styles.cmsNavigation__container_list__itemWrapper}>
              {footerData?.map((footer) => (
                <li
                  key={footer.footerId}
                  className={styles.cmsNavigation__container_list__item}
                >
                  <div
                    className={
                      styles.cmsNavigation__container_list__item_container
                    }
                    style={{
                      background: footer.onClick ? "#F8F9FAFF" : "",
                    }}
                  >
                    <div
                      className={
                        styles.cmsNavigation__container_list__item_container__text
                      }
                      onClick={() =>
                        handleOnClick("footer", footer.footerId, footer)
                      }
                      style={{
                        paddingLeft: "40px",
                      }}
                    >
                      {footer[`footerName${locale}`]}
                    </div>
                    <div
                      className={
                        styles.cmsNavigation__container_list__item_container__action
                      }
                    >
                      <ActionButton
                        onClickFun={() =>
                          handleDeleteNavigation("footer", footer.footerId)
                        }
                        type={"delete"}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </ul>
      </div>

      {/* <div className={styles.cmsNavigation__editWrapper}>
        {modalType.open && (
          <EditNav modalInfo={modalType} handleCloseModal={handleCloseModal} />
        )}
      </div> */}
    </div>
  );
}
