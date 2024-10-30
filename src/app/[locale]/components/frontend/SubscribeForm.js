"use client";
import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './SubscribeForm.module.scss';
import { useTranslations } from 'next-intl';
import ImageLoader from '../global/image-loader';

const SubscribeForm = () => {
    const t = useTranslations("ContactUs");
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubscribeClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('fields[email]', email);
        formData.append('ml-submit', 1);
        formData.append('anticsrf', true);

        try {
            const response = await fetch('https://assets.mailerlite.com/jsonp/428266/forms/97923555168093220/subscribe', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsOpen(false);
                    setIsSuccess(false);
                    setEmail('');
                }, 3000);
            } else {
                alert('提交失敗，請重新嘗試');
            }
        } catch (error) {
            console.error("提交錯誤:", error);
            alert('提交失敗，請稍後再試。');
        }

        setIsSubmitting(false);
    };

    const modalContent = (
        <div className={styles.modal}>
            <div className={styles.modal__content}>
                <button onClick={handleClose} className={styles.modal__close}>
                    &times;
                </button>
                {!isSuccess ? (
                    <div
                        className={styles.modal__container}
                    >
                        <ImageLoader
                            src="/images/landing/subscribe/email-marketing.png"
                            alt="subscribe"
                            sizes={"100%"}
                            style={{ width: "30%", height: "30%" }}
                        />
                        <h4 className={styles.subscribe__title}>{t("subscribeContent")}</h4>
                        <form onSubmit={handleSubmit} className={styles.subscribe__form}>
                            <input
                                type="email"
                                name="fields[email]"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={styles.subscribe__input}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={styles.subscribe__submit}
                            >
                                {/* 訂閱 */}
                                {t("subscribeBtnText")}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <ImageLoader
                            src="/images/landing/subscribe/email-marketing.png"
                            alt="subscribe"
                            sizes={"100%"}
                            style={{ width: "30%", height: "30%" }}
                        />
                        <h4 className={styles.subscribe__title}>
                            {t("subscribeThxTitle")}
                        </h4>
                    </div>
                )}
            </div>
            <div className={styles.modal__overlay} onClick={handleClose}></div>
        </div>
    );

    return (
        <>
            <p onClick={handleSubscribeClick} className={styles.subscribe__button}>
                {t("subscribeTitle")}
            </p>
            {isOpen && createPortal(modalContent, document.body)}
        </>
    );
};

export default SubscribeForm;
