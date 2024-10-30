import Link from "next/link";
import NavLink from "./nav-link";
import styles from "./main-header.module.scss";
import LogoutForm from "../frontend/logout-form";
import { _getAdminProfile } from "@/actions/auth";

export default async function MainHeader() {
  const profile = await _getAdminProfile();
  return (
    <header className={styles.cmsMainHeader}>
      {/* <nav></nav> */}
      <LogoutForm data={profile} />
    </header>
  );
}
