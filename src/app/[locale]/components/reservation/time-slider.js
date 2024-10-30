"use client";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./time-slider.module.scss";

export default function TimeSlider() {
  const [range, setRange] = useState([18, 36]); // 初始範圍，對應 9:00 到 18:00

  const handleRangeChange = (value) => {
    setRange(value);
  };

  const formatTime = (value) => {
    const hours = Math.floor(value / 2) + 9;
    const minutes = value % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  };

  return (
    <div className={styles.reservationTimeSlider}>
      <Slider
        range
        dots
        min={0}
        max={18}
        step={1}
        onChangeComplete={handleRangeChange}
        marks={{
          0: "9:00",
          2: "10:00",
          4: "11:00",
          6: "12:00",
          8: "13:00",
          10: "14:00",
          12: "15:00",
          14: "16:00",
          16: "17:00",
          18: "18:00",
        }}
      />
    </div>
  );
}
