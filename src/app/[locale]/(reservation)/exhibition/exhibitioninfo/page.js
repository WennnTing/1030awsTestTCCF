"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useUser } from "@/context/exhibition/UserContext";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

// components and utils
import Architecture from "./components/Architecture";
import CreateCompany from "./components/CreateCompany";
import ProjectInfo from "./components/ProjectInfo";
import Loading from "../components/Loading/Loading";
import Button from "../components/Button/Button";
import { isPopupShown, setPopupShown } from "@/utils/common";

// icons
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi";

const ExhibitionInfo = () => {
  const t = useTranslations("ExhibitionInfo");
  const { user, setUser } = useUser();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [showRemindDialog, setShowRemindDialog] = useState(false);
  const [isOwner, setIsOwner] = useState(false); // 是否為 owner 的狀態

  const allowedRolesForCreation = [
    "SuperAdministrator",
    "Administrator",
    "Buyer",
    "Speaker",
    "VIP",
    "Award Sponsor",
    "Professional",
    "Decision Maker",
    "Press"
  ];

  // 創建公司
  const handleCreateCompany = () => {
    if (user.companies.length === 0) {
      setShowCreateCompany(true);
    } else {
      Swal.fire({
        text:
          locale === "zh"
            ? "每個帳戶只能與一家公司相關聯"
            : "Each account can only be associated with one company.",
        icon: "warning",
      });
    }
  };

  const dialogClose = () => {
    setShowRemindDialog(false);
  };

  useEffect(() => {
    if (!isPopupShown()) {
      setShowRemindDialog(true);
      setPopupShown();
    }
  }, []);

  // 在 user 或其屬性變更時檢查 ownerId
  useEffect(() => {
    if (user && user.companies && user.companies.length > 0) {
      const ownerCompany = user.companies.find(
        (company) => String(company.ownerMemberId) === String(user.userId) // 確保類型一致的比較
      );
      setIsOwner(!!ownerCompany); // 更新是否為 owner 的狀態
    }
  }, [user, user.companies, user.userId]);

  // 判斷參展身份
  // 如果為 Market，且沒有公司，如果觸發創建公司按鈕，則顯示創建公司的表單
  // 如果沒有觸發，則顯示沒有參展資訊的提示
  // =========================================================
  // 如果為 Pitching，且沒有專案，則顯示沒有專案資訊的提示
  // 如果有專案，則顯示專案資訊
  // =========================================================
  // 如果都不符合以上兩種身份，則顯示沒有參展資訊的提示
  const renderContent = () => {
    // 條件：可以創建公司的人，且公司數量為 0
    if (
      allowedRolesForCreation.includes(user.roles[0]) &&
      user.companies.length === 0
    ) {
      if (showCreateCompany) {
        return (
          <div className="exhibitionpage__mainWrapper">
            <CreateCompany setIsLoading={setIsLoading} />
          </div>
        );
      } else {
        return (
          <div className="exhibitionpage__noCompany">
            <p>{t("noOhterProduct")}</p>
          </div>
        );
      }
    }

    // 條件：如果有包含在 allowedRolesForCreation 中的角色，且公司數量大於 0，或身份是 Market
    // 則顯示 Architecture
    if (
      (user.roles.some((role) => allowedRolesForCreation.includes(role)) &&
        user.companies.length > 0) ||
      user.roles.includes("Market")
    ) {
      return (
        <div className="exhibitionpage__mainWrapper">
          <Architecture setIsLoading={setIsLoading} />
        </div>
      );
    }

    // 條件：身份是 Pitching
    if (user && user.roles.includes("Pitching")) {
      if (user.projects && user.projects.projectId) {
        return (
          <div className="exhibitionpage__mainWrapper">
            <ProjectInfo setIsLoading={setIsLoading} />
          </div>
        );
      } else {
        return (
          <div className="exhibitionpage__noCompany">
            <p>{t("noOhterProduct")}</p>
          </div>
        );
      }
    }

    // 其他情況顯示「沒有參展資訊」
    return (
      <div className="exhibitionpage__noCompany">
        <p>{t("noOhterProduct")}</p>
      </div>
    );
  };

  return (
    <div className="exhibitionpage">
      {isLoading && <Loading />}
      <div className="exhibitionpage__container">
        <div className="exhibitionpage__contentWrapper">
          <div className="exhibitionpage__headerBlock">
            <h1 className="exhibitionpage__contentWrapper__innertitle">
              {t("title")}
            </h1>

            {allowedRolesForCreation.includes(user.roles[0]) &&
              user.companies.length === 0 && (
                <div className="exhibitionpage__headerButton">
                  <Button
                    text={locale === "zh" ? "創建公司" : "Create Company"}
                    icon={<MdOutlineCreateNewFolder />}
                    onClick={handleCreateCompany}
                  />
                </div>
              )}
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ExhibitionInfo;
