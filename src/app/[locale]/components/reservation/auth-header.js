import Image from "next/image";
import styles from "./auth-header.module.scss";
import { Link } from "../../../../navigation";
import LocaleSwitcher from "./locale-switcher";
export default function AuthHeader() {
  return (
    <header className={styles.authHeader}>
      <div className={styles.authHeader__container}>
        <Link href={"/"}>
          <Image
            src={"/images/logo_black.svg"}
            alt="logo"
            width={200}
            height={50}
          />
        </Link>
        <div className={styles.authHeader__container_item}>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
