import Link from "next/link";
import styles from "./table-type-template.module.scss";
import { MdOutlineMovieCreation } from "react-icons/md";
export default function TableBlock({ data, locale, index, header, row }) {
  const key = data[0].elementId.match(/table_([^_]+)_(notice|theme|row)/)[1];

  const rowData = row?.reduce((acc, item) => {
    const match = item.elementId.match(/row_([^_]+)_/);
    if (match) {
      const key = match[1];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
    }
    return acc;
  }, {});

  const rowDataArray = Object.values(rowData);

  rowDataArray.map((item) => {
    const serialIndex = item.findIndex((data) =>
      data.elementId.includes("serial")
    );
    const viewIndex = item.findIndex((data) =>
      data.elementId.includes("viewButton")
    );

    if (serialIndex !== -1) {
      const [serial] = item.splice(serialIndex, 1);
      item.unshift(serial);
    }

    if (viewIndex !== -1) {
      const [view] = item.splice(viewIndex, 1);
      item.push(view);
    }
  });

  return (
    <div className={styles.tableTypeTemplate__tableWrapper} key={index}>
      {/* 顯示主題 */}
      {data?.filter((item) => item.elementId === `table_${key}_theme`).length >
        0 && (
        <div className={styles.tableTypeTemplate__tableWrapper_theme}>
          {
            data?.filter(
              (item) => item.elementId === `table_${key}_theme`
            )?.[0]?.[`fieldText${locale}`]
          }
        </div>
      )}

      <div className={styles.tableTypeTemplate__tableWrapper_notice}>
        {
          data?.filter(
            (item) => item.elementId === `table_${key}_notice`
          )?.[0]?.[`fieldText${locale}`]
        }
      </div>

      <div className={styles.tableTypeTemplate__tableWrapper_tableContainer}>
        <table>
          <thead>
            <tr>
              {header.map((item, index) => (
                <th key={index}>{item[`fieldText${locale}`]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowDataArray.map((item, index) => (
              <tr key={index}>
                {header.map((el, index) => (
                  <td key={index}>
                    {(() => {
                      switch (el.elementId) {
                        case "header_serial":
                          return item.filter((data) =>
                            data.elementId.includes("serial")
                          )?.[0]?.[`fieldText${locale}`];

                        case "header_view":
                          return (
                            item.filter((data) =>
                              data.elementId.includes("viewButton")
                            )?.[0]?.fieldValue && (
                              <Link
                                target="_blank"
                                href={
                                  item.filter((data) =>
                                    data.elementId.includes("viewButton")
                                  )?.[0]?.fieldValue ?? ""
                                }
                              >
                                {
                                  item.filter((data) =>
                                    data.elementId.includes("viewButton")
                                  )?.[0]?.[`fieldText${locale}`]
                                }
                              </Link>
                            )
                          );
                        default:
                          const num = el.elementId.match(/_([^_]+)$/)[1];
                          return item.filter(
                            (data) =>
                              data.elementId.match(/_([^_]+)$/)[1] == num
                          )?.[0]?.[`fieldText${locale}`];
                      }
                    })()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tableTypeTemplate__tableWrapper_rwdTable}>
        {rowDataArray.map((item, index) => (
          <div
            key={index}
            className={styles.tableTypeTemplate__tableWrapper_rwdTable__block}
          >
            <div
              className={
                styles.tableTypeTemplate__tableWrapper_rwdTable__block_header
              }
            >
              <div
                className={
                  styles.tableTypeTemplate__tableWrapper_rwdTable__block_header__serial
                }
              >
                {
                  item.filter((data) =>
                    data.elementId.includes("serial")
                  )?.[0]?.[`fieldText${locale}`]
                }
              </div>
              <div
                className={
                  styles.tableTypeTemplate__tableWrapper_rwdTable__block_header__name
                }
              >
                {
                  item.filter(
                    (data) => data.elementId.split("_")[4] == 1
                  )?.[0]?.[`fieldText${locale}`]
                }
              </div>
            </div>
            <div
              className={
                styles.tableTypeTemplate__tableWrapper_rwdTable__block_body
              }
            >
              {header
                .filter(
                  (el) =>
                    !el.elementId.includes("serial") &&
                    !el.elementId.includes("view") &&
                    el.elementId !== "header_1"
                )
                .map((data, index) => {
                  const num = data.elementId.split("_")[1];
                  return (
                    <div
                      className={
                        styles.tableTypeTemplate__tableWrapper_rwdTable__block_body__content
                      }
                      key={index}
                    >
                      <div
                        className={
                          styles.tableTypeTemplate__tableWrapper_rwdTable__block_body__content_key
                        }
                      >
                        {data[`fieldText${locale}`]}
                      </div>
                      <div
                        className={
                          styles.tableTypeTemplate__tableWrapper_rwdTable__block_body__content_value
                        }
                      >
                        {
                          item.filter(
                            (data) => data.elementId.split("_")[4] == num
                          )?.[0]?.[`fieldText${locale}`]
                        }
                      </div>
                    </div>
                  );
                })}
            </div>

            {item.filter((data) => data.elementId.includes("viewButton"))?.[0]
              ?.fieldValue && (
              <Link
                className={
                  styles.tableTypeTemplate__tableWrapper_rwdTable__block_link
                }
                href={
                  item.filter((data) =>
                    data.elementId.includes("viewButton")
                  )?.[0]?.fieldValue
                }
                target="_blank"
              >
                <div
                  className={
                    styles.tableTypeTemplate__tableWrapper_rwdTable__block_link__icon
                  }
                >
                  <MdOutlineMovieCreation />
                </div>

                {
                  item.filter((data) =>
                    data.elementId.includes("viewButton")
                  )?.[0]?.[`fieldText${locale}`]
                }
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
