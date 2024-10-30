import Link from "next/link";
import styles from "./table-type-template.module.scss";
import TableBlock from "./table.block";
import parse from "html-react-parser";

export default function TableTypeTemplate({ contentData, locale }) {
  const data = contentData;

  console.log(data);

  const tableData = data
    ?.filter((item) => item.elementId.includes("table_"))
    ?.reduce((acc, item) => {
      const match = item.elementId.match(/table_([^_]+)_(notice|theme|row)/);
      if (match) {
        const key = `table_${match[1]}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
      }
      return acc;
    }, {});

  const tableDataArray = Object.entries(tableData || {});

  const tableHeaderData = data?.filter((item) =>
    item.elementId.includes("header_")
  );

  const serialIndex = tableHeaderData?.findIndex(
    (item) => item.elementId === "header_serial"
  );

  const viewIndex = tableHeaderData?.findIndex(
    (item) => item.elementId === "header_view"
  );

  if (serialIndex !== -1) {
    const [serial] = tableHeaderData?.splice(serialIndex, 1);
    tableHeaderData.unshift(serial);
  }

  if (viewIndex !== -1) {
    const newViewIndex = tableHeaderData.findIndex(
      (item) => item.elementId === "header_view"
    );
    const [view] = tableHeaderData.splice(newViewIndex, 1);
    tableHeaderData.push(view);
  }

  return (
    <div className={styles.tableTypeTemplate}>
      <h1 className={styles.tableTypeTemplate__title}>
        {
          data?.filter((item) => item.elementId === "title")?.[0]?.[
            `fieldText${locale}`
          ]
        }
      </h1>
      <div className={styles.tableTypeTemplate__content}>
        {parse(
          data?.filter((item) => item.elementId === "content")?.[0]?.[
            `fieldText${locale}`
          ] ?? ""
        )}
      </div>

      <div className={styles.tableTypeTemplate__tableWrapper}>
        {tableDataArray.map((data, index) => (
          <TableBlock
            data={data[1]}
            locale={locale}
            index={index}
            header={tableHeaderData}
            row={Object.values(tableData)[index]}
            key={data.id}
          />
        ))}
      </div>

      <div className={styles.tableTypeTemplate__buttonWrapper}>
        {data?.filter((item) => item.elementId === "leftFooterButton").length >
          0 && (
          <Link
            href={
              data?.filter((item) => item.elementId === "leftFooterButton")?.[0]
                ?.fieldValue ?? ""
            }
            target="_blank"
          >
            {
              data?.filter(
                (item) => item.elementId === "leftFooterButton"
              )?.[0]?.[`fieldText${locale}`]
            }
          </Link>
        )}

        {data?.filter((item) => item.elementId === "rightFooterButton").length >
          0 && (
          <Link
            href={
              data?.filter(
                (item) => item.elementId === "rightFooterButton"
              )?.[0]?.fieldValue ?? ""
            }
            target="_blank"
          >
            {
              data?.filter(
                (item) => item.elementId === "rightFooterButton"
              )?.[0]?.[`fieldText${locale}`]
            }
          </Link>
        )}
      </div>
    </div>
  );
}
