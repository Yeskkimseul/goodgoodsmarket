import React, { useState } from "react";
import Login from '../pages/Login.module.css';
import style from '../pages/form.module.css';

const Joininfo = () => {
    const [hide, setHide] = useState([true, true]);
    // 에러 상태 추가: 비밀번호 설명 에러
    const [pwDescError, setPwDescError] = useState(false);

    const onToggleHide = (index: number) => {
        setHide(prev => {
            const newHide = [...prev];
            newHide[index] = !newHide[index];
            return newHide;
        })
    }
    const [clickCount, setClickCount] = useState(0);

    let buttonText = '인증하기';
    let disabled = false;
    if (clickCount === 1) {
        buttonText = '재발송';
    } else if (clickCount >= 2) {
        buttonText = '인증완료';
        disabled = true;
    }
    const handleClick = () => {
        if (clickCount < 2) {
            setClickCount(clickCount + 1);
        }
    };

    // 외부에서 호출할 수 있도록 window에 함수 등록 (alert 후 설명 에러 표시)
    React.useEffect(() => {
        (window as any).setPwDescError = () => setPwDescError(true);
        (window as any).resetPwDescError = () => setPwDescError(false);
        return () => {
            delete (window as any).setPwDescError;
            delete (window as any).resetPwDescError;
        };
    }, []);

    return (
        <div className={Login.con} style={{ gap: "var(--space24)" }}>
            <div className={Login.title}>
                <img src="/images/login/logoimg_small.svg" alt="logo" className={Login.logo} />
                <h1>정보 입력</h1>
            </div>{/* title */}

            <div className={Login.inputbox}>
                <h4>
                    닉네임
                </h4>
                <input type='email' className={style.input} placeholder='닉네임을 입력해주세요' required />
            </div>{/* 닉네임 입력 */}

            <div className={Login.inputbox}>
                <h4>
                    이메일
                </h4>
                <div className={Login.inputboxlist}>
                    <div className={Login.phone}>
                        <input type='email' className={style.input} placeholder='abc@email.com' style={{width: 'auto'}}  required />
                        <button className={Login.phonebtn}
                            onClick={handleClick}
                            disabled={disabled}>{buttonText}</button>
                    </div>{/* phone */}
                    <input type='text' className={style.input} placeholder='인증번호를 입력해주세요' required />
                </div>
            </div>{/*전화번호 입력 */}

            <div className={Login.inputbox}>
                <h4>
                    비밀번호
                </h4>
                <div className={Login.password}>
                    <input type={hide[0] ? "password" : "text"} className={style.input} placeholder='비밀번호를 입력해주세요.' required />
                    {hide[0] ? (
                        <img
                            src="/images/icon/eye_off_20.svg"
                            alt='eye_off'
                            className={Login.inicon}
                            onClick={() => onToggleHide(0)} />
                    ) : (
                        <img
                            src="/images/icon/eye_on_20.svg"
                            alt='eye_on'
                            className={Login.inicon}
                            onClick={() => onToggleHide(0)} />
                    )}
                </div>
                <div className={style.inputdiscription}>
                    <div className={`${style.discriptionbullet} ${pwDescError ? style.error : ''}`}></div>
                    <div className={`${style.discriptiontext} ${pwDescError ? style.error : ''}`}>
                        {pwDescError ? "10자 이상 입력해주세요." : "영문, 특수문자 포함 10자 이상"}
                    </div>
                </div>
            </div>{/* 비밀번호 입력 */}


            <div className={Login.inputbox}>
                <h4>
                    비밀번호 확인
                </h4>
                <div className={Login.password}>
                    <input type={hide[1] ? "password" : "text"} className={style.input} placeholder='비밀번호를 다시 입력해주세요.' required />
                    {hide[1] ? (
                        <img
                            src="/images/icon/eye_off_20.svg"
                            alt='eye_off'
                            className={Login.inicon}
                            onClick={() => onToggleHide(1)} />
                    ) : (
                        <img
                            src="/images/icon/eye_on_20.svg"
                            alt='eye_on'
                            className={Login.inicon}
                            onClick={() => onToggleHide(1)} />
                    )}
                </div>
            </div>{/* 비밀번호 확인 */}

        </div >
    );
}

export default Joininfo;
