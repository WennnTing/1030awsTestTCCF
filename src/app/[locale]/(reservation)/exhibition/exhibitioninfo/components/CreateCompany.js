// Market 參展資訊 ( 公司資訊頁面 )
"use client";
import React, { useState, useEffect } from "react";
import styles from "./Architecture.module.scss";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

// components
import Button from "../../components/Button/Button";
import InputComponent from "../../components/Input/Input";
import MultipleSelect from "./MultipleSelect";
import NormalSelect from "./NormalSelect";

// context
import { useUser } from "@/context/exhibition/UserContext";

// icon
import { FaRegSave } from "react-icons/fa";

// utils
import { ZONE, NATURE_OF_BUSINESS, PARTICIPANT_TARGET } from "@/utils/options";

// api
import {
  API_CreateCompany,
  API_AddCompanyLogo,
  API_DeleteCompanyLogo,
  API_UploadCompanyPrintLogo,
  API_DeleteCompanyPrintLogo,
  API_UploadCompanyPrintPoster,
  API_DeleteCompanyPrintPoster,
  API_GetMembersByCompanyId,
} from "@/api/api";

const CreateCompany = ({ setIsLoading }) => {
  const Swal = require("sweetalert2");
  const [companyLogoForPrinting, setCompanyLogoForPrinting] = useState(""); // 印刷用公司logo
  const [posterForPrinting, setPosterForPrinting] = useState(""); // 印刷用參展作品海報或直式視覺
  const [selectedCompanyId, setSelectedCompanyId] = useState(""); // 選擇的公司ID

  const [formData, setFormData] = useState({
    companyNameZh: "", // 公司名稱(中文)
    companyNameEn: "", // Company Name
    companyCategory: 0, // 公司行業別
    exhibitionRole: 0, // 參展角色     (不在畫面上)
    participationGoals: [0],                      // 參展目標
    companyProfileZh: "",                         // 公司簡介(中文)
    companyProfileEn: "",                         // Company Profile
    websiteUrl: "",                               // 公司網址
    companyPhone: "",                             // 公司電話
    companyEmail: "",                             // 公司Email
    exhibitionZone: 0,                            // 市場展五大區
    registrationCountryId: 0,                     // 國別
    contactPersonNameZh: "",                      // 版權聯絡窗口姓名
    contactPersonNameEn: "",                      // Sales Contact Name
    contactPersonTitleZh: "",                     // 版權聯絡窗口職稱
    contactPersonTitleEn: "",                     // Sales Contact Title
    contactPersonPhone: "",                       // 版權聯絡窗口電話
    contactPersonEmail: "",                       // 版權聯絡窗口Email
    passCount: 1,                                 // ？？？？     (不在畫面上)
    boothRawSpace: "10x10",                       // 攤位購買數量
    networkingEvent: "Evening Mixer",             // ？？？？     (不在畫面上)
    mainStageTime: "MainStageTime",               // 主舞台時段       (不在畫面上)
    salonStageTime: "SalonStageTime",             // 沙龍舞台時段     (不在畫面上)
    taxId: null,                                  // 統一編號     (不在畫面上)
    invoiceHeader: "",                            // 發票抬頭     (不在畫面上)
    invoiceNotes: "For the event participation",  // 發票備註     (不在畫面上)
    tags: "",                                     // 標籤
    happyHour: "Available",                       // 快樂小時     (不在畫面上)
    paymentMethods: 0,                            // 付款方式     (不在畫面上)
    logoUrl: "",                                  // 公司logo
  });

  const { user, setUser } = useUser();
  const t = useTranslations("ExhibitionInfo");
  const btn = useTranslations("SwalButton");

  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const router = useRouter();
  const [initialFormData, setInitialFormData] = useState({});

  // 字數計算
  const [charCount, setCharCount] = useState({
    companyNameEn: 0,
    companyNameZh: 0,
  });

  const maxCompanyNameEnLength = 34;
  const maxCompanyNameZhLength = 40;

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

  // error 紅框
  const [showError, setShowError] = useState({
    companyNameEn: false,
    companyProfileEn: false,
    contactPersonNameEn: false,
    contactPersonEmail: false,
    industry: false,
    registrationCountryId: false,
    exhibitionZone: false,
  });

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

    // 處理字數限制並更新字數計算
    if (name === "companyNameEn" || name === "companyNameZh") {
      setCharCount((prev) => ({
        ...prev,
        [name]: calculateCharacterLength(value),
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

    // 如果是 taxId 且值為空字串，設為 null
    if (name === "taxId" && value === "") {
      value = null;
    }

    // 更新 formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

  // 儲存與創建公司資訊 API_UpdateCompany
  // 創建完畢後，再打 API_AddCompanyLogo 更新公司LOGO
  // 全部完成後，才跳success通知
  const handleSave = async () => {
    try {
      setIsLoading(true);

      if (charCount.companyNameEn > maxCompanyNameEnLength) {
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

      if (charCount.companyNameZh > maxCompanyNameZhLength) {
        Swal.fire({
          icon: "error",
          text:
            locale === "zh"
              ? "公司名稱超過字數限制"
              : "Chinese Company Name exceeds the character limit",
          showConfirmButton: true,
        });
        setIsLoading(false);
        return;
      }

      if (!validateFields(formData)) {
        setIsLoading(false);
        return;
      }

      // 準備公司資料
      const companyData = {
        ownerMemberId: null,
        CompanyNameEn: formData.companyNameEn,
        CompanyNameZh: formData.companyNameZh,
        CompanyCategory: formData.companyCategory,
        ExhibitionRole: formData.exhibitionRole,
        ParticipationGoals: formData.participationGoals,
        CompanyProfileZh: formData.companyProfileZh,
        CompanyProfileEn: formData.companyProfileEn,
        WebsiteUrl: formData.websiteUrl,
        CompanyPhone: formData.companyPhone,
        CompanyEmail: formData.companyEmail,
        ExhibitionZone: formData.exhibitionZone,
        RegistrationCountryId: formData.registrationCountryId,
        ContactPersonNameZh: formData.contactPersonNameZh,
        ContactPersonNameEn: formData.contactPersonNameEn,
        ContactPersonTitleZh: formData.contactPersonTitleZh,
        ContactPersonTitleEn: formData.contactPersonTitleEn,
        ContactPersonPhone: formData.contactPersonPhone,
        ContactPersonEmail: formData.contactPersonEmail,
        PassCount: formData.passCount,
        BoothRawSpace: formData.boothRawSpace,
        NetworkingEvent: formData.networkingEvent,
        MainStageTime: formData.mainStageTime,
        SalonStageTime: formData.salonStageTime,
        TaxId: formData.taxId,
        InvoiceHeader: formData.invoiceHeader,
        InvoiceNotes: formData.invoiceNotes,
        Tags: formData.tags,
        HappyHour: formData.happyHour,
        PaymentMethods: formData.paymentMethods,
      };

      // 創建公司資訊
      const response = await API_CreateCompany(JSON.stringify(companyData));

      console.log("API_CreateCompany response:", response);

      //在創建公司之前先驗證統編
      if (response.message === "該統一編號已經存在") {
        Swal.fire({
          icon: "error",
          text:
            locale === "zh"
              ? "該統一編號已經存在"
              : "The tax ID already exists",
          showConfirmButton: true,
        });
        setIsLoading(false);
        return;
      }

      if (
        response &&
        response.message &&
        response.message.includes("創建成功!")
      ) {
        const companyId = response.data.companyId; // 獲取新創建的公司ID
        const ownerMemberId = response.data.ownerMemberId; // 獲取新創建的公司的 ownerMemberId (要讓頁面即時渲染)

        // 更新 userContext，將新公司加入到 user.companies 中
        setUser((prevUser) => ({
          ...prevUser,
          companies: [
            ...prevUser.companies,
            { ...formData, companyId, ownerMemberId },
          ], // 將新公司加入到 user.companies 中
        }));

        let printLogoSuccess = true;
        let printPosterSuccess = true;

        // 上傳公司Logo
        if (formData.logo) {
          await API_DeleteCompanyLogo(companyId);
          for (const logo of formData.logo) {
            const logoData = {
              ImageBase64: logo,
            };
            await API_AddCompanyLogo(JSON.stringify(logoData), companyId);
          }
        }

        // 上傳印刷用公司Logo
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

        // 上傳參展作品海報或直式視覺
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

        // 處理上傳失敗的結果
        if (!printLogoSuccess || !printPosterSuccess) {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was an issue uploading some files. Please try again.",
            showConfirmButton: true,
          });
          setIsLoading(false); // 結束加載動畫
          return;
        }

        // 如果所有上傳都成功，顯示成功提示
        Swal.fire({
          icon: "success",
          title: locale === "zh" ? "創建成功" : "Success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          setIsLoading(false); // 結束加載動畫
        });
      } else {
        console.error("Failed to create company");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating company:", error);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        <div className={styles.architecture}>
          <div className={styles.architecture__header}>
            {/* <h3>{t("title")}</h3> */}
          </div>

          <div className={styles.architecture__inputBlock}>
            {/* 展位號碼 */}
            <InputComponent
              type="text"
              label={t("infobox.booth")}
              name="tableNumber"
              value={formData?.tableNumber}
              onChange={(e) => handleInputChange("tableNumber", e)}
              disabled={true}
            />

            {/* 展證張數 */}
            <InputComponent
              type="text"
              label={t("infobox.BadgeQuantity")}
              name="passCount"
              value={formData?.passCount}
              onChange={(e) => handleInputChange("passCount", e)}
              disabled={true}
            />

            {/* Company Name */}
            <div>
              <InputComponent
                type="text"
                label={t("infobox.EnglishCompanyName")}
                name="companyNameEn"
                value={formData.companyNameEn}
                showError={showError.companyNameEn}
                onChange={(e) => handleInputChange("companyNameEn", e)}
                require={true}
              />
              <span className="exhibitionpage__characterLength">
                {locale === "zh" ? (
                  <>
                    Company Name規格：{charCount.companyNameEn || 0}/{maxCompanyNameEnLength}，超過此數字請編輯至符合規範
                  </>
                ) : (
                  <>
                    Company Name Length: {charCount.companyNameEn || 0}/{maxCompanyNameEnLength}. Please edit to comply with the limit if exceeded.
                  </>
                )}
              </span>
            </div>

            {/* 公司名稱 */}
            <div>
              <InputComponent
                type="text"
                label={t("infobox.ChineseCompanyName")}
                name="companyNameZh"
                value={formData.companyNameZh}
                onChange={(e) => handleInputChange("companyNameZh", e)}
              // disabled={true}
              />
              <span className="exhibitionpage__characterLength">
                公司名稱規格：{charCount.companyNameZh}/
                {maxCompanyNameZhLength}，超過此數字請編輯至符合規範
              </span>
            </div>
          </div>

          <div className={styles.architecture__companyinfo}>
            {/* <h3>{t("marketInfo")}</h3> */}
            <div className={styles.architecture__inputBlock}>
              <NormalSelect
                label="Nature of Business｜公司行業別"
                showError={showError.industry}
                options={NATURE_OF_BUSINESS}
                require={true}
                name="industry"
                value={formData.companyCategory}
                defaultText={
                  locale === "zh"
                    ? "請選擇公司行業別"
                    : "Please select the nature of business"
                }
                onChange={(e) =>
                  handleInputChange("companyCategory", e.target.value)
                }
              />

              <NormalSelect
                label="Zone｜市場展五大區"
                showError={showError.exhibitionZone}
                options={ZONE}
                require={true}
                name="exhibitArea"
                value={formData.exhibitionZone}
                defaultText={"請選擇市場展五大區"}
                onChange={(e) =>
                  handleInputChange("exhibitionZone", e.target.value)
                }
              />

              <NormalSelect
                label="Country｜國別"
                showError={showError.registrationCountryId}
                options={country}
                require={true}
                disabled={false}
                name="registrationCountryId"
                value={formData.registrationCountryId}
                defaultText={"請選擇國別"}
                onChange={(e) =>
                  handleInputChange("registrationCountryId", e.target.value)
                }
              />

              {/* <InputComponent
                                type="number"
                                label={"Tax ID｜統一編號"}
                                name="taxID"
                                value={formData.taxId}
                                onChange={(e) => handleInputChange('taxId', e)}
                                placeholder={"請輸入統一編號"}
                            />

                            <InputComponent
                                type="text"
                                label={"Invoice Header｜發票抬頭"}
                                name="invoiceHeader"
                                value={formData.invoiceHeader}
                                onChange={(e) => handleInputChange('invoiceHeader', e)}
                                placeholder={"請輸入發票抬頭"}
                            /> */}

              <MultipleSelect
                label="Participation Goal｜參展目標"
                options={PARTICIPANT_TARGET}
                name="participationGoals"
                maxSelection={3}
                defaultText="請選擇參展目標"
                value={formData.participationGoals || []}
                onChange={(value) =>
                  handleInputChange("participationGoals", value)
                }
                message={
                  locale === "zh"
                    ? "複選，至多三項"
                    : "Multiple choice, up to three options."
                }
                require={true}
              />

              <InputComponent
                type="text"
                label={"Company Website｜公司網站"}
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange("websiteUrl", e)}
                placeholder={"請輸入公司網站"}
              />
            </div>
          </div>

          <div className={styles.architecture__inputBlock}>
            <InputComponent
              type="textarea"
              label="Company Profile"
              showError={showError.companyProfileEn}
              name="companyProfileEn"
              value={formData.companyProfileEn}
              onChange={(e) => handleInputChange("companyProfileEn", e)}
              placeholder={"Company Profile"}
              message={
                "Up to 550 characters, including punctuation and spaces. If the character limit is exceeded, the text will be edited as necessary without notification.<br/>If the profile mentions any works, please use quotation marks, and capitalize all first letters in the title except propositions such as the, for, by, at, etc., unless there is a specific purpose.<br/>Example:“Spider-Man: Across the Spider-Verse, Anatomy of a Fall”"
              }
              maxLength={550}
              require={true}
              companyProfile={true}
            />

            <InputComponent
              type="textarea"
              label="公司簡介"
              name="companyProfileZh"
              value={formData.companyProfileZh}
              onChange={(e) => handleInputChange("companyProfileZh", e)}
              placeholder={"請輸入公司介紹"}
              message={
                "165 個字為限，含標點符號及空格，若超過字數限制，將視情況編輯，恕不另行通知；若簡介內提到作品名稱，請使用書名號《》。"
              }
              maxLength={165}
            />
          </div>

          <div className={styles.architecture__inputBlock}>
            {/* // 1. 印刷用公司logo */}
            {user.roles.includes("Market") && (
              <>
                <InputComponent
                  type="file"
                  label={
                    locale === "zh" ? "印刷用公司logo" : "Company Logo for Printing"
                  }
                  name="companyLogoForPrinting"
                  message={
                    locale === "zh"
                      ? "上傳檔案格式須為 AI 檔（全彩，底色為白色）"
                      : "The uploaded file must be in AI format (full color, transparent background"
                  }
                  allowedExtensions={["ai"]}
                  value={companyLogoForPrinting}
                  onChange={(e) => handleInputChange("companyLogoForPrinting", e)}
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
                  onChange={(e) => handleInputChange("posterForPrinting", e)}
                />
              </>
            )}


            <InputComponent
              type="image"
              label={"Company Logo ｜ 公司Logo"}
              name="logo"
              value={formData.logoUrl}
              placeholder={"請上傳公司Logo"}
              onChange={(e) => handleInputChange("logoUrl", e)}
              message={
                locale === "zh"
                  ? "上傳檔案格式須為 PNG/ JPG，解析度為300dpi ，建議為透明背景。"
                  : "The uploaded file must be in PNG/JPG format with a resolution of 300 dpi, and a transparent background is recommended."
              }
            />

            <InputComponent
              type="text"
              label={"Company Telephone Number ｜ 公司電話"}
              name="companyPhone"
              value={formData.companyPhone}
              onChange={(e) => handleInputChange("companyPhone", e)}
              placeholder={"請輸入公司電話"}
              message={
                locale === "zh"
                  ? "填寫範例：+886-x-xxxx-xxxx ext. xxxx 或 +886-xxx-xxx-xxx"
                  : "Example: +886-x-xxxx-xxxx ext. xxxx or +886-xxx-xxx-xxx"
              }
            />

            <InputComponent
              type="text"
              label={"Company Email｜公司信箱"}
              name="companyEmail"
              value={formData.companyEmail}
              onChange={(e) => handleInputChange("companyEmail", e)}
              placeholder={"請輸入公司信箱"}
            />

            <InputComponent
              type="text"
              label="Tag｜搜尋標籤"
              name="tags"
              value={formData.tags || ""}
              onChange={(e) => handleInputChange("tags", e)}
              placeholder={"請輸入搜尋標籤"}
              message={
                locale === "zh"
                  ? "請分別輸入中文用戶和英文用戶希望查找的詞彙，詞彙之間請使用逗號分隔。"
                  : "Please enter the keywords separately for Mandarin and non-Mandarin users, and separate the keywords with commas."
              }
            />

            <InputComponent
              type="text"
              label={"Sales Contact Name"}
              name="contactPersonNameEn"
              value={formData.contactPersonNameEn}
              onChange={(e) => handleInputChange("contactPersonNameEn", e)}
              placeholder={"請輸入全名"}
              message={"first name, LAST NAME"}
              require={true}
              showError={showError.contactPersonNameEn}
            />

            <InputComponent
              type="text"
              label={"版權聯絡窗口姓名"}
              name="contactPersonNameZh"
              value={formData.contactPersonNameZh}
              onChange={(e) => handleInputChange("contactPersonNameZh", e)}
              placeholder={"請輸入版權聯絡窗口姓名"}
              message={"中文：姓         名"}
            />

            <InputComponent
              type="text"
              label={"Sales Contact Position"}
              name="contactPersonTitleEn"
              value={formData.contactPersonTitleEn}
              onChange={(e) => handleInputChange("contactPersonTitleEn", e)}
              placeholder={"請輸入職稱"}
            />

            <InputComponent
              type="text"
              label={"版權聯絡窗口職稱"}
              name="contactPersonTitleZh"
              value={formData.contactPersonTitleZh}
              onChange={(e) => handleInputChange("contactPersonTitleZh", e)}
              placeholder={"請輸入版權聯絡窗口職稱"}
            />

            <InputComponent
              type="text"
              label={"Sales Contact Number｜版權聯絡窗口電話"}
              name="contactPersonPhone"
              value={formData.contactPersonPhone}
              onChange={(e) => handleInputChange("contactPersonPhone", e)}
              placeholder={"請輸入版權聯絡窗口電話"}
              message={
                "Example: +886-x-xxxx-xxxx ext. xxxx or +886-xxx-xxx-xxx<br/>填寫範例：+886-x-xxxx-xxxx ext. xxxx 或 +886-xxx-xxx-xxx"
              }
            />

            <InputComponent
              type="text"
              label={"Sales Contact Email｜版權聯絡窗口 Email"}
              name="contactPersonEmail"
              value={formData.contactPersonEmail}
              onChange={(e) => handleInputChange("contactPersonEmail", e)}
              placeholder={"請輸入版權聯絡窗口Email"}
              require={true}
              showError={showError.contactPersonEmail}
            />
          </div>

          <div className={styles.architecture__buttonWrapper}>
            <Button
              text={t("save")}
              icon={<FaRegSave />}
              onClick={handleSave}
            />
            {/* <Button text={t('goExhibit')} icon={<HiOutlineSquares2X2 />} onClick={() => goProject(formData.companyId)} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
