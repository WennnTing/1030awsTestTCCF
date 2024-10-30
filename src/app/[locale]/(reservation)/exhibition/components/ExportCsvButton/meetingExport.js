"use client";
import React from "react";
import styles from './exportButton.module.scss';
import { TiExportOutline } from "react-icons/ti";
import { usePathname } from "next/navigation";


const MeetingExportButton = ({ events }) => {
    const Swal = require('sweetalert2');
    const pathName = usePathname();
    const locale = pathName.split("/")[1];
    const handleExportCSV = () => {

        if (!events || events.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: locale === "en" ? 'No data available for export.' : '無可匯出的資料。',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        const csvRows = [];

        const headers = ["Start DateTime", "End DateTime", "Title", "Location", "Status", "Meet with"];
        csvRows.push(headers.join(','));

        events.forEach(event => {
            const participants = event.participants
                .map(participant => `${participant.name} (${participant.email})`)
                .join(" | ");

            const startDateTime = event.startDateTime.replace("T", " ");
            const endDateTime = event.endDateTime.replace("T", " ");

            const row = [
                startDateTime,
                endDateTime,
                event.subject,
                event.location,
                event.status,
                participants,
            ];
            csvRows.push(row.map(field => `"${field}"`).join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meeting_events.csv';
        a.click();
        URL.revokeObjectURL(url);
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

export default MeetingExportButton;
