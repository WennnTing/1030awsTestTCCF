"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken } from "@/utils/common";
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";

// 創建 Context
const AuthContext = createContext();

// 創建提供者組件
const ExhibitionBackendProvider = ({ children }) => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [authToken, setAuthToken] = useState(null);
  const [isLogin, setIsLogin] = useState(getAuthToken().token);
  const router = useRouter();

  useEffect(() => {
    // 如果沒有 token 或者 token 已過期，重定向到登入頁面
    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: "請重新登入",
      }).then(() => {
        router.push(`/${locale}/exhibition`);
      });
    }
  }, [isLogin]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定義 Hook 方便使用 Context
const useExhibitionBackend = () => {
  return useContext(AuthContext);
};

export { ExhibitionBackendProvider, useExhibitionBackend };
