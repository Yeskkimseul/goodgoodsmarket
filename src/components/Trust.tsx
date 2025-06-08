import styles from "./Trust.module.css"

const Trust = () => {
    return (
        <div className={styles.trust}>
            <div className={styles.top}>
            <h5>신뢰지수 - <span>굿굿</span></h5>
            <img src="/images/mypage/info.svg" alt="신뢰지수란?" />
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