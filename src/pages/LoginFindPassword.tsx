import React, { useState } from 'react';
import Login from '../pages/Login.module.css'
import { Link } from 'react-router-dom';
import style from '../pages/form.module.css'
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Layout2 from '../components/Layout2';

const LoginFindPassword = () => {
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

    const [pwDescError, setPwDescError] = useState(false);
    // 외부에서 호출할 수 있도록 window에 함수 등록 (alert 후 설명 에러 표시)
    React.useEffect(() => {
        (window as any).setPwDescError = () => setPwDescError(true);
        (window as any).resetPwDescError = () => setPwDescError(false);
        return () => {
            delete (window as any).setPwDescError;
            delete (window as any).resetPwDescError;
        };
    }, []);


    const navigate = useNavigate();

    return (
        <Layout2>
            <Header type='type1' title=' ' />
            <div className={Login.inner}>
                <div className={Login.con}>
                    <div className={Login.title}>
                        <img src="/images/login/logoimg_small.svg" alt="logo" className={Login.logo} />
                        <h1>비밀번호 찾기</h1>
                    </div>
                    <div className={Login.inputbox}>
                        <h4>
                            이메일
                        </h4>
                        <div className={Login.inputboxlist}>
                            <div className={Login.phone}>
                                <input type='email' className={style.input} placeholder='abc@email.com' required value={'admin@email.com'} />
                                <button className={Login.phonebtn}
                                    onClick={handleClick}
                                    disabled={disabled}>{buttonText}</button>
                            </div>{/* phone */}
                            <input type='text' className={style.input} placeholder='인증번호를 입력해주세요' value={'1234'} required />
                        </div>
                    </div>{/*전화번호 입력 */}


                    <div className={Login.inputbox}>
                        <h4>
                            새 비밀번호
                        </h4>
                        <div className={Login.password}>
                            <input type={hide[0] ? "password" : "text"} className={style.input} placeholder='비밀번호를 입력해주세요.' required value={'123456789'} />
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
                            <input type={hide[1] ? "password" : "text"} className={style.input} placeholder='비밀번호를 다시 입력해주세요.' value={'123456789'} required />
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

                </div>{/* inputlist */}
                <div className={style.button_big}
                    onClick={() => {
                        alert('비밀번호 재설정이 완료되었습니다.');
                        navigate('/')
                    }}
                >
                    재설정
                </div>
            </div>{/* inner */}
        </Layout2>
    )
}
export default LoginFindPassword;