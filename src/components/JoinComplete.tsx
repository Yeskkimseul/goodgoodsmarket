import React from "react";
import Login from '../pages/Login.module.css';
import { Link } from 'react-router-dom';
import style from '../pages/form.module.css';

const JoinComplete = () => {
    return (
        <div className={Login.con}>
            <div className={Login.title}>
                <img src="/images/login/logoimg_small.svg" alt="logo" className={Login.logo} />
                <h1>가입을 축하드립니다!</h1>
            </div>{/* title */}
        </div>
    );
}

export default JoinComplete;
