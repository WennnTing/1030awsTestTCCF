import styles from "./navigation.module.scss";
import NavList from "./nav-list";
import Edit from "./edit";
import { Suspense } from "react";
import LoadingScreen from "@/components/cms/loading-screen";

export default async function NavigationPage({ searchParams }) {
  const queryStatus = searchParams;

  return (
    <div>
      <h2>導航管理 / 路由設定</h2>
      <div className="cmsPage__container">
        <div className={styles.cmsNavigation}>
          <Suspense fallback={<LoadingScreen />}>
            <NavList />
          </Suspense>

          <div className={styles.cmsNavigation__editWrapper}>
            {Object.keys(queryStatus).length > 0 && (
              <Edit searchParams={searchParams} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
