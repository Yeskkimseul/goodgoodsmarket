import React, { useState } from 'react';
import Login from '../pages/Login.module.css'
import { Link } from 'react-router-dom';
import style from '../pages/form.module.css'
import { useNavigate } from 'react-router-dom';
import { click } from '@testing-library/user-event/dist/click';


const Join = () => {

   
    const navigate = useNavigate();

    return (
        <div className={Login.wrapper}>

        Join페이지입니다

        </div>
    )
}
export default Join;