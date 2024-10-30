import { _getAdminProfile } from "@/actions/auth";
import ProfileBlock from "./profile-block";
import styles from "./personal-account.module.scss";
import PasswordBlock from "./password-block";

export default async function PersonalAccountPage() {
  const profile = await _getAdminProfile();

  return (
    <div>
      <div className={styles.cmsPersonalAccount__header}>
        <h2>帳號管理 / 個人資訊</h2>
      </div>

      <div className="cmsPage__container">
        <div className={styles.cmsPersonalAccount}>
          <ProfileBlock data={profile} />
          <PasswordBlock />
        </div>
      </div>
    </div>
  );
}
