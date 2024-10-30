import { getPageContent } from "../../actions/page";
import styles from "./main-page.module.scss";
import { notFound } from "next/navigation";
import { localeToUpperCase } from "@/utils";
import { getPageInfo } from "../../actions/page";
import ListTypeTemplate from "./list-type-template";
import AnnouncementTypeTemplate from "./announcement-type-template";
import EventTypeTemplate from "./event-type-template";
import TableTypeTemplate from "./table-type-template";
import GeneralTypeTemplate from "./general-type-template";

export default async function MainPage({ params }) {
  const data = await getPageContent(params);
  const pageInfo = await getPageInfo(params);
  const locale = localeToUpperCase(params.locale);

  if (data.status === 400 || pageInfo.status === 400) {
    return notFound();
  }

  return (
    <div className={styles.mainPage}>
      <div className={styles.mainPage__container}>
        <div className={styles.mainPage__container_contentWrapper}>
          {(() => {
            switch (pageInfo?.data?.templateId) {
              case 1:
                return (
                  <GeneralTypeTemplate
                    contentData={data?.data}
                    pageInfo={pageInfo?.data}
                    locale={locale}
                  />
                );

              case 2:
                return (
                  <ListTypeTemplate
                    contentData={data?.data}
                    locale={locale}
                    pageInfo={pageInfo?.data}
                  />
                );

              case 3:
                return (
                  <TableTypeTemplate
                    contentData={data?.data}
                    locale={locale}
                    pageInfo={pageInfo?.data}
                  />
                );

              case 4:
                return (
                  <AnnouncementTypeTemplate
                    contentData={data?.data}
                    locale={locale}
                    pageInfo={pageInfo?.data}
                  />
                );

              case 5:
                return (
                  <EventTypeTemplate
                    contentData={data?.data}
                    locale={locale}
                    pageInfo={pageInfo?.data}
                  />
                );

              default:
                break;
            }
          })()}
        </div>
      </div>
    </div>
  );
}
