"use client";
import { updateArticle } from "@/actions/page";

import { useFormState } from "react-dom";
import { Fragment, useState } from "react";
import ArticleLocale from "@/components/cms/article-locale";
import styles from "./article-content.module.scss";
import ArticleUpdateFormSubmit from "@/components/cms/article-update-form-submit";
import EditMode from "./edit-mode";
import ArticleInfo from "./article-info";

import GeneralType from "../_template-type/general-type";
import ListType from "../_template-type/list-type";
import AnnouncementType from "../_template-type/announcement-type";
import EventType from "../_template-type/event-type";
import TableType from "../_template-type/table-type";

export default function ArticleContent({ pageData, pageInfo, pages }) {
  const [locale, setLocale] = useState("zh");
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(1);
  const [state, formAction] = useFormState(
    updateArticle.bind(null, pageData, pageInfo, mode),
    {}
  );

  return (
    <div className={styles.cmsUpdateArticleContent}>
      {step === 1 && <EditMode mode={mode} setMode={setMode} />}
      <form action={formAction}>
        {step === 2 && mode === "content" && (
          <Fragment>
            <h3>文章內容</h3>
            <ArticleLocale locale={locale} setLocale={setLocale} />

            {(() => {
              switch (pageInfo.templateId) {
                case 1:
                  return <GeneralType pageData={pageData} locale={locale} />;

                case 2:
                  return <ListType pageData={pageData} locale={locale} />;

                case 3:
                  return <TableType pageData={pageData} locale={locale} />;

                case 4:
                  return (
                    <AnnouncementType
                      pageData={pageData}
                      locale={locale}
                      pages={pages}
                    />
                  );

                case 5:
                  return <EventType pageData={pageData} locale={locale} />;
              }
            })()}
          </Fragment>
        )}
        {step === 2 && mode === "info" && <ArticleInfo pageInfo={pageInfo} />}

        {state?.errors && (
          <ul className={styles.cmsUpdateArticleContent__error}>
            {Object.keys(state.errors).map((key) => (
              <li key={key}>{state.errors[key]}</li>
            ))}
          </ul>
        )}
        {/* 流程控制 */}
        <div className={styles.cmsUpdateArticleContent__step}>
          {(() => {
            switch (step) {
              case 1:
                return (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className={`${styles.cmsUpdateArticleContent__button} ${styles.confirmButton}`}
                    disabled={!mode}
                    style={{
                      marginLeft: "auto",
                    }}
                  >
                    確認
                  </button>
                );

              case 2:
                return (
                  <Fragment>
                    <button
                      className={`${styles.cmsUpdateArticleContent__button} ${styles.cancelButton}`}
                      type="button"
                      onClick={() => setStep(step - 1)}
                    >
                      上一步
                    </button>

                    <div
                      className={
                        styles.cmsUpdateArticleContent__container_confirmButton
                      }
                    >
                      <ArticleUpdateFormSubmit mode={mode} />
                    </div>
                  </Fragment>
                );
            }
          })()}
        </div>
      </form>
    </div>
  );
}
