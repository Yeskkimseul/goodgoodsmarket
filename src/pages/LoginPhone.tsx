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
                        <h1>이메일로 로그인하기</h1>
                    </div>

                    <div className={Login.inputbox}>
                        <h4>
                            이메일
                        </h4>
                        <input type='email' className={style.input} placeholder='abc@email.com' value={'admin@email.com'} />
                    </div>{/* 이메일 입력 */}
                    <div className={Login.inputbox}>
                        <h4>
                            비밀번호
                        </h4>
                        <div className={Login.password}>
                            <input type={hide[0] ? "password" : "text"} className={style.input} placeholder='비밀번호를 입력해주세요.' value={1234} />
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
                    </div>{/* 비밀번호 입력 */}
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