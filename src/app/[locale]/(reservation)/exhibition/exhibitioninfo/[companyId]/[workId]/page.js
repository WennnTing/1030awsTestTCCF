"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import InputComponent from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Swal from "sweetalert2";
import styles from "./[workId].module.scss";

// components
import TVComponents from "./_components/TVComponents";
import MovieComponents from "./_components/MovieComponents";
import IPComponents from "./_components/IPComponents";
import Loading from "../../../components/Loading/Loading";

// api
import {
  API_GetPortfolioByID,
  API_CreatePortfolio,
  API_UpdatePortfolio,
  API_AddAttachment,
  API_UploadPortfolioTrailer,
  API_DeletePortfolioTrailer,
  API_DeletePortfolioAttachment,
} from "@/api/api";

const EditWork = () => {
  const Swal = require("sweetalert2");
  const t = useTranslations("ExhibitionInfo");
  const c = useTranslations("companyProduct");
  const router = useRouter();
  const [childData, setChildData] = useState({});
  const [imgageData, setImageData] = useState({});
  const { companyId, workId } = useParams();
  const [work, setWork] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const isEditing = workId !== "new";
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  // loading 效果
  const [isLoading, setIsLoading] = useState(false);

  const [childValidation, setChildValidation] = useState({
    movie: { isValid: true, missingFields: [] },
    tv: { isValid: true, missingFields: [] },
    ip: { isValid: true, missingFields: [] },
  });

  const [isMovieValid, setIsMovieValid] = useState(true);
  const [isTVValid, setIsTVValid] = useState(true);
  const [isIPValid, setIsIPValid] = useState(true);

  const handleChildValidationChange = (type, isValid, missingFields) => {
    setChildValidation((prevState) => ({
      ...prevState,
      [type]: { isValid, missingFields },
    }));
  };

  // const handleChildValidationChange = (type, isValid) => {
  //     if (type === 'movie') setIsMovieValid(isValid);
  //     if (type === 'tv') setIsTVValid(isValid);
  //     if (type === 'ip') setIsIPValid(isValid);
  // };

  const radioOptions = [
    { label: "Film | 電影作品", value: 0 },
    { label: "TV | 電視作品", value: 1 },
    { label: "IP | IP作品", value: 2 },
  ];

  // 抓作品資料（編輯模式）
  // 如果成功，將資料存入work
  const getPortfolioByID = async (workId) => {
    const res = await API_GetPortfolioByID(workId);
    if (res.data) {
      const _tmoresdata = res.data;
      setWork(_tmoresdata);
      setShowComponent(true);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      setWork({ companyId, contentType: 0, titleEn: "", titleZh: "" });
    } else {
      getPortfolioByID(workId);
    }
  }, [companyId, workId, isEditing]);

  useEffect(() => {
    console.log("Updated work:", work);
  }, [work]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWork((prevWork) => ({ ...prevWork, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setWork((prevWork) => ({ ...prevWork, [name]: parseInt(value) }));

    // 切換作品類型時重置驗證狀態
    setChildValidation({
      movie: { isValid: true, missingFields: [] },
      tv: { isValid: true, missingFields: [] },
      ip: { isValid: true, missingFields: [] },
    });
  };

  const handleChildDataChange = (data) => {
    setChildData(data);
  };

  const handleImageDataChange = (Imagedata) => {
    setImageData(Imagedata);
  };

  // 儲存操作
  // 這邊只有單打API，不跳頁面
  // 如果為編輯模式，就更新當前作品
  // 如果為新增模式，就新增作品
  const handleSave = async () => {
    const { movie, tv, ip } = childValidation;

    if (!movie.isValid || !tv.isValid || !ip.isValid) {
      const allMissingFields = [
        ...movie.missingFields,
        ...tv.missingFields,
        ...ip.missingFields,
      ];

      // 去重
      const uniqueMissingFields = [...new Set(allMissingFields)];

      Swal.fire({
        icon: "error",
        title: locale === "en" ? "Error" : "錯誤",
        text:
          locale === "en"
            ? `Please fill in the following required fields: ${uniqueMissingFields.join(
                ", "
              )}`
            : `請填寫以下必填欄位: ${uniqueMissingFields.join(", ")}`,
        showConfirmButton: true,
      });
      return false;
    }

    try {
      setIsLoading(true);
      const dataToSave = { ...work, ...childData };

      if (isEditing) {
        const res = await API_UpdatePortfolio(
          JSON.stringify(dataToSave),
          workId
        );
        if (res.data) {
          // 處理圖片上傳
          if (childData.posterImages) {
            await API_DeletePortfolioAttachment(workId);
            for (const image of childData.posterImages) {
              const imageData = {
                ImageBase64: image,
              };
              await API_AddAttachment(JSON.stringify(imageData), workId);
            }
          }
          if (childData.trailerImage) {
            await API_DeletePortfolioTrailer(workId);
            for (const image of childData.trailerImage) {
              const trailerImageData = {
                ImageBase64: image,
              };
              await API_UploadPortfolioTrailer(
                JSON.stringify(trailerImageData),
                workId
              );
            }
          }
          setIsLoading(false);
          Swal.fire({
            icon: "success",
            title: locale === "en" ? "Success" : "儲存成功",
            showConfirmButton: false,
            timer: 1500,
          });
          return true; // 返回 true 表示保存成功
        }
      } else {
        const res = await API_CreatePortfolio(JSON.stringify(dataToSave));
        if (res.data) {
          const newPortfolioId = res.data.portfolioId;

          // 處理圖片上傳
          if (childData.posterImages) {
            await API_DeletePortfolioAttachment(newPortfolioId);
            for (const image of childData.posterImages) {
              const imageData = {
                ImageBase64: image,
              };
              await API_AddAttachment(
                JSON.stringify(imageData),
                newPortfolioId
              );
            }
          }
          if (childData.trailerImage) {
            await API_DeletePortfolioTrailer(newPortfolioId);
            for (const image of childData.trailerImage) {
              const trailerImageData = {
                ImageBase64: image,
              };
              await API_UploadPortfolioTrailer(
                JSON.stringify(trailerImageData),
                newPortfolioId
              );
            }
          }

          setIsLoading(false);
          Swal.fire({
            icon: "success",
            title: locale === "en" ? "Success" : "儲存成功",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // 等成功提示完成後再進行跳轉
            router.push(
              `/${locale}/exhibition/exhibitioninfo/${companyId}/${newPortfolioId}`
            );
          });
          return true;
        }
      }
    } catch (error) {
      console.error("Save error:", error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: locale === "en" ? "Error" : "錯誤",
        text:
          locale === "en"
            ? "An error occurred while saving. Please try again."
            : "儲存時發生錯誤，請重試。",
        showConfirmButton: true,
      });
      return false; // 返回 false 表示保存失敗
    }
  };

  // 儲存操作後，跳轉到指定頁面
  const handleSaveAndRedirect = async () => {
    const isSaveSuccessful = await handleSave(); // 先執行儲存操作，並根據返回值判斷是否成功

    if (isSaveSuccessful) {
      // 只有在儲存成功的情況下才進行跳轉
      const newWindow = window.open(
        `/${locale}/exhibition/preview/market/${companyId}`,
        "_blank"
      );
      if (newWindow) {
        newWindow.focus();
      }
    }
  };

  if (!work) {
    return <p>查無此頁</p>;
  }

  return (
    <div className="exhibitionpage">
      {isLoading && <Loading />}
      <div className="exhibitionpage__container">
        <div className="exhibitionpage__contentWrapper">
          <h1 className="exhibitionpage__contentWrapper__innertitle">
            {t("title")}
          </h1>

          <div className={styles.worksBlock}>
            <div className={styles.worksBlock__infomation}>
              <h2>{c("information")}</h2>

              <div className={styles.worksBlock__inputBlock}>
                <InputComponent
                  type="text"
                  label="Title"
                  name="titleEn"
                  value={work.titleEn || ""}
                  onChange={handleInputChange}
                  message="Please capitalize all first letters in the title, excluding propositions such as the, for, by, at, etc., unless there is a specific purpose.<br/>
                                    Example: Spider-Man: Across the Spider-Verse, Anatomy of a Fall<br/>
                                    If the exhibited work is a series, please include the season in the title. 
                                    Example: The Victim’s Game: Seasons 1-2"
                  require={true}
                  isLongTextTooltip={true}
                />

                <InputComponent
                  type="text"
                  label="作品名稱"
                  name="titleZh"
                  value={work.titleZh || ""}
                  onChange={handleInputChange}
                  message="若為系列作品，請於作品名稱後加上季別，填寫範例：誰是被害者：第 1- 2 季"
                />

                <InputComponent
                  type="radio"
                  label={c("productType")}
                  name="contentType"
                  options={radioOptions}
                  selectedValue={work.contentType || 0}
                  onChange={handleRadioChange}
                  require={true}
                />
              </div>

              {!isEditing && (
                <div className={styles.worksBlock__buttonBlock}>
                  <Button
                    text={c("submit")}
                    onClick={() => setShowComponent(true)}
                  />
                </div>
              )}
            </div>

            {showComponent && (
              <>
                <div className={styles.worksBlock__mainContent}>
                  {work.contentType === 0 && (
                    <MovieComponents
                      work={work}
                      onDataChange={handleChildDataChange}
                      onImageDataChange={handleImageDataChange}
                      onValidationChange={(isValid, missingFields) =>
                        handleChildValidationChange(
                          "movie",
                          isValid,
                          missingFields
                        )
                      }
                    />
                  )}
                  {work.contentType === 1 && (
                    <TVComponents
                      work={work}
                      onDataChange={handleChildDataChange}
                      onImageDataChange={handleImageDataChange}
                      onValidationChange={(isValid, missingFields) =>
                        handleChildValidationChange(
                          "tv",
                          isValid,
                          missingFields
                        )
                      }
                    />
                  )}
                  {work.contentType === 2 && (
                    <IPComponents
                      work={work}
                      onDataChange={handleChildDataChange}
                      onImageDataChange={handleImageDataChange}
                      onValidationChange={(isValid, missingFields) =>
                        handleChildValidationChange(
                          "ip",
                          isValid,
                          missingFields
                        )
                      }
                    />
                  )}
                </div>
                <div className={styles.worksBlock__btnWrapper}>
                  <Button text={c("Save")} onClick={handleSave} />
                  <Button
                    text={c("saveDraft")}
                    onClick={handleSaveAndRedirect}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWork;
