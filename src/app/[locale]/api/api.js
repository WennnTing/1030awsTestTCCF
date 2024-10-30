// import Cookies from "js-cookie";
import { getAuthToken } from "../utils/common";
import Swal from "sweetalert2";

const Host = process.env.NEXT_PUBLIC_API_URL;

const handleEncodedRequestOption = ({
  method = "GET",
  body = {},
  contentType = "application/json",
}) => {
  const JWTtoken = getAuthToken().token;

  const headers = {
    "Content-Type": `${contentType}; charset=utf-8`,
    Authorization: `Bearer ${JWTtoken}`,
    Accept: "*",
  };

  const options = {
    redirect: "follow",
    method: method,
    headers,
  };

  if (method !== "GET")
    options["body"] = contentType.includes("json")
      ? body
      : jsonToUrlencoded(body);

  return options;
};

const tryFetch = async (path, requestOption) => {
  try {
    const response = await fetch(
      path,
      handleEncodedRequestOption(requestOption)
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        ...errorResponse,
        isNetworkError: false, // 標記這不是網絡錯誤
      };
    }

    return await response.json();
  } catch (error) {
    // 檢查網絡狀況
    // 如果網絡斷開，返回 null
    if (!navigator.onLine) {
      return null;
    }

    // 返回自定義錯誤對象
    return {
      ResultCode: 999,
      Message: error.message || "An unknown error occurred.",
      isNetworkError: false,
    };
  }
};

// ----------------------------- 登入、開通 相關 API -----------------------------

// 登入
export const API_Login = async (body) => {
  const path = `${Host}/api/auth/login/user`;
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 開通會員
// 使用情境：收到信件後，點擊連結，開通會員
export const API_Register = async (body) => {
  const path = `${Host}/api/auth/register`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 取得會員資料
export const API_GetProfile = async () => {
  const path = `${Host}/api/auth/profile`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 忘記密碼 (寄信)
export const API_SendResetPasswordMail = async (body) => {
  const path = `${Host}/api/auth/send-reset-password-mail`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 忘記密碼 > 重設密碼
export const API_ResetPassword = async (body) => {
  const path = `${Host}/api/auth/reset-password`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// Accupass Register
// 用於Accupass 收信人點擊連結後，開通會員
export const API_AccupassRegister = async (body) => {
  const path = `${Host}/api/auth/accupass`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 從 Token 取得對應的 email
// 用於開通會員，會員收到信件後，點擊連結，可自動帶入email
export const API_GetEmailByToken = async (token) => {
  const path = `${Host}/api/auth/token-email?token=${token}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 確認Email有無重複
export const API_CheckEmail = async (body) => {
  const path = `${Host}/api/auth/check-email`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// --------------------------------- 後台 ---------------------------------

// 取得使用者資料（清單）
export const API_GetAllMembers = async () => {
  const path = `${Host}/api/member`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得使用者資料（個人）
// export const API_GetProfile = async () => {
//     const path = `${Host}/api/auth/profile`;
//     const requestOption = {
//         method: "GET",
//     };
//     return await tryFetch(path, requestOption);
// }

// 新增使用者
export const API_AddMember = async (body) => {
  const path = `${Host}/api/member`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// ----------------------------- 展務前台 -----------------------------

// 取得所有國家
export const API_GetAllCountries = async () => {
  const path = `${Host}/api/country`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 展證新增
// 只有管理員可以操作
export const API_AddExhibitPass = async (body) => {
  const path = `${Host}/api/exhibit-pass`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 展證刪除
// 只有管理員可以操作
export const API_DeleteExhibitPass = async (memberId) => {
  const path = `${Host}/api/exhibit-pass/${memberId}`;
  const requestOption = {
    method: "DELETE",
  };
  return await tryFetch(path, requestOption);
};

// 取得當前會員Id是否有展證
export const API_CheckExhibitPass = async (memberId) => {
  const path = `${Host}/api/exhibit-pass/${memberId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 「owner」發送開通信給使用者 ( Company )
// 只有在ownerId === userId時，才能發送
export const API_SendActivationMailForCompany = async (body, companyId) => {
  const path = `${Host}/api/auth/send-activation-mail/company?companyId=${companyId}`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// owner 發送開通信給使用者 （ Project )
export const API_SendActivationMailForProject = async (body, projectId) => {
  const path = `${Host}/api/auth/send-activation-mail/project?projectId=${projectId}`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 取得當前使用者的資料
export const API_GetMemberDetails = async (userId) => {
  const path = `${Host}/api/member-details/${userId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 更新當前使用者的資料
export const API_UpdateMemberDetails = async (body, userId) => {
  const path = `${Host}/api/member-details/${userId}`;
  const requestOption = {
    method: "PUT",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 更新當前使用者的密碼
export const API_ChangePassword = async (body) => {
  const path = `${Host}/api/auth/change-password`;
  const requestOption = {
    method: "PUT",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 創建公司
export const API_CreateCompany = async (body) => {
  const path = `${Host}/api/companies`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 查詢公司成員 (by companyId)
export const API_GetMembersByCompanyId = async (companyId) => {
  const path = `${Host}/api/company-members?companyId=${companyId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得成員 by ID (給管理員和owner用的)
export const API_GetMemberById = async (memberId) => {
  const path = `${Host}/api/member/${memberId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得所有公司
export const API_GetAllCompanies = async () => {
  const path = `${Host}/api/companies`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得 「當前ID」 的公司資訊
export const API_GetCompanyDetails = async (companyId) => {
  const path = `${Host}/api/companies/${companyId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得「當前帳號」的公司資訊
// 只有owner可以取得
export const API_GetCompanyByUserId = async (userId) => {
  const path = `${Host}/api/companies/user?userId=${userId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得「當前帳號」的公司資訊
// for member (被加入的人)
export const API_GetCompanyByMemberId = async (memberId) => {
  const path = `${Host}/api/company-members/member?memberId=${memberId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 刪除「當前」公司的人員
export const API_RemoveCompanyMember = async (companyId, memberId) => {
  const path = `${Host}/api/company-members?companyId=${companyId}&memberId=${memberId}`;
  const requestOption = {
    method: "DELETE",
  };
  return await tryFetch(path, requestOption);
};

// 取得「指定」的公司詳細資料
export const API_GetCompanyDetail = async (companyId) => {
  const path = `${Host}/api/companies/${companyId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 更新「當下那一筆」公司資訊
export const API_UpdateCompany = async (body, companyId) => {
  const path = `${Host}/api/companies/${companyId}`;
  const requestOption = {
    method: "PUT",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 取得「當下那筆」公司的所有作品
export const API_GetPortfoliosByCompanyID = async (companyId) => {
  const path = `${Host}/api/portfolio/company?companyId=${companyId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得「當下點擊」的那一筆作品
export const API_GetPortfolioByID = async (portfolioId) => {
  const path = `${Host}/api/portfolio/${portfolioId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得所有作品
export const API_GetAllPortfolios = async () => {
  const path = `${Host}/api/portfolio`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 刪除「點擊的那一筆」作品
export const API_DeletePortfolio = async (portfolioId) => {
  const path = `${Host}/api/portfolio/${portfolioId}`;
  const requestOption = {
    method: "DELETE",
  };
  return await tryFetch(path, requestOption);
};

// 新增作品
export const API_CreatePortfolio = async (body) => {
  const path = `${Host}/api/portfolio`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 更新作品
export const API_UpdatePortfolio = async (body, portfolioId) => {
  const path = `${Host}/api/portfolio/${portfolioId}`;
  const requestOption = {
    method: "PUT",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 取得對應portfolioId的作品圖片
export const API_GetAttachmentByPortfolioId = async (portfolioId) => {
  const path = `${Host}/api/portfolio-attachment?portfolioId=${portfolioId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 新增「當前的portfolioId」作品圖片
export const API_AddAttachment = async (body, portfolioId) => {
  const path = `${Host}/api/portfolio-attachment?portfolioId=${portfolioId}`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 刪除「當前的portfolioId」作品圖片
// 用於每次打API_AddAttachment前，先刪除原先的圖片
// 再去新增新的圖片
export const API_DeletePortfolioAttachment = async (portfolioId) => {
  const path = `${Host}/api/portfolio-attachment/portfolio?portfolioId=${portfolioId}`;
  const requestOption = {
    method: "DELETE",
  };
  return await tryFetch(path, requestOption);
};

// 新增公司Logo
export const API_AddCompanyLogo = async (body, companyId) => {
  const path = `${Host}/api/companies/upload-logo?companyId=${companyId}`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 刪除公司Logo
// 用於每次打 API_AddCompanyLogo 前，先刪除原先的Logo
// 再去新增新的Logo
export const API_DeleteCompanyLogo = async (companyId) => {
  const path = `${Host}/api/companies/upload-logo?companyId=${companyId}`;
  const requestOption = {
    method: "DELETE",
  };
  return await tryFetch(path, requestOption);
};

// 新增預告片的預覽圖
export const API_UploadPortfolioTrailer = async (body, portfolioId) => {
  const path = `${Host}/api/portfolio/upload-trailer-image?portfolioId=${portfolioId}`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 刪除預告片的預覽圖
// 用於每次打API_UploadPortfolioTrailer前，先刪除原先的圖片
// 再去新增新的預覽圖
export const API_DeletePortfolioTrailer = async (portfolioId) => {
  const path = `${Host}/api/portfolio/upload-trailer-image?portfolioId=${portfolioId}`;
  const requestOption = {
    method: "DELETE",
  };
  return await tryFetch(path, requestOption);
};

// 印刷logo圖片上傳
export const API_UploadCompanyPrintLogo = async (body, companyId) => {
  const path = `${Host}/api/companies/upload-print-logo?companyId=${companyId}`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 刪除印刷logo圖片
export const API_DeleteCompanyPrintLogo = async (companyId) => {
  const path = `${Host}/api/companies/upload-print-logo?companyId=${companyId}`;
  const requestOption = {
    method: "DELETE",
  };
  return await tryFetch(path, requestOption);
};

// 印刷主視覺上傳
export const API_UploadCompanyPrintPoster = async (body, companyId) => {
  const path = `${Host}/api/companies/upload-print-poster?companyId=${companyId}`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 刪除印刷主視覺
export const API_DeleteCompanyPrintPoster = async (companyId) => {
  const path = `${Host}/api/companies/upload-print-poster?companyId=${companyId}`;
  const requestOption = {
    method: "DELETE",
  };
  return await tryFetch(path, requestOption);
};

// 取得所有活動 (沒有過濾過的)
export const API_GetAllActivities = async () => {
  const path = `${Host}/api/activities/get-all-activities`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
}

// ----------------------------- 展務前台 : PITCHING -----------------------------
// 取得Project (by MemberId)
export const API_GetProjectByMemberId = async (memberId) => {
  const path = `${Host}/api/project/get-project-by-memberId/${memberId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得要搜尋的那一筆 Project ID 的  Member
export const API_GetProjectMemberById = async (projectId) => {
  const path = `${Host}/api/project/get-project-member/${projectId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 修改 Project 的 owner
export const API_UpdateProjectReserverData = async (body) => {
  const path = `${Host}/api/project/update-project-reserve-data`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// ----------------------------- 展務後台 -----------------------------

// 後台登入 (login by admin)
export const API_LoginByAdmin = async (body) => {
  const path = `${Host}/api/auth/login/admin`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 取得所有 Role
export const API_GetAllRoles = async () => {
  const path = `${Host}/api/role`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得 Role By MemberId
export const API_GetRolesByMemberId = async (memberId) => {
  const path = `${Host}/api/member-role/members/${memberId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 新增帳號 （後台管理員可以直接新增帳號，不需要寄信開通）
export const API_AddMemberOnExhibitionBackend = async (body) => {
  const path = `${Host}/api/member`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 新增Roles (後台管理員可以直接對該memberId灌入Roles)
export const API_AddMemberRole = async (body) => {
  const path = `${Host}/api/member-role`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 取得展位號碼 (for Market)
// 展位號碼只有 exhibition-backend 可以編輯
export const API_GetMarketId = async () => {
  const path = `${Host}/api/exhibition-market`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得project資料 (by projectId)
export const API_GetProject = async (projectId) => {
  const path = `${Host}/api/project/${projectId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得所有Project資料
export const API_GetAllProjects = async () => {
  const path = `${Host}/api/project`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 更新project
export const API_UpdateProject = async (body, projectId) => {
  const path = `${Host}/api/project/${projectId}`;
  const requestOption = {
    method: "PUT",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 取得所有活動資料
export const API_GetActivities = async () => {
  const path = `${Host}/api/activities`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取得「當前id」的活動報名人員清單
export const API_GetRegistrationsByActivityId = async (activityId) => {
  const path = `${Host}/api/activity-registrations?activityId=${activityId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 取消 當前活動Id 的 memberId 的報名
export const API_AdminUnregisterFromActivity = async (activityId, memberId) => {
  const path = `${Host}/api/activity-registrations/admin-unregister?activityId=${activityId}&memberId=${memberId}`;
  const requestOption = {
    method: "DELETE",
  };
  return await tryFetch(path, requestOption);
};

// 取得 當前活動Id 的活動資料
export const API_GetActivityByActivityId = async (activityId) => {
  const path = `${Host}/api/activities/${activityId}`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// admin 直接幫 memberId 報名活動
export const API_AdminRegisterForActivity = async (activityId, memberId) => {
  const path = `${Host}/api/activity-registrations/admin-register?activityId=${activityId}&memberId=${memberId}`;
  const requestOption = {
    method: "POST",
  };
  return await tryFetch(path, requestOption);
};

// admin 直接幫 company 寄信給 member 開通帳號
export const API_SendActivationMailForCompanyByAdmin = async (body, companyId) => {
  const path = `${Host}/api/auth/admin/send-activation-mail/company?companyId=${companyId}`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// admin 直接幫 user 改密碼
export const API_ChangePasswordByAdmin = async (body, memberId) => {
  const path = `${Host}/api/auth/admin/change-password?memberId=${memberId}`;
  const requestOption = {
    method: "PUT",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// admin 直接幫 project 寄信給 member 開通帳號
export const API_SendActivationMailForProjectByAdmin = async (body, projectId) => {
  const path = `${Host}/api/auth/admin/send-activation-mail/project?projectId=${projectId}`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// admin 查詢「未開通」會員 list
export const API_GetNotActivatedMembers = async () => {
  const path = `${Host}/api/auth/get-not-activated-members`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// admin 一鍵寄信給「未開通」會員 開通信
export const API_SendMailToNotActivatedMembers = async (body) => {
  const path = `${Host}/api/auth/send-bulk-activation-mails`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// admin 後台新增 「未開通」 會員 （不含寄信，僅新增）
export const API_AddNotActivatedMember = async (body) => {
  const path = `${Host}/api/member/add-member-without-activation`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// Project 後台 刪除圖片
export const API_DeleteProjectKeyVisualByAdmin = async (projectId) => {
  const path = `${Host}/api/project/upload-key-visual?projectId=${projectId}`;
  const requestOption = {
    method: "DELETE",
  };
  return await tryFetch(path, requestOption);
};

// Project 後台 更新圖片
export const API_UploadProjectKeyVisualByAdmin = async (body, projectId) => {
  const path = `${Host}/api/project/upload-key-visual?projectId=${projectId}`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// Account 後台 查詢 總會員數
export const API_CountMembers = async () => {
  const path = `${Host}/api/member/count-members`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// ================== 展務後台會議預約 ==================
// 取得 該會員 的所有會議 (by admin)
export const API_GetMeetingCalendarByAdmin = async (body) => {
  const path = `${Host}/api/AdminMeeting/get-meeting-calendar`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 取得會議 該會員的 time limit (by admin)
export const API_GetMeetingTimeLimitByAdmin = async (body) => {
  const path = `${Host}/api/AdminMeeting/get-meeting-time-limit`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 取得所有entity (所有公司 / 所有專案)
export const API_GetEntityOverviewList = async () => {
  const path = `${Host}/api/MeetingDetails/get-entity-overview-list`;
  const requestOption = {
    method: "GET",
  };
  return await tryFetch(path, requestOption);
};

// 開通會議設定 (by admin)
export const API_SettingMeetingRuleByAdmin = async (body) => {
  const path = `${Host}/api/AdminMeeting/set-meeting-rule`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 查詢該 公司/專案 的 當日 可預約時間 (by admin)
// 打出去會得到時間表
export const API_SearchMemberAvailableTimeByAdmin = async (body) => {
  const path = `${Host}/api/AdminMeeting/search-member-available-time`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 運用上一支API取得的時間，接著打下一隻API，取得可以預約的人和地點
export const API_GetMemberAvailableLocationByAdmin = async (body) => {
  const path = `${Host}/api/AdminMeeting/get-member-available-location`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};

// 直接幫會員創建日曆上的會議 (by admin)
export const API_CreateCalendarEventByAdmin = async (body) => {
  const path = `${Host}/api/AdminMeeting/create-event`;
  const requestOption = {
    method: "POST",
    body: body,
  };
  return await tryFetch(path, requestOption);
};
