import React, { useState } from 'react';
import Login from '../pages/Login.module.css'
import { Link } from 'react-router-dom';
import style from '../pages/form.module.css'
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Layout2 from '../components/Layout2';

const LoginFindIdResult = () => {
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
                        <h1>계정 찾기</h1>
                    </div>

                    <div>
                        <p>
                            계정찾기가 완료되었습니다.
                        </p>
                        <div style={{
                            borderRadius: '8px', background: 'var(   --bg-lightE)', padding: 'var(--space16)', marginTop: 'var(--space16)', display: 'flex', justifyContent: 'space-between'
                        }}>
                            <span className='subtit2' style={{ color: 'var(  --text-black)' }}>
                                아이디
                            </span>
                            <span className='subtit2' style={{ color: 'var(  --text-black)' }}>
                                ad***@email.com
                            </span>
                        </div>
                    </div>

                </div>{/* inputlist */}
                <div className={style.button_big}
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    로그인하기
                </div>
            </div>{/* inner */}
        </Layout2>
    )
}
export default LoginFindIdResult;