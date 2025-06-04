import React, { useState } from 'react';
import Login from '../pages/Login.module.css'
import { Link } from 'react-router-dom';
import style from '../pages/form.module.css'
import { useNavigate } from 'react-router-dom';
import { click } from '@testing-library/user-event/dist/click';
import Header from '../components/header/Header';


const Join = () => {


    const navigate = useNavigate();

    return (
        <div className={Login.wrapper}>

            <div className={Login.inner}>
                <Header type='type1' title='회원가입'/>
                <div className={Login.con}>
                </div>{/* con */}
                 <div className={style.button_big}
                >
                    다음
                </div>
            </div>{/* inner */}
        </div>
    )
}
export default Join;