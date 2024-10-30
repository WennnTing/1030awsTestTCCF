import styles from "./main-header.module.scss";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import LocaleSwitcher from "./locale-switcher";
import { _getUserProfile } from "@/actions/auth";
import UserActionList from "./user-action-list";
import MainMobMenu from "./main-mob-menu";
import { Link } from "../../../../navigation";

export default async function MainHeader() {
  const profile = await _getUserProfile();

  return (
    <div className={styles.reservationMainHeader}>
      <div className={styles.reservationMainHeader__logo}>
        <Link href="/">
          <img
            src={"/images/logo_black.svg"}
            alt={"logo"}
            sizes={"100%"}
            style={{ width: "100%", height: "auto" }}
          />
        </Link>
      </div>
      <div className={styles.reservationMainHeader__function}>
        <ul className={styles.reservationMainHeader__function_list}>
          {/* <li className={styles.reservationMainHeader__function_list__item}>
            <AiOutlineGlobal /> {localActive}
          </li> */}
          <LocaleSwitcher />
          {/* <li className={styles.reservationMainHeader__function_list__item}>
            <IoNotificationsOutline />
          </li> */}

          {/* <li className={styles.reservationMainHeader__function_list__item}>
            <LogoutForm data={profile} />
          </li> */}
          <UserActionList data={profile} />
        </ul>
      </div>
      <div className={styles.reservationMainHeader__hamburger}>
        <input type="checkbox" id="reservation-hambuger-menu" hidden />
        <label
          className="reservationHambugerWrapper"
          htmlFor="reservation-hambuger-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </label>
        <MainMobMenu />
      </div>
    </div>
  );
}
