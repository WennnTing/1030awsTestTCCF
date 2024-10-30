"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../market-manege/market-manege.module.scss";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";
import Select from "react-select";

// icons
import { BiSearch } from "react-icons/bi";      // 搜尋
import { AiOutlineHome } from "react-icons/ai"; // 首頁
import { IoMdAdd } from "react-icons/io";       // 新增
import { GoTrash } from "react-icons/go";
import { BiCube } from "react-icons/bi";

// components
import TableComponent from "../../../_components/Table/Table";
import Button from "@/(reservation)/exhibition/components/Button/Button";
import Dialog from "@/(reservation)/exhibition/components/Dialog/Dialog";
import Loading from "@/(reservation)/exhibition/components/Loading/Loading";

// api
import {
  API_GetRegistrationsByActivityId,
  API_AdminUnregisterFromActivity,
  API_GetActivityByActivityId,
  API_GetAllMembers,
  API_AdminRegisterForActivity,
} from "@/api/api";

const headers = ["信箱", "報名時間", "報名狀態"];

const EditActivitiesPage = () => {
  const Swal = require("sweetalert2");
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const activityId = pathname.split("/").pop();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [emailQuery, setEmailQuery] = useState(""); // 搜尋框輸入值
  const [activityName, setActivityName] = useState(""); // 活動名稱
  const [memberData, setMemberData] = useState([]); // 會員資料
  const [isDialogOpen, setIsDialogOpen] = useState(false); // 控制彈窗開關
  const [selectedMembers, setSelectedMembers] = useState([]); // 選中的會員
  const [viewType, setViewType] = useState("已報名"); // 查看類型：已報名或已取消
  const [loading, setLoading] = useState(false);

  // 取得報名當前活動的所有報名人員資料
  const getRegistrations = async () => {
    try {
      const res = await API_GetRegistrationsByActivityId(activityId);
      if (res && res.data) {
        const formattedData = res.data.map((activities) => ({
          email: activities.email || "",
          registrationTime: activities.registrationTime || "",
          memberId: activities.memberId,
          status: activities.status === "accepted" ? "已報名" : "已取消",
        }));
        setData(formattedData);
        filterData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  // 取得所有會員資料
  const getAllMembers = async () => {
    try {
      const res = await API_GetAllMembers();
      if (res && res.data) {
        const memberOptions = res.data.map((member) => ({
          label: member.email,
          value: member.memberId,
        }));
        setMemberData(memberOptions);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    getRegistrations();
    getActivity(activityId);
    getAllMembers();
  }, [activityId]);

  // 搜尋功能
  const handleSearch = () => {
    const filtered = data.filter(
      (activities) =>
        activities.email.toLowerCase().includes(emailQuery.toLowerCase()) &&
        (viewType === "已報名"
          ? activities.status === "已報名"
          : activities.status === "已取消")
    );
    setFilteredData(filtered);
  };

  // 當搜尋框值改變時調用 handleSearch 進行篩選
  useEffect(() => {
    handleSearch();
  }, [emailQuery]);

  // 篩選報名人員資料依據tab選擇的類型
  const filterData = (allData) => {
    const filtered = allData.filter((activities) =>
      viewType === "已報名"
        ? activities.status === "已報名"
        : activities.status === "已取消"
    );
    setFilteredData(filtered);
  };

  // 監聽類型的變化
  useEffect(() => {
    filterData(data);
  }, [viewType, data]);

  // 取消報名按鈕
  const deleteRegistration = async (activityId, memberId) => {
    try {
      const result = await Swal.fire({
        title: "確定要取消該會員的報名嗎?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
      });

      if (result.isConfirmed) {
        setLoading(true);
        const res = await API_AdminUnregisterFromActivity(activityId, memberId); // 傳遞參數
        if (res && res.message && res.message.includes("Admin取消報名成功!")) {
          await getRegistrations();
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "報名已取消",
            showConfirmButton: false,
            timer: 2000,
          });
        }
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

  // 取得當前頁面的活動資訊
  const getActivity = async (activityId) => {
    try {
      const res = await API_GetActivityByActivityId(activityId);
      if (res && res.data) {
        setActivityName(res.data.activityName);
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  // 處理 select 的 funtion (多選)
  // 抓到選中的 member ID
  // 並更新選中的 member ID
  // 如果沒有選擇，則重置
  const handleSelectChange = (selected) => {
    if (selected) {
      const selectedIds = selected.map((s) => s.value);
      setSelectedMembers(selectedIds);
    } else {
      setSelectedMembers([]);
    }
  };

  // 提交新增報名邏輯
  const handleAddRegistration = async () => {
    try {
      if (selectedMembers.length === 0) {
        Swal.fire({
          icon: "error",
          title: "請選擇至少一個會員",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      setLoading(true);

      // 創建 Email mapping，用id來找到對應的email
      const memberIdToEmail = {};
      memberData.forEach((member) => {
        memberIdToEmail[member.value] = member.label;
      });

      const alreadyRegisteredEmails = [];

      // 處理 select 選到的所有memberId
      await Promise.all(
        selectedMembers.map(async (memberId) => {
          const response = await API_AdminRegisterForActivity(
            activityId,
            memberId
          );

          // 如果裡面有已經報名過的帳號，response會回覆該用戶已報名過此活動，無法重複報名
          if (response.message.includes("該用戶已報名過此活動，無法重複報名")) {
            // 抓到對應的email，並加入到「已報名過的」email陣列
            const email = memberIdToEmail[memberId] || memberId;
            alreadyRegisteredEmails.push(email);
          }
          // 如果註冊成功，不做額外處理
        })
      );

      setLoading(false);
      setIsDialogOpen(false);
      getRegistrations();
      setSelectedMembers([]);

      // 如果 alreadyRegisteredEmails 有值，代表有已經報名過的帳號，就會跳彈窗告知是哪一個帳號報名過了
      if (alreadyRegisteredEmails.length > 0) {
        const message = `以下帳號已經報名過此活動，無法重複報名：\n${alreadyRegisteredEmails.join(
          "\n"
        )}`;
        Swal.fire({
          icon: "info",
          title: "部分帳號已報名此活動",
          text: message,
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "報名成功",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error adding registration:", error);
      setLoading(false);
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

  // 渲染操作按鈕
  const renderActions = (row) => {
    if (row.status === "已報名") {
      return (
        <div className={styles.marketWrapper__actionButtons}>
          <span
            className={styles.marketWrapper__actionIcon}
            onClick={() => deleteRegistration(activityId, row.memberId)} // 把 activityId 和 memberId 傳入
          >
            <GoTrash />
          </span>
        </div>
      );
    }
    return null; // 當狀態是 '已取消' 時，不渲染垃圾桶按鈕
  };

  return (
    <div className="exhibitionBackend">
      {loading && <Loading />}
      <div className="exhibitionBackend__container">
        <div className="exhibitionBackend__contentWrapper">
          <h1 className="exhibitionBackend__contentWrapper__title">
            報名管理 / 活動報名清單
          </h1>

          {/* 搜尋框區域 */}
          <div className={styles.marketWrapper__searchWrapper}>
            <div className={styles.marketWrapper__searchInputContainer}>
              <BiSearch className={styles.marketWrapper__searchIcon} />
              <input
                type="text"
                value={emailQuery}
                onChange={(e) => setEmailQuery(e.target.value)}
                placeholder="搜尋信箱"
                className={styles.marketWrapper__searchInput}
              />
            </div>
          </div>

          {/* 標題區域 */}
          <div className={styles.marketWrapper__mainTitleBlock}>
            <div className={styles.marketWrapper__titleIcon}>
              <BiCube className={styles.marketWrapper__icon} />
              <h3>{activityName}</h3>
            </div>

          </div>

          <div className={styles.marketWrapper__buttonContainer}>
            <div className={styles.marketWrapper__tabBlock}>
              <span
                className={`${styles.marketWrapper__tabButton} 
                            ${viewType === "已報名" ? styles.active : ""}`}
                onClick={() => setViewType("已報名")}
              >
                查看已報名帳號
              </span>
              <span
                className={`${styles.marketWrapper__tabButton} 
                            ${viewType === "已取消" ? styles.active : ""}`}
                onClick={() => setViewType("已取消")}
              >
                查看取消報名帳號
              </span>
            </div>

            <div className={styles.marketWrapper__btnBlock}>
              <Button
                text={"新增報名"}
                icon={<IoMdAdd />}
                onClick={() => setIsDialogOpen(true)}
              />
            </div>
          </div>

          <div className={styles.marketWrapper}>
            <TableComponent
              headers={headers}
              data={filteredData}
              renderActions={renderActions}
            />
          </div>

          {/* 彈窗區域 */}
          <Dialog
            open={isDialogOpen}
            title={"新增報名"}
            buttonText1={"取消"}
            buttonText2={"確定"}
            onClick={handleAddRegistration}
            onClose={() => setIsDialogOpen(false)}
            isSelect={true}
          >
            <Select
              isMulti
              name="members"
              options={memberData}
              classNamePrefix="select"
              value={memberData.filter((member) =>
                selectedMembers.includes(member.value)
              )}
              onChange={handleSelectChange}
              placeholder="請選擇欲加入的會員"
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default EditActivitiesPage;
