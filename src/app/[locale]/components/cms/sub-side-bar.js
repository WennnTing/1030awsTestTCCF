"use client";
import NavLink from "./nav-link";
import { usePathname } from "next/navigation";
import styles from "./side-bar.module.scss";
import { Link } from "../../../../navigation";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
export default function SubSideBar({ menuData }) {
  const path = usePathname();
  const mainPath = path.split("/")[3];
  const subMenu = menuData.find((item) => item.path === mainPath)?.sub;

  return (
    <>
      {subMenu &&
        subMenu.map((item) => (
          <li key={item.id}>
            <NavLink href={`/backend/${mainPath}/${item.path}`} type={"sub"}>
              {item.name}
            </NavLink>
          </li>
        ))}

      <li className={styles.cmsSideBar__nav_subList__frontEnd}>
        <Link href={"/"}>
          <div className={styles.cmsSideBar__nav_subList__frontEnd_icon}>
            <AiOutlineHome />
          </div>
          TCCF前台
        </Link>
      </li>
    </>
  );
}
