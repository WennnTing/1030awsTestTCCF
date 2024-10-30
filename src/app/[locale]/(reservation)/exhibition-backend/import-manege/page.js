"use client";
import { useState } from "react";
import styles from "../market-manege/market-manege.module.scss";
import Swal from "sweetalert2";
// icons
import { MdPeopleOutline } from "react-icons/md";           // 匯入會員
import { BiStore } from "react-icons/bi";                   // 匯入Market
import { LuBookUp } from "react-icons/lu";                  // 匯入Pitching-Story to Screen
import { GoProjectRoadmap } from "react-icons/go";          // 匯入Pitching-Project to screen
import { AiOutlineCloudDownload } from "react-icons/ai";    // 下載
import { AiOutlineCloudUpload } from "react-icons/ai";      // 上傳


// components
import { importMembers } from "./import-manege-page-utils";

const ImportManegePage = () => {
    const Swal = require("sweetalert2");
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedImport, setSelectedImport] = useState(null);
    const [base64File, setBase64File] = useState(null);
    const [fileName, setFileName] = useState(null);

    const importData = [
        {
            id: 1,
            importTitle: "匯入會員",
            importIcon: <MdPeopleOutline />,
            templateUrl: '/sample_member.xlsx',
        },
        {
            id: 2,
            importTitle: "匯入Market",
            importIcon: <BiStore />,
            templateUrl: 'https://www.google.com',
        },
        {
            id: 3,
            importTitle: "匯入Pitching",
            subTitle: "Story to Screen",
            importIcon: <LuBookUp />,
            templateUrl: 'https://www.google.com',
        },
        {
            id: 4,
            importTitle: "匯入Pitching",
            subTitle: "Project to Screen",
            importIcon: <GoProjectRoadmap />,
            templateUrl: 'https://www.google.com',
        },
    ];

    const showWarning = (message) => {
        Swal.fire({
            icon: "warning",
            text: message,
            showConfirmButton: true,
        });
    };

    // 當選擇某個匯入選項時，進入下一步
    const handleSelectImport = (data) => {
        setSelectedImport(data);
        setCurrentStep(2);
    };

    // 回到選擇匯入類型的畫面
    const handleBackToSelection = () => {
        setCurrentStep(1);
        setSelectedImport(null);
        setFileName(null);
        setBase64File(null);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            const reader = new FileReader();

            // 轉Base64
            reader.onloadend = () => {
                const base64 = reader.result;
                setBase64File(base64);
                setFileName(file.name);
            };

            reader.onerror = (error) => {
                console.error("File reading error:", error);
            };

            reader.readAsDataURL(file);
        } else {
            showWarning("請上傳正確的檔案格式");
        }
    };

    const handleImport = async () => {
        if (!base64File) {
            showWarning("請先上傳檔案");
            return;
        }

        try {
            switch (selectedImport.id) {
                case 1:
                    await importMembers(base64File);
                    break;
                default:
                    showWarning("未知的匯入類型");
                    break;
            }
        } catch (error) {
            console.error(error);
            showWarning("匯入過程中發生錯誤，請稍後再試");
        }
    };


    return (
        <div className="exhibitionBackend">
            <div className="exhibitionBackend__container">
                <div className="exhibitionBackend__contentWrapper">
                    <h1 className="exhibitionBackend__contentWrapper__title">
                        匯入管理
                    </h1>

                    {currentStep === 1 && (
                        <div className={styles.marketWrapper__squareBtnWrapper}>
                            {importData.map((data) => (
                                <div
                                    key={data.id}
                                    className={styles.marketWrapper__squareButton}
                                    onClick={() => handleSelectImport(data)}
                                >
                                    <span className={styles.marketWrapper__squareBtnIcon}>
                                        {data.importIcon}
                                    </span>
                                    <span className={styles.marketWrapper__squareBtnText}>
                                        {data.importTitle}
                                    </span>
                                    {data.subTitle && (
                                        <span className={styles.marketWrapper__squareBtnSubTitle}>
                                            {data.subTitle}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {currentStep === 2 && selectedImport && (
                        <div className={styles.marketWrapper__importActions}>
                            <h2>
                                {selectedImport.importTitle}
                            </h2>

                            <div className={styles.marketWrapper__squareBtnWrapper}>

                                <a
                                    className={styles.marketWrapper__downloadButton}
                                    href={selectedImport.templateUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className={styles.marketWrapper__squareBtnIcon}>
                                        <AiOutlineCloudDownload />
                                    </span>
                                    下載範本
                                </a>

                                <label htmlFor="file-upload" className={styles.marketWrapper__uploadButton}>
                                    <span className={styles.marketWrapper__squareBtnIcon}>
                                        <AiOutlineCloudUpload />
                                    </span>
                                    <span
                                        style={{
                                            display: "inline-block",
                                            maxWidth: "240px",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {fileName ? fileName : "上傳附件"}
                                    </span>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={(e) => handleFileUpload(e)}
                                    />
                                </label>

                            </div>
                            <div className={styles.marketWrapper__buttonWrapper}>
                                <button
                                    className={styles.marketWrapper__backButton}
                                    onClick={handleBackToSelection}
                                >
                                    上一步
                                </button>

                                <button
                                    className={styles.marketWrapper__backButton}
                                    onClick={handleImport}
                                >
                                    匯入
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div >
    )
}

export default ImportManegePage