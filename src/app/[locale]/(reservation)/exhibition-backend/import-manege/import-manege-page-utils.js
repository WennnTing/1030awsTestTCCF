import Swal from "sweetalert2";
import { API_ImportCompanies, API_ImportProjects } from "@/api/api";

// 複製error
export const showErrorWithCopy = (displayMessage, copyMessage) => {
    const plainTextCopyMessage = copyMessage.replace(/<[^>]+>/g, '');
    Swal.fire({
        icon: "warning",
        html: `
            <pre 
            style="
            text-align: left; 
            background: #f8f9fa; 
            padding: 10px; 
            border-radius: 5px;
            max-height: 200px;
            overflow-y: auto;
            word-break: break-all;
            white-space: pre-wrap;
            ">
                ${displayMessage}
            </pre>
            <div 
            style="
                display: flex; 
                justify-content: 
                space-between; 
                margin-top: 10px;
            ">
                <button id="copy-error-btn" 
                class="
                    swal2-confirm swal2-styled" 
                    style="flex: 1; 
                    margin-right: 5px;
                ">
                    複製錯誤訊息
                </button>
                <button 
                    id="ok-btn" 
                    class="
                    swal2-cancel swal2-styled" 
                    style="flex: 1;
                    margin-left: 5px;
                    ">
                    OK
                </button>
            </div>
        `,
        showConfirmButton: false,
        didOpen: () => {
            const copyButton = document.getElementById('copy-error-btn');
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(plainTextCopyMessage)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            text: "錯誤訊息已複製",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    })
                    .catch(err => {
                        console.error('複製失敗', err);
                        Swal.fire({
                            icon: "error",
                            text: "複製失敗，請手動選取並複製",
                            showConfirmButton: true,
                        });
                    });
            });

            const okBtn = document.getElementById('ok-btn');
            okBtn.addEventListener('click', () => {
                Swal.close();
            });
        }
    });
};


// 匯入會員(MARKET)
export const importMembers = async (base64File) => {
    try {
        if (!base64File) {
            Swal.fire({
                icon: "warning",
                text: "請先上傳檔案",
                showConfirmButton: true,
            });
            return;
        }

        const data = {
            CompaniesBase64: base64File,
        };
        const res = await API_ImportCompanies(JSON.stringify(data));

        const successEmails = res.success?.join('\n') || '';

        const duplicateKey = Object.keys(res.errors || {}).find(key => key.includes('Email已存在'));
        const duplicateEmails = res.errors?.[duplicateKey]?.join('\n') || '';

        const duplicateEmailsInFile = res.duplicateEmails?.join('\n') || '';

        if (duplicateEmailsInFile) {
            showErrorWithCopy(
                `<p>檔案內有重複的 Email，請修正後再試：</p>${duplicateEmailsInFile.replace(/\n/g, '<br>')}`,
                `檔案內有重複的 Email，請修正後再試：\n${duplicateEmailsInFile}`
            );
        } else if (successEmails && duplicateEmails) {
            showErrorWithCopy(
                `<p>以下資料匯入成功：</p>\n${successEmails}\n\n以下資料已重複，請修正後再試：\n${duplicateEmails}`,
                `<p>以下資料匯入成功：</p>\n${successEmails}\n\n以下資料已重複，請修正後再試：\n${duplicateEmails}`
            );
        } else if (successEmails) {
            Swal.fire({
                icon: "success",
                title: "匯入成功",
                html: `
                    <p>以下資料匯入成功：</p>
                    <pre style="text-align: left; background: #f8f9fa; padding: 10px; border-radius: 5px; max-height: 200px; overflow-y: auto; word-break: break-all; white-space:pre-wrap;">${successEmails.replace(/\n/g, '<br>')}</pre>
                `,
                showConfirmButton: true,
            });

        } else if (duplicateEmails) {
            showErrorWithCopy(
                `<p>檔案內的 Email 已經存在，請修正後再試：</p>${duplicateEmails.replace(/\n/g, '<br>')}`,
                `檔案內的 Email 已經存在，請修正後再試：\n${duplicateEmails}`
            );
        } else {
            Swal.fire({
                icon: "warning",
                text: res.message || "無成功匯入的資料",
                showConfirmButton: true,
            });
        }

    } catch (error) {
        console.error(error);
        showErrorWithCopy("匯入過程中發生錯誤，請稍後再試");
    }
};

// 匯入PROJECT
export const importProject = async (config) => {
    try {
        if (!config) {
            Swal.fire({
                icon: "warning",
                text: "請先上傳檔案",
                showConfirmButton: true,
            });
            return;
        }

        const data = config;

        const res = await API_ImportProjects(JSON.stringify(data));

        if (res && res.message && res.message.includes("匯入成功")) {
            Swal.fire({
                icon: "success",
                title: "匯入成功",
                showConfirmButton: false,
                timer: 1500,
            });
        }

        console.log(res);


    } catch (error) {

    }
}
