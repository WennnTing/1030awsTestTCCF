import styles from "./portfolio-search-bar.module.scss";
import { IoFilterOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
export default function PortfolioSearchBar() {
  return (
    <div className={styles.reservationPortfolioSearchBar}>
      <div className={styles.reservationPortfolioSearchBar__container}>
        <div className={styles.reservationPortfolioSearchBar__container_search}>
          <input type="text" placeholder="搜尋" />
          <div
            className={
              styles.reservationPortfolioSearchBar__container_search__icon
            }
          >
            <FiSearch />
          </div>
        </div>

        <div className={styles.reservationPortfolioSearchBar__container_filter}>
          <IoFilterOutline />
        </div>
      </div>
    </div>
  );
}
