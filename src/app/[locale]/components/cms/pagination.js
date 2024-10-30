"use client";
import styles from "./pagination.module.scss";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
export default function Pagination({ total, perPage, onPageChange }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(total / perPage);
  const page = parseInt(searchParams.get("page") || 1);

  const handlePageChange = (page) => {
    router.push(`${pathname}?page=${page}`);
  };

  const getDisplayPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1];
    if (page > 3) pages.push("...");
    if (page > 2) pages.push(page - 1);
    if (page !== 1 && page !== totalPages) pages.push(page);
    if (page < totalPages - 1) pages.push(page + 1);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  const displayPages = getDisplayPages();

  return (
    <div className={styles.cmsPagination}>
      <div>
        顯示第 {(page - 1) * perPage + 1} 到第 {Math.min(page * perPage, total)}{" "}
        項結果，共{total}項
      </div>
      <div className={styles.cmsPagination__container}>
        {page !== 1 && (
          <div
            onClick={() => handlePageChange(page - 1)}
            className={styles.cmsPagination__container_control}
          >
            <div className={styles.cmsPagination__container_control__icon}>
              <IoIosArrowBack />
            </div>
          </div>
        )}

        <ul className={styles.cmsPagination__container_pages}>
          {displayPages?.map((pageNumber, index) => (
            <li
              key={index}
              className={
                pageNumber === page
                  ? `${styles.cmsPagination__container_pages__item} ${styles.active}`
                  : styles.cmsPagination__container_pages__item
              }
              style={{
                cursor: pageNumber === "..." ? "default" : "pointer",
              }}
              onClick={() =>
                pageNumber === "..." || page === pageNumber
                  ? null
                  : handlePageChange(pageNumber)
              }
            >
              {pageNumber}
            </li>
          ))}
        </ul>
        {page !== totalPages && (
          <div
            className={styles.cmsPagination__container_control}
            onClick={() => handlePageChange(page + 1)}
          >
            <div className={styles.cmsPagination__container_control__icon}>
              <IoIosArrowForward />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
