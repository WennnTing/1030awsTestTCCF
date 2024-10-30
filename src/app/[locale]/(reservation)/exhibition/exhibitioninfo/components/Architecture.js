// Market 參展資訊 ( 公司資訊頁面 )
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
import MultipleSelect from "./MultipleSelect";
import NormalSelect from "./NormalSelect";
import Dialog from "../../components/Dialog/Dialog";
import Loading from "../../components/Loading/Loading";

// context
import { useUser } from "@/context/exhibition/UserContext";

// icon
import { FaRegSave } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoPeopleSharp } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

// api
import {
  API_UpdateCompany,
  API_AddCompanyLogo,
  API_DeleteCompanyLogo,
  API_UploadCompanyPrintLogo,
  API_DeleteCompanyPrintLogo,
  API_UploadCompanyPrintPoster,
  API_DeleteCompanyPrintPoster,
  API_SendActivationMailForCompany,
} from "@/api/api";

const Architecture = ({ setIsLoading }) => {
  const Swal = require("sweetalert2");
  const [companyLogoForPrinting, setCompanyLogoForPrinting] = useState(""); // 印刷用公司logo
  const [posterForPrinting, setPosterForPrinting] = useState(""); // 印刷用參展作品海報或直式視覺
  const [inviteEmail, setInviteEmail] = useState(""); // 邀請信箱
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false); // 邀請Dialog是否打開
  const [selectedCompanyId, setSelectedCompanyId] = useState(""); // 選擇的公司ID
  const [loading, setLoading] = useState(false); // 是否正在加載(for invite dialog)
  const [isOwner, setIsOwner] = useState(false); // 是否為公司擁有者
  const { user, setUser } = useUser();
  const t = useTranslations("ExhibitionInfo");
  const btn = useTranslations("SwalButton");

  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const router = useRouter();
  const [initialFormData, setInitialFormData] = useState({});

  // 檢查上傳狀態
  const [uploadStatus, setUploadStatus] = useState({
    companyLogoForPrinting: false,
    posterForPrinting: false,
    logo: false,
  });

  // 字數計算
  const [charCount, setCharCount] = useState({
    companyNameEn: 0,
    companyNameZh: 0,
  });

  const maxCompanyNameEnLength = 34;
  const maxCompanyNameZhLength = 40;

  // error 紅框
  const [showError, setShowError] = useState({
    companyNameEn: false,
    companyProfileEn: false,
    contactPersonNameEn: false,
    contactPersonEmail: false,
    industry: false,
    registrationCountryId: false,
  });

  useEffect(() => {
    if (user && user.companies && user.companies.length > 0) {
      const initialCharCount = {};
      user.companies.forEach((company) => {
        initialCharCount[company.companyId] = {
          companyNameEn: calculateCharacterLength(company.companyNameEn || ""),
          companyNameZh: calculateCharacterLength(company.companyNameZh || ""),
        };
      });
      setCharCount(initialCharCount);
    }
  }, [user]);

  // 計算全形和半形字符的長度
  const calculateCharacterLength = (str) => {
    let length = 0;
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      // 判斷字元是否為全形，Unicode 編碼超過 255 即視為全形字元
      if (charCode > 255) {
        length += 2;
      } else {
        length += 1;
      }
    }
    return length;
  };

  // 公司行業別
  const NatureofBusiness = [
    {
      value: 0,
      label: "None | 無",
    },
    {
      value: 1,
      label: "Television Stations and Channels ｜ 電視台與頻道",
    },
    {
      value: 2,
      label: "New Media & Digital Entertainment ｜ 新媒體數位影音",
    },
    {
      value: 3,
      label: "Production and Distribution ｜ 製作發行",
    },
    {
      value: 4,
      label: "Animation Companies ｜ 動畫業者",
    },
    {
      value: 5,
      label:
        "Publishing (including digital publishing and copyright agencies) ｜ 出版（含數位出版及版權經紀）",
    },
    {
      value: 6,
      label: "Performance Arts ｜ 表演藝術",
    },
    {
      value: 7,
      label:
        "Innovative Technology and Post-production Special Effects Companies ｜ 創新技術與後製特效公司",
    },
    {
      value: 8,
      label: "Government Organizations or Institutions ｜ 政府組織或機構",
    },
  ];

  // 市場展五大區
  const zone = [
    {
      label: "Copyright Transaction Zone ｜ 版權交易區",
      value: 0,
    },
    {
      label: "Production Resource Zone ｜ 協拍資源區",
      value: 1,
    },
    {
      label: "IP Adaptations ｜ IP 轉影視",
      value: 2,
    },
    {
      label: "Visual Technologies Zone ｜ 影像技術區",
      value: 3,
    },
    {
      label: "National Pavilions ｜ 國家館",
      value: 4,
    },
    {
      label: "Others ｜ 其他",
      value: 5,
    },
  ];

  // 參展目標
  const participantTarget = [
    {
      label: "Financing｜籌募資金",
      value: 0,
    },
    {
      label: "Copyright Transactions｜版權交易",
      value: 1,
    },
    {
      label: "Co-Production｜聯合監製",
      value: 2,
    },
    {
      label: "International Distribution｜國際發行",
      value: 3,
    },
    {
      label: "Festival Screening｜影展放映",
      value: 4,
    },
    {
      label: "Business Development｜開拓業務市場",
      value: 5,
    },
    {
      label:
        "Insight into Market Trends & Industry Landscapes｜瞭解市場及產業動態",
      value: 6,
    },
    {
      label: "Promote Our Services｜機構服務內容推廣",
      value: 7,
    },
    {
      label: "Others｜其他",
      value: 8,
    },
  ];

  // 國別
  const country = [
    { label: "Taiwan｜台灣", value: 0 },
    { label: "Japan｜日本", value: 1 },
    { label: "China｜中國", value: 2 },
    { label: "South Korea｜南韓", value: 3 },
    { label: "North Korea｜北韓", value: 4 },
    { label: "India｜印度", value: 5 },
    { label: "Singapore｜新加坡", value: 6 },
    { label: "Malaysia｜馬來西亞", value: 7 },
    { label: "Thailand｜泰國", value: 8 },
    { label: "Philippines｜菲律賓", value: 9 },
    { label: "Vietnam｜越南", value: 10 },
    { label: "Indonesia｜印尼", value: 11 },
    { label: "Myanmar｜緬甸", value: 12 },
    { label: "Sri Lanka｜斯里蘭卡", value: 13 },
    { label: "Pakistan｜巴基斯坦", value: 14 },
    { label: "Bangladesh｜孟加拉", value: 15 },
    { label: "Nepal｜尼泊爾", value: 16 },
    { label: "Bhutan｜不丹", value: 17 },
    { label: "Maldives｜馬爾地夫", value: 18 },
    { label: "Brunei｜汶萊", value: 19 },
    { label: "Laos｜寮國", value: 20 },
    { label: "Cambodia｜柬埔寨", value: 21 },
    { label: "Mongolia｜蒙古", value: 22 },
    { label: "Timor-Leste｜東帝汶", value: 23 },
    { label: "Kazakhstan｜哈薩克斯坦", value: 24 },
    { label: "Uzbekistan｜烏茲別克斯坦", value: 25 },
    { label: "Turkmenistan｜土庫曼斯坦", value: 26 },
    { label: "Kyrgyzstan｜吉爾吉斯斯坦", value: 27 },
    { label: "Tajikistan｜塔吉克斯坦", value: 28 },
    { label: "Afghanistan｜阿富汗", value: 29 },
    { label: "Iran｜伊朗", value: 30 },
    { label: "Iraq｜伊拉克", value: 31 },
    { label: "Syria｜敘利亞", value: 32 },
    { label: "Lebanon｜黎巴嫩", value: 33 },
    { label: "Israel｜以色列", value: 34 },
    { label: "Jordan｜約旦", value: 35 },
    { label: "Palestine｜巴勒斯坦", value: 36 },
    { label: "Saudi Arabia｜沙烏地阿拉伯", value: 37 },
    { label: "Yemen｜葉門", value: 38 },
    { label: "Oman｜阿曼", value: 39 },
    { label: "United Arab Emirates｜阿拉伯聯合大公國", value: 40 },
    { label: "Qatar｜卡達", value: 41 },
    { label: "Bahrain｜巴林", value: 42 },
    { label: "Kuwait｜科威特", value: 43 },
    { label: "Armenia｜亞美尼亞", value: 44 },
    { label: "Azerbaijan｜亞塞拜然", value: 45 },
    { label: "Georgia｜喬治亞", value: 46 },
    { label: "United Kingdom｜英國", value: 47 },
    { label: "France｜法國", value: 48 },
    { label: "Germany｜德國", value: 49 },
    { label: "Italy｜意大利", value: 50 },
    { label: "Spain｜西班牙", value: 51 },
    { label: "Portugal｜葡萄牙", value: 52 },
    { label: "Netherlands｜荷蘭", value: 53 },
    { label: "Belgium｜比利時", value: 54 },
    { label: "Switzerland｜瑞士", value: 55 },
    { label: "Austria｜奧地利", value: 56 },
    { label: "Sweden｜瑞典", value: 57 },
    { label: "Norway｜挪威", value: 58 },
    { label: "Denmark｜丹麥", value: 59 },
    { label: "Finland｜芬蘭", value: 60 },
    { label: "Ireland｜愛爾蘭", value: 61 },
    { label: "Iceland｜冰島", value: 62 },
    { label: "Greece｜希臘", value: 63 },
    { label: "Turkey｜土耳其", value: 64 },
    { label: "Russia｜俄羅斯", value: 65 },
    { label: "Ukraine｜烏克蘭", value: 66 },
    { label: "Poland｜波蘭", value: 67 },
    { label: "Czech Republic｜捷克", value: 68 },
    { label: "Slovakia｜斯洛伐克", value: 69 },
    { label: "Hungary｜匈牙利", value: 70 },
    { label: "Romania｜羅馬尼亞", value: 71 },
    { label: "Bulgaria｜保加利亞", value: 72 },
    { label: "Croatia｜克羅地亞", value: 73 },
    { label: "Slovenia｜斯洛文尼亞", value: 74 },
    { label: "Serbia｜塞爾維亞", value: 75 },
    { label: "Bosnia and Herzegovina｜波斯尼亞和黑塞哥維那", value: 76 },
    { label: "Montenegro｜黑山", value: 77 },
    { label: "North Macedonia｜北馬其頓", value: 78 },
    { label: "Albania｜阿爾巴尼亞", value: 79 },
    { label: "Kosovo｜科索沃", value: 80 },
    { label: "Lithuania｜立陶宛", value: 81 },
    { label: "Latvia｜拉脫維亞", value: 82 },
    { label: "Estonia｜愛沙尼亞", value: 83 },
    { label: "Belarus｜白俄羅斯", value: 84 },
    { label: "Moldova｜摩爾多瓦", value: 85 },
    { label: "Andorra｜安道爾", value: 86 },
    { label: "Monaco｜摩納哥", value: 87 },
    { label: "San Marino｜聖馬利諾", value: 88 },
    { label: "Vatican City｜梵蒂岡", value: 89 },
    { label: "Liechtenstein｜列支敦士登", value: 90 },
    { label: "Malta｜Malta", value: 91 },
    { label: "Luxembourg｜盧森堡", value: 92 },
    { label: "Cyprus｜Cyprus", value: 93 },
    { label: "United States｜美國", value: 94 },
    { label: "Canada｜加拿大", value: 95 },
    { label: "Mexico｜墨西哥", value: 96 },
    { label: "Guatemala｜瓜地馬拉", value: 97 },
    { label: "Belize｜貝里斯", value: 98 },
    { label: "Honduras｜洪都拉斯", value: 99 },
    { label: "El Salvador｜薩爾瓦多", value: 100 },
    { label: "Nicaragua｜尼加拉瓜", value: 101 },
    { label: "Costa Rica｜哥斯達黎加", value: 102 },
    { label: "Panama｜巴拿馬", value: 103 },
    { label: "Bahamas｜巴哈馬", value: 104 },
    { label: "Cuba｜古巴", value: 105 },
    { label: "Jamaica｜牙買加", value: 106 },
    { label: "Haiti｜海地", value: 107 },
    { label: "Dominican Republic｜多明尼加共和國", value: 108 },
    { label: "Barbados｜巴巴多斯", value: 109 },
    { label: "Saint Lucia｜聖露西亞", value: 110 },
    { label: "Saint Vincent and the Grenadines｜聖文森及格瑞那丁", value: 111 },
    { label: "Grenada｜格瑞那達", value: 112 },
    { label: "Trinidad and Tobago｜千里達及托巴哥", value: 113 },
    { label: "Antigua and Barbuda｜安提瓜及巴布達", value: 114 },
    { label: "Saint Kitts and Nevis｜聖克里斯多福及尼維斯", value: 115 },
    { label: "Brazil｜巴西", value: 116 },
    { label: "Argentina｜阿根廷", value: 117 },
    { label: "Chile｜智利", value: 118 },
    { label: "Peru｜秘魯", value: 119 },
    { label: "Colombia｜哥倫比亞", value: 120 },
    { label: "Venezuela｜委內瑞拉", value: 121 },
    { label: "Ecuador｜厄瓜多", value: 122 },
    { label: "Bolivia｜玻利維亞", value: 123 },
    { label: "Paraguay｜巴拉圭", value: 124 },
    { label: "Uruguay｜烏拉圭", value: 125 },
    { label: "Guyana｜圭亞那", value: 126 },
    { label: "Suriname｜蘇利南", value: 127 },
    { label: "South Africa｜南非", value: 128 },
    { label: "Nigeria｜奈及利亞", value: 129 },
    { label: "Egypt｜埃及", value: 130 },
    { label: "Kenya｜肯亞", value: 131 },
    { label: "Ethiopia｜衣索比亞", value: 132 },
    { label: "Sudan｜蘇丹", value: 133 },
    { label: "Uganda｜烏干達", value: 134 },
    { label: "Ghana｜迦納", value: 135 },
    { label: "Morocco｜摩洛哥", value: 136 },
    { label: "Algeria｜阿爾及利亞", value: 137 },
    { label: "Tunisia｜突尼西亞", value: 138 },
    { label: "Libya｜利比亞", value: 139 },
    { label: "Angola｜安哥拉", value: 140 },
    { label: "Mozambique｜莫三比克", value: 141 },
    { label: "Zambia｜尚比亞", value: 142 },
    { label: "Zimbabwe｜辛巴威", value: 143 },
    { label: "Botswana｜波札那", value: 144 },
    { label: "Namibia｜納米比亞", value: 145 },
    { label: "Rwanda｜盧旺達", value: 146 },
    { label: "Burundi｜Burundi", value: 147 },
    { label: "Tanzania｜坦尚尼亞", value: 148 },
    { label: "Madagascar｜馬達加斯加", value: 149 },
    { label: "Somalia｜索馬利亞", value: 150 },
    { label: "Eritrea｜厄立特里亞", value: 151 },
    { label: "Djibouti｜吉布地", value: 152 },
    { label: "Senegal｜塞內加爾", value: 153 },
    { label: "Mali｜馬利", value: 154 },
    { label: "Niger｜尼日", value: 155 },
    { label: "Chad｜查德", value: 156 },
    { label: "Burkina Faso｜布基納法索", value: 157 },
    { label: "Ivory Coast｜象牙海岸", value: 158 },
    { label: "Liberia｜賴比瑞亞", value: 159 },
    { label: "Sierra Leone｜獅子山", value: 160 },
    { label: "Guinea｜幾內亞", value: 161 },
    { label: "Guinea-Bissau｜幾內亞比索", value: 162 },
    { label: "Togo｜多哥", value: 163 },
    { label: "Benin｜貝南", value: 164 },
    { label: "Mauritania｜茅利塔尼亞", value: 165 },
    { label: "Cape Verde｜維德角", value: 166 },
    { label: "Sao Tome and Principe｜聖多美普林西比", value: 167 },
    { label: "Equatorial Guinea｜赤道幾內亞", value: 168 },
    { label: "Gabon｜加彭", value: 169 },
    { label: "Congo｜剛果", value: 170 },
    { label: "Democratic Republic of the Congo｜剛果民主共和國", value: 171 },
    { label: "Central African Republic｜中非共和國", value: 172 },
    { label: "Cameroon｜喀麥隆", value: 173 },
    { label: "Swaziland｜史瓦濟蘭", value: 174 },
    { label: "Lesotho｜賴索托", value: 175 },
    { label: "Malawi｜馬拉威", value: 176 },
    { label: "Comoros｜葛摩", value: 177 },
    { label: "Seychelles｜塞席爾", value: 178 },
    { label: "Mauritius｜模里西斯", value: 179 },
    { label: "South Sudan｜南蘇丹", value: 180 },
    { label: "Australia｜澳大利亞", value: 181 },
    { label: "New Zealand｜新西蘭", value: 182 },
    { label: "Papua New Guinea｜巴布亞紐幾內亞", value: 183 },
    { label: "Fiji｜斐濟", value: 184 },
    { label: "Solomon Islands｜所羅門群島", value: 185 },
    { label: "Vanuatu｜瓦努阿圖", value: 186 },
    { label: "Samoa｜薩摩亞", value: 187 },
    { label: "Tonga｜湯加", value: 188 },
    { label: "Kiribati｜基里巴斯", value: 189 },
    { label: "Tuvalu｜吐瓦魯", value: 190 },
    { label: "Nauru｜諾魯", value: 191 },
    { label: "Palau｜帛琉", value: 192 },
    { label: "Micronesia｜密克羅尼西亞", value: 193 },
    { label: "Marshall Islands｜馬紹爾群島", value: 194 },
    { label: "Saudi Arabia｜沙烏地阿拉伯", value: 195 },
    { label: "United Arab Emirates｜阿拉伯聯合大公國", value: 196 },
    { label: "Qatar｜卡達", value: 197 },
    { label: "Bahrain｜巴林", value: 198 },
    { label: "Kuwait｜科威特", value: 199 },
    { label: "Oman｜阿曼", value: 200 },
    { label: "Yemen｜也門", value: 201 },
    { label: "Jordan｜約旦", value: 202 },
    { label: "Lebanon｜黎巴嫩", value: 203 },
    { label: "Syria｜敘利亞", value: 204 },
    { label: "Iraq｜伊拉克", value: 205 },
    { label: "Iran｜伊朗", value: 206 },
    { label: "Israel｜以色列", value: 207 },
    { label: "Palestine｜巴勒斯坦", value: 208 },
  ];

  // 前往作品
  const goProject = (companyId) => {
    router.push(`/${locale}/exhibition/exhibitioninfo/${companyId}`);
  };

  // 更新 input 的值
  const handleInputChange = (companyId, name, eventOrValue) => {
    let value;

    if (Array.isArray(eventOrValue)) {
      value = eventOrValue;
    } else if (eventOrValue.target) {
      value = eventOrValue.target.value;
    } else {
      value = eventOrValue;
    }
    // 處理字數限制
    // 更新字數計算
    if (name === "companyNameEn" || name === "companyNameZh") {
      setCharCount((prev) => ({
        ...prev,
        [companyId]: {
          ...prev[companyId],
          [name]: calculateCharacterLength(value),
        },
      }));
    }

    // 處理 companyLogoForPrinting 和 posterForPrinting
    if (name === "companyLogoForPrinting") {
      setCompanyLogoForPrinting(value);
      return; // 返回，避免影響原有的邏輯
    }

    if (name === "posterForPrinting") {
      setPosterForPrinting(value);
      return; // 返回，避免影響原有的邏輯
    }

    // 只允許數字和 + - 符號的正則表達式
    if (name === "companyPhone" || name === "contactPersonPhone") {
      const phoneRegex = /^[\d+\-\s#]*$/; // 允許數字、+、-、# 和空格
      if (!phoneRegex.test(value)) {
        return; // 如果輸入不符合規則，則不進行更新
      }
    }

    // 英文正規表達式，允許逗號和空格
    const regex = /^[a-zA-Z, ]*$/;

    // 如果是 contactPersonNameEn，則檢查是否符合正規表達式
    if (name === "contactPersonNameEn") {
      if (regex.test(value)) {
        const parts = value.split(",");

        if (parts.length > 0) {
          // 處理逗號前的部分：首字母大寫，其他保持原樣
          parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        }

        if (parts.length > 1) {
          // 處理逗號後的部分：所有字母大寫
          parts[1] = parts[1].toUpperCase();
        }

        value = parts.join(",");
      } else {
        return;
      }
    }

    setUser((prevUser) => {
      const updatedCompanies = prevUser.companies.map((company) => {
        if (company.companyId === companyId) {
          return { ...company, [name]: value }; // 更新對應的公司資料
        }
        return company; // 不變的公司資料
      });

      return {
        ...prevUser,
        companies: updatedCompanies,
      };
    });
  };

  // 檢查必填欄位有無填寫
  const validateFields = (company) => {
    const requiredFields = [
      { field: "registrationCountryId", label: t("labelTitle.label_1") },
      { field: "participationGoals", label: t("labelTitle.label_2") },
      { field: "companyProfileEn", label: t("labelTitle.label_3") },
      { field: "contactPersonNameEn", label: t("labelTitle.label_4") },
      { field: "contactPersonEmail", label: t("labelTitle.label_5") },
      { field: "companyCategory", label: t("labelTitle.label_6") },
      { field: "companyNameEn", label: "Company Name" },
    ];

    let isValid = true;
    const newErrors = { ...showError };

    requiredFields.forEach(({ field, label }) => {
      const value = company[field];

      if (value === undefined || value === null || value === "") {
        newErrors[field] = true;
        isValid = false;
        Swal.fire({
          icon: "error",
          title: t("swalError.title"),
          text: `${label} ${t("swalError.label_1")}`,
          showConfirmButton: true,
        });
      } else if (
        field === "participationGoals" &&
        Array.isArray(value) &&
        value.length === 0
      ) {
        newErrors[field] = true;
        isValid = false;
        Swal.fire({
          icon: "error",
          title: t("swalError.title"),
          text: `${label} ${t("swalError.label_1")}`,
          showConfirmButton: true,
        });
      } else {
        newErrors[field] = false; // 清除錯誤狀態
      }
    });

    setShowError(newErrors); // 更新錯誤狀態

    return isValid;
  };

  // 儲存與更新公司資訊 API_UpdateCompany
  // 更新完畢後，再打 API_AddCompanyLogo 更新公司LOGO
  // 全部完成後，才跳success通知
  const handleSave = async (companyId) => {
    try {
      setIsLoading(true);

      // 根據 companyId 找到對應的公司資料
      const selectedCompany = user.companies.find(
        (company) => company.companyId === companyId
      );
      if (!selectedCompany) {
        console.error("Company not found");
        setIsLoading(false); // 結束加載動畫
        return;
      }

      // 字數限制檢查
      if (
        selectedCompany.companyProfileZh &&
        selectedCompany.companyProfileZh.length > 165
      ) {
        Swal.fire({
          icon: "error",
          text:
            locale === "zh"
              ? "公司介紹不得超過165字"
              : "Company Profile (Chinese) cannot exceed 165 characters",
          showConfirmButton: true,
        }).then(() => {
          setIsLoading(false);
        });
        return;
      }

      // Company Name 字數限制檢查
      if (charCount[companyId]?.companyNameEn > maxCompanyNameEnLength) {
        Swal.fire({
          icon: "error",
          text:
            locale === "zh"
              ? "Company Name 超過字數限制"
              : "Company Name exceeds the character limit",
          showConfirmButton: true,
        });
        setIsLoading(false);
        return;
      }

      if (!validateFields(selectedCompany)) {
        setIsLoading(false); // 結束加載動畫
        return;
      }

      // 更新公司資訊
      // 如果公司資訊更新成功
      // 接著處理 logo | print logo | print poster
      const response = await API_UpdateCompany(
        JSON.stringify(selectedCompany),
        companyId
      );
      if (response.message.includes("更新成功!")) {
        let printLogoSuccess = true;
        let printPosterSuccess = true;

        if (selectedCompany.logo) {
          await API_DeleteCompanyLogo(companyId);
          for (const logo of selectedCompany.logo) {
            const logoData = {
              ImageBase64: logo,
            };
            await API_AddCompanyLogo(JSON.stringify(logoData), companyId);
          }
        }

        // 上傳 companyLogoForPrinting
        if (companyLogoForPrinting) {
          await API_DeleteCompanyPrintLogo(companyId);
          try {
            for (const printinglogo of companyLogoForPrinting) {
              const printlogo = {
                ImageBase64: printinglogo,
              };
              const res = await API_UploadCompanyPrintLogo(
                JSON.stringify(printlogo),
                companyId
              );
              if (!res.message.includes("Image uploaded successfully.")) {
                printLogoSuccess = false;
              }
            }
          } catch (error) {
            printLogoSuccess = false;
            console.error("Error uploading logo:", error);
          }
        }

        // 上傳 posterForPrinting
        if (posterForPrinting) {
          await API_DeleteCompanyPrintPoster(companyId);
          try {
            for (const posterItem of posterForPrinting) {
              const poster = {
                ImageBase64: posterItem,
              };
              const res = await API_UploadCompanyPrintPoster(
                JSON.stringify(poster),
                companyId
              );

              if (!res.message.includes("Image uploaded successfully.")) {
                printPosterSuccess = false;
              }
            }
          } catch (error) {
            printPosterSuccess = false;
            console.error("Error uploading poster:", error);
          }
        }

        // 處理companyLogoForPrinting / posterForPrinting 上傳失敗的結果
        // 關閉loading
        if (!printLogoSuccess) {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: "Company Logo for Printing upload failed",
            showConfirmButton: true,
          }).then(() => {
            setIsLoading(false); // 結束加載動畫
          });
        }

        if (!printPosterSuccess) {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: "Exhibited Work Poster or Vertical Key Art for Printing upload failed",
            showConfirmButton: true,
          }).then(() => {
            setIsLoading(false); // 結束加載動畫
          });
        }

        // 如果所有上傳都成功，顯示成功提示
        // 關閉loading
        if (printLogoSuccess && printPosterSuccess) {
          setUser((prevUser) => ({
            ...prevUser,
            companies: prevUser.companies.map((company) =>
              company.companyId === companyId
                ? {
                  ...company,
                  printLogoUrl:
                    companyLogoForPrinting || company.printLogoUrl,
                  printPosterUrl: posterForPrinting || company.printPosterUrl,
                  logoUrl: selectedCompany.logo || company.logoUrl,
                }
                : company
            ),
          }));

          Swal.fire({
            icon: "success",
            title: locale === "zh" ? "儲存成功" : "Success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            setIsLoading(false); // 結束加載動畫
          });
        }
      } else {
        console.error("Failed to update company information");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error updating company information:", error);
      setIsLoading(false);
    }
  };

  // 打開邀請成員的dialog
  const dialogOpen = (companyId) => {
    setSelectedCompanyId(companyId); // 設定當前選擇的公司 ID
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

    const data = {
      email: inviteEmail,
    };

    const res = await API_SendActivationMailForCompany(
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
      Swal.fire({
        icon: "error",
        title:
          locale === "zh"
            ? "異常狀況，請稍後再試"
            : "An exception occurred, please try again later.",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (user && user.companies && user.companies.length > 0) {
      const ownerCompany = user.companies.find(
        (company) => String(company.ownerMemberId) === String(user.userId)
      );

      if (ownerCompany) {
        setIsOwner(true);

        // 只有當 companyLogoForPrinting 和 posterForPrinting 還沒有設置時，才更新值
        if (!companyLogoForPrinting) {
          setCompanyLogoForPrinting(ownerCompany.printLogoUrl || "");
        }

        if (!posterForPrinting) {
          setPosterForPrinting(ownerCompany.printPosterUrl || "");
        }

        setUploadStatus({
          companyLogoForPrinting: !!ownerCompany.printLogoUrl, // 有值時為 true
          posterForPrinting: !!ownerCompany.printPosterUrl,
          logo: !!ownerCompany.logoUrl,
        });
      }
    }
  }, [
    user,
    user.companies,
    user.userId,
    companyLogoForPrinting,
    posterForPrinting,
  ]);

  if (!user || !user.companies || user.companies.length === 0) {
    return (
      <p>
        {locale === "zh"
          ? "暫無參展資料"
          : "No exhibition information available"}
      </p>
    );
  }

  // Debugging: Log company object to ensure it contains expected data
  const company = user.companies;

  const handleRedirectToPreview = (id) => {
    router.push(`/${locale}/exhibition/preview/market/${id}`);
  };

  return (
    <div style={{ width: "100%" }}>
      {company.map((company) => (
        <div key={company.companyId}>
          <div className={styles.architecture}>
            <div className={styles.architecture__header}>
              <h3>MARKET</h3>
              {String(company.ownerMemberId) === String(user.userId) &&
                !user.roles.includes("Professional") && (
                  <Button
                    text={locale === "zh" ? "邀請成員" : "Invite"}
                    icon={<IoPeopleSharp />}
                    onClick={() => dialogOpen(company.companyId)}
                  />
                )}
            </div>

            <div className={styles.architecture__inputBlock}>
              {/* 展位號碼 */}
              <InputComponent
                type="text"
                label={t("infobox.booth")}
                name="marketRef"
                value={company?.marketRef ?? ""} // 如果 marketRef 是 null 或 undefined，顯示空字串
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                disabled={true}
              />

              {/* 展證張數 */}
              <InputComponent
                type="text"
                label={t("infobox.BadgeQuantity")}
                name="passCount"
                value={company?.passCount ?? ""} // 如果 passCount 是 null 或 undefined，顯示空字串
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                disabled={true}
              />

              {/* Company Name */}
              <div>
                <InputComponent
                  type="text"
                  label={t("infobox.EnglishCompanyName")}
                  name="companyNameEn"
                  value={company.companyNameEn}
                  onChange={(e) =>
                    handleInputChange(
                      company.companyId,
                      e.target.name,
                      e.target.value
                    )
                  }
                  require={true}
                  showError={showError.companyNameEn}
                  disabled={
                    String(company.ownerMemberId) !== String(user.userId)
                  }
                />
                <span className="exhibitionpage__characterLength">
                  Company Name規格：{" "}
                  {charCount[company.companyId]?.companyNameEn || 0}/
                  {maxCompanyNameEnLength}，超過此數字請編輯至符合規範
                </span>
              </div>

              {/* 公司名稱 */}
              <InputComponent
                type="text"
                label={t("infobox.ChineseCompanyName")}
                name="companyNameZh"
                value={company.companyNameZh}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                disabled={true}
              />
            </div>

            <div className={styles.architecture__structure}>
              <div className={styles.architecture__structureheader}>
                <span>{t("member")}</span> {/* 成員標題 */}
                <div className={styles.architecture__memberAdminBlock}>
                  <span>{t("admin")}</span> {/* 管理員標題 */}
                  <span>{t("badges")}</span> {/* 展證標題 */}
                </div>
              </div>
              <div>
                {Array.from(
                  new Set(
                    user.companyMembers[company.companyId]?.map(
                      (member) => member.memberId
                    )
                  )
                ).map((memberId, index) => {
                  const member = user.companyMembers[company.companyId].find(
                    (m) => m.memberId === memberId
                  );
                  const isOwner =
                    String(member.memberId) === String(company.ownerMemberId);

                  return (
                    <div
                      key={index}
                      className={styles.architecture__accordionContainer}
                      style={{
                        backgroundColor: isOwner ? "#DEE1E6" : "#F3F4F6",
                      }}
                    >
                      {/* 左側成員資訊 */}
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

                      {/* 右側顯示兩個部分：管理員打勾和展證select */}
                      <div className={styles.architecture__selectBlock}>
                        {/* 管理員部分 */}
                        {isOwner ? (
                          <span className={styles.architecture__iconBlock}>
                            <FaRegCheckCircle
                              className={styles.architecture__manegerIcon}
                            />
                          </span>
                        ) : (
                          <span></span>
                        )}

                        {/* 展證select部分，所有成員都顯示 */}
                        <select
                          name="certificate"
                          value={String(member.hasExhibitPass)}
                          onChange={(e) =>
                            handleInputChange(
                              company.companyId,
                              e.target.name,
                              e.target.value
                            )
                          }
                          disabled={true}
                        >
                          <option value="true">{t("yes")}</option>
                          <option value="false">{t("no")}</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.architecture__companyinfo}>
              {/* <h3>{t("marketInfo")}</h3> */}
              <div className={styles.architecture__inputBlock}>
                <NormalSelect
                  label="Nature of Business｜公司行業別"
                  showError={showError.industry}
                  options={NatureofBusiness}
                  require={true}
                  name="industry"
                  value={company.companyCategory}
                  defaultText={
                    locale === "zh"
                      ? "請選擇公司行業別"
                      : "Please select the nature of business"
                  }
                  onChange={(e) =>
                    handleInputChange(
                      company.companyId,
                      "companyCategory",
                      e.target.value
                    )
                  }
                  disabled={
                    String(company.ownerMemberId) !== String(user.userId)
                  }
                />

                <NormalSelect
                  label="Zone｜市場展五大區"
                  options={zone}
                  require={true}
                  disabled={true}
                  name="exhibitArea"
                  value={company.exhibitionZone}
                  defaultText={"請選擇市場展五大區"}
                  onChange={(e) =>
                    handleInputChange(
                      company.companyId,
                      e.target.name,
                      e.target.value
                    )
                  }
                />

                <NormalSelect
                  label="Country｜國別"
                  showError={showError.registrationCountryId}
                  options={country}
                  require={true}
                  name="registrationCountryId"
                  value={company.registrationCountryId}
                  defaultText={"請選擇國別"}
                  onChange={(e) =>
                    handleInputChange(
                      company.companyId,
                      e.target.name,
                      e.target.value
                    )
                  }
                  disabled={
                    String(company.ownerMemberId) !== String(user.userId)
                  }
                />

                {/* <InputComponent
                                  type="text"
                                  label={"統一編號"}
                                  name="taxId"
                                  value={company.taxId}
                                  onChange={(e) => handleInputChange(company.companyId, e.target.name, e.target.value)}
                              /> */}

                {/* <InputComponent
                          type="text"
                          label={"發票抬頭"}
                          disabled={true}
                          name="invoiceHeader"
                          value={company.invoiceHeader}
                          onChange={(e) => handleInputChange(company.companyId,e.target.name, e.target.value)}
                          placeholder={"請輸入發票抬頭"}
                      /> */}

                <MultipleSelect
                  label="Participation Goal｜參展目標"
                  showError={showError.participationGoals}
                  options={participantTarget}
                  name="participationGoals"
                  maxSelection={3}
                  defaultText="請選擇參展目標"
                  value={company.participationGoals || []}
                  onChange={(value) =>
                    handleInputChange(
                      company.companyId,
                      "participationGoals",
                      value
                    )
                  }
                  message={
                    locale === "zh"
                      ? "複選，至多三項"
                      : "Multiple choice, up to three options."
                  }
                  require={true}
                  disabled={
                    String(company.ownerMemberId) !== String(user.userId)
                  }
                />

                <InputComponent
                  type="text"
                  label={"Company Website｜公司網站"}
                  name="websiteUrl"
                  value={company.websiteUrl}
                  onChange={(e) =>
                    handleInputChange(
                      company.companyId,
                      e.target.name,
                      e.target.value
                    )
                  }
                  placeholder={"請輸入公司網站"}
                  disabled={
                    String(company.ownerMemberId) !== String(user.userId)
                  }
                />
              </div>
            </div>
            <div className={styles.architecture__inputBlock}>
              <InputComponent
                type="textarea"
                label="Company Profile"
                name="companyProfileEn"
                value={company.companyProfileEn}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"Company Profile"}
                message={
                  "Up to 550 characters, including punctuation and spaces. If the character limit is exceeded, the text will be edited as necessary without notification.<br/>If the profile mentions any works, please use quotation marks, and capitalize all first letters in the title except propositions such as the, for, by, at, etc., unless there is a specific purpose.<br/>Example:“Spider-Man: Across the Spider-Verse, Anatomy of a Fall”"
                }
                maxLength={550}
                require={true}
                companyProfile={true}
                showError={showError.companyProfileEn}
                disabled={String(company.ownerMemberId) !== String(user.userId)}
              />

              <InputComponent
                type="textarea"
                label="公司簡介"
                name="companyProfileZh"
                value={company.companyProfileZh}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"請輸入公司介紹"}
                message={
                  "165 個字為限，含標點符號及空格，若超過字數限制，將視情況編輯，恕不另行通知；若簡介內提到作品名稱，請使用書名號《》。"
                }
                maxLength={165}
                disabled={String(company.ownerMemberId) !== String(user.userId)}
              />
            </div>

            <div className={styles.architecture__inputBlock}>
              {String(company.ownerMemberId) === String(user.userId) && (
                <>
                  {/* // 1. 印刷用公司logo */}
                  <InputComponent
                    type="file"
                    label={
                      locale === "zh"
                        ? "印刷用公司logo"
                        : "Company Logo for Printing"
                    }
                    name="companyLogoForPrinting"
                    message={
                      locale === "zh"
                        ? "上傳檔案格式須為 AI 檔（全彩，底色為白色）"
                        : "The uploaded file must be in AI format (full color, transparent background"
                    }
                    allowedExtensions={["ai"]}
                    value={companyLogoForPrinting}
                    onChange={(e) =>
                      handleInputChange(
                        company.companyId,
                        e.target.name,
                        e.target.value
                      )
                    }
                    uploadStatus={uploadStatus.companyLogoForPrinting}
                  />

                  {/* // 2. 印刷用參展作品海報或直式視覺 */}
                  <InputComponent
                    type="file"
                    label={
                      locale === "zh"
                        ? "印刷用參展作品海報或直式視覺"
                        : "Exhibited Work Poster or Vertical Key Art for Printing"
                    }
                    name="posterForPrinting"
                    message={
                      locale === "zh"
                        ? "如參展作品為一部以上，請自其中挑選一部作品，上傳該作品海報或直式視覺，以供製作市場展參展商名錄。<br/>上傳檔案規格：<br/>格式：TIFF、JPG、PNG<br/>尺寸： 25mmx35mm （295Ｘ 413像素）<br/>解析度：300 dpi<br/>大小：2MB 以下"
                        : "If there is more than one exhibited work, please select one of the works and upload its poster or vertical key art for the TCCF MARKETarket catalog.<br/>File requirements：<br/>Format: TIFF, JPG, PNG<br/>Image Size: 25mm x 35mm (295Ｘ 413pixel)<br/>Resolution: 300 dpi<br/>Size: Under 2MB"
                    }
                    allowedExtensions={["tiff", "jpg", "png"]}
                    value={posterForPrinting}
                    onChange={(e) =>
                      handleInputChange(
                        company.companyId,
                        e.target.name,
                        e.target.value
                      )
                    }
                    uploadStatus={uploadStatus.posterForPrinting}
                  />

                  <InputComponent
                    type="image"
                    label={"Company Logo ｜ 公司Logo"}
                    name="logo"
                    value={company.logoUrl}
                    placeholder={"請上傳公司Logo"}
                    onChange={(e) =>
                      handleInputChange(
                        company.companyId,
                        e.target.name,
                        e.target.value
                      )
                    }
                    message={
                      locale === "zh"
                        ? "上傳檔案格式須為 PNG/ JPG，解析度為300dpi ，建議為透明背景。"
                        : "The uploaded file must be in PNG/JPG format with a resolution of 300 dpi, and a transparent background is recommended."
                    }
                    uploadStatus={uploadStatus.logo}
                  />
                </>
              )}

              <InputComponent
                type="text"
                label={"Company Telephone Number ｜ 公司電話"}
                name="companyPhone"
                value={company.companyPhone}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"請輸入公司電話"}
                message={
                  locale === "zh"
                    ? "填寫範例：+886-x-xxxx-xxxx ext. xxxx 或 +886-xxx-xxx-xxx"
                    : "Example: +886-x-xxxx-xxxx ext. xxxx or +886-xxx-xxx-xxx"
                }
                disabled={String(company.ownerMemberId) !== String(user.userId)}
              />

              <InputComponent
                type="text"
                label={"Company Email｜公司信箱"}
                name="companyEmail"
                value={company.companyEmail}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"請輸入公司信箱"}
                disabled={String(company.ownerMemberId) !== String(user.userId)}
              />

              <InputComponent
                type="text"
                label="Tag｜搜尋標籤"
                name="tags"
                value={company.tags || ""}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"請輸入搜尋標籤"}
                message={
                  locale === "zh"
                    ? "請分別輸入中文用戶和英文用戶希望查找的詞彙，詞彙之間請使用逗號分隔。"
                    : "Please enter the keywords separately for Mandarin and non-Mandarin users, and separate the keywords with commas."
                }
                disabled={String(company.ownerMemberId) !== String(user.userId)}
              />

              <InputComponent
                type="text"
                label={"Sales Contact Name"}
                name="contactPersonNameEn"
                value={company.contactPersonNameEn}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"請輸入全名"}
                message={"first name, LAST NAME"}
                require={true}
                showError={showError.contactPersonNameEn}
                disabled={String(company.ownerMemberId) !== String(user.userId)}
              />

              <InputComponent
                type="text"
                label={"版權聯絡窗口姓名"}
                name="contactPersonNameZh"
                value={company?.contactPersonNameZh}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"請輸入版權聯絡窗口姓名"}
                message={"中文：姓         名"}
                disabled={String(company.ownerMemberId) !== String(user.userId)}
              />

              <InputComponent
                type="text"
                label={"Sales Contact Position"}
                name="contactPersonTitleEn"
                value={company?.contactPersonTitleEn}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"請輸入職稱"}
                disabled={String(company.ownerMemberId) !== String(user.userId)}
              />

              <InputComponent
                type="text"
                label={"版權聯絡窗口職稱"}
                name="contactPersonTitleZh"
                value={company.contactPersonTitleZh}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"請輸入版權聯絡窗口職稱"}
                disabled={String(company.ownerMemberId) !== String(user.userId)}
              />

              <InputComponent
                type="text"
                label={"Sales Contact Number｜版權聯絡窗口電話"}
                name="contactPersonPhone"
                value={company.contactPersonPhone}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"請輸入版權聯絡窗口電話"}
                message={
                  "Example: +886-x-xxxx-xxxx ext. xxxx or +886-xxx-xxx-xxx<br/>填寫範例：+886-x-xxxx-xxxx ext. xxxx 或 +886-xxx-xxx-xxx"
                }
                disabled={String(company.ownerMemberId) !== String(user.userId)}
              />

              <InputComponent
                type="text"
                label={"Sales Contact Email｜版權聯絡窗口 Email"}
                name="contactPersonEmail"
                value={company.contactPersonEmail}
                onChange={(e) =>
                  handleInputChange(
                    company.companyId,
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"請輸入版權聯絡窗口Email"}
                require={true}
                showError={showError.contactPersonEmail}
                disabled={String(company.ownerMemberId) !== String(user.userId)}
              />
            </div>

            {String(company.ownerMemberId) === String(user.userId) && (
              <div className={styles.architecture__buttonWrapper}>
                <Button
                  text={t("save")}
                  icon={<FaRegSave />}
                  onClick={() => handleSave(company.companyId)}
                />
                <Button
                  text={t("goExhibit")}
                  icon={<HiOutlineSquares2X2 />}
                  onClick={() => goProject(company.companyId)}
                />
                <Button
                  text={t("preview")}
                  icon={<IoSearchOutline />}
                  onClick={() => handleRedirectToPreview(company.companyId)}
                />
              </div>
            )}
          </div>
        </div>
      ))}

      <Dialog
        open={inviteDialogOpen}
        title={t("inviteDialog.label_1")}
        buttonText1={btn("cancel")}
        buttonText2={btn("submit")}
        onClose={dialogClose}
        onClick={inviteMember}
      >
        {loading && <Loading />}

        <InputComponent
          type={"text"}
          label={t("inviteDialog.label_2")}
          name={"inviteEmail"}
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          placeholder={"Email"}
        />
      </Dialog>
    </div>
  );
};

export default Architecture;
