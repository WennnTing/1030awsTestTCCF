"use client";
import styles from "./table.module.scss";
import moment from "moment";
import { BsPencil } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";
import { Alert } from "./swal";
import { deleteArticle } from "@/actions/page";
import { deleteAccount } from "@/actions/account";
import { deleteBanner } from "@/actions/banner";
import { Link } from "../../../../navigation";

export default function Table({ header, data, type }) {
  async function handleDeleteArticle(uuid) {
    await Alert({
      title: "確定刪除文章？",
      text: "此動作將無法復原",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "確認",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteArticle(uuid);
      }
    });
  }

  async function handleDeleteAccount(id) {
    await Alert({
      title: "確定刪除使用者？",
      text: "此動作將無法復原",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "確認",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAccount(id);
      }
    });
  }

  async function handleDeleteBanner(id) {
    await Alert({
      title: "確定刪除橫幅？",
      text: "此動作將無法復原",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "確認",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBanner(id);
      }
    });
  }

  const getHref = (type, item) => {
    switch (type) {
      case "account":
        // handleDeleteAccount(item.memberId);
        return ""; // 假設 handleDeleteAccount 不返回 URL
      case "article":
        return `edit-article/${item.pageUuid}`;
      case "banner":
        return `edit-banner/${item.bannerId}`;
      default:
        return "";
    }
  };

  return (
    <div className={styles.cmsTable}>
      <table>
        <thead>
          <tr>
            {header.map((item, index) => (
              <th
                key={index}
                style={{
                  textAlign: item.textAlign ? item.textAlign : "center",
                  width: item.width ? item.width : "auto",
                }}
              >
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {header.map((el, index) => (
                <td
                  key={index}
                  style={{
                    textAlign: el.textAlign ? el.textAlign : "center",
                    width: el.width ? el.width : "auto",
                  }}
                >
                  {(() => {
                    switch (el.value) {
                      case "action":
                        return (
                          <div className={styles.cmsTable__action}>
                            {type !== "account" && (
                              <Link
                                className={styles.cmsTable__action_icon}
                                href={getHref(type, item)}
                              >
                                <BsPencil />
                              </Link>
                            )}

                            <div
                              className={styles.cmsTable__action_icon}
                              onClick={() => {
                                switch (type) {
                                  case "account": {
                                    return handleDeleteAccount(item.memberId);
                                  }
                                  case "article": {
                                    return handleDeleteArticle(item.pageUuid);
                                  }
                                  case "banner": {
                                    return handleDeleteBanner(item.bannerId);
                                  }
                                  default: {
                                    console.warn(`Unhandled type: ${type}`);
                                    break;
                                  }
                                }
                              }}
                            >
                              <BsTrash3 />
                            </div>
                          </div>
                        );

                      case "pageNameZh":
                        return (
                          <div className={styles.cmsTable__title}>
                            <Link
                              href={`/${item["routerName"]}`}
                              target="_blank"
                            >
                              {item[el.value]}
                            </Link>
                          </div>
                        );

                      case "publishDate":
                        return (
                          <div className={styles.cmsTable_wrap}>
                            <span>
                              {moment(item[el.value]).format("YYYY/MM/DD")}
                            </span>
                            <span>
                              {moment(item["unpublishDate"]).format(
                                "YYYY/MM/DD"
                              )}
                            </span>
                          </div>
                        );

                      case "templateId":
                        switch (item[el.value]) {
                          case 1:
                            return "一般型";
                          case 2:
                            return "條列型";
                          case 3:
                            return "表格型";
                          case 4:
                            return "消息表型";
                          case 5:
                            return "活動型";

                          default:
                            break;
                        }

                      case "createdAt":
                        return moment(item[el.value]).format(
                          "YYYY-MM-DD HH:mm:ss"
                        );

                      case "imageUrl":
                        return (
                          <div className={styles.cmsTable__banner}>
                            <img
                              src={item[el.value]}
                              alt="banner"
                              style={{ width: "100px", height: "100px" }}
                            />
                          </div>
                        );

                      case "redirectUrl":
                        return (
                          <div
                            style={{
                              textAlign: "left",
                            }}
                          >
                            {item[el.value]}
                          </div>
                        );
                      default:
                        return item[el.value];
                    }
                  })()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
