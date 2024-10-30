// import styles from "./main-mob-menu.module.scss";
import { _getAllVisibleHeaders } from "@/actions/header";
import { _getAllVisibleSidebars } from "@/actions/sidebar";
import { _getAllVisibleBranches, getAllBranches } from "@/actions/branch";
import MainMobMenuList from "./main-mob-menu-list";
import styles from "./main-header.module.scss";
import LocaleSwitcher from "./locale-switcher";
import { RiUserStarLine } from "react-icons/ri";
import { IoTicketOutline } from "react-icons/io5";
import { Link } from "../../../../navigation";
import { getTranslations } from "next-intl/server";
import { _getUserProfile } from "@/actions/auth";
import { getExhibitionCookies } from "@/actions/auth";
import { Fragment } from "react";

export default async function MainMobMenu() {
  const headers = await _getAllVisibleHeaders();
  const sidebars = await _getAllVisibleSidebars();
  const branches = await _getAllVisibleBranches();

  const t = await getTranslations("Landing.Header");

  const auth = await getExhibitionCookies();
  let userData = null;
  if (auth) {
    userData = await _getUserProfile();
  }

  return (
    <div className="mainMobMenu">
      <MainMobMenuList
        headers={headers}
        sidebars={sidebars}
        branches={branches}
      />
      <div className={styles.mainHeader__functionList}>
        <Link
          className={styles.mainHeader__functionList_item}
          href={"/exhibition"}
        >
          {userData ? (
            <Fragment>
              <div className={styles.mainHeader__functionList_item__user}>
                <span>{userData?.email?.charAt(0).toUpperCase()}</span>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className={styles.mainHeader__functionList_item__icon}>
                <RiUserStarLine />
              </div>
              <div className={styles.mainHeader__functionList_item__text}>
                {t("login")}
              </div>
            </Fragment>
          )}
        </Link>
        <Link
          className={styles.mainHeader__functionList_item}
          href={"/join-conference"}
        >
          <div className={styles.mainHeader__functionList_item__icon}>
            <IoTicketOutline />
          </div>
          <div className={styles.mainHeader__functionList_item__text}>
            {t("badgePurchase")}
          </div>
        </Link>
        <div className={styles.mainHeader__functionList_item}>
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  );
}
