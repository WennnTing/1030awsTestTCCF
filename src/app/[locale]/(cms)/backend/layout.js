import SideBar from "@/components/cms/side-bar";
import MainHeader from "@/components/cms/main-header";
import LoadingScreen from "@/components/cms/loading-screen";
import { Fragment, Suspense } from "react";
import { getCookies } from "@/actions/auth";

export default async function RootLayout({ children, params: { locale } }) {
  const auth = await getCookies();

  return (
    <>
      {auth ? (
        <div className="cms-layout-wrapper">
          <SideBar />
          <div className="cms-layout-container">
            <MainHeader />
            <div className="cms-layout-container-content">
              <div className="cmsPage">
                <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </>
  );
}
