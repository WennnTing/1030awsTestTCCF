"use client";
import style from "./cube.module.scss";
import { useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export default function App() {
  const ref = useRef(null);

  useAnimationFrame((t) => {
    if (ref.current) {
      const rotate = Math.sin(t / 10000) * 200;
      const y = (1 + Math.sin(t / 1000)) * -30;
      ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
    }
  });

  return (
    <div className={style.cube__container}>
      <div className={style.cube__container_cubeObject} ref={ref}>
        <div className={style.cube__container_cubeObject__front} />
        <div className={style.cube__container_cubeObject__left} />
        <div className={style.cube__container_cubeObject__right} />
        <div className={style.cube__container_cubeObject__top} />
        <div className={style.cube__container_cubeObject__bottom} />
        <div className={style.cube__container_cubeObject__back} />
      </div>
    </div>
  );
}
