"use client";
import { useState, useEffect } from "react";
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
import { importMembers, importProject } from "./import-manege-page-utils";

const ImportManegePage = () => {
    const Swal = require("sweetalert2");
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedImport, setSelectedImport] = useState(null);
    const [base64File, setBase64File] = useState(null);
    const [fileName, setFileName] = useState(null);

    const [projectConfig, setProjectConfig] = useState({
        PitchingMainCategory: "",
        PitchingMainCategoryEn: "",
        PitchingCategory: "",
        PitchingCategoryEn: "",
        Location: "",
        Base64: ""
    });

    const [categorys, setCategorys] = useState({
        id: '',
        name: ''
    });

    useEffect(() => {
        console.log(projectConfig)
        console.log(categorys)
    }, [projectConfig, categorys])

    const importData = [
        {
            id: 1,
            importTitle: "匯入Market",
            subTitle: "Market",
            importIcon: <BiStore />,
            templateUrl: '/market_sample.xlsx',
        },
        {
            id: 2,
            importTitle: "匯入Pitching",
            subTitle: "Taicca School",
            importIcon: <LuBookUp />,
            templateUrl: '/Taicca_school_sample.xlsx',
        },
        {
            id: 3,
            importTitle: "匯入Pitching",
            subTitle: "Story to Screen",
            importIcon: <LuBookUp />,
            templateUrl: '/story_to_screen.xlsx',
            categorys: [
                {
                    id: 1,
                    PitchingCategory: "出版文本｜Fiction & Non-Fiction",
                    PitchingCategoryEn: "Fiction & Non-Fiction",
                },
                {
                    id: 2,
                    PitchingCategory: "漫畫｜Comics",
                    PitchingCategoryEn: "Comics",

                },
                {
                    id: 3,
                    PitchingCategory: "Shoot the Book! TCCF",
                    PitchingCategoryEn: "Shoot the Book! TCCF",

                },
                {
                    id: 4,
                    PitchingCategory: "原創故事專場｜Original Story Concept",
                    PitchingCategoryEn: "Original Story Concept",

                },
            ]
        },
        {
            id: 4,
            importTitle: "匯入Pitching",
            subTitle: "Project to Screen",
            importIcon: <GoProjectRoadmap />,
            templateUrl: '/project_to_screen_sample.xlsx',
            categorys: [
                {
                    id: 1,
                    PitchingCategory: "長片｜Feature Film",
                    PitchingCategoryEn: "Feature Film",

                },
                {
                    id: 2,
                    PitchingCategory: "影集｜Series",
                    PitchingCategoryEn: "Series",

                },
                {
                    id: 3,
                    PitchingCategory: "動畫｜Animation Films and Series",
                    PitchingCategoryEn: "Animation Films and Series",

                },
                {
                    id: 4,
                    PitchingCategory: "紀錄片｜Documentary Films and Series",
                    PitchingCategoryEn: "Documentary Films and Series",

                },
            ]
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

        if (data.id === 3) {
            setProjectConfig({
                ...projectConfig,
                PitchingMainCategory: "故事專場",
                PitchingMainCategoryEn: "Story to Screen",
            });
        } else if (data.id === 4) {
            setProjectConfig({
                ...projectConfig,
                PitchingMainCategory: "企畫專場",
                PitchingMainCategoryEn: "Project to Screen",
            });
        } else if (data.id === 2) {
            setProjectConfig({
                ...projectConfig,
                PitchingMainCategory: "Taicca School",
                PitchingMainCategoryEn: "Taicca School",
            });
        }
    };

    // 選擇project的類型
    const handleCategorySelect = (category) => {

        setCategorys(pre => {
            if (pre.id === category.id) {
                return {
                    ...pre,
                    id: '',
                    name: ''
                }
            }
            return {
                ...pre,
                id: category.id,
                name: category.PitchingCategory
            }
        })
        setProjectConfig((prevConfig) => ({
            ...prevConfig,
            PitchingCategory: category.PitchingCategory,
            PitchingCategoryEn: category.PitchingCategoryEn,
        }));
    };

    // 回到選擇匯入類型的畫面
    const handleBackToSelection = () => {
        setCurrentStep(1);
        setSelectedImport(null);
        setFileName(null);
        setBase64File(null);
        setProjectConfig({
            PitchingMainCategory: "",
            PitchingMainCategoryEn: "",
            PitchingCategory: "",
            PitchingCategoryEn: "",
            Location: "",
            Base64: "",
        });
        setCategorys({
            id: '',
            name: ''
        })
    };

    const handleFileUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64 = reader.result;
                setBase64File(base64);
                setFileName(file.name);

                if (selectedImport && (selectedImport.id === 2 || selectedImport.id === 3 || selectedImport.id === 4)) {
                    setProjectConfig((prevConfig) => ({
                        ...prevConfig,
                        Base64: base64,
                    }));
                }
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
            if (selectedImport.id === 1) {
                await importMembers(base64File);
            } else if (selectedImport.id === 2 || selectedImport.id === 3 || selectedImport.id === 4) {
                await importProject(projectConfig);
            } else {
                showWarning("未知的匯入類型");
            }
        } catch (error) {
            console.error(error);
            showWarning("匯入過程中發生錯誤，請稍後再試");
        }
    };

    const getTemplateUrl = () => {
        if (selectedImport?.id === 3) {
            if (categorys.id === 4) {
                return '/original_story_concepts_sample.xlsx';
            }
            return '/story_to_screen_sample.xlsx';
        }
        return selectedImport?.templateUrl || '';
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

                                {selectedImport.id === 3 && selectedImport.categorys && selectedImport.categorys.map((category) => (
                                    <div
                                        key={category.id}
                                        className={`${styles.marketWrapper__textButton} ${categorys.id === category.id ? styles.active : ''}`}
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        <span className={styles.marketWrapper__textBtnText}>
                                            {category.PitchingCategory}
                                        </span>
                                    </div>
                                ))}

                                {selectedImport.id === 4 && selectedImport.categorys && selectedImport.categorys.map((category) => (
                                    <div
                                        key={category.id}
                                        className={`${styles.marketWrapper__textButton} ${categorys.id === category.id ? styles.active : ''}`}
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        <span className={styles.marketWrapper__textBtnText}>
                                            {category.PitchingCategory}
                                        </span>
                                    </div>
                                ))}

                                <a
                                    className={styles.marketWrapper__downloadButton}
                                    href={getTemplateUrl()}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => {
                                        if (selectedImport.id === 3 && !categorys.id) {
                                            e.preventDefault();
                                            showWarning("請先選擇分類後再下載範本");
                                        }
                                    }}
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