// PITCHING 參展資訊 ( 專案頁面 )
"use client";
import React, { Fragment, useState, useEffect } from "react";
import styles from "./Architecture.module.scss";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

// components
import Button from "../../components/Button/Button";
import ImageLoader from "@/components/global/image-loader";
import InputComponent from "../../components/Input/Input";
import Dialog from "../../components/Dialog/Dialog";
import Loading from "../../components/Loading/Loading";
import SwitchToggle from "./SwitchToggle";

// context
import { useUser } from "@/context/exhibition/UserContext";

// icon
import { IoPeopleSharp } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { BiLayer } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
// api
import {
  API_SendActivationMailForProject,
  API_UpdateProjectReserverData,
} from "@/api/api";

const ProjectInfo = ({ setIsLoading }) => {
  const Swal = require("sweetalert2");
  const [inviteEmail, setInviteEmail] = useState(""); // 邀請信箱
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false); // 邀請Dialog是否打開
  const [selectedCompanyId, setSelectedCompanyId] = useState(""); // 選擇的專案ID
  const [loading, setLoading] = useState(false); // 是否正在加載(for invite dialog)
  const [isOwner, setIsOwner] = useState(false); // 是否為公司擁有者
  const [isownerDialogOpen, setIsOwnerDialogOpen] = useState(false); // 設定擁有者Dialog是否打開
  const { user, setUser } = useUser();
  const t = useTranslations("PitchingInfo");
  const btn = useTranslations("SwalButton");

  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const router = useRouter();
  const [initialFormData, setInitialFormData] = useState({});

  // 初始值為null，若project已有擁有者ID，則使用它
  const [selectedOwnerId, setSelectedOwnerId] = useState(
    user.projects.reserverMemberId || null
  );

  useEffect(() => {
    if (user && user.companies && user.companies.length > 0) {
      const initialData = {};
      user.companies.forEach((company) => {
        initialData[company.companyId] = { ...company };
      });
      setInitialFormData(initialData);
      // console.log("Initial form data:", initialData);
    }
  }, [user]);

  // 更新 input 的值
  const handleInputChange = (name, eventOrValue) => {
    let value;

    if (Array.isArray(eventOrValue)) {
      value = eventOrValue;
    } else if (eventOrValue.target) {
      value = eventOrValue.target.value;
    } else {
      value = eventOrValue;
    }

    setUser((prevUser) => {
      // 檢查並更新 project 的資料
      const updatedProject = {
        ...prevUser.projects, // 保留現有的 project 資料
        [name]: value, // 更新指定的屬性
      };

      return {
        ...prevUser,
        projects: updatedProject, // 更新單一 project 物件
      };
    });
  };

  // 打開邀請成員的dialog
  const dialogOpen = (companyId) => {
    setSelectedCompanyId(companyId); // 設定當前選擇的公司 ID
    console.log("Selected company:", companyId);
    setInviteDialogOpen(true);
  };

  // 關閉邀請成員的dialog
  const dialogClose = () => {
    setInviteEmail("");
    setInviteDialogOpen(false);
  };

  // 邀請成員
  // 只有 owner 可以打開dialog
  // 只有在ownerId === userId時，才能邀請成員
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

    // 信箱不能有空白符號
    if (/\s/.test(inviteEmail)) {
      Swal.fire({
        icon: "warning",
        title: locale === "zh" ? "信箱不得包含空白符號" : "Email must not contain spaces",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    };

    setLoading(true);
    console.log("Invite member:", selectedCompanyId);
    const data = {
      email: inviteEmail,
    };

    const res = await API_SendActivationMailForProject(
      JSON.stringify(data),
      selectedCompanyId
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

    if (res && res.message && res.message.includes("已發送開通信件!")) {
      dialogClose();
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
      console.log(res);
      Swal.fire({
        icon: "error",
        title:
          locale === "zh" ? "Email 已經存在" : "This email is already exists",
        timer: 2500,
        showConfirmButton: false,
      }).then(() => {
        setLoading(false);
      });
    } else {
      console.log(res);
    }
  };

  const ownerDialogOpen = () => {
    setIsOwnerDialogOpen(true);
  };

  const ownerDialogClose = () => {
    setIsOwnerDialogOpen(false);
  };

  const handleToggleChange = (memberId) => {
    // 更新本地狀態，不會立即觸發 API
    setSelectedOwnerId(memberId);
  };

  const handleSubmit = async () => {
    if (selectedOwnerId === null) {
      Swal.fire({
        icon: "warning",
        title:
          locale === "zh"
            ? "請選擇一位代表號"
            : "Please select a representative",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const data = {
        ProjectId: user.projects.projectId,
        ReserverMemberId: selectedOwnerId,
      };
      const response = await API_UpdateProjectReserverData(
        JSON.stringify(data)
      );
      console.log(response);

      if (response.message === "更新成功") {
        setUser((prevUser) => ({
          ...prevUser,
          projects: {
            ...prevUser.projects,
            reserverMemberId: selectedOwnerId,
          },
        }));
        Swal.fire({
          icon: "success",
          title: "更新成功",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          ownerDialogClose();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "更新失敗",
          text: response.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "異常狀況，請稍後再試",
        text: error.message,
      });
    }
  };

  if (!user || !user.projects || user.projects.length === 0) {
    return (
      <p>
        {locale === "zh"
          ? "暫無參展資料"
          : "No exhibition information available"}
      </p>
    );
  }

  const projects = user.projects;

  const handleRedirectToPreview = (id) => {
    router.push(`/${locale}/exhibition/preview/project/${id}`);
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        <div className={styles.architecture}>
          <div className={styles.architecture__header}>
            <h3>PITCHING</h3>
            <div className={styles.architecture__buttonBlock}>
              <Button
                text={locale === "zh" ? "設定代表號" : "Set Owner"}
                icon={<RiUserSettingsLine />}
                onClick={ownerDialogOpen}
              />
              {String(projects.creatorId) === String(user.userId) && (
                <Button
                  text={locale === "zh" ? "邀請成員" : "Invite"}
                  icon={<IoPeopleSharp />}
                  onClick={() => dialogOpen(projects.projectId)}
                />
              )}
            </div>
          </div>

          <div className={styles.architecture__inputBlock}>
            {/* 桌號 */}
            <InputComponent
              type="text"
              label={t("label_1")}
              name="location"
              value={projects.location}
              onChange={(e) =>
                handleInputChange(
                  e.target.name,
                  e.target.value
                )
              }
              disabled={true}
            />

            {/* 展證張數 */}
            <InputComponent
              type="text"
              label={t("label_2")}
              name="passCount"
              value={projects.passCount}
              onChange={(e) =>
                handleInputChange(
                  e.target.name,
                  e.target.value
                )
              }
              disabled={true}
            />

            {/* Project Name */}
            <InputComponent
              type="text"
              label={t("label_3")}
              name="projectTitleEn"
              value={projects.projectTitleEn}
              onChange={(e) =>
                handleInputChange(
                  e.target.name,
                  e.target.value
                )
              }
              disabled={true}
            />

            {/* 提案名稱 */}
            <InputComponent
              type="text"
              label={t("label_4")}
              name="projectTitle"
              value={projects.projectTitle}
              onChange={(e) =>
                handleInputChange(
                  e.target.name,
                  e.target.value
                )
              }
              disabled={true}
            />
          </div>

          <div className={styles.architecture__structure}>
            <div className={styles.architecture__structureheader}>
              <span>{t("label_5")}</span> {/* 成員標題 */}
              <div className={styles.architecture__memberAdminBlock}>
                <span>{t("label_13")}</span> {/* 管理員標題 */}
                <span>{t("label_6")}</span> {/* 展證標題 */}
              </div>
            </div>
            <div>
              {user.projectMembers[user.projects.projectId]?.map(
                (member, index) => {
                  const isMemberCreator =
                    String(member.memberId) === String(user.projects.creatorId);

                  return (
                    <div
                      key={index}
                      className={styles.architecture__accordionContainer}
                      style={{
                        backgroundColor: isMemberCreator
                          ? "#DEE1E6"
                          : "#F3F4F6",
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

                      {/* 管理員部分 */}
                      <div className={styles.architecture__selectBlock}>
                        {isMemberCreator ? (
                          <span className={styles.architecture__iconBlock}>
                            <FaRegCheckCircle
                              className={styles.architecture__manegerIcon}
                            />
                          </span>
                        ) : (
                          <span></span>
                        )}

                        {/* 展證選擇部分 */}
                        <select
                          name="certificate"
                          value={String(member.exhibitPass)}
                          onChange={(e) =>
                            handleInputChange(
                              e.target.name,
                              e.target.value
                            )
                          }
                          disabled={true}
                        >
                          <option value="true">{t("label_7")}</option>
                          <option value="false">{t("label_8")}</option>
                        </select>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className={styles.architecture__buttonWrapper}>
          <Button
            text={t("label_12")}
            icon={<BiLayer />}
            onClick={() => handleRedirectToPreview(projects.projectId)}
          />
        </div>
      </div>

      <Dialog
        open={inviteDialogOpen}
        title={t("label_9")}
        buttonText1={btn("cancel")}
        buttonText2={btn("submit")}
        onClose={dialogClose}
        onClick={inviteMember}
      >
        {loading && <Loading />}

        <InputComponent
          type={"text"}
          label={t("label_10")}
          name={"inviteEmail"}
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder={"Email"}
        />
      </Dialog>

      <Dialog
        open={isownerDialogOpen}
        title={t("label_11")}
        buttonText1={btn("cancel")}
        buttonText2={btn("submit")}
        onClick={handleSubmit}
        onClose={ownerDialogClose}
      >
        {user.projectMembers &&
          user.projectMembers[user.projects.projectId]?.map((member) => {
            const isOwner = selectedOwnerId === member.memberId; // 選中的ownerId
            return (
              <div
                key={member.memberId}
                className={styles.memberRow}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>{member.email}</p>
                <SwitchToggle
                  checked={isOwner}
                  onChange={() => handleToggleChange(member.memberId)}
                />
              </div>
            );
          })}
      </Dialog>
    </div>
  );
};

export default ProjectInfo;
