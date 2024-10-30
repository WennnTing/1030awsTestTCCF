"use client";
import styles from "./navigation.module.scss";
import { DefaultInput } from "@/components/cms/input";
import NavFormSubmit from "@/components/cms/nav-form-submit";
import { updateNavigation } from "@/actions/navigation";
import { useFormState } from "react-dom";
import moment from "moment";
import NavSelect from "@/components/cms/nav-select";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SwitchButton from "@/components/cms/switch-button";
import { useState } from "react";
export default function EditNav({ pages, pageData, routeData }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryElement = searchParams.get("element");
  const queryElementId = searchParams.get("id");
  const queryType = searchParams.get("type");
  const queryStr = `type=${queryType}&element=${queryElement}&id=${queryElementId}`;

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const clearQuery = () => {
    router.push(pathname);
  };

  const [state, formAction] = useFormState(
    updateNavigation.bind(null, queryStr, queryType),
    {}
  );

  return (
    <form
      className={styles.cmsNavigation__editWrapper__container}
      action={formAction}
      key={moment().format()}
    >
      <div className={styles.cmsNavigation__editWrapper__container_header}>
        <h3>{queryType === "create" ? "新增" : "編輯"}路由</h3>
        <SwitchButton
          value={queryType === "create" ? true : routeData?.data?.isVisible}
          onChangeFun={handleChange}
          name={"isVisible"}
        />
      </div>

      <DefaultInput
        label={"中文名稱"}
        value={routeData?.data[`${queryElement}NameZh`]}
        type={"text"}
        onChangeFun={handleChange}
        name={`${queryElement}NameZh`}
      />

      <DefaultInput
        label={"英文名稱"}
        value={routeData?.data[`${queryElement}NameEn`]}
        type={"text"}
        onChangeFun={handleChange}
        name={`${queryElement}NameEn`}
      />

      <NavSelect label={"文章名稱"} pages={pages} pageData={pageData} />

      <DefaultInput
        label={"路由名稱"}
        value={routeData?.data?.routerName}
        onChangeFun={handleChange}
        type={"router"}
        name={"routerName"}
      />
      <DefaultInput
        label={"排序"}
        value={routeData?.data?.sortOrder}
        onChangeFun={handleChange}
        type={"text"}
        name={"sortOrder"}
      />

      <input
        type="hidden"
        name="selfId"
        value={queryType === "edit" ? queryElementId : ""}
      />
      <input type="hidden" name="element" value={queryElement} />
      <input
        type="hidden"
        name="parentId"
        value={(() => {
          switch (queryElement) {
            case "sidebar":
              return queryType === "create"
                ? queryElementId
                : routeData?.data?.headerId;
            case "branch":
              return queryType === "create"
                ? queryElementId
                : routeData?.data?.sidebarId;
            default:
              break;
          }
        })()}
      />
      {state?.errors && (
        <ul className={styles.cmsNavigation__error}>
          {Object.keys(state.errors).map((key) => (
            <li key={key}>{state.errors[key]}</li>
          ))}
        </ul>
      )}
      <div
        className={styles.cmsNavigation__editWrapper__container_buttonWrapper}
      >
        <button
          type="button"
          className={
            styles.cmsNavigation__editWrapper__container_buttonWrapper__cancleButton
          }
          onClick={clearQuery}
        >
          取消
        </button>
        <NavFormSubmit />
      </div>
    </form>
  );
}
