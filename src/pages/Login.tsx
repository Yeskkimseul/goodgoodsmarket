import style from '../pages/form.module.css'
import Logins from '../pages/Login.module.css'
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from '../components/SplashScreen';


const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(() => {
    // 최초 접속이면 true, 아니면 false
    return !localStorage.getItem('splashShown');
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('splashShown', 'true'); // 최초 1회만 저장
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [loading]);


  if (loading) {
    return <SplashScreen />;
  }


  return (
    <div className={Logins.wrapper}>

      <div className={Logins.inner}>

        <div className={Logins.center}>
          <img src='/images/login/logoimg_big.svg' alt='굿굿마켓' className={Logins.logobig} />

          <div className={Logins.btns}>
            <div className={style.button_big} onClick={() => alert('준비 중입니다~')} style={{ backgroundColor: '#FEE500', color: '#191919' }}>
              <img src='/images/login/kakao.svg' alt='휴대폰 아이콘' className={style.btn_icon} />
              카카오로 로그인 </div>
            <div className={style.button_big} onClick={() => navigate('/login/phone')} style={{ backgroundColor: 'var(--text-black)' }}>
              <img src='/images/icon/smartphone.svg' alt='휴대폰 아이콘' className={style.btn_icon} />
              휴대폰으로 로그인 </div>
            <div className={style.button_big} onClick={() => navigate('/login/email')} style={{ backgroundColor: 'var(--bg-white)', color: 'var(--text-black)', border: '1px solid var(--stroke-lightE)' }}>
              <img src='/images/icon/mail.svg' alt='이메일 아이콘' className={style.btn_icon} />
              이메일로 로그인 </div>
          </div>{/* btns */}
          <div className={Logins.bottom}>
            <div className={Logins.textline}>
              <div className={Logins.Line}></div>
              <div className='body2'>
                또는
              </div>
              <div className={Logins.Line}></div>
            </div>{/* textline */}

            <div className={Logins.social}>
              <div className={Logins.socialicon} onClick={() => alert('준비 중입니다~')}>
                <img src='/images/login/apple.svg' alt='애플 아이콘' className={Logins.icon} />
              </div>
              <div className={Logins.socialicon} onClick={() => alert('준비 중입니다~')}>
                <img src='/images/login/google.svg' alt='구글 아이콘' className={Logins.icon} />
              </div>
              <div className={Logins.socialicon} style={{ backgroundColor: '#00C73C' }} onClick={() => alert('준비 중 입니다~')}>
                <img src='/images/login/naver.svg' alt='네이버 아이콘' className={Logins.icon} />
              </div>
              <div
                className={Logins.socialicon} onClick={() => alert('준비 중입니다~')}
                style={{
                  background:
                    'radial-gradient(61.46% 59.09% at 36.25% 96.55%, #FFD600 0%, #FF6930 48.44%, #FE3B36 73.44%, rgba(254, 59, 54, 0.00) 100%), radial-gradient(202.83% 136.37% at 84.5% 113.5%, #FF1B90 24.39%, #F80261 43.67%, #ED00C0 68.85%, #C500E9 77.68%, #7017FF 89.32%)'
                }}
              >
                <img src='/images/login/instargram.svg' alt='인스타그램 아이콘' className={Logins.icon
                } />
              </div>
            </div>{/* social */}
            <div className={Logins.option}>
              <Link to='/join' className='caption'>회원가입</Link>

              <Link to='#' className='caption'>비밀번호 재설정</Link>

              <Link to='#' className='caption'>계정 찾기</Link>

              <Link to='#' className='caption'>문의하기</Link>
            </div>
          </div>{/* bottom */}

        </div>{/* center */}
      </div>{/* inner */}

    </div >
  )
}
export default Login;