"use client";
import styles from "./nav-link.module.scss";

import { Link } from "../../../../navigation";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children, type }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        type === "main"
          ? path.split("/")[3]?.startsWith(href.split("/")[2])
            ? styles.cmsNavLink__main
            : styles.cmsNavLink
          : path.includes(href)
          ? styles.cmsNavLink__sub
          : styles.cmsNavLink
      }
    >
      {children}
    </Link>
  );
}
