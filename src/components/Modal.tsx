import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    title: string;
    description: React.ReactNode;
    confirmText: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
    title,
    description,
    confirmText,
    onConfirm,
    onCancel,
    isOpen,
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.txt}>
                    <div className="subtit2">{title}</div>
                    <p>{description}</p>
                </div>
                <div className={styles.buttons} >
                    <button onClick={onCancel}>취소하기</button>
                    <button className={styles.confirm} onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;