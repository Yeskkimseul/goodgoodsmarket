import React, { useState } from "react";
import Login from '../pages/Login.module.css';
import style from '../pages/form.module.css';

const JoinPersonal = () => {
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

    // 본인인증 단계에서 required input 미입력 시 경고 및 에러 스타일 적용
    React.useEffect(() => {
        // 버튼이 아닌 외부에서 호출할 수 있도록 window에 함수 등록
        (window as any).validateJoinPersonal = () => {
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
                alert('모든 필수 정보를 입력해주세요.');
                return false;
            }
            return true;
        };
        return () => { delete (window as any).validateJoinPersonal; };
    }, []);

    return (
         <div className={Login.con} style={{ gap: "var(--space24)" }}>
            <div className={Login.title}>
                <img src="/images/login/logoimg_small.svg" alt="logo" className={Login.logo} />
                <h1>본인 인증</h1>
            </div>{/* title */}

              <div className={Login.inputbox}>
                <h4>
                    이름
                </h4>
                <input type='text' className={style.input} placeholder='이름을 입력해주세요' value={'홍길동'} required />
            </div>{/* 이름 입력 */}

            <div className={Login.inputbox}>
                <h4>
                    생년월일
                </h4>
                <input type='text' className={style.input} placeholder='생년월일 8자리를 입력해주세요' value={'14430101'} required />
            </div>{/* 생년월일 입력 */}

            <div className={Login.inputbox}>
                <h4>
                    전화번호
                </h4>
                <div className={Login.inputboxlist}>
                    <div className={Login.phone}>
                        <input type='text' className={style.input} placeholder='전화번호를 입력해주세요' value={'010000000000'} required />
                        <button className={Login.phonebtn}
                            onClick={handleClick}
                            disabled={disabled}>{buttonText}</button>
                    </div>{/* phone */}
                    <input type='text' className={style.input} placeholder='인증번호를 입력해주세요' value={'1234'} required />
                </div>
            </div>{/*전화번호 입력 */}
        </div>
    );
}

export default JoinPersonal;
