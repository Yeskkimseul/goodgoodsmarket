import styles from "./Trust.module.css"
import TrustModal from "./TrustModal";
import React, { useState } from "react";


interface TrustProps {
    trust: number; // sellerTrust 값 (0~100)
}

const Trust = ({ trust }: TrustProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => setIsModalOpen(prev => !prev);
    const handleCloseModal = () => setIsModalOpen(false);

    const getTrustBg = (trust: number) => {
        if (trust >= 70) return "var(--button-bgdefault)";
        if (trust >= 50) return "var(--text-validation)";
        return "var(--text-error)";
    };

    const getTrustImg = (trust: number) => {
        if (trust >= 70) return "/images/mypage/trust.svg";
        if (trust >= 50) return "/images/mypage/trust_g.svg";
        return "/images/mypage/trust_ss.svg";
    };

    return (

        <div className={styles.trust}>
            <div className={styles.top} style={{ position: "relative" }}>
                <h5>신뢰지수 - <span>굿굿</span></h5>
                <img src="/images/mypage/info.svg" alt="신뢰지수란?"
                    onClick={handleToggleModal}
                    style={{ cursor: "pointer" }}
                />
                {isModalOpen && (
                    <div>
                        <TrustModal onClose={handleCloseModal} />
                    </div>
                )}
            </div>
            <div className={styles.chart}>
                <div className={styles.chart_front} style={{
                    width: `${trust}%`,
                    background: getTrustBg(trust)
                }} >
                    <img
                        src={getTrustImg(trust)}
                        alt="신뢰도"
                        style={{ right: '-4px', left: "auto" }}
                    />
                </div>{/* //.chart_front */}
                <div className={styles.chart_bg}></div>
            </div>
        </div>
    )
}
export default Trust;