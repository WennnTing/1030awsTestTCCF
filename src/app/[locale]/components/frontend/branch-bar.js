import NavLink from "./nav-link";
import styles from "./side-bar.module.scss";

export default function BranchBar({
  locale,
  params,
  sideBarRouter,
  branches,
  isOpen,
}) {
  return (
    <ul
      className={styles.sideBar__menuList_subMenuList}
      style={{
        gridTemplateRows: isOpen ? "1fr" : "0fr",
      }}
    >
      <div className={styles.sideBar__menuList_subMenuList__container}>
        {branches.data.map((branch) => (
          <li
            key={branch.branchId}
            className={styles.sideBar__menuList_subMenuList__subMenuItem}
          >
            <NavLink
              href={`${params.slug[0]}/${sideBarRouter}/${branch.routerName}`}
            >
              {branch[`branchName${locale}`]}
            </NavLink>
          </li>
        ))}
      </div>
    </ul>
  );
}
