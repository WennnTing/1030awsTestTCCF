"use client";

import { useRouter, usePathname } from "../../../../navigation";
import { useLocale } from "next-intl";
import { AiOutlineGlobal } from "react-icons/ai";
import { useTransition } from "react";
import styles from "./main-header.module.scss";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const handleLocaleChange = () => {
    if (isPending) return;
    const nextLocale = locale === "en" ? "zh" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <li
      onClick={handleLocaleChange}
      className={styles.reservationMainHeader__function_list__item}
    >
      <div className={styles.reservationMainHeader__function_list__item_locale}>
        <div
          className={
            styles.reservationMainHeader__function_list__item_locale__icon
          }
        >
          <AiOutlineGlobal />
        </div>

        {locale === "en" ? "中文" : "EN"}
      </div>
    </li>
  );
}
