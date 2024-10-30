import styles from './exhibitionDialog.module.scss'
import { AiOutlineClose } from "react-icons/ai";
import { useTranslations } from 'next-intl';

export default function Dialog({ children, title, onClose, onClick, buttonText1, buttonText2, open, isSelect }) {
    const t = useTranslations("DialogBtn");
    return (
        open && (
            <div className={styles.exhibitionDialog}>
                <div className={`${styles.exhibitionDialog__container} ${isSelect ? styles.exhibitionDialog__isSelected : ''}`}>
                    <div className={styles.exhibitionDialog__header}>
                        <h3 className={styles.exhibitionDialog__title}>{title}</h3>

                        <span
                            className={styles.exhibitionDialog__close}
                            onClick={onClose}
                        >
                            <AiOutlineClose />
                        </span>

                    </div>
                    <div className={styles.exhibitionDialog__content}>
                        {children}
                    </div>

                    <div className={styles.exhibitionDialog__btnContainer}>

                        {buttonText1 && (
                            <button
                                className={styles.exhibitionDialog__btnContainer__btn}
                                onClick={onClose}>
                                {buttonText1}
                            </button>
                        )}

                        {buttonText2 && (
                            <button
                                className={styles.exhibitionDialog__btnContainer__save}
                                onClick={onClick}>
                                {buttonText2}
                            </button>
                        )}


                    </div>
                </div>
            </div>
        )

    );
}