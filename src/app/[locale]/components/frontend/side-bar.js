import styles from "./side-bar.module.scss";
import { getSideBar } from "@/actions/page";
import { localeToUpperCase } from "@/utils";
import { getBranchesBySidebarID } from "@/actions/sidebar";
import SideBarToggle from "./side-bar-toggle";

export default async function SideBar({ params }) {
  const data = await getSideBar(params);
  const locale = localeToUpperCase(params.locale);

  return (
    <div className={styles.sideBar}>
      <ul className={styles.sideBar__menuList}>
        {data.map(async (sidebar) => (
          <li
            key={sidebar.sidebarId}
            className={styles.sideBar__menuList_menuItem}
          >
            <div className={styles.sideBar__menuList_menuItem__wrapper}>
              <SideBarToggle
                sidebar={sidebar}
                params={params}
                branches={await getBranchesBySidebarID(sidebar.sidebarId)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
