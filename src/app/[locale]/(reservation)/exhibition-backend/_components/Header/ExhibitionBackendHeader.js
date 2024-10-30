"use client";
import { Link } from "../../../../../../navigation";
import styles from "./ExhibitionBackendHeader.module.scss";
import ImageLoader from "@/components/global/image-loader";
import { usePathname, useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { useState, useEffect, Fragment } from "react";
import useWindowSize from "@/tool/useWindowSize";

import { clearAuthToken } from "@/utils/common";

import { MdOutlineLogout } from "react-icons/md";

export default function ExhibitionBackendHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1];
  const windowSize = useWindowSize();
  const refreshViewHeight = () => {
    const vh = windowSize.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const logout = () => {
    clearAuthToken();
    router.push(`/${locale}/exhibitionauth/backend-login`);
  };

  useEffect(() => {
    refreshViewHeight();
  }, [windowSize.width]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__container_logoWrapper}>
          <div className={styles.header__container_logoWrapper__logo}>
            <ImageLoader
              src={"/images/logo_black.svg"}
              sizes={"100%"}
              style={{ width: "100%", height: "auto" }}
              alt={"logo"}
            />
          </div>
        </div>
        <motion.div
          className={styles.header__container_nav}
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
          <div className={styles.header__container_nav__container}></div>
          <div className={styles.header__container_nav__languageWrapper}>
            {/* <div className={styles.header__container_nav__languageWrapper__icon}>
                            <RiUserStarLine />
                        </div> */}
            <span
              onClick={logout}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <MdOutlineLogout />
              登出
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
