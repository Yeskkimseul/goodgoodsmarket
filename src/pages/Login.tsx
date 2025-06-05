import style from '../pages/form.module.css'
import Logins from '../pages/Login.module.css'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();


  return (
    <div className={Logins.wrapper}>
      <div className={Logins.inner}>

        <div className={Logins.center}>
          <img src='/images/login/logoimg_big.svg' alt='굿굿마켓' className={Logins.logobig} />

          <div className={Logins.btns}>
            <div className={style.button_big} onClick={() => navigate('/login/email')} style={{ backgroundColor: 'var(--text-black)' }}>
              <img src='/images/icon/smartphone.svg' alt='휴대폰 아이콘' className={style.btn_icon} />
              휴대폰으로 로그인 </div>
            <div className={style.button_big} onClick={() => navigate('/login/phone')} style={{ backgroundColor: 'var(--bg-white)', color: 'var(--text-black)', border: '1px solid var(--stroke-lightE)' }}>
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
              <div className={Logins.socialicon}>
                <img src='/images/login/apple.svg' alt='애플 아이콘' className={Logins.icon} />
              </div>
                <div className={Logins.socialicon}>
                <img src='/images/login/google.svg' alt='구글 아이콘' className={Logins.icon} />
              </div>
              <div className={Logins.socialicon} style={{backgroundColor: '#00C73C'}}>
                <img src='/images/login/naver.svg' alt='네이버 아이콘' className={Logins.icon} />
              </div>
                <div className={Logins.socialicon}  style={{backgroundColor: '#1877F2'}}>
                <img src='/images/login/facebook.svg' alt='페북 아이콘' className={Logins.icon} />
              </div>
              </div>{/* social */}
          </div>{/* bottom */}

        </div>{/* center */}
      </div>{/* inner */}

    </div>
  )
}
export default Login;