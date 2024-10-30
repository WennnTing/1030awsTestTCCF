"use client";
import React from "react";
import styles from './exportButton.module.scss';
import { TiExportOutline } from "react-icons/ti";
import { usePathname } from "next/navigation";

const ActivitiesExportButton = ({ events }) => {
    const Swal = require('sweetalert2');
    const pathName = usePathname();
    const locale = pathName.split("/")[1];
    const handleExportCSV = () => {
        const csvRows = [];
        const headers = ["Start DateTime", "End DateTime", "Activity Name", "Location"];

        csvRows.push(headers.join(','));

        if (events && events.data && events.data.length > 0) {
            events.data.forEach(activity => {
                const startDateTime = activity.activityStartTime.replace("T", " ");
                const endDateTime = activity.activityEndTime.replace("T", " ");
                const row = [
                    startDateTime,
                    endDateTime,
                    activity.activityName,
                    activity.location,
                ];
                csvRows.push(row.map(field => `"${field}"`).join(','));
            });

            const csvContent = csvRows.join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'activities.csv';
            a.click();
            URL.revokeObjectURL(url);
        } else {
            Swal.fire({
                icon: 'warning',
                title: locale === "en" ? 'No data available for export.' : '無可匯出的資料。',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className={styles.exportButton__button} onClick={handleExportCSV}>
            <div className={styles.exportButton__buttonBlock}>
                <div className={styles.exportButton__icon}>
                    <TiExportOutline />
                </div>
                {locale === "en" ? "Export CSV" : "匯出CSV"}
            </div>
        </div>
    );
};

export default ActivitiesExportButton;
