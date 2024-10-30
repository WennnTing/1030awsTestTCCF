import SideBar from "../../components/frontend/side-bar";
import MainPage from "../../components/frontend/main-page";
import { getCookies } from "@/actions/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/frontend/loading-screen";

export default async function ContentPage({ params }) {
  return (
    <div className="frontend-layout-container">
      <SideBar params={params} />
      <Suspense fallback={<LoadingScreen />}>
        <MainPage params={params} />
      </Suspense>
    </div>
  );
}
