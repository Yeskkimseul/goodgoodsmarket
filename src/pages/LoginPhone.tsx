import style from '../pages/form.module.css'
import Logins from '../pages/Login.module.css'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';

const Login = () => {
    const [hide, setHide] = useState([true, true]);
    const [clickCount, setClickCount] = useState(0);
    const [phone, setPhone] = useState('00000000000');
    const [password, setPassword] = useState('1234');
    const [phoneError, setPhoneError] = useState(false);
    const [pwError, setPwError] = useState(false);
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

    const onToggleHide = (index: number) => {
        setHide(prev => {
            const newHide = [...prev];
            newHide[index] = !newHide[index];
            return newHide;
        })
    }
    const navigate = useNavigate();


    return (
        <div className={Logins.wrapper}>
            <Header type='type1' title='로그인' />
            <div className={Logins.inner}>
                <div className={Logins.con}>
                    <div className={Logins.title}>
                        <img src="/images/login/logoimg_small.svg" alt="logo" className={Logins.logo} />
                        <h1>휴대폰으로 로그인하기</h1>
                    </div>
                    <div className={Logins.inputbox}>
                        <h4>전화번호</h4>
                        <div className={Logins.inputboxlist}>
                            <div className={Logins.phone}>
                                <input
                                    type='number'
                                    className={phoneError ? `${style.input} ${style.errpr}` : style.input}
                                    placeholder='전화번호를 입력해주세요'
                                    value={phone}
                                    onChange={e => {
                                        setPhone(e.target.value);
                                        if (phoneError) setPhoneError(false);
                                    }}
                                />
                            </div>{/* phone */}
                        </div>
                    </div>{/*전화번호 입력 */}
                    <div className={Logins.inputbox}>
                        <h4>비밀번호</h4>
                        <div className={Logins.password}>
                            <input
                                type={hide[0] ? "password" : "text"}
                                className={pwError ? `${style.input} ${style.errpr}` : style.input}
                                placeholder='비밀번호를 입력해주세요.'
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                    if (pwError) setPwError(false);
                                }}
                            />
                            {hide[0] ? (
                                <img
                                    src="/images/icon/eye_off_20.svg"
                                    alt='eye_off'
                                    className={Logins.inicon}
                                    onClick={() => onToggleHide(0)} />
                            ) : (
                                <img
                                    src="/images/icon/eye_on_20.svg"
                                    alt='eye_on'
                                    className={Logins.inicon}
                                    onClick={() => onToggleHide(0)} />
                            )}
                        </div>
                    </div>{/* 비밀번호 입력 */}
                </div>{/* inputlist */}
                <div className={style.button_big}
                    onClick={() => {
                        if (phone === '00000000000' && password === '1234') {
                            setPhoneError(false);
                            setPwError(false);
                            navigate('/home');
                        } else {
                            setPhoneError(true);
                            setPwError(true);
                            alert('전화번호 또는 비밀번호가 일치하지 않습니다.');
                        }
                    }}
                >
                    로그인
                </div>
            </div>{/* inner */}
        </div>
    )
}
export default Login;