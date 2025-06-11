import React from "react";
import Styles from './TrustModal.module.css';

type TrustModalProps = {
    onClose: () => void;
}

const TrustModal: React.FC<TrustModalProps> = ({ onClose }) => {
    return (
        <> <div className={Styles.modalbg} onClick={onClose}></div>
            <div className={Styles.modalBackdrop} onClick={onClose}>
                <div className={Styles.modalContent} onClick={e => e.stopPropagation()}>
                    <div className={Styles.title}>
                        <h4>신뢰도 안내</h4>
                        <div onClick={onClose} className={Styles.closeBtn}><img src="/images/mypage/modal_x.svg" alt="닫기" style={{ cursor: "pointer" }} /></div>
                    </div>{/* //.title */}
                    <div className={Styles.list}>
                        <img src="/images/mypage/trust_gg.svg" alt="굿굿" />
                        <div><h5>굿굿 - </h5>&nbsp;신뢰도 70% 이상 : 믿고 거래할 수 있어요!</div>
                    </div>{/* //.list */}

                    <div className={Styles.list}>
                        <img src="/images/mypage/trust_g.svg" alt="굿" />
                        <div><h5>굿 - </h5>&nbsp;신뢰도 50% 이상 : 괜찮은 사용자예요.</div>
                    </div>{/* //.list */}

                    <div className={Styles.list}>
                        <img src="/images/mypage/trust_ss.svg" alt="쏘쏘" />
                        <div><h5>쏘쏘 - </h5>&nbsp;신뢰도 50% 미만 : 신중한 거래가 필요해요.</div>
                    </div>{/* //.list */}
                </div>
            </div>
        </>
    );
};

export default TrustModal;