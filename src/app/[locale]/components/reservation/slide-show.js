"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./slide-show.module.scss";
import { Autoplay } from "swiper/modules";

export default function SlideShow({ data }) {
  return (
    <div className={styles.reservationSlideShow}>
      <Swiper
        className="mySwiper"
        // slidesPerView={3}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // loop={true}
        modules={[Autoplay]}
        breakpoints={{
          428: {
            slidesPerView: 1,
          },

          768: {
            slidesPerView: 2,
          },

          1280: {
            slidesPerView: 2,
          },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.valueId}>
            <div className={styles.reservationSlideShow__slide}>
              <img src={item.imageUrl} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
