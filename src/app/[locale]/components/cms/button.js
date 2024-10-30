"use client";
import styles from "./button.module.scss";
import { useRouter } from "next/navigation";

const Button = ({ text, type, action, href }) => {
  const router = useRouter();
  return (
    <button
      className={(() => {
        switch (type) {
          case "primary":
            return styles.cmsButton__primary;
          case "secondary":
            return styles.cmsButton__secondary;
          default:
            return styles.cmsButton__primary;
        }
      })()}
      onClick={() => router.push(href)}
    >
      <span>{text}</span>
    </button>
  );
};

export { Button };
