"use client";
import { useState } from "react";
import BarChart from "../_components/barChart/BarChart";
import MapAccount from "../_components/MapAccount/MapAccount";
import styles from "../account-manege/account-manege.module.scss";
import { AiOutlineHome } from "react-icons/ai";     // 首頁

const Dashboard = () => {

    const [type, setType] = useState("barchart");

    const handleTypeChange = (type) => {
        setType(type);
    };

    return (
        <div className="exhibitionBackend">
            <div className="exhibitionBackend__container">
                <div className="exhibitionBackend__contentWrapper">
                    <h1 className="exhibitionBackend__contentWrapper__title">
                        儀表板
                    </h1>
                    <div className={styles.marketWrapper__mainTitleBlock}>
                        <div className={styles.marketWrapper__titleIcon}>
                            <AiOutlineHome className={styles.marketWrapper__icon} />
                            <h3>帳號儀表板</h3>
                        </div>
                    </div>

                    <div className={styles.marketWrapper__tabBlock}>
                        <div className={styles.marketWrapper__tab}>
                            <span
                                className={`${styles.marketWrapper__tabBlockSpan} ${type === "barchart" ? styles.active : ""}`}
                                onClick={() => handleTypeChange("barchart")}
                            >
                                每日會員新增數
                            </span>
                            <span
                                className={`${styles.marketWrapper__tabBlockSpan} ${type === "map" ? styles.active : ""}`}
                                onClick={() => handleTypeChange("map")}
                            >
                                全球帳號分佈圖
                            </span>
                        </div>
                    </div>

                    <div className="tabContent">
                        {type === "barchart" && <BarChart />}
                        {type === "map" && <MapAccount />}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard