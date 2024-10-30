import { Fragment } from "react";
import styles from "./(frontend)/landing-page.module.scss";
import Image from "next/image";
import MainHeader from "./components/frontend/main-header";
import MainFooter from "./components/frontend/main-footer";
import { _getAllBanners } from "./actions/_banner";
import BannerSection from "./components/frontend/banner-section";
import NewsSection from "./components/frontend/news-section";
import IntroduceSection from "./components/frontend/introduce-section";
export default async function Page() {
  // const banners = await _getAllBanners();

  return (
    <div className={styles.Landing}>
      <MainHeader />
      {/* <BannerSection banners={banners} /> */}
      <BannerSection />
      <NewsSection />
      <IntroduceSection />
      <MainFooter />
    </div>
  );
}
