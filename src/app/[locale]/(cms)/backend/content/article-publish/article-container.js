"use client";
import styles from "./article-publish.module.scss";
import { Fragment, useState, useEffect } from "react";
import ArticleStep from "@/components/cms/article-step";
import ArticleContent from "./article-content";
import ArticlePreview from "./article-preview";
import { createArticleHandler } from "@/actions/page";
import { useFormState } from "react-dom";
import ArticleTempalte from "./article-template";
import { useRouter } from "next/navigation";
import ArticleFormSubmit from "@/components/cms/article-form-submit";
import ArticleValidationFormSubmit from "@/components/cms/article-validation-form-submit";

export default function ArticleContainer({ pages }) {
  // 發布時間
  const [publishDate, setPublishDate] = useState(null);
  const [unpublishDate, setUnpublishDate] = useState(null);
  const [step, setStep] = useState(1);
  const [templateId, setTemplateId] = useState(null);
  const [validate, setValidate] = useState(false);
  const [state, formAction] = useFormState(
    createArticleHandler.bind(null, step),
    {}
  );
  const router = useRouter();

  useEffect(() => {
    // 檢查完成後進入下一步
    if (state?.status?.message === "success") {
      setValidate(true);
      setStep(3);
    }
  }, [state]);

  const handleGoBack = () => {
    setStep(step - 1);
  };

  const handleGoBackList = () => {
    router.push("/zh/backend/content/article-list");
  };

  return (
    <Fragment>
      <div className={styles.cmsArticlePublish__step}>
        <ArticleStep step={step} />
      </div>

      <form action={formAction}>
        <ArticleTempalte
          templateId={templateId}
          setTemplateId={setTemplateId}
          step={step}
        />
        <ArticleContent
          step={step}
          templateId={templateId}
          publishDate={publishDate}
          setPublishDate={setPublishDate}
          unpublishDate={unpublishDate}
          setUnpublishDate={setUnpublishDate}
          pages={pages}
        />
        {step === 2 && state?.errors && (
          <ul className={styles.cmsArticlePublish__error}>
            {Object.keys(state.errors).map((key) => (
              <li key={key}>{state.errors[key]}</li>
            ))}
          </ul>
        )}
        {validate && step === 3 && <ArticlePreview step={step} />}

        {step === 3 && state?.errors && (
          <ul className={styles.cmsArticlePublish__error}>
            {Object.keys(state.errors).map((key) => (
              <li key={key}>{state.errors[key]}</li>
            ))}
          </ul>
        )}

        {/* 流程控制 */}
        <div className={styles.cmsArticlePublish__nav}>
          {(() => {
            switch (step) {
              case 1:
                return (
                  <Fragment>
                    <button
                      className={styles.cancelButton}
                      type="button"
                      onClick={handleGoBackList}
                    >
                      返回文章列表
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className={styles.confirmButton}
                      disabled={!templateId}
                      style={{
                        marginLeft: "auto",
                      }}
                    >
                      確認
                    </button>
                  </Fragment>
                );

              case 2:
                return (
                  <Fragment>
                    <button
                      className={styles.cancelButton}
                      type="button"
                      onClick={handleGoBack}
                    >
                      上一步
                    </button>
                    {/* <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className={styles.confirmButton}
                    >
                      確認
                    </button> */}
                    <ArticleValidationFormSubmit />
                  </Fragment>
                );

              case 3:
                return (
                  <Fragment>
                    <button
                      className={styles.cancelButton}
                      type="button"
                      onClick={handleGoBack}
                    >
                      上一步
                    </button>
                    <ArticleFormSubmit />
                  </Fragment>
                );
            }
          })()}
        </div>
      </form>
    </Fragment>
  );
}
