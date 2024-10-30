"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Card from "./card";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

export default function NewsSlide({ newsCardData }) {
  return (
    <Swiper
      spaceBetween={50}
      // slidesPerView={3}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        430: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      loop={true}
    >
      {newsCardData.map((news) => (
        <SwiperSlide key={news.link}>{<Card {...news} />}</SwiperSlide>
      ))}
    </Swiper>
  );
}
