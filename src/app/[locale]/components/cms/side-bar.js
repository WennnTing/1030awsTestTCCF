import styles from "./side-bar.module.scss";
import NavLink from "./nav-link";
import SubSideBar from "./sub-side-bar";
import { Link } from "../../../../navigation";
import { MdContentCopy } from "react-icons/md"; // 內容管理
import { GoFileDirectory } from "react-icons/go"; // 導航管理
import { CgExtension } from "react-icons/cg"; // 視覺管理
import { AiOutlineUsergroupDelete } from "react-icons/ai"; // 帳號管理
import { FaClockRotateLeft } from "react-icons/fa6"; // 日誌記錄
import { BiBarChartAlt2 } from "react-icons/bi"; // 報表查詢

export default function SideBar() {
  const menuDataList = [
    {
      id: 1,
      name: "內容管理",
      path: "content",
      icon: <MdContentCopy />,
      sub: [
        {
          id: 1,
          name: "文章列表",
          path: "article-list",
        },
        {
          id: 2,
          name: "文章發布",
          path: "article-publish",
        },
      ],
    },
    {
      id: 2,
      name: "導航管理",
      path: "navigation",
      icon: <GoFileDirectory />,
      sub: [
        {
          id: 1,
          name: "路由設定",
          path: "route-setting",
        },
      ],
    },
    // {
    //   id: 3,
    //   name: "視覺管理",
    //   path: "visual",
    //   icon: <CgExtension />,
    //   sub: [
    //     {
    //       id: 1,
    //       name: "視覺設定",
    //       path: "visual-setting",
    //     },
    //   ],
    // },
    {
      id: 4,
      name: "帳號管理",
      path: "account",
      icon: <AiOutlineUsergroupDelete />,
      sub: [
        {
          id: 1,
          name: "個人帳號",
          path: "personal-account",
        },
        {
          id: 2,
          name: "帳號列表",
          path: "account-list",
        },
      ],
    },
    {
      id: 5,
      name: "日誌紀錄",
      path: "log",
      icon: <FaClockRotateLeft />,
    },
    {
      id: 6,
      name: "報表查詢",
      path: "report",
      icon: <BiBarChartAlt2 />,
    },
  ];

  return (
    <div className={styles.cmsSideBar}>
      <div className={styles.cmsSideBar__logo}>
        <Link href={"/backend/content/article-list"}>
          <img
            src={"/images/logo_black.svg"}
            alt={"logo"}
            sizes={"100%"}
            style={{ width: "95%", height: "auto" }}
          />
        </Link>
      </div>
      <nav className={styles.cmsSideBar__nav}>
        <ul className={styles.cmsSideBar__nav_mainList}>
          {menuDataList.map((data) => {
            const path = data.path
              ? data?.sub?.length
                ? `/backend/${data.path}/${data.sub[0].path}`
                : `/backend/${data.path}`
              : "";

            // const path = `/backend/${data.path}`;
            return (
              <li
                key={data.id}
                className={styles.cmsSideBar__nav_mainList__listItem}
              >
                <NavLink href={path} type={"main"}>
                  <div
                    className={styles.cmsSideBar__nav_mainList__listItem_icon}
                  >
                    {data.icon}
                  </div>
                  {data.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <ul className={styles.cmsSideBar__nav_subList}>
          <SubSideBar menuData={menuDataList} />
        </ul>
      </nav>
    </div>
  );
}
