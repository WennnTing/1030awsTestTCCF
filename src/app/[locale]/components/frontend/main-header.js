// import Link from "next/link";
import { Link } from "../../../../navigation";
import NavLink from "./nav-link";
import styles from "./main-header.module.scss";
import { localeToUpperCase } from "@/utils";
import { getLocale } from "next-intl/server";
import LocaleSwitcher from "./locale-switcher";
import Image from "next/image";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { getAllHeaders, _getAllVisibleHeaders } from "@/actions/header";
import { RiUserStarLine } from "react-icons/ri";
import MainMobMenu from "./main-mob-menu";
import { IoTicketOutline } from "react-icons/io5";
import { getTranslations } from "next-intl/server";

import { _getUserProfile } from "@/actions/auth";
import { getExhibitionCookies } from "@/actions/auth";
import { Fragment } from "react";

async function Header() {
  const headers = await _getAllVisibleHeaders();
  const locale = localeToUpperCase(await getLocale());

  return (
    <ul className={styles.mainHeader__container_nav__container}>
      {headers.data.map((header, index) => (
        <li key={header.headerId}>
          <NavLink href={header.routerName} type={"header"} index={index}>
            {header[`headerName${locale}`]}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default async function MainHeader() {
  const t = await getTranslations("Landing.Header");

  const auth = await getExhibitionCookies();
  let userData = null;
  if (auth) {
    userData = await _getUserProfile();
  }

  return (
    <header className={styles.mainHeader}>
      <div className={styles.mainHeader__container}>
        <div className={styles.mainHeader__container_logoWrapper}>
          <Link href="/">
            <Image
              src={"/images/logo_black.svg"}
              alt="logo"
              width={200}
              height={50}
            />
          </Link>
        </div>
        <nav className={styles.mainHeader__container_nav}>
          <Header />
          <ul className={styles.mainHeader__container_nav__functionWrapper}>
            <Link
              href="/join-conference"
              className={styles.mainHeader__container_nav__functionWrapper_item}
            >
              <div
                className={
                  styles.mainHeader__container_nav__functionWrapper_item__icon
                }
              >
                <IoTicketOutline />
              </div>
              <span>{t("badgePurchase")}</span>
            </Link>

            <LocaleSwitcher />

            <Link
              href="/exhibition-login"
              className={styles.mainHeader__container_nav__functionWrapper_item}
            >
              {userData ? (
                <div
                  className={
                    styles.mainHeader__container_nav__functionWrapper_item__user
                  }
                >
                  <span>{userData?.email?.charAt(0).toUpperCase()}</span>
                </div>
              ) : (
                <Fragment>
                  <div
                    className={
                      styles.mainHeader__container_nav__functionWrapper_item__icon
                    }
                  >
                    <RiUserStarLine />
                  </div>
                  <span>{t("login")}</span>
                </Fragment>
              )}
            </Link>
          </ul>
        </nav>

        <div className={styles.mainHeader__container_hambugerWrapper}>
          <input type="checkbox" id="hambuger-menu" hidden />
          <label className="hambugerWrapper" htmlFor="hambuger-menu">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <MainMobMenu />
        </div>
      </div>
    </header>
  );
}
