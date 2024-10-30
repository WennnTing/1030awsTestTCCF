"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Link } from "../../../../../../navigation";
import styles from "./exhibitionheader.module.scss";
import ImageLoader from "@/components/global/image-loader";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import useWindowSize from "@/tool/useWindowSize";
import { useTransition } from "react";
import { clearAuthToken, clearPopupShown } from "@/utils/common";

// icons
import { AiOutlineGlobal } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export default function Header() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();
  const windowSize = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const t = useTranslations("ExhibitionNav");

  const locale = pathname.split("/")[1];

  const refreshViewHeight = () => {
    const vh = windowSize.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    refreshViewHeight();
  }, [windowSize.width]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleChangeLanguage = () => {
    if (isPending) return;
    const nextLocale = localActive === "en" ? "zh" : "en";
    startTransition(() => {
      router.replace(`${pathname.replace(localActive, nextLocale)}`);
    });
  };

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen((prevState) => (prevState === menu ? null : menu));
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
  };

  const handleLogout = () => {
    clearAuthToken();
    clearPopupShown();
    closeDropdown();
    router.push(`/${locale}/exhibitionauth/login`);
  };

  const [links, setLinks] = useState([
    {
      id: 1,
      href: "/exhibition/exhibitioninfo",
      name: "Information",
      isHovered: false,
      color: "#33A6B8",
    },
    {
      id: 2,
      href: "/exhibition/meeting",
      name: "Appointments",
      isHovered: false,
      color: "#50be9c",
    },
    {
      id: 3,
      href: "/exhibition/activity",
      name: "Activities",
      isHovered: false,
      color: "#50be9c",
    },
    {
      id: 4,
      href: "/exhibition/memberinfo",
      name: t("accountInfo"),
      isHovered: false,
      color: "#50be9c",
    },
    {
      id: 5,
      href: "/exhibition/reserve",
      name: "Preview",
      isHovered: false,
      color: "#50be9c",
    },
  ]);

  const [dropdownMenu, setDropdownMenu] = useState([
    {
      id: 1,
      title: t("accountInfo"),
      link: "/exhibition/memberinfo",
    },
    {
      id: 2,
      title: t("logout"),
      action: handleLogout,
    },
  ]);

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__container_logoWrapper}>
          <div className={styles.header__container_logoWrapper__logo}>
            <Link href={"/"}>
              <ImageLoader
                src={"/images/logo_black.svg"}
                sizes={"100%"}
                style={{ width: "100%", height: "auto" }}
                alt={"logo"}
              />
            </Link>
          </div>
        </div>

        <motion.div
          className={styles.header__container_nav}
          key={isOpen ? "open" : "closed"}
          animate={{
            transform:
              windowSize.width <= 820
                ? isOpen
                  ? "translateX(0%)"
                  : "translateX(100%)"
                : "translateX(0%)",
          }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        >
          <div className={styles.header__container_nav__container}>
            {links.map((link) => (
              <Fragment key={link.href}>
                <Link
                  href={link.href}
                  className={styles.header__container_nav__container_mainLink}
                  style={{
                    color:
                      windowSize.width > 820 &&
                      pathname
                        ?.split("/")[2]
                        ?.startsWith(link.href?.split("/")[1])
                        ? link.color
                        : "",
                  }}
                >
                  {link.name}
                </Link>
              </Fragment>
            ))}
          </div>
          <div className={styles.header__container_nav__manegeWrapper}>
            <div
              className={styles.header__container_nav__languageWrapper}
              onClick={handleChangeLanguage}
            >
              <div
                className={styles.header__container_nav__languageWrapper__icon}
              >
                <AiOutlineGlobal />
                {windowSize.width < 820 && (
                  <span>{localActive === "en" ? "中文" : "EN"}</span>
                )}
              </div>
            </div>

            {/* <div className={styles.header__container_nav__manegeWrapper__user}>
                            <div
                                className={styles.header__container_nav__manegeWrapper__user_icon}
                                onClick={() => toggleDropdown('bell')}
                            >
                                <FaRegBell />
                                {windowSize.width < 820 && (
                                    <span>Notice</span>
                                )}
                            </div>
                            {dropdownOpen === 'bell' && (
                                <div className={styles.header__dropdownMenu}>
                                    <div>通知 1</div>
                                    <div>通知 2</div>
                                </div>
                            )}
                        </div> */}

            {windowSize.width < 820 && (
              <div
                className={styles.header__container_nav__manegeWrapper__logout}
                onClick={handleLogout}
              >
                <MdLogout />
                <span>Log out</span>
              </div>
            )}

            {windowSize.width > 820 && (
              <div
                className={styles.header__container_nav__manegeWrapper__user}
              >
                <div
                  className={
                    styles.header__container_nav__manegeWrapper__user__userPhoto
                  }
                  onClick={() => toggleDropdown("user")}
                >
                  <ImageLoader
                    src={"/images/exhibition/userPhoto.jpg"}
                    sizes={"100%"}
                    style={{ width: "100%", height: "auto" }}
                    alt={"userPhoto"}
                  />
                </div>
                {dropdownOpen === "user" && (
                  <div className={styles.header__dropdownMenu}>
                    {dropdownMenu.map((menu) => (
                      <Fragment key={menu.id}>
                        {menu.action ? (
                          <div
                            onClick={() => {
                              closeDropdown();
                              menu.action();
                            }}
                          >
                            {menu.title}
                          </div>
                        ) : (
                          <Link
                            href={menu.link}
                            onClick={closeDropdown}
                            style={{
                              color: pathname === menu.link ? "#33A6B8" : "",
                              fontWeight:
                                pathname === menu.link ? "bold" : "normal",
                            }}
                          >
                            <div>{menu.title}</div>
                          </Link>
                        )}
                      </Fragment>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        <div
          className={styles.header__container_hambugerWrapper}
          onClick={toggleHamburger}
        >
          <div
            className={`${
              styles.header__container_hambugerWrapper__container
            } ${isOpen ? "active" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
