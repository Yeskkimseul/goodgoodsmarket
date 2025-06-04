import React from 'react';
import Layout from "../components/Layout";
import Login from '../pages/Login.module.css'
import { Link } from 'react-router-dom';
import style from '../pages/form.module.css'


const LoginEmail = () => {


    return (
        <Layout>
            <div className={Login.wrapper}>

                <div className={Login.title}>
                    <img src="/images/login/logoimg_small.svg" alt="logo" className={Login.logo} />
                    <h1>이메일로 로그인하기</h1>
                </div>
                <div className={Login.inputbox}>
                    <h4>
                        이메일
                    </h4>
                    <input type='email' className={style.input} placeholder='abc@email.com' value={'admin@email.com'} />
                </div>
                 <div className={Login.inputbox}>
                    <h4>
                        비밀번호
                    </h4>
                    <input type='password' className={style.input} placeholder='비밀번호를 입력해주세요.' value={1234} />
                </div>
            </div>
        </Layout>
    )
}
export default LoginEmail;