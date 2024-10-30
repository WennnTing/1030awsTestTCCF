"use client";
import styles from "./banner-section.module.scss";
import { useEffect, useState } from "react";
import useWindowSize from "@/tool/useWindowSize";
import ImageLoader from "../global/image-loader";

export default function BannerSection({ banners }) {
  const windowSize = useWindowSize();

  const [imageSrc, setImageSrc] = useState("/images/landing/banner/banner.png");
  const refreshViewHeight = () => {
    const vh = windowSize.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    refreshViewHeight();
    if (windowSize.width <= 1024) {
      setImageSrc("/images/landing/banner/banner_mobile.png");
    } else {
      setImageSrc("/images/landing/banner/banner.png");
    }
  }, [windowSize.width]);

  return (
    <div className={styles.bannerSection}>
      {/* {banners?.data?.map((data) => (
        <a href={data.redirectUrl} key={data.bannerId}>
          <img src={data.imageUrl} alt={data.title} />
        </a>
      ))} */}
      <div className={styles.bannerSection__static}>
        <ImageLoader
          src={imageSrc}
          sizes={"100%"}
          style={{
            objectFit: "cover",
          }}
          fill={true}
          alt={"TCCF"}
        />
      </div>
    </div>
  );
}
