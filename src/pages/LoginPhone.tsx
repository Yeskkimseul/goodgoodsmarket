import React, { useState } from 'react';
import Login from '../pages/Login.module.css'
import { Link } from 'react-router-dom';
import style from '../pages/form.module.css'
import { useNavigate } from 'react-router-dom';


const LoginPhone = () => {

    const [hide, setHide] = useState([true, true]);

    const onToggleHide = (index: number) => {
        setHide(prev => {
            const newHide = [...prev];
            newHide[index] = !newHide[index];
            return newHide;
        })
    }
    const navigate = useNavigate();

    return (
        <div className={Login.wrapper}>

            <div className={Login.inner}>

                <div className={Login.inputlist}>
                    <div className={Login.title}>
                        <img src="/images/login/logoimg_small.svg" alt="logo" className={Login.logo} />
                        <h1>휴대폰으로 로그인하기</h1>
                    </div>

                    <div className={Login.inputbox}>
                        <h4>
                            전화번호
                        </h4>
                        <div className={Login.phone}>
                        <input type='number' className={style.input} placeholder='전화번호를 입력해주세요' value={'00000000000'} />
                        <button className={Login.phonebtn}>인증하기</button>
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
export default LoginPhone;