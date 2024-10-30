// Pitching 詳細資料頁面 (後台)
"use client";
import React, { useState, useEffect } from "react";
import styles from "./edit.module.scss";
import exhibitionPage from '../../../exhibition-backendPages.module.scss';
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

// api
import {
  API_GetProject,
  API_UpdateProject,
  API_SendActivationMailForProjectByAdmin,
  API_GetProjectMemberById,
  API_AddExhibitPass,
  API_DeleteExhibitPass,
  API_DeleteProjectKeyVisualByAdmin,
  API_UploadProjectKeyVisualByAdmin
} from "@/api/api";

// icon
import { FaRegSave } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";

// components
import Button from "@/(reservation)/exhibition/components/Button/Button";
import InputComponent from "@/(reservation)/exhibition/components/Input/Input";
import NormalSelect from "@/(reservation)/exhibition/exhibitioninfo/components/NormalSelect";
import Loading from "@/(reservation)/exhibition/components/Loading/Loading";
import Dialog from "@/(reservation)/exhibition/components/Dialog/Dialog";
import ImageLoader from "@/components/global/image-loader";

const EditProjectPages = () => {
  const Swal = require("sweetalert2");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const router = useRouter();
  const [inviteEmail, setInviteEmail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [project, setProject] = useState(null);             // 一進入頁面用來塞作品資訊
  const [loading, setLoading] = useState(false);            // 是否正在加載
  const [projectMembers, setProjectMembers] = useState([]); // 用來塞成員資訊
  const [memberPassChanges, setMemberPassChanges] = useState({}); // 會員展證變更
  const projectId = pathname.split("/").pop();
  const [originalKeyVisual, setOriginalKeyVisual] = useState(null); // 原始主視覺圖

  // Pitching sub category
  const mainCategory = [
    {
      value: "Story to Screen",
      label: "Story to Screen",
      zhValue: "故事專場",
      zhOptions: [
        {
          value: "出版文本",
          label: "出版文本",
          enValue: "Fiction & Non-Fiction",
        },
        { value: "漫畫", label: "漫畫", enValue: "Comics" },
        {
          value: "Shoot the Book! TCCF",
          label: "Shoot the Book! TCCF",
          enValue: "Shoot the Book! TCCF",
        },
        {
          value: "原創故事專場",
          label: "原創故事專場",
          enValue: "Original Story Concept",
        },
      ],
    },
    {
      value: "Project to Screen",
      label: "Project to Screen",
      zhValue: "企畫專場",
      zhOptions: [
        { value: "長片", label: "長片", enValue: "Feature Films" },
        { value: "影集", label: "影集", enValue: "Series" },
        { value: "動畫", label: "動畫", enValue: "Animation Films and Series" },
        {
          value: "紀錄片",
          label: "紀錄片",
          enValue: "Documentary Films and Series",
        },
      ],
    },
    {
      value: "Taicca School",
      label: "Taicca School",
      zhValue: "文策學院",
      zhOptions: [],
    },
  ];

  const getProjectDetail = async () => {
    const res = await API_GetProject(projectId);
    setProject(res);
    setOriginalKeyVisual(res.keyVisual);
  };

  const getProjectMember = async () => {
    const res = await API_GetProjectMemberById(projectId);
    setProjectMembers(res);
  }

  useEffect(() => {
    getProjectDetail();
    getProjectMember();
  }, [projectId]);

  const handleInputChange = (field, value, index = null, type = null) => {
    let updatedProject = { ...project };

    if (field === "pitchingMainCategory") {
      const selectedCategory = mainCategory.find(
        (cat) => cat.zhValue === value
      );
      if (selectedCategory) {
        updatedProject.pitchingMainCategory = selectedCategory.zhValue;
        updatedProject.pitchingMainCategoryEn = selectedCategory.label; // 更新英文主分類
        updatedProject.pitchingCategory = ""; // 重置子分類
        updatedProject.pitchingCategoryEn = ""; // 重置子分類英文
      }
    } else if (field === "pitchingMainCategoryEn") {
      const selectedCategory = mainCategory.find((cat) => cat.label === value);
      if (selectedCategory) {
        updatedProject.pitchingMainCategoryEn = selectedCategory.label;
        updatedProject.pitchingMainCategory = selectedCategory.zhValue; // 更新中文主分類
        updatedProject.pitchingCategory = ""; // 重置子分類
        updatedProject.pitchingCategoryEn = ""; // 重置子分類英文
      }
    } else if (field === "pitchingCategory") {
      const mainCat = mainCategory.find(
        (cat) => cat.zhValue === project.pitchingMainCategory
      );
      if (mainCat) {
        const selectedSubCategory = mainCat.zhOptions.find(
          (subCat) => subCat.value === value
        );
        if (selectedSubCategory) {
          updatedProject.pitchingCategory = selectedSubCategory.value;
          updatedProject.pitchingCategoryEn = selectedSubCategory.enValue; // 更新英文次分類
        }
      }
    } else if (field === "pitchingCategoryEn") {
      const mainCat = mainCategory.find(
        (cat) => cat.label === project.pitchingMainCategoryEn
      );
      if (mainCat) {
        const selectedSubCategory = mainCat.zhOptions.find(
          (subCat) => subCat.enValue === value
        );
        if (selectedSubCategory) {
          updatedProject.pitchingCategoryEn = selectedSubCategory.enValue;
          updatedProject.pitchingCategory = selectedSubCategory.value; // 更新中文次分類
        }
      }
    } else if (type === "projectCharacters" && index !== null) {
      // 僅更新 projectCharacters 的特定字段
      const updatedCharacters = [...updatedProject.projectCharacters];
      updatedCharacters[index] = {
        characterName: updatedCharacters[index].characterName,
        characterNameEn: updatedCharacters[index].characterNameEn,
        characterDescription: updatedCharacters[index].characterDescription,
        characterDescriptionEn: updatedCharacters[index].characterDescriptionEn,
        [field]: value,
      };
      updatedProject.projectCharacters = updatedCharacters;
    } else if (type === "projectCreators" && index !== null) {
      // 僅更新 projectCreators 的特定字段
      const updatedCreators = [...updatedProject.projectCreators];
      updatedCreators[index] = {
        creatorName: updatedCreators[index].creatorName,
        creatorNameEn: updatedCreators[index].creatorNameEn,
        creatorTitle: updatedCreators[index].creatorTitle,
        creatorTitleEn: updatedCreators[index].creatorTitleEn,
        creatorProfile: updatedCreators[index].creatorProfile,
        creatorProfileEn: updatedCreators[index].creatorProfileEn,
        [field]: value, // 只更新特定字段
      };
      updatedProject.projectCreators = updatedCreators;
    } else if (type === "projectCompanies" && index !== null) {
      // 僅更新 projectCompanies 的特定字段
      const updatedCompanies = [...updatedProject.projectCompanies];
      updatedCompanies[index] = {
        ...updatedCompanies[index],
        [field]: value,
      };
      updatedProject.projectCompanies = updatedCompanies;
    } else {
      // 默認更新：更新其他字段的輸入值
      updatedProject[field] = value;
    }
    setProject(updatedProject);
  };

  // 展證 select 狀態
  const handleSelectChange = (memberId, hasExhibitPass) => {
    setMemberPassChanges((prevChanges) => ({
      ...prevChanges,
      [memberId]: hasExhibitPass, // 更新對應 memberId 的展證狀態
    }));
  };

  // 儲存與更新專案資訊 API_UpdateProject
  const handleSave = async () => {
    console.log("Saving project data...", project);
    try {
      setLoading(true);

      // 過濾掉空的角色和創作者
      const filteredCharacters = project.projectCharacters.filter(
        (character) =>
          character.characterName ||
          character.characterNameEn ||
          character.characterDescription ||
          character.characterDescriptionEn
      );

      const filteredCreators = project.projectCreators.filter(
        (creator) =>
          creator.creatorName ||
          creator.creatorNameEn ||
          creator.creatorTitle ||
          creator.creatorTitleEn ||
          creator.creatorProfile ||
          creator.creatorProfileEn
      );

      const filteredCompanies = project.projectCompanies.filter(
        (company) =>
          company.productionCompanyName ||
          company.productionCompanyNameEn ||
          company.productionCompanyProfile ||
          company.productionCompanyProfileEn
      )

      const projectData = {
        entityId: project.entityId,
        entiryOverviewType: project.entiryOverviewType || "Project",
        subject: project.subject || null,
        subjectEn: project.subjectEn || null,
        pitchingMainCategory: project.pitchingMainCategory || null,
        pitchingMainCategoryEn: project.pitchingMainCategoryEn || null,
        pitchingCategory: project.pitchingCategory || null,
        pitchingCategoryEn: project.pitchingCategoryEn || null,
        originalTitle: project.originalTitle || null,
        passCount: project.passCount || null,
        country: project.country || null,
        countryEn: project.countryEn || null,
        genre: project.genre || null,
        genreEn: project.genreEn || null,
        contactPerson: project.contactPerson || null,
        contactPersonEn: project.contactPersonEn || null,
        jobTitle: project.jobTitle || null,
        jobTitleEn: project.jobTitleEn || null,
        contactNumber: project.contactNumber || null,
        contactEmail: project.contactEmail || null,
        logline: project.logline || null,
        loglineEn: project.loglineEn || null,
        synopsis: project.synopsis || null,
        synopsisEn: project.synopsisEn || null,
        yearOfFirstPublicationRelease:
          project.yearOfFirstPublicationRelease || null,
        publisherName: project.publisherName || null,
        publisherNameEn: project.publisherNameEn || null,
        holderOfAudiovisualAdaptationRights:
          project.holderOfAudiovisualAdaptationRights || null,
        holderOfAudiovisualAdaptationRightsEn:
          project.holderOfAudiovisualAdaptationRightsEn || null,
        publisherProfile: project.publisherProfile || null,
        publisherProfileEn: project.publisherProfileEn || null,
        productionCompanyName: project.productionCompanyName || null,
        productionCompanyNameEn: project.productionCompanyNameEn || null,
        productionCompanyProfile: project.productionCompanyProfile || null,
        productionCompanyProfileEn: project.productionCompanyProfileEn || null,
        type: project.type || null,
        typeEn: project.typeEn || null,
        theme: project.theme || null,
        themeEn: project.themeEn || null,
        rightsSold: project.rightsSold || null,
        rightsSoldEn: project.rightsSoldEn || null,
        whyAdaptThisStory: project.whyAdaptThisStory || null,
        whyAdaptThisStoryEn: project.whyAdaptThisStoryEn || null,
        comparableFilmTvWorks: project.comparableFilmTvWorks || null,
        comparableFilmTvWorksEn: project.comparableFilmTvWorksEn || null,
        awardsReceivedOrNumberOfCopiesSold:
          project.awardsReceivedOrNumberOfCopiesSold || null,
        awardsReceivedOrNumberOfCopiesSoldEn:
          project.awardsReceivedOrNumberOfCopiesSoldEn || null,
        backgroundSetting: project.backgroundSetting || null,
        backgroundSettingEn: project.backgroundSettingEn || null,
        formats: project.formats || null,
        formatsEn: project.formatsEn || null,
        keyVisual: project.keyVisual || null,
        originalIdeaAdaptation: project.originalIdeaAdaptation || null,
        originalIdeaAdaptationEn: project.originalIdeaAdaptationEn || null,
        productionStatement: project.productionStatement || null,
        productionStatementEn: project.productionStatementEn || null,
        goalAtTccf: project.goalAtTccf || null,
        goalAtTccfEn: project.goalAtTccfEn || null,
        projectStatus: project.projectStatus || null,
        projectStatusEn: project.projectStatusEn || null,
        totalBudgetUsd: project.totalBudgetUsd || null,
        financingAlreadyInPlaceUsd: project.financingAlreadyInPlaceUsd || null,
        numberOfEpisodes: project.numberOfEpisodes || null,
        duration: project.duration || null,
        projectCompanies: filteredCompanies,
        projectCharacters: filteredCharacters,
        projectCreators: filteredCreators,
      };

      if (projectData.keyVisual !== originalKeyVisual) {
        await API_DeleteProjectKeyVisualByAdmin(projectData.entityId);
        try {
          for (const keyVisual of projectData.keyVisual) {
            const data = {
              ImageBase64: keyVisual
            }
            await API_UploadProjectKeyVisualByAdmin(JSON.stringify(data), projectData.entityId);
          }
        } catch (error) {
          console.error(error);
        }
      }
      console.log("Prepared projectData for API:", projectData);


      const res = await API_UpdateProject(
        JSON.stringify(projectData),
        project.entityId
      );

      if (res === null) {
        Swal.fire({
          icon: "error",
          title: locale === "zh" ? "網路訊號不佳" : "Poor Internet Signal",
          text:
            locale === "zh"
              ? "請檢查您的網路連接"
              : "Please check your internet connection.",
          showConfirmButton: true,
        });
        setLoading(false);
        return;
      }

      getProjectDetail();
      setLoading(false);

      // 顯示成功提示
      Swal.fire({
        icon: "success",
        title: locale === "zh" ? "儲存成功" : "Success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title:
          locale === "zh"
            ? "異常狀況，請稍後再試"
            : "An exception occurred, please try again later.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // 開啟dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // 關閉dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  // 邀請成員
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const inviteMember = async () => {
    // 信箱不得為空
    if (!inviteEmail.trim()) {
      Swal.fire({
        icon: "warning",
        title: locale === "zh" ? "請輸入信箱" : "Please enter an email address",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    };

    if (!emailRegex.test(inviteEmail)) {
      Swal.fire({
        icon: "warning",
        title: locale === "zh" ? "請輸入正確的信箱格式，，且不得包含空格" : "Please enter a valid email address",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setLoading(true);
    const data = {
      email: inviteEmail,
    };

    const res = await API_SendActivationMailForProjectByAdmin(
      JSON.stringify(data),
      projectId
    );
    if (res && res.message && res.message.includes("已發送開通信件!")) {
      handleCloseDialog();
      Swal.fire({
        icon: "success",
        title: locale === "zh" ? "寄送成功" : "Success",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        setInviteEmail("");
        setLoading(false);
      });
    } else if (res && res.message && res.message.includes("Email 已經存在")) {
      Swal.fire({
        icon: "error",
        title:
          locale === "zh" ? "Email 已經存在" : "This email is already exists",
        showConfirmButton: true,
      }).then(() => {
        setLoading(false);
      });
    } else {
      // console.log(res)
    }
  };

  // 用於新增角色或創作者
  // 設置上限
  const handleAddItem = (type) => {
    const maxItems = type === 'projectCharacters' ? 3 : 6;

    // 如果數量超過上限，顯示提示
    // 超過上限就return，不新增
    if (project[type].length >= maxItems) {
      Swal.fire({
        icon: 'warning',
        text: type === 'projectCharacters' ? '角色最多只能有三名' : '創作者最多只能有六名',
        showConfirmButton: true,
      });
      return;
    }

    const newItem =
      type === 'projectCharacters'
        ? { characterName: '', characterNameEn: '', characterDescription: '', characterDescriptionEn: '' }
        : type === 'projectCreators'
          ? { creatorName: '', creatorNameEn: '', creatorTitle: '', creatorTitleEn: '', creatorProfile: '', creatorProfileEn: '' }
          : { productionCompanyName: '', productionCompanyNameEn: '', productionCompanyProfile: '', productionCompanyProfileEn: '' };

    setProject((prevProject) => {
      return {
        ...prevProject,
        [type]: [...prevProject[type], newItem],
      };
    });
  };

  // 用於刪除角色、創作者或公司
  const handleDeleteItem = (type, index) => {
    setProject((prevProject) => {
      const updatedItems = [...prevProject[type]];
      updatedItems.splice(index, 1);
      return {
        ...prevProject,
        [type]: updatedItems,
      };
    });
  };




  // 儲存展證變更
  const saveExhibitPassChanges = async () => {
    try {
      const memberPassChangesArray = Object.entries(memberPassChanges); // 轉換為可迭代的鍵值對陣列
      const failedAdditions = []; // 用於儲存新增失敗的會員
      const failedDeletions = []; // 用於儲存刪除失敗的會員

      for (const [memberId, hasExhibitPass] of memberPassChangesArray) {
        try {
          if (hasExhibitPass === "true") {
            const data = {
              memberId: memberId,
            };
            const response = await API_AddExhibitPass(JSON.stringify(data));
            if (response.message.includes("新增失敗")) {
              failedAdditions.push(memberId);
            }
          } else {
            const response = await API_DeleteExhibitPass(memberId);
            if (response.message.includes("無法刪除")) {
              failedDeletions.push(memberId);
            }
          }
        } catch (apiError) {
          console.error(`Error processing memberId: ${memberId}`, apiError);
        }
      }

      // 錯誤提示顯示
      if (failedAdditions.length > 0 || failedDeletions.length > 0) {
        let failureMessage = "";
        if (failedAdditions.length > 0) {
          failureMessage +=
            `新增展證失敗的會員: ${failedAdditions.join("\n")}`;
        }
        if (failedDeletions.length > 0) {
          failureMessage +=
            `刪除展證失敗的會員: ${failedDeletions.join("\n")}`;
        }

        Swal.fire({
          icon: "error",
          title: "部分操作失敗，請洽系統人員",
          text: failureMessage,
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: locale === "zh" ? "展證修改成功" : "Exhibit pass changes saved!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error saving exhibit pass changes:", error);
      Swal.fire({
        icon: "error",
        title: "異常狀況，請稍後再試",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div className={exhibitionPage.exhibitionBackendPage}>
      {loading && <Loading />}
      <div className={exhibitionPage.exhibitionBackendPage__container}>
        <div className={exhibitionPage.exhibitionBackendPage__contentWrapper}>
          <div className={exhibitionPage.exhibitionBackendPage__mainWrapper}>
            <div style={{ width: "94%" }}>
              <div>
                <div className={styles.architecture}>
                  <div className={styles.architecture__header}>
                    <h3>PITCHING</h3>
                    <Button text={"邀請成員"} icon={<IoPeopleSharp />} onClick={handleOpenDialog} />
                  </div>

                  {projectMembers.length > 0 && (
                    <div className={styles.architecture__structure}>
                      <div className={styles.architecture__structureheader}>
                        <span>成員</span> {/* 成員標題 */}
                        <div className={styles.architecture__memberAdminBlock}>
                          <span>展證</span> {/* 展證標題 */}
                        </div>
                      </div>
                      <div>
                        {projectMembers.map(
                          (member, index) => {
                            return (
                              <div
                                key={index}
                                className={styles.architecture__accordionContainer}
                                style={{
                                  backgroundColor: "#F3F4F6",
                                }}
                              >
                                <div className={styles.architecture__accordionContent}>
                                  <div className={styles.architecture__accordionImg}>
                                    <ImageLoader
                                      src={"/images/exhibition/userPhoto.jpg"}
                                      sizes={"100%"}
                                      style={{ width: "auto", height: "100%" }}
                                      alt={"member"}
                                    />
                                  </div>

                                  <div className={styles.architecture__accordionInfo}>
                                    {member.fullnameEn && (
                                      <span>{member.fullnameEn}</span>
                                    )}
                                    <span>{member.email}</span>
                                  </div>
                                </div>

                                <div className={styles.architecture__selectBlock}>
                                  {/* 展證選擇部分 */}
                                  <select
                                    name="hasExhibitPass"
                                    value={
                                      memberPassChanges[member.memberId] !== undefined
                                        ? memberPassChanges[member.memberId]
                                        : String(member.exhibitPass)
                                    }
                                    onChange={(e) =>
                                      handleSelectChange(
                                        member.memberId,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                  </select>

                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                  {projectMembers.length > 0 && (
                    <div
                      className={styles.architecture__passBtn}
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <Button
                        text={"確認修改展證"}
                        icon={<FaRegSave />}
                        onClick={saveExhibitPassChanges}
                      />

                    </div>
                  )}

                  <div className={styles.architecture__inputBlock}>
                    {/* 主要分類（中文） */}
                    <NormalSelect
                      label="作品類型"
                      options={mainCategory.map((cat) => ({
                        value: cat.zhValue,
                        label: cat.zhValue,
                      }))} // 使用 zhValue 作為選項的值
                      name="pitchingMainCategory"
                      value={project.pitchingMainCategory || ""}
                      defaultText="請選擇Main Category"
                      onChange={(e) =>
                        handleInputChange(
                          "pitchingMainCategory",
                          e.target.value
                        )
                      }
                    />

                    {/* 主要分類（英文） */}
                    <NormalSelect
                      label="Pitching Main Category"
                      options={mainCategory.map((cat) => ({
                        value: cat.label,
                        label: cat.label,
                      }))}
                      name="pitchingMainCategoryEn"
                      value={project.pitchingMainCategoryEn || ""}
                      defaultText="Please select the nature of business"
                      onChange={(e) =>
                        handleInputChange(
                          "pitchingMainCategoryEn",
                          e.target.value
                        )
                      }
                      disabled={true}
                    />

                    {/* 次要分類（中文） */}
                    <NormalSelect
                      label="專場單元"
                      options={
                        mainCategory.find(
                          (cat) => cat.zhValue === project.pitchingMainCategory
                        )?.zhOptions || []
                      } // 使用 zhValue 進行匹配
                      name="pitchingCategory"
                      value={project.pitchingCategory || ""}
                      defaultText="請選擇專場單元"
                      onChange={(e) =>
                        handleInputChange("pitchingCategory", e.target.value)
                      }
                    />

                    {/* 次要分類（英文） */}
                    <NormalSelect
                      label="Pitching Category"
                      options={
                        mainCategory
                          .find(
                            (cat) =>
                              cat.label === project.pitchingMainCategoryEn
                          )
                          ?.zhOptions.map((option) => ({
                            value: option.enValue,
                            label: option.enValue,
                          })) || []
                      }
                      name="pitchingCategoryEn"
                      value={project.pitchingCategoryEn || ""}
                      defaultText="Please select the nature of business"
                      onChange={(e) =>
                        handleInputChange("pitchingCategoryEn", e.target.value)
                      }
                      disabled={true}
                    />

                    {/* 企畫案名稱｜Project Title */}
                    <InputComponent
                      type="text"
                      label={"企畫案名稱"}
                      name="subject"
                      value={project.subject}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    <InputComponent
                      type="text"
                      label={"Project Title"}
                      name="subjectEn"
                      value={project.subjectEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 國家 Country / Countries */}
                    <InputComponent
                      type="text"
                      label={"國家"}
                      name="country"
                      value={project.country}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    <InputComponent
                      type="text"
                      label={"Country ｜ Countries"}
                      name="countryEn"
                      value={project.countryEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 類型 */}
                    <InputComponent
                      type="text"
                      label={"類型"}
                      name="genre"
                      value={project.genre}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    <InputComponent
                      type="text"
                      label={"Genre"}
                      name="genreEn"
                      value={project.genreEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 聯絡窗口姓名 Contact Person */}
                    <InputComponent
                      type="text"
                      label={"聯絡窗口姓名"}
                      name="contactPerson"
                      value={project.contactPerson}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    <InputComponent
                      type="text"
                      label={"Contact Person"}
                      name="contactPersonEn"
                      value={project.contactPersonEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 聯絡窗口職稱 Job Title */}
                    <InputComponent
                      type="text"
                      label={"聯絡窗口職稱"}
                      name="jobTitle"
                      value={project.jobTitle}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    <InputComponent
                      type="text"
                      label={"Job Title"}
                      name="jobTitleEn"
                      value={project.jobTitleEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 聯絡窗口電話 Contact Number */}
                    <InputComponent
                      type="text"
                      label={"聯絡窗口電話｜Contact Number"}
                      name="contactNumber"
                      value={project.contactNumber}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 聯絡窗口信箱 Contact Email */}
                    <InputComponent
                      type="text"
                      label={"聯絡窗口信箱｜Contact Email"}
                      name="contactEmail"
                      value={project.contactEmail}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 專案概要 Logline */}
                    <InputComponent
                      type="textarea"
                      label={"專案概要"}
                      name="logline"
                      value={project.logline}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    <InputComponent
                      type="textarea"
                      label={"Logline"}
                      name="loglineEn"
                      value={project.loglineEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 故事大綱 Synopsis */}
                    <InputComponent
                      type="textarea"
                      label={"故事大綱"}
                      name="synopsis"
                      value={project.synopsis}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    <InputComponent
                      type="textarea"
                      label={"Synopsis"}
                      name="synopsisEn"
                      value={project.synopsisEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* Original Title */}
                    <InputComponent
                      type="text"
                      label={"Original Title"}
                      name="originalTitle"
                      value={project.originalTitle}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* pass count */}
                    <InputComponent
                      type="number"
                      label={"展證張數"}
                      name="passCount"
                      value={project.passCount}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                  </div>

                  {/* charactor */}
                  <div className={styles.architecture__sectionBlock}>
                    <div className={styles.architecture__sectionHeader}>
                      <h3>主要角色</h3>
                      <Button
                        icon={<MdAdd />}
                        onClick={() => handleAddItem('projectCharacters')}
                      />
                    </div>
                    {project.projectCharacters.map((characters, index) => (
                      <div className={styles.architecture__sectionWrapper}>
                        <div className={styles.architecture__deleteBtn}>
                          <Button
                            isDelete={true}
                            icon={<IoTrashBin />}
                            onClick={() => handleDeleteItem('projectCharacters', index)}
                          />
                        </div>
                        <div key={index} className={styles.architecture__inputBlock}>
                          <InputComponent
                            type="text"
                            label={`主要角色名 - ${index + 1}`}
                            value={characters.characterName}
                            name={`characterName${index}`}
                            onChange={(e) => handleInputChange('characterName', e.target.value, index, 'projectCharacters')}
                          />
                          <InputComponent
                            type="text"
                            label={`Character Name - ${index + 1}`}
                            value={characters.characterNameEn}
                            name={`characterNameEn${index}`}
                            onChange={(e) => handleInputChange('characterNameEn', e.target.value, index, 'projectCharacters')}
                          />
                          <InputComponent
                            type="textarea"
                            label={`主要角色簡介 - ${index + 1}`}
                            value={characters.characterDescription}
                            onChange={(e) => handleInputChange('characterDescription', e.target.value, index, 'projectCharacters')}
                          />
                          <InputComponent
                            type="textarea"
                            label={`Character Description - ${index + 1}`}
                            value={characters.characterDescriptionEn}
                            onChange={(e) => handleInputChange('characterDescriptionEn', e.target.value, index, 'projectCharacters')}
                          />
                        </div>

                      </div>
                    ))}


                  </div>

                  {/* 創作者 */}
                  <div className={styles.architecture__sectionBlock}>
                    <div className={styles.architecture__sectionHeader}>
                      <h3>創作者</h3>

                      <Button
                        icon={<MdAdd />}
                        onClick={() => handleAddItem('projectCreators')}
                      />
                    </div>
                    {project.projectCreators.map((creators, index) => (
                      <div className={styles.architecture__sectionWrapper}>
                        <div className={styles.architecture__deleteBtn}>
                          <Button
                            icon={<IoTrashBin />}
                            isDelete={true}
                            onClick={() => handleDeleteItem('projectCreators', index)}
                          />
                        </div>
                        <div key={index} className={styles.architecture__inputBlock}>
                          <InputComponent
                            type="text"
                            label={`創作者名稱 - ${index + 1}`}
                            value={creators.creatorName}
                            name={`creatorName${index}`}
                            onChange={(e) => handleInputChange('creatorName', e.target.value, index, 'projectCreators')}
                          />
                          <InputComponent
                            type="text"
                            label={`Creator's Name - ${index + 1}`}
                            value={creators.creatorNameEn}
                            name={`creatorNameEn${index}`}
                            onChange={(e) => handleInputChange('creatorNameEn', e.target.value, index, 'projectCreators')}
                          />
                          <InputComponent
                            type="text"
                            label={`創作者職稱 - ${index + 1}`}
                            value={creators.creatorTitle}
                            name={`creatorTitle${index}`}
                            onChange={(e) => handleInputChange('creatorTitle', e.target.value, index, 'projectCreators')}
                          />
                          <InputComponent
                            type="text"
                            label={`Creator's Title - ${index + 1}`}
                            value={creators.creatorTitleEn}
                            name={`creatorTitleEn${index}`}
                            onChange={(e) => handleInputChange('creatorTitleEn', e.target.value, index, 'projectCreators')}
                          />
                          <InputComponent
                            type="textarea"
                            label={`創作者介紹 - ${index + 1}`}
                            value={creators.creatorProfile}
                            onChange={(e) => handleInputChange('creatorProfile', e.target.value, index, 'projectCreators')}
                          />
                          <InputComponent
                            type="textarea"
                            label={`Creator's Profile - ${index + 1}`}
                            value={creators.creatorProfileEn}
                            onChange={(e) => handleInputChange('creatorProfileEn', e.target.value, index, 'projectCreators')}
                          />

                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 公司 */}
                  <div className={styles.architecture__sectionBlock}>
                    <div className={styles.architecture__sectionHeader}>
                      <h3>製作公司</h3>

                      <Button
                        icon={<MdAdd />}
                        onClick={() => handleAddItem('projectCompanies')}
                      />
                    </div>
                    {project.projectCompanies.map((creators, index) => (
                      <div className={styles.architecture__sectionWrapper}>
                        <div className={styles.architecture__deleteBtn}>
                          <Button
                            icon={<IoTrashBin />}
                            isDelete={true}
                            onClick={() => handleDeleteItem('projectCompanies', index)}
                          />
                        </div>
                        <div key={index} className={styles.architecture__inputBlock}>
                          <InputComponent
                            type="text"
                            label={`公司名稱 - ${index + 1}`}
                            value={creators.productionCompanyName}
                            name={`productionCompanyName${index}`}
                            onChange={(e) => handleInputChange('productionCompanyName', e.target.value, index, 'projectCompanies')}
                          />
                          <InputComponent
                            type="text"
                            label={`Company Name - ${index + 1}`}
                            value={creators.productionCompanyNameEn}
                            name={`productionCompanyNameEn${index}`}
                            onChange={(e) => handleInputChange('productionCompanyNameEn', e.target.value, index, 'projectCompanies')}
                          />
                          <InputComponent
                            type="text"
                            label={`公司介紹 - ${index + 1}`}
                            value={creators.productionCompanyProfile}
                            name={`productionCompanyProfile${index}`}
                            onChange={(e) => handleInputChange('productionCompanyProfile', e.target.value, index, 'projectCompanies')}
                          />
                          <InputComponent
                            type="text"
                            label={`Company Profile - ${index + 1}`}
                            value={creators.productionCompanyProfileEn}
                            name={`productionCompanyProfileEn${index}`}
                            onChange={(e) => handleInputChange('productionCompanyProfileEn', e.target.value, index, 'projectCompanies')}
                          />
                        </div>
                      </div>
                    ))}
                  </div>


                  <div className={styles.architecture__inputBlock}>
                    {/* 首刷出版年份／發表年份 */}
                    <InputComponent
                      type="text"
                      label={"首刷出版年份／發表年份"}
                      name="yearOfFirstPublicationRelease"
                      value={project.yearOfFirstPublicationRelease}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 主視覺圖 */}
                    <InputComponent
                      type="image"
                      label={"主視覺圖｜Key Visual"}
                      name="keyVisual"
                      value={project.keyVisual}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                  </div>

                  <div className={styles.architecture__inputBlock}>
                    {/* 出版單位名稱 */}
                    <InputComponent
                      type="text"
                      label={"出版單位名稱"}
                      name="publisherName"
                      value={project.publisherName}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 出版單位名稱 En */}
                    <InputComponent
                      type="text"
                      label={"Publisher's Name"}
                      name="publisherNameEn"
                      value={project.publisherNameEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 持有影視改編權之單位名稱 */}
                    <InputComponent
                      type="text"
                      label={"持有影視改編權之單位名稱"}
                      name="holderOfAudiovisualAdaptationRights"
                      value={project.holderOfAudiovisualAdaptationRights}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 持有影視改編權之單位名稱 */}
                    <InputComponent
                      type="text"
                      label={"Holder of Audiovisual Adaptation Rights"}
                      name="holderOfAudiovisualAdaptationRightsEn"
                      value={project.holderOfAudiovisualAdaptationRightsEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 版權公司介紹  */}
                    <InputComponent
                      type="text"
                      label={"版權公司介紹"}
                      name="productionCompanyProfile"
                      value={project.productionCompanyProfile}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 版權公司介紹 */}
                    <InputComponent
                      type="text"
                      label={"Company Profile"}
                      name="productionCompanyProfileEn"
                      value={project.productionCompanyProfileEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 出版公司介紹 */}
                    <InputComponent
                      type="text"
                      label={"出版公司介紹"}
                      name="publisherProfile"
                      value={project.publisherProfile}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 出版公司介紹 */}
                    <InputComponent
                      type="text"
                      label={"Publisher Profile"}
                      name="publisherProfileEn"
                      value={project.publisherProfileEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 作品體裁 */}
                    <InputComponent
                      type="text"
                      label={"作品體裁"}
                      name="type"
                      value={project.type}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 作品體裁 */}
                    <InputComponent
                      type="text"
                      label={"Type"}
                      name="typeEn"
                      value={project.typeEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 作品主題 */}
                    <InputComponent
                      type="text"
                      label={"作品主題"}
                      name="theme"
                      value={project.theme}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 作品主題 */}
                    <InputComponent
                      type="text"
                      label={"Theme"}
                      name="themeEn"
                      value={project.themeEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 作品著作權交易情形 */}
                    <InputComponent
                      type="text"
                      label={"作品著作權交易情形"}
                      name="rightsSold"
                      value={project.rightsSold}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 作品著作權交易情形 */}
                    <InputComponent
                      type="text"
                      label={"Rights Sold"}
                      name="rightsSoldEn"
                      value={project.rightsSoldEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 本案適合影視化之理由說明 */}
                    <InputComponent
                      type="textarea"
                      label={"本案適合影視化之理由說明"}
                      name="whyAdaptThisStory"
                      value={project.whyAdaptThisStory}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 本案適合影視化之理由說明 En */}
                    <InputComponent
                      type="textarea"
                      label={"Why Adapt This Story?"}
                      name="whyAdaptThisStoryEn"
                      value={project.whyAdaptThisStoryEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 對標影視作品 */}
                    <InputComponent
                      type="text"
                      label={"對標影視作品"}
                      name="comparableFilmTvWorks"
                      value={project.comparableFilmTvWorks}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 對標影視作品 */}
                    <InputComponent
                      type="text"
                      label={"Comparable Film & TV Works"}
                      name="comparableFilmTvWorksEn"
                      value={project.comparableFilmTvWorksEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 得獎紀錄或市場實績 */}
                    <InputComponent
                      type="text"
                      label={"得獎紀錄或市場實績"}
                      name="awardsReceivedOrNumberOfCopiesSold"
                      value={project.awardsReceivedOrNumberOfCopiesSold}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 得獎紀錄或市場實績 */}
                    <InputComponent
                      type="text"
                      label={"Awards Received or Number of Copies Sold"}
                      name="awardsReceivedOrNumberOfCopiesSoldEn"
                      value={project.awardsReceivedOrNumberOfCopiesSoldEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 故事背景、時空設定 */}
                    <InputComponent
                      type="text"
                      label={"故事背景、時空設定"}
                      name="backgroundSetting"
                      value={project.backgroundSetting}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 故事背景、時空設定 En */}
                    <InputComponent
                      type="text"
                      label={"Background, Setting"}
                      name="backgroundSettingEn"
                      value={project.backgroundSettingEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 期望開發形式 */}
                    <InputComponent
                      type="text"
                      label={"期望開發形式"}
                      name="formats"
                      value={project.formats}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 期望開發形式 */}
                    <InputComponent
                      type="text"
                      label={"Formats"}
                      name="formatsEn"
                      value={project.formatsEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 原創／改編作品 */}
                    <InputComponent
                      type="text"
                      label={"原創／改編作品"}
                      name="originalIdeaAdaptation"
                      value={project.originalIdeaAdaptation}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 原創／改編作品 Original Idea / Adaptation */}
                    <InputComponent
                      type="text"
                      label={"Original Idea / Adaptation"}
                      name="originalIdeaAdaptationEn"
                      value={project.originalIdeaAdaptationEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 製作理念 */}
                    <InputComponent
                      type="text"
                      label={"製作理念"}
                      name="productionStatement"
                      value={project.productionStatement}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 製作理念 */}
                    <InputComponent
                      type="text"
                      label={"Production Statement"}
                      name="productionStatementEn"
                      value={project.productionStatementEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/*  參與目標  */}
                    <InputComponent
                      type="text"
                      label={"參與目標"}
                      name="goalAtTccf"
                      value={project.goalAtTccf}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 參與目標 */}
                    <InputComponent
                      type="text"
                      label={"Goal at TCCF"}
                      name="goalAtTccfEn"
                      value={project.goalAtTccfEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 發展階段  */}
                    <InputComponent
                      type="text"
                      label={"發展階段"}
                      name="projectStatus"
                      value={project.projectStatus}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {/* 發展階段 */}
                    <InputComponent
                      type="text"
                      label={"Project Status"}
                      name="projectStatusEn"
                      value={project.projectStatusEn}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 製作金額（美元） */}
                    <InputComponent
                      type="text"
                      label={"製作金額（美元）｜Total Budget (USD)"}
                      name="totalBudgetUsd"
                      value={project.totalBudgetUsd}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 已募資金（美元） */}
                    <InputComponent
                      type="text"
                      label={
                        "已募資金（美元）｜Financing Already in Place (USD)"
                      }
                      name="financingAlreadyInPlaceUsd"
                      value={project.financingAlreadyInPlaceUsd}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 總集數 */}
                    <InputComponent
                      type="text"
                      label={"總集數｜Number of Episodes"}
                      name="numberOfEpisodes"
                      value={project.numberOfEpisodes}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />

                    {/* 單集長度  */}
                    <InputComponent
                      type="text"
                      label={"單集長度｜Duration"}
                      name="duration"
                      value={project.duration}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                  </div>

                  <div className={styles.architecture__buttonWrapper}>
                    <Button
                      text={"儲存"}
                      icon={<FaRegSave />}
                      onClick={() => handleSave(project.companyId)}
                    />
                  </div>
                </div>
              </div>
              <Dialog
                open={dialogOpen}
                title={"邀請成員"}
                buttonText1={"取消"}
                buttonText2={"送出"}
                onClose={handleCloseDialog}
                onClick={inviteMember}
              >
                {loading && <Loading />}

                <InputComponent
                  type={"text"}
                  label={"信箱"}
                  name={"inviteEmail"}
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectPages;
