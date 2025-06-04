import React, { useState } from 'react';
import Login from '../pages/Login.module.css'
import { Link } from 'react-router-dom';
import style from '../pages/form.module.css'
import { useNavigate } from 'react-router-dom';
import { click } from '@testing-library/user-event/dist/click';


const Joinphone = () => {

   const [clickCount, setClickCount] = useState(0);

    let buttonText = '인증하기';
    let disabled = false;
    if (clickCount ===1) {
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

   
    const navigate = useNavigate();

    return (
        <div className={Login.wrapper}>

            <div className={Login.inner}>

                <div className={Login.con}>
                    <div className={Login.title}>
                        <img src="/images/login/logoimg_small.svg" alt="logo" className={Login.logo} />
                        <h1>휴대폰으로 로그인하기</h1>
                    </div>

                    <div className={Login.inputbox}>
                        <h4>
                            전화번호
                        </h4>
                        <div className={Login.inputboxlist}>
                        <div className={Login.phone}>
                            <input type='number' className={style.input} placeholder='전화번호를 입력해주세요' value={'00000000000'} />
                            <button className={Login.phonebtn}
                            onClick={handleClick}
                            disabled={disabled}>{buttonText}</button>
                        </div>{/* phone */}
                        <input type='text' className={style.input} placeholder='인증번호를 입력해주세요' value={'1234'} />
                        </div>
                    </div>{/*전화번호 입력 */}

                </div>{/* inputlist */}

                <div className={style.button_big}
                    onClick={() => navigate('/home')}
                >
                    로그인
                </div>
            </div>{/* inner */}

        </div>
    )
}
export default Joinphone;