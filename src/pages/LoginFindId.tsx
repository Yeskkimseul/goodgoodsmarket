import React, { useState } from 'react';
import Login from '../pages/Login.module.css'
import { Link } from 'react-router-dom';
import style from '../pages/form.module.css'
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Layout2 from '../components/Layout2';

const LoginFindId = () => {
    const [hide, setHide] = useState([true, true]);
    const [email, setEmail] = useState('admin@email.com'); // 기본값 지정
    const [password, setPassword] = useState('1234');      // 기본값 지정
    const [emailError, setEmailError] = useState(false);
    const [pwError, setPwError] = useState(false);

    const onToggleHide = (index: number) => {
        setHide(prev => {
            const newHide = [...prev];
            newHide[index] = !newHide[index];
            return newHide;
        })
    }
    const navigate = useNavigate();

    return (
        <Layout2>
            <Header type='type1' title='로그인' />
            <div className={Login.inner}>
                <div className={Login.con}>
                    <div className={Login.title}>
                        <img src="/images/login/logoimg_small.svg" alt="logo" className={Login.logo} />
                        <h1>이메일로 로그인하기</h1>
                    </div>
                    <div className={Login.inputbox}>
                        <h4>이메일</h4>
                        <input
                            type='email'
                            className={emailError ? `${style.input} ${style.errpr}` : style.input}
                            placeholder='abc@email.com'
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                                if (emailError) setEmailError(false);
                            }}
                        />
                    </div>{/* 이메일 입력 */}
                    <div className={Login.inputbox}>
                        <h4>비밀번호</h4>
                        <div className={Login.password}>
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
                    onClick={() => {
                        if (email === 'admin@email.com' && password === '1234') {
                            setEmailError(false);
                            setPwError(false);
                            navigate('/home');
                        } else {
                            setEmailError(true);
                            setPwError(true);
                            alert('이메일 또는 비밀번호가 일치하지 않습니다.');
                        }
                    }}
                >
                    로그인
                </div>
            </div>{/* inner */}
        </Layout2>
    )
}
export default LoginFindId;