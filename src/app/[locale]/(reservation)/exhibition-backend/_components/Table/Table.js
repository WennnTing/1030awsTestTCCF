import React, { useEffect, useRef } from 'react';
import styles from './Table.module.scss';

const TableComponent = ({
    headers,
    data,
    renderActions,
    showCheckbox,
    selectedItems = [],
    onCheckboxChange
}) => {
    const tableRef = useRef(null);

    // 判斷是否全選
    const isAllSelected = data.length > 0 && data.every(row => selectedItems.includes(row.email));

    // 全選處理
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allEmails = data.map(row => row.email);
            onCheckboxChange(allEmails); // 全選，傳入所有的 email
        } else {
            onCheckboxChange([]); // 取消全選
        }
    };

    // 單個 checkbox 點擊事件
    const handleCheckboxChange = (email) => {
        onCheckboxChange(email); // 單選，傳入單個 email
    };

    useEffect(() => {
        if (tableRef.current) {
            // 設置 CSS 自定義屬性為表頭的長度
            tableRef.current.style.setProperty('--column-count', headers.length + (showCheckbox ? 2 : 1)); // +1 為操作欄, +1 為 checkbox
        }
    }, [headers, showCheckbox]);

    return (
        <table ref={tableRef} className={styles.tableWrapper}>
            <thead>
                <tr>
                    {showCheckbox && (
                        // 新增全選的 checkbox
                        <th className={styles.tableWrapper__th}>
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={handleSelectAll}
                            />
                        </th>
                    )}
                    {headers.map((header, index) => (
                        <th key={index} className={styles.tableWrapper__th}>
                            {header}
                        </th>
                    ))}
                    <th className={styles.tableWrapper__th}></th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={styles.tableWrapper__tr}>
                            {showCheckbox && (
                                <td className={styles.tableWrapper__td}>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(row.email)}
                                        onChange={() => handleCheckboxChange(row.email)}
                                    />
                                </td>
                            )}
                            {Object.keys(row).map((key, index) => {
                                if (key === 'companyId' || key === 'projectId' || key === 'memberId' || key === 'activityId') return null;
                                return (
                                    <td key={index} className={styles.tableWrapper__td}>
                                        {row[key]}
                                    </td>
                                );
                            })}
                            <td className={styles.tableWrapper__td}>
                                {renderActions ? renderActions(row) : null}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={headers.length + (showCheckbox ? 2 : 1)} className={styles.tableWrapper__td}>
                            暫無資料
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TableComponent;
