import LoadingScreen from "@/components/reservation/loading-screen";
import { Suspense } from "react";
import SideBar from "@/components/reservation/side-bar";
import MainHeader from "@/components/reservation/main-header";

export default async function RootLayout({ children }) {
  return (
    <div className="reservation-layout-wrapper">
      <SideBar />
      <div className="reservation-layout-container">
        <MainHeader />
        <div className="reservation-layout-container-content">
          <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
