"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken } from "@/utils/common";
import { useRouter, usePathname } from "next/navigation";

// api
import {
  API_GetCompanyByUserId,
  API_GetProfile,
  API_GetMemberDetails,
  API_GetMembersByCompanyId,
  API_GetCompanyByMemberId,
  API_GetProjectByMemberId,
  API_GetProjectMemberById,
  API_CheckExhibitPass,
} from "@/api/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const Swal = require("sweetalert2");
  const [user, setUser] = useState({
    userId: "",
    roles: [],
    companies: [],
    projects: [],
    memberDetails: {},
    companyMembers: {}, // Store company members
    projectMembers: {}, // Store project members
  });

  const [isLogin, setIsLogin] = useState(getAuthToken().token);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  // 包覆整個Exhibition，檢查是否有token
  // 如果中途token過期，則跳出警告視窗，並導向登入頁
  useEffect(() => {
    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: locale === "zh" ? "請重新登入" : "Please log in again",
        confirmButtonText: locale === "zh" ? "確定" : "Confirm",
      }).then(() => {
        router.push(`/${locale}/exhibition`);
      });
    } else {
      fetchData();
    }
  }, [isLogin, router, locale]);

  // 取得帳戶被加入的公司資料
  // 使用userId是for owner用的，一般的 member 只能打by member 那支API
  // for owner 的那一支，會有一家以上的公司（多筆資料陣列）
  // for member 的那一支，只會有一家公司（單一物件）
  const fetchCompanyData = async (userId) => {
    try {
      let companies = [];

      // 先嘗試通過userId獲取公司資料
      const resByUserId = await API_GetCompanyByUserId(userId);

      if (resByUserId.data && resByUserId.data.length > 0) {
        // 如果有資料，直接返回
        companies = resByUserId.data.map((company) => ({
          marketRef: company.marketRef,
          companyId: company.companyId,
          ownerMemberId: company.ownerMemberId,
          companyCode: company.companyCode,
          companyNameZh: company.companyNameZh,
          companyNameEn: company.companyNameEn,
          companyCategory: company.companyCategory,
          exhibitionRole: company.exhibitionRole,
          participationGoals: company.participationGoals,
          companyProfileZh: company.companyProfileZh,
          companyProfileEn: company.companyProfileEn,
          websiteUrl: company.websiteUrl,
          companyPhone: company.companyPhone,
          companyEmail: company.companyEmail,
          logoUrl: company.logoUrl,
          printLogoUrl: company.printLogoUrl,
          printPosterUrl: company.printPosterUrl,
          exhibitionZone: company.exhibitionZone,
          registrationCountryId: company.registrationCountryId,
          representativePortfolioId: company.representativePortfolioId,
          contactPersonNameZh: company.contactPersonNameZh,
          contactPersonNameEn: company.contactPersonNameEn,
          contactPersonTitleZh: company.contactPersonTitleZh,
          contactPersonTitleEn: company.contactPersonTitleEn,
          contactPersonPhone: company.contactPersonPhone,
          contactPersonEmail: company.contactPersonEmail,
          passCount: company.passCount,
          mainStageTime: company.mainStageTime,
          salonStageTime: company.salonStageTime,
          taxId: company.taxId || null,
          invoiceHeader: company.invoiceHeader,
          invoiceNotes: company.invoiceNotes,
          tags: company.tags,
          happyHour: company.happyHour,
          paymentMethods: company.paymentMethods,
          createdAt: company.createdAt,
          updatedAt: company.updatedAt,
          boothRawSpace: company.boothRawSpace,
          networkingEvent: company.networkingEvent,
        }));
      } else {
        // 如果沒有資料，嘗試通過memberId獲取公司資料
        const resByMemberId = await API_GetCompanyByMemberId(userId);

        if (resByMemberId.data) {
          const company = resByMemberId.data;
          const formattedCompany = {
            companyId: company.companyId,
            ownerMemberId: company.ownerMemberId,
            companyCode: company.companyCode,
            companyNameZh: company.companyNameZh,
            companyNameEn: company.companyNameEn,
            companyCategory: company.companyCategory,
            exhibitionRole: company.exhibitionRole,
            participationGoals: company.participationGoals,
            companyProfileZh: company.companyProfileZh,
            companyProfileEn: company.companyProfileEn,
            websiteUrl: company.websiteUrl,
            companyPhone: company.companyPhone,
            companyEmail: company.companyEmail,
            logoUrl: company.logoUrl,
            printLogoUrl: company.printLogoUrl,
            printPosterUrl: company.printPosterUrl,
            exhibitionZone: company.exhibitionZone,
            registrationCountryId: company.registrationCountryId,
            representativePortfolioId: company.representativePortfolioId,
            contactPersonNameZh: company.contactPersonNameZh,
            contactPersonNameEn: company.contactPersonNameEn,
            contactPersonTitleZh: company.contactPersonTitleZh,
            contactPersonTitleEn: company.contactPersonTitleEn,
            contactPersonPhone: company.contactPersonPhone,
            contactPersonEmail: company.contactPersonEmail,
            passCount: company.passCount,
            boothRawSpace: company.boothRawSpace,
            networkingEvent: company.networkingEvent,
            mainStageTime: company.mainStageTime,
            salonStageTime: company.salonStageTime,
            taxId: company.taxId || null,
            invoiceHeader: company.invoiceHeader,
            invoiceNotes: company.invoiceNotes,
            tags: company.tags,
            happyHour: company.happyHour,
            paymentMethods: company.paymentMethods,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt,
          };

          companies.push(formattedCompany); // 將物件轉換為陣列並推入
        }
      }

      return companies; // 統一返回陣列格式
    } catch (error) {
      console.error("Error fetching companies:", error);
      return [];
    }
  };

  // 取得帳戶被加入的Project資料
  const fetchProjectData = async (userId) => {
    try {
      const res = await API_GetProjectByMemberId(userId);
      if (res) {
        return res;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  };

  // 取得本帳號的 email / role / userId
  const getMemberInfo = async () => {
    try {
      const res = await API_GetProfile();
      if (res) {
        return res;
      } else {
        console.error("No profile data found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching member:", error);
      return null;
    }
  };

  // 取得會員基本資料
  const getMemberDetails = async (userId) => {
    try {
      const res = await API_GetMemberDetails(userId);
      if (res) {
        return res.data;
      } else {
        console.error("No member details found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching member details:", error);
      return null;
    }
  };

  // 取得 project members
  const fetchProjectMembers = async (projectId) => {
    try {
      const res = await API_GetProjectMemberById(projectId);
      if (res) {
        return res;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching project members:", error);
      return [];
    }
  };

  // 將 memberInfo 中的所有資料都存到 user
  // 將 memberDetails 中的所有資料都存到 user
  // 將 company 中的所有資料都存到 user
  // 如果網路錯誤，memberInfo 為 null，跳出網路訊號不佳的警告彈窗
  // const fetchData = async () => {
  //   try {
  //     const memberInfo = await getMemberInfo();
  //     if (memberInfo === null) {
  //       handleNetworkError();
  //       return;
  //     }

  //     // 先設置基本資料
  //     const memberDetails = await getMemberDetails(memberInfo.userId);
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       ...memberInfo,
  //       memberDetails: memberDetails,
  //     }));

  //     // 檢查是否有展證
  //     const exhibitPassRes = await API_CheckExhibitPass(memberInfo.userId);
  //     if (exhibitPassRes && exhibitPassRes.data) {
  //       setUser((prevUser) => ({
  //         ...prevUser,
  //         hasExhibitPass: exhibitPassRes.data,
  //       }));
  //     }

  //     // 如果是 Pitching 角色，則處理 Project 和 project members
  //     if (memberInfo.roles.includes("Pitching")) {
  //       const projects = await fetchProjectData(memberInfo.userId);
  //       const projectMembers = {};
  //       const projectMemberRes = await fetchProjectMembers(projects.projectId);

  //       if (projectMemberRes && projectMemberRes.length > 0) {
  //         projectMembers[projects.projectId] = projectMemberRes;
  //       } else {
  //         projectMembers[projects.projectId] = [];
  //       }

  //       // 更新使用者資料以包含項目和項目成員資料
  //       setUser((prevUser) => ({
  //         ...prevUser,
  //         projects: projects,
  //         projectMembers: projectMembers,
  //       }));
  //     } else {
  //       // 非 Pitching 角色：統一處理公司資料的獲取和設置
  //       const company = await fetchCompanyData(memberInfo.userId);
  //       let companyMembers = {};
  //       for (const comp of company) {
  //         const membersResponse = await API_GetMembersByCompanyId(
  //           comp.companyId
  //         );

  //         if (membersResponse && membersResponse.data) {
  //           companyMembers[comp.companyId] = membersResponse.data;
  //         } else {
  //           companyMembers[comp.companyId] = [];
  //         }
  //       }

  //       // 更新使用者資料以包含公司和公司成員資料
  //       setUser((prevUser) => ({
  //         ...prevUser,
  //         companies: company,
  //         companyMembers: companyMembers,
  //       }));
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title:
  //         locale === "zh"
  //           ? "異常狀況，請稍後再試"
  //           : "An exception occurred, please try again later.",
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });
  //   }
  // };

  const fetchData = async () => {
    try {
      const memberInfo = await getMemberInfo();
      if (memberInfo === null) {
        handleNetworkError();
        return;
      }

      // 設置基本資料
      await setBasicMemberData(memberInfo);

      // 檢查是否有展證
      await checkExhibitPass(memberInfo.userId);

      // 根據角色設定項目或公司資料
      if (memberInfo.roles.includes("Pitching")) {
        await handlePitchingRole(memberInfo.userId);
      } else {
        await handleCompanyRole(memberInfo.userId);
      }
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

  const setBasicMemberData = async (memberInfo) => {
    const memberDetails = await getMemberDetails(memberInfo.userId);
    setUser((prevUser) => ({
      ...prevUser,
      ...memberInfo,
      memberDetails: memberDetails,
    }));
  };

  const checkExhibitPass = async (userId) => {
    const exhibitPassRes = await API_CheckExhibitPass(userId);
    if (exhibitPassRes?.data) {
      setUser((prevUser) => ({
        ...prevUser,
        hasExhibitPass: exhibitPassRes.data,
      }));
    }
  };

  const handlePitchingRole = async (userId) => {
    const projects = await fetchProjectData(userId);
    const projectMembers = {};
    const projectMemberRes = await fetchProjectMembers(projects.projectId);

    projectMembers[projects.projectId] = projectMemberRes || [];

    setUser((prevUser) => ({
      ...prevUser,
      projects: projects,
      projectMembers: projectMembers,
    }));
  };

  const handleCompanyRole = async (userId) => {
    const company = await fetchCompanyData(userId);
    let companyMembers = {};

    for (const comp of company) {
      const membersResponse = await API_GetMembersByCompanyId(comp.companyId);
      companyMembers[comp.companyId] = membersResponse?.data || [];
    }

    setUser((prevUser) => ({
      ...prevUser,
      companies: company,
      companyMembers: companyMembers,
    }));
  };


  // 處理網路異常
  const handleNetworkError = () => {
    if (!navigator.onLine) {
      Swal.fire({
        icon: "error",
        title: locale === "zh" ? "網路訊號不佳" : "Poor Internet Signal",
        text:
          locale === "zh"
            ? "請檢查您的網路連接"
            : "Please check your internet connection.",
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    const fetchMembersForNewCompanies = async () => {
      if (user.companies.length > 0) {
        const lastCompany = user.companies[user.companies.length - 1];

        if (!user.companyMembers[lastCompany.companyId]) {
          // 調用 API 來獲取新公司的成員資料
          const membersResponse = await API_GetMembersByCompanyId(
            lastCompany.companyId
          );
          if (membersResponse?.data) {
            setUser((prevUser) => ({
              ...prevUser,
              companyMembers: {
                ...prevUser.companyMembers,
                [lastCompany.companyId]: membersResponse.data,
              },
            }));
          }
        }
      }
    };

    fetchMembersForNewCompanies();
  }, [user.companies]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
