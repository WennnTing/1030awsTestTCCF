"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./[companyId].module.scss";
import { useTranslations } from "next-intl";
import { useUser } from "@/context/exhibition/UserContext";
import Button from "../../components/Button/Button";
import ImageLoader from "@/components/global/image-loader";
import Dialog from "../../components/Dialog/Dialog";
import SwitchToggle from "../components/SwitchToggle";
import Swal from "sweetalert2";

// icon
import { IoSearch } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { LiaMedalSolid } from "react-icons/lia";

// api
import {
  API_GetPortfoliosByCompanyID,
  API_DeletePortfolio,
  API_GetAttachmentByPortfolioId,
  API_UpdateCompany,
} from "@/api/api";

const CompanyWorks = () => {
  const Swal = require("sweetalert2");

  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState("");
  const { user } = useUser();
  const t = useTranslations("ExhibitionInfo");
  const c = useTranslations("companyProduct");
  const pathname = usePathname();
  const router = useRouter();
  const [companyId, setCompanyId] = useState("");
  const locale = pathname.split("/")[1];

  const contentTypeMapping = {
    zh: {
      0: "電影作品",
      1: "電視作品",
      2: "IP作品",
    },
    en: {
      0: "Film Works",
      1: "TV Works",
      2: "IP Works",
    },
  };

  const contentSubtypeMapping = {
    zh: {
      0: {
        0: "劇情長片",
        1: "紀錄片",
        2: "動畫",
        3: "短片",
        4: "經典修復",
        5: "沈浸式內容",
      },
      1: {
        0: "電視劇集",
        1: "紀實節目",
        2: "娛樂",
        3: "兒童節目",
        4: "電視電影",
      },
      2: {
        0: "出版",
        1: "表演藝術",
        2: "遊戲",
        3: "其它",
      },
    },
    en: {
      0: {
        0: "Feature Film",
        1: "Documentary",
        2: "Animation",
        3: "Short Film",
        4: "Classic Restoration",
        5: "Immersive Content",
      },
      1: {
        0: "TV Series",
        1: "Factual",
        2: "Entertainment",
        3: "Kids",
        4: "TV Movie",
      },
      2: {
        0: "Publishing",
        1: "Performing Arts",
        2: "Games",
        3: "Others",
      },
    },
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSelectWork = (portfolioId) => {
    setSelectedWork(portfolioId);
  };

  const getImageByPortfolioId = async (portfolioId) => {
    const res = await API_GetAttachmentByPortfolioId(portfolioId);
    return res.data;
  };

  const getPortfoliosByCompanyID = async (companyId) => {
    try {
      const res = await API_GetPortfoliosByCompanyID(companyId);
      if (res.data) {
        console.log("Company works:", res.data);
        const portfoliosWithImages = await Promise.all(
          res.data.map(async (item) => {
            const images = await getImageByPortfolioId(item.portfolioId);
            return {
              ...item,
              imageUrls: images.map((img) => img.fileUrl),
            };
          })
        );
        setData(portfoliosWithImages);
        console.log("Company works with images:", portfoliosWithImages);
      } else {
        console.log("No data found for company:", companyId);
        setData([]); // 確認在沒有數據時也設置空陣列
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      setData([]); // 確認在沒有數據時也設置空陣列
    }
  };

  useEffect(() => {
    const parts = pathname.split("/");
    const id = parts[parts.length - 1];
    setCompanyId(id);

    // 處理網址變化時的數據請求
    const fetchData = async () => {
      await getPortfoliosByCompanyID(id);
    };

    fetchData();

    console.log("user.companies:", user.companies);
    console.log("data:", data);
  }, [pathname]);

  const company = user.companies.find(
    (comp) => String(comp.companyId) === String(companyId)
  );

  if (!company) {
    console.log("Company not found for companyId:", companyId);
    return <p>Loading...</p>;
  }

  const handleEditWork = (portfolioId) => {
    router.push(`${pathname}/${portfolioId}`);
  };

  const handleAddNewWork = () => {
    if (data.length < 5) {
      router.push(`${pathname}/new`);
    } else {
      Swal.fire({
        title: c("swalError.label_1"),
        icon: "warning",
        showConfirmButton: true,
      });
    }
  };

  const handleSubmit = async () => {
    const updatedData = data.map((item) => ({
      ...item,
      representative: item.portfolioId === selectedWork,
    }));

    setData(updatedData);
    // const companyId = user.companies[0].companyId;
    console.log("Selected work:", selectedWork);
    // 構建需要更新的數據
    const updateData = {
      ...company,
      RepresentativePortfolioId: selectedWork,
    };

    try {
      // 調用 API 更新公司資訊
      const response = await API_UpdateCompany(
        JSON.stringify(updateData),
        companyId
      );
      if (response) {
        Swal.fire({
          title: c("swalSuccess.label_2"),
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        closeDialog();
      } else {
        Swal.fire({
          title: c("swalError.label_1"),
          text: c("swalError.label_2"),
          icon: "error",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        // title: c("swalError.label_1"),
        title: "錯誤",
        text: c("swalError.label_2"),
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  // 刪除作品
  const handleDeleteWork = async (portfolioId) => {
    Swal.fire({
      title: c("swalDelete.label_1"),
      text: c("swalDelete.label_2"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: c("swalDelete.label_3"),
      cancelButtonText: c("swalDelete.label_4"),
      confirmButtonColor: "#4EAC85",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const response = await API_DeletePortfolio(portfolioId);
        if (response.message.includes("刪除成功!")) {
          const updatedData = data.filter(
            (item) => item.portfolioId !== portfolioId
          );
          setData(updatedData);
          Swal.fire({
            title: c("swalSuccess.label_1"),
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          await getPortfoliosByCompanyID(companyId);
        } else {
          Swal.fire({
            title: c("swalSuccess.label_3"),
            text: c("swalSuccess.label_4"),
            icon: "error",
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          title: c("swalSuccess.label_3"),
          text: c("swalSuccess.label_4"),
          icon: "error",
          showConfirmButton: true,
        });
      }
    });
  };

  return (
    <div className="exhibitionpage">
      <div className="exhibitionpage__container">
        <div className="exhibitionpage__contentWrapper">
          {/* 設定主打作品 */}
          <Dialog
            title={c("mainExhibit")}
            buttonText1={c("cancel")}
            buttonText2={c("submit")}
            open={dialogOpen}
            onClose={closeDialog}
            onClick={handleSubmit}
          >
            {data.map((item) => (
              <div key={item.portfolioId} className={styles.switchContainer}>
                <span>{locale === "zh" ? item.titleZh : item.titleEn}</span>
                <SwitchToggle
                  checked={
                    selectedWork
                      ? selectedWork === item.portfolioId
                      : user.companies[0].representativePortfolioId ===
                        item.portfolioId
                  }
                  onChange={() => handleSelectWork(item.portfolioId)}
                />
              </div>
            ))}
          </Dialog>

          <h1 className="exhibitionpage__contentWrapper__innertitle">
            {t("title")}
          </h1>

          <div className={styles.topBtnBLock}>
            <Button
              text={c("addExhibit")}
              onClick={handleAddNewWork}
              icon={<IoMdAdd />}
            />

            <Button
              text={c("mainExhibit")}
              onClick={openDialog}
              icon={<IoMdAdd />}
            />
          </div>

          {data.length === 0 ? (
            <div className={styles.companyWorks}>
              <div>
                <div className={styles.iconBlock}>
                  <IoSearch />
                </div>

                <div className={styles.text}>
                  <h2>{c("nowork")}</h2>
                  <span>{c("nowork_content")}</span>
                </div>
              </div>
            </div>
          ) : (
            data.map((item) => (
              <div key={item.portfolioId} className={styles.infoCard}>
                <div className={styles.infoCardContent}>
                  <div className={styles.infoCardTitle}>
                    <h2>
                      {locale === "zh" ? item.titleZh : item.titleEn}
                      {item.portfolioId ===
                        company.representativePortfolioId && (
                        <LiaMedalSolid
                          className={styles.marketInfo__infoicon}
                        />
                      )}
                    </h2>
                    <div className={styles.infoCardIcon}>
                      <div
                        className={styles.editIcon}
                        onClick={() => handleEditWork(item?.portfolioId)}
                      >
                        <MdEdit />
                      </div>
                      <div
                        className={styles.trashIcon}
                        onClick={() => handleDeleteWork(item?.portfolioId)}
                      >
                        <FaTrashAlt />
                      </div>
                    </div>
                  </div>
                  <p>
                    {item?.description}
                    {locale === "zh" ? item.descriptionZh : item.descriptionEn}
                  </p>
                  <div className={styles.tagBlock}>
                    <span className={styles.type}>{c("type")}</span>
                    <div className={styles.tag}>
                      <span>
                        {contentTypeMapping[locale][item.contentType]} /
                      </span>
                      <span>
                        {
                          contentSubtypeMapping[locale][item.contentType]?.[
                            item.contentSubtype[0]
                          ]
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.infoImage}>
                  <div className={styles.imageWrapper}>
                    {/* {item.contentType === 2 && item.trailerImageUrl && (
                                            <ImageLoader
                                                src={item.trailerImageUrl}
                                                sizes={"100%"}
                                                alt={"主視覺"}
                                            />
                                        )} */}

                    {item.imageUrls.length > 0 && (
                      <ImageLoader
                        src={
                          Array.isArray(item.imageUrls)
                            ? item.imageUrls[0]
                            : item.imageUrls
                        }
                        sizes={"100%"}
                        alt={"主視覺"}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyWorks;
