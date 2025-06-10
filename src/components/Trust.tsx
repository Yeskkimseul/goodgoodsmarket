import styles from "./Trust.module.css"
import TrustModal from "./TrustModal";
import React, { useState } from "react";

const Trust = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => setIsModalOpen(prev => !prev);
    const handleCloseModal = () => setIsModalOpen(false);

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
                <div className={styles.chart_front}>
                    <img src="/images/mypage/trust.svg" alt="신뢰도" />
                </div>{/* //.chart_front */}
                <div className={styles.chart_bg}></div>
            </div>
        </div>
    )
}
export default Trust;