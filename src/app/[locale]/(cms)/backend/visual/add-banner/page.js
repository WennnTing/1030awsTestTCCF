import styles from "./add-banner.module.scss";
import AddBannerForm from "./_component/add-banner-form";
export default function AddBannerPage() {
  return (
    <div>
      <h2>視覺管理 / 新增橫幅</h2>
      <div className="cmsPage__container">
        <div className={styles.cmsAddBanner}>
          <AddBannerForm />
        </div>
      </div>
    </div>
  );
}
