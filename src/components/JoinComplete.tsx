import React from "react";
import Login from '../pages/Login.module.css';
import { Link } from 'react-router-dom';
import style from '../pages/form.module.css';

const JoinComplete = () => {
    return (
        <div className={Login.con}>
            <div className={Login.center}>
            <div className={Login.title2}>
                <h1>
                    홍길동님,
                    <br />
                가입을 축하드립니다!</h1>
                <div className="caption" style={{color: "var(--text-grey)"}}>
                    굿즈는 나누고, 팬심은 더하고 – 시작해볼까요?
                </div>
            </div>{/* title */}

            </div>
        </div>
    );
}

export default JoinComplete;
