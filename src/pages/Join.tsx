import React, { useRef, useState } from 'react';
import Login from '../pages/Login.module.css'
import style from '../pages/form.module.css'
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import JoinCheck, { JoinCheckRef } from '../components/JoinCheck';
import Joininfo from '../components/Joininfo';
import JoinPersonal from '../components/JoinPersonal';
import JoinComplete from '../components/JoinComplete';

const Join = () => {
    const navigate = useNavigate();
    const joinCheckRef = useRef<JoinCheckRef>(null);
    // Joininfo input ref
    const joinInfoRef = useRef<any>(null);
    // 0: 약관동의, 1: 정보입력, 2: 본인인증, 3: 가입완료
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step === 0) {
            if (joinCheckRef.current && !joinCheckRef.current.isRequiredChecked()) {
                alert("필수 약관에 모두 동의해야 다음 단계로 진행할 수 있습니다.");
                return;
            }
            setStep(1);
        } else if (step === 1) {
            // input 값 검증
            const inputs = document.querySelectorAll('.' + style.input + '[required]');
            let hasEmpty = false;
            inputs.forEach(input => {
                if ((input as HTMLInputElement).value.trim() === '') {
                    hasEmpty = true;
                    (input as HTMLInputElement).classList.add(style.errpr);
                } else {
                    (input as HTMLInputElement).classList.remove(style.errpr);
                }
            });
            if (hasEmpty) {
                // 비밀번호 설명 에러 표시
                if (typeof (window as any).setPwDescError === 'function') {
                    (window as any).setPwDescError();
                }
                alert('모든 필수 정보를 입력해주세요.');
                return;
            } else {
                // 정상 입력 시 에러 설명 복구
                if (typeof (window as any).resetPwDescError === 'function') {
                    (window as any).resetPwDescError();
                }
            }
            setStep(2);
        } else if (step === 2) {
            // 본인인증 단계 input 값 검증
            // JoinPersonal에서 등록한 window.validateJoinPersonal 사용
            if (typeof (window as any).validateJoinPersonal === 'function') {
                const valid = (window as any).validateJoinPersonal();
                if (!valid) return;
            }
            setStep(3);
        } else if (step === 3) {
            navigate('/home');
        }
    };
    let buttonText = "다음";
    if (step ===2) buttonText = "가입완료"
    else if (step === 3) buttonText = "홈으로 가기";

    return (
        <div className={Login.wrapper}>
                <Header type='type1' title='회원가입' />

            <div className={Login.inner}>

                {step === 0 && <JoinCheck ref={joinCheckRef} />}
                {step === 1 && <Joininfo />}
                {step === 2 && <JoinPersonal />}
                {step === 3 && <JoinComplete />}

                <div className={style.button_big} onClick={handleNext}
                >
                    {buttonText}
                </div>
            </div>{/* inner */}
        </div>
    )
}
export default Join;