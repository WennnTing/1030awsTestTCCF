"use client";
import { Link } from "../../../../../navigation";
import styles from "./ExhibitionHeader.module.scss";
import ImageLoader from "@/components/global/image-loader";
import { usePathname } from "next/navigation";
import { AiOutlineGlobal } from "react-icons/ai";
import { useEffect } from "react";
import useWindowSize from "@/tool/useWindowSize";
import { useTranslations, useLocale } from "next-intl";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ExhibitionHeader() {
  const t = useTranslations("Nav");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const pathname = usePathname();
  const windowSize = useWindowSize();
  const refreshViewHeight = () => {
    const vh = windowSize.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    refreshViewHeight();
  }, [windowSize.width]);

  const handleChanegLanguage = () => {
    if (isPending) return;
    const nextLocale = localActive === "en" ? "zh" : "en";
    startTransition(() => {
      router.replace(`${pathname.replace(localActive, nextLocale)}`);
    });
  };

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

        <div className={styles.header__container_nav__container}></div>

        <div className={styles.header__container_nav__manegeWrapper}>
          <div
            className={styles.header__container_nav__languageWrapper}
            onClick={handleChanegLanguage}
          >
            <div
              className={styles.header__container_nav__languageWrapper__icon}
            >
              <AiOutlineGlobal />
            </div>
            {localActive === "en" ? "中文" : "EN"}
          </div>
        </div>
      </div>
    </div>
  );
}
