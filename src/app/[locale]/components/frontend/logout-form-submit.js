"use client";
import styles from "./main-header.module.scss";
import { useFormStatus } from "react-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { usePathname } from "next/navigation";
export default function LogoutFormSubmit({ data }) {
  const { pending } = useFormStatus();

  const path = usePathname();

  return (
    <button
      className={styles.mainHeader__container_nav__functionWrapper_logout}
    >
      {/* <div
        className={
          styles.mainHeader__container_nav__functionWrapper_logout__icon
        }
      >

        <HiOutlineUserCircle />
      </div> */}
      <div
        className={styles.mainHeader__container_nav__functionWrapper_profile}
      >
        <span>{data?.email?.charAt(0).toUpperCase()}</span>
      </div>
    </button>
  );
}
