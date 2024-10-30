"use client";
import React, { useEffect, useState } from "react";
import styles from "./account-manege.module.scss";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";

// icons
import { GrEdit } from "react-icons/gr";            // 編輯
import { BiSearch } from "react-icons/bi";          // 搜尋
import { AiOutlineHome } from "react-icons/ai";     // 首頁
import { IoMdAdd } from "react-icons/io";           // 新增
import { MdOutgoingMail } from "react-icons/md";    // 寄送開通信

// components
import TableComponent from "../_components/Table/Table";
import Button from "@/(reservation)/exhibition/components/Button/Button";
import Dialog from "@/(reservation)/exhibition/components/Dialog/Dialog";
import InputComponent from "@/(reservation)/exhibition/components/Input/Input";
import NormalSelect from "@/(reservation)/exhibition/exhibitioninfo/components/NormalSelect";
import Loading from "@/(reservation)/exhibition/components/Loading/Loading";
import { BackendRadioBox } from "../_components/RadioBox/BackendRadioBox";

// api
import {
  API_GetAllMembers,
  API_GetAllRoles,
  API_AddMemberOnExhibitionBackend,
  API_AddMemberRole,
  API_GetNotActivatedMembers,
  API_SendMailToNotActivatedMembers,
  API_AddNotActivatedMember,
  API_AddExhibitPass,
  API_CountMembers
} from "@/api/api";

const headers = ["電子信箱", "Role"];

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./<>?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;':",./<>?]{8,16}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const AccountManagePages = () => {

  const Swal = require("sweetalert2");
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [data, setData] = useState([]);
  const [totalAccount, setTotalAccount] = useState({});
  const [inactiveData, setInactiveData] = useState([]);         // 未開通帳號 data
  const [selectedItems, setSelectedItems] = useState([]);       // 未開通帳號選取
  const [loading, setLoading] = useState(false);                // 寄信載入中 loading
  const [filteredData, setFilteredData] = useState([]);         // 已開通帳號搜尋後的 data
  const [filteredInactiveData, setFilteredInactiveData] = useState([]);  // 未開通帳號的搜尋data
  const [dialogOpen, setDialogOpen] = useState(false);                   // Dialog 開關 (新增帳號)
  const [openSendEmailDialog, setOpenSendEmailDialog] = useState(false); // 寄送開通信 Dialog 開關
  const [openInactiveDialog, setOpenInactiveDialog] = useState(false);   // 未開通帳號 Dialog 開關
  const [searchRole, setSearchRole] = useState("");             // 用戶角色搜尋
  const [searchEmail, setSearchEmail] = useState("");           // 電子信箱搜尋
  const [activeTab, setActiveTab] = useState("activeAccounts"); // Tab分類
  const [addNoActivateData, setAddNoActivateData] = useState({
    email: "",
    role: 0,
    hasExhibitPass: false
  })
  const [roleData, setRoleData] = useState([]);
  const [addMemberData, setAddMemberData] = useState({
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    hasExhibitPass: false,
  });

  // 取得所有會員數量
  const getMembersCount = async () => {
    try {
      const res = await API_CountMembers();
      console.log(res)
      if (res) {
        setTotalAccount({
          sumOfMembers: res.sumOfMembers || 0,
          sumOfActivitedMembers: res.sumOfActivitedMembers || 0,
          sumOfNotActivitedMembers: res.sumOfNotActivitedMembers || 0,
        });
      } else {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
    }
  };


  // 取得所有會員資料 (已開通)
  // 抓取 電子信箱 和 角色
  const getAllmembers = async () => {
    try {
      const res = await API_GetAllMembers();
      if (res && res.data) {
        const formattedData = res.data.map((member) => ({
          email: member.email || "",
          role: (member.roles || []).join(", "), // 將 roles 陣列轉換成逗號分隔的字串
          memberId: member.memberId,
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 取得所有未開通會員資料
  const getAllNotActivatedMembers = async () => {
    try {
      const res = await API_GetNotActivatedMembers();
      if (res && res.message) {
        const formattedData = res.message.map((item) => ({
          email: item
        }))
        setInactiveData(formattedData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 取得所有角色資料，用於新增帳號時的下拉選單
  // 抓取 roleId 和 roleName
  const getAllRoles = async () => {
    try {
      const res = await API_GetAllRoles();
      if (Array.isArray(res) && res.length > 0) {
        // 將返回的資料格式化為 { value, label } 結構
        const formattedRoles = res.map((role) => ({
          value: role.roleId,
          label: role.roleName,
        }));
        setRoleData(formattedRoles); // 更新角色資料到狀態中
      } else {
        console.log("未獲取到角色資料或資料為空");
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    getMembersCount();
    getAllmembers();
    getAllRoles();
    getAllNotActivatedMembers();
  }, []);

  // 寄信給未開通的會員（可複選）
  const sendMailToNotActivatedMembers = async () => {
    const data = {
      Emails: selectedItems
    };
    setLoading(true);
    try {
      // 這裡要對 data 進行 JSON.stringify
      const res = await API_SendMailToNotActivatedMembers(JSON.stringify(data));

      if (res && res.message && res.message.includes("已發送開通信件!")) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          text: "開通信已寄出",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          closeSendEmailDialog();
          getAllNotActivatedMembers();
        });
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          text: "開通信寄送失敗",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending mail:", error);
      Swal.fire({
        icon: "error",
        text: "系統錯誤，無法寄送開通信",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // 新增未開通帳號
  const addNotActivateMember = async () => {
    if (addNoActivateData.email.includes(" ") || !emailPattern.test(addNoActivateData.email)) {
      showError("請輸入有效的電子郵件地址，且不得包含空格");
      return;
    }

    const data = {
      email: addNoActivateData.email,
      roleId: addNoActivateData.role,
    };

    try {
      const res = await API_AddNotActivatedMember(JSON.stringify(data));

      if (res && res.message) {
        if (res.message.includes("Email already exists")) {
          Swal.fire({
            icon: "warning",
            text: "該信箱已存在",
            showConfirmButton: true,
          });
        } else if (res.message.includes("新增成功")) {
          getMembersCount();
          const exhibitPass = {
            memberId: res.data.memberId,
          };

          if (addNoActivateData.hasExhibitPass) {
            try {
              const exhibitRes = await API_AddExhibitPass(JSON.stringify(exhibitPass));

              if (exhibitRes && exhibitRes.message.includes("新增展證成功!")) {
                Swal.fire({
                  icon: "success",
                  text: "帳號及展證新增成功",
                  showConfirmButton: false,
                  timer: 2000,
                }).then(() => {
                  closeInactivesDialog();
                  setInactiveData((prevData) => [
                    ...prevData,
                    { email: addNoActivateData.email },
                  ]);
                  setFilteredInactiveData((prevData) => [
                    ...prevData,
                    { email: addNoActivateData.email },
                  ]);
                  setAddNoActivateData({
                    email: "",
                    role: 0,
                    hasExhibitPass: false,
                  });
                });
              } else {
                Swal.fire({
                  icon: "error",
                  text: "展證新增失敗",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            } catch (exhibitError) {
              console.error("Error adding exhibit pass:", exhibitError);
              Swal.fire({
                icon: "error",
                text: "展證新增失敗，請稍後再試",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          } else {
            Swal.fire({
              icon: "success",
              text: "帳號新增成功",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeInactivesDialog();
              setInactiveData((prevData) => [
                ...prevData,
                { email: addNoActivateData.email },
              ]);
              setFilteredInactiveData((prevData) => [
                ...prevData,
                { email: addNoActivateData.email },
              ]);
              setAddNoActivateData({
                email: "",
                role: 0,
                hasExhibitPass: false,
              });
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            text: "新增帳號失敗，請稍後再試",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    } catch (error) {
      console.error("Error adding not activated member:", error);
      Swal.fire({
        icon: "error",
        text: "系統錯誤，無法新增帳號",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // 關閉 Dialog
  const dialogClose = () => setDialogOpen(false);

  // 開啟 Dialog
  const openDialog = () => setDialogOpen(true);

  // 開啟 未開通帳號 Dialog
  const openInactivesDialog = () => setOpenInactiveDialog(true);

  // 關閉 未開通帳號 Dialog
  const closeInactivesDialog = () => setOpenInactiveDialog(false);

  // 開啟 寄送開通信的 Dialog
  const openSendEmail = () => {
    if (selectedItems.length === 0) {
      // 沒有選擇任何項目，跳出提醒
      Swal.fire({
        icon: "warning",
        title: "請先選擇要寄送開通信的帳號",
        showConfirmButton: true,
      });
      return;
    }

    // 有選擇項目，開啟 Dialog
    setOpenSendEmailDialog(true);
  };

  // 關閉 寄送開通信的 Dialog
  const closeSendEmailDialog = () => setOpenSendEmailDialog(false);

  // onchange事件 for input / select
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 判斷是否為 addNoActivateData 相關的欄位
    if (name.startsWith("addNoActivate_")) {
      const fieldName = name.replace("addNoActivate_", "");
      setAddNoActivateData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    } else {
      // 處理其他一般的欄位更新
      setAddMemberData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // showError Swal
  const showError = (message) => {
    Swal.fire({
      icon: "error",
      text: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // showWarning Swal
  const showWarning = (message) => {
    Swal.fire({
      icon: "warning",
      text: message,
      showConfirmButton: true,
    });
  };

  // showSuccess Swal
  const showSuccess = (message, callback) => {
    Swal.fire({
      icon: "success",
      text: message,
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      if (callback) callback();
    });
  };

  // 驗證新增帳號格式是否符合條件 (使用在handleAddMember)
  const validateAddMember = () => {
    if (addMemberData.email.includes(" ") || !emailPattern.test(addMemberData.email)) {
      showError("請輸入有效的電子郵件地址，且不得包含空格");
      return false;
    }

    if (!passwordPattern.test(addMemberData.password)) {
      showError("密碼必須是8到16個字元，包含大小寫字母和數字和一個特殊符號");
      return false;
    };

    if (addMemberData.password !== addMemberData.confirmPassword) {
      showError("輸入的密碼不一致");
      return false;
    };

    if (!addMemberData.role) {
      Swal.fire({
        icon: "warning",
        title: "請選擇參展角色",
        showConfirmButton: true,
      });
      return false;
    };

    return true;
  };

  // 新增會員角色(使用在handleAddMember)
  const addMemberRole = async (memberId) => {
    try {
      const roleData = {
        MemberId: memberId,
        RoleId: addMemberData.role
      }
      const addRoleRes = await API_AddMemberRole(JSON.stringify(roleData));
      if (addRoleRes && addRoleRes.memberId && addRoleRes.roleId) {
        return true;
      } else {
        showError("建立角色失敗");
        return false;
      }
    } catch (error) {
      showError("建立角色失敗");
      return false;
    }
  };

  // 新增展證(使用在handleAddMember)
  const addExhibitPass = async (memberId) => {
    try {
      const exhibitPassData = {
        memberId: memberId
      }
      const exhibitPassRes = await API_AddExhibitPass(JSON.stringify(exhibitPassData));
      if (exhibitPassRes && exhibitPassRes.message.includes("新增展證成功!")) {
        showSuccess("帳號、角色及展證新增成功", () => {
          dialogClose();
          getAllmembers();
          resetAddMemberForm();
        });
      } else {
        showError("展證新增失敗");
      }
    } catch (error) {
      showError("展證新增失敗");
    }
  };

  // 重置新增帳號（使用在handleAddMember）
  const resetAddMemberForm = () => {
    setAddMemberData({
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
      hasExhibitPass: false,
    });
  };

  // 新增帳號
  // 先打 API_AddMemberOnExhibitionBackend 新增帳號
  // 再打 API_AddMemberRole 新增該帳號的角色
  // 如果有要新增展證，打完新增帳號後再打 API_AddExhibitPass 新增展證
  const handleAddMember = async () => {
    if (!validateAddMember()) return;

    const data = {
      email: addMemberData.email,
      password: addMemberData.password,
    };

    try {
      const addMemberRes = await API_AddMemberOnExhibitionBackend(JSON.stringify(data));

      if (addMemberRes && addMemberRes.message && addMemberRes.message.includes("新增成功!")) {
        getMembersCount();
        // 新增角色
        const roleAddSuccess = await addMemberRole(addMemberRes.data.memberId);
        if (!roleAddSuccess) return;

        // 如果addMemberData.hasExhibitPass 為 true，新增展證
        if (addMemberData.hasExhibitPass) {
          await addExhibitPass(addMemberRes.data.memberId);
        }
        showSuccess("帳號及角色新增成功", () => {
          dialogClose();
          getAllmembers();
          resetAddMemberForm();
        });
      } else if (addMemberRes.message.includes("Email already exists")) {
        showWarning("該電子郵件已經註冊過");
      } else {
        showError("新增帳號失敗");
      }
    } catch (error) {
      showError("異常狀況，請稍後再試");
    }
  };

  // 搜尋功能
  // 以 email 和 role 進行搜尋
  const handleSearch = () => {
    if (activeTab === "activeAccounts") {
      const filtered = data.filter((member) => {
        const emailString = String(member.email || "").toLowerCase();
        const roleString = String(member.role || "").toLowerCase();
        return (
          emailString.includes(searchEmail.toLowerCase()) &&
          roleString.includes(searchRole.toLowerCase())
        );
      });

      setFilteredData(filtered);
    } else if (activeTab === "inactiveAccounts") {
      const filtered = inactiveData.filter((member) => {
        const emailString = String(member.email || "").toLowerCase();
        return emailString.includes(searchEmail.toLowerCase());
      });

      setFilteredInactiveData(filtered);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchRole, searchEmail, activeTab]);

  // table 按鈕
  const renderActions = (row) => (
    <div className={styles.marketWrapper__actionButtons}>
      <span
        className={styles.marketWrapper__actionIcon}
        onClick={() => handleEdit(row)}
      >
        <GrEdit />
      </span>
    </div>
  );

  const handleEdit = (row) => {
    router.push(
      `/${locale}/exhibition-backend/account-manege/edit/${row.memberId}`
    );
  };

  // checkbox 選取邏輯 (全選 / 單選)
  const handleCheckboxChange = (emails) => {
    if (Array.isArray(emails)) {
      const validEmails = emails.filter(email => email);
      setSelectedItems(validEmails);
    } else if (typeof emails === "string" && emails) {
      setSelectedItems((prevSelectedItems) => {
        const updatedItems = prevSelectedItems.includes(emails)
          ? prevSelectedItems.filter((email) => email !== emails)
          : [...prevSelectedItems, emails];

        return updatedItems;
      });
    } else {
      console.warn("Invalid email value:", emails);
    }
  };

  return (
    <div className="exhibitionBackend">
      <div className="exhibitionBackend__container">
        <div className="exhibitionBackend__contentWrapper">
          <h1 className="exhibitionBackend__contentWrapper__title">
            帳號管理
          </h1>

          {/* 搜尋框區域 */}
          <div className={styles.marketWrapper__searchWrapper}>
            {activeTab === "activeAccounts" && (
              <div className={styles.marketWrapper__searchInputContainer}>
                <BiSearch className={styles.marketWrapper__searchIcon} />
                <input
                  type="text"
                  value={searchRole}
                  onChange={(e) => setSearchRole(e.target.value)}
                  placeholder={
                    locale === "zh" ? "搜尋用戶角色" : "Search User Role"
                  }
                  className={styles.marketWrapper__searchInput}
                />
              </div>
            )}
            <div className={styles.marketWrapper__searchInputContainer}>
              <BiSearch className={styles.marketWrapper__searchIcon} />
              <input
                type="text"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder={locale === "zh" ? "搜尋電子郵件" : "Search Email"}
                className={styles.marketWrapper__searchInput}
              />
            </div>
          </div>

          {/* 標題區域 */}
          <div className={styles.marketWrapper__mainTitleBlock}>
            <div className={styles.marketWrapper__titleIcon}>
              <AiOutlineHome className={styles.marketWrapper__icon} />
              <h3>帳號清單</h3>
            </div>
            <div className={styles.marketWrapper__btnBlock}>
              {activeTab === "activeAccounts" && (
                <Button
                  text={"新增帳號"}
                  icon={<IoMdAdd />}
                  onClick={openDialog}
                />
              )}

              {activeTab === "inactiveAccounts" && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button
                    text={"寄送開通信"}
                    icon={<MdOutgoingMail />}
                    onClick={openSendEmail}
                  />

                  <Button
                    text={"新增未開通帳號"}
                    icon={<IoMdAdd />}
                    onClick={openInactivesDialog}
                  />
                </div>
              )}

            </div>
          </div>

          <div className={styles.marketWrapper__tabBlock}>
            <div className={styles.marketWrapper__tab}>
              <span
                className={`${styles.marketWrapper__tabBlockSpan} ${activeTab === "activeAccounts" ? styles.active : ""}`}
                onClick={() => setActiveTab("activeAccounts")}
              >
                所有帳號
              </span>
              <span
                className={`${styles.marketWrapper__tabBlockSpan} ${activeTab === "inactiveAccounts" ? styles.active : ""}`}
                onClick={() => setActiveTab("inactiveAccounts")}
              >
                未開通帳號
              </span>
            </div>

            <div className={styles.marketWrapper__totalAccount}>
              <span>總帳號數量：{totalAccount.sumOfMembers}</span>
              <span>已開通：{totalAccount.sumOfActivitedMembers}</span>
              <span>未開通：{totalAccount.sumOfNotActivitedMembers}</span>
            </div>

          </div>

          <div className={styles.marketWrapper}>
            {activeTab === "activeAccounts" && (
              <TableComponent
                headers={headers}
                data={filteredData}
                renderActions={renderActions}
              />
            )}

            {activeTab === "inactiveAccounts" && (
              <TableComponent
                headers={["電子信箱"]}
                data={filteredInactiveData}
                showCheckbox={true}
                selectedItems={selectedItems}
                onCheckboxChange={handleCheckboxChange}
              />
            )}

          </div>

          {/* 新增已開通帳號 */}
          <Dialog
            open={dialogOpen}
            title={"新增帳號"}
            buttonText1={"取消"}
            buttonText2={"確認"}
            onClose={dialogClose}
            onClick={handleAddMember}
          >
            <InputComponent
              type={"text"}
              label={"信箱"}
              name={"email"}
              value={addMemberData.email}
              placeholder={"請輸入信箱"}
              onChange={handleInputChange}
            />

            <NormalSelect
              label={"參展角色"}
              options={roleData}
              value={addMemberData.role}
              name={"role"}
              defaultText={"請選擇參展角色"}
              onChange={(e) => handleInputChange(e)}
            />

            <InputComponent
              type={"text"}
              label={"密碼"}
              name={"password"}
              value={addMemberData.password}
              placeholder={"請輸入密碼"}
              onChange={handleInputChange}
            />

            <InputComponent
              type={"text"}
              label={"確認密碼"}
              name={"confirmPassword"}
              value={addMemberData.confirmPassword}
              placeholder={"請再次輸入密碼"}
              onChange={handleInputChange}
            />

            <BackendRadioBox
              label={"是否持有展證"}
              options={[
                { value: true, label: "是" },
                { value: false, label: "否" },
              ]}
              value={addMemberData.hasExhibitPass}
              name={"addMember_hasExhibitPass"}
              onChange={(value) => {
                setAddMemberData((prevData) => ({ ...prevData, hasExhibitPass: value }));
              }}
            />
          </Dialog>

          {/* 新增未開通帳號 */}
          <Dialog
            open={openInactiveDialog}
            title={"新增未開通帳號"}
            buttonText1={"取消"}
            buttonText2={"確認"}
            onClose={closeInactivesDialog}
            onClick={addNotActivateMember}
          >
            <InputComponent
              type={"text"}
              label={"信箱"}
              name={"addNoActivate_email"}
              value={addNoActivateData.email}
              placeholder={"請輸入信箱"}
              onChange={handleInputChange}
            />

            <NormalSelect
              label={"參展角色"}
              options={roleData}
              value={addNoActivateData.role}
              name={"addNoActivate_role"}
              defaultText={"請選擇參展角色"}
              onChange={handleInputChange}
            />

            <BackendRadioBox
              label={"是否持有展證"}
              options={[
                { value: true, label: "是" },
                { value: false, label: "否" },
              ]}
              value={addNoActivateData.hasExhibitPass}
              name={"addNoActivate_hasExhibitPass"}
              onChange={(value) => {
                setAddNoActivateData({ ...addNoActivateData, hasExhibitPass: value });
              }}
            />

          </Dialog>

          <Dialog
            open={openSendEmailDialog}
            title={"寄送開通信"}
            buttonText1={"取消"}
            buttonText2={"確認"}
            onClose={closeSendEmailDialog}
            onClick={sendMailToNotActivatedMembers}
          >
            {loading && <Loading />}
            <div className={styles.marketWrapper__dialogContainer}>
              <p>以下電子郵件將收到開通信，請確認後點擊確認發送信件。</p>
              <ul>
                {selectedItems.map((email) => (
                  <li key={email}>{email}</li>
                ))}
              </ul>
            </div>
          </Dialog>

        </div>
      </div>
    </div>
  );
};

export default AccountManagePages;