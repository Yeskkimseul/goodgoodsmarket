import React from "react";
import Splash from "./SplashScreen.module.css"


const SplashScreen = () => {
    //children 컴포넌트 안에 들어가는 컨텐츠
    return (
        <div className={Splash.wrapper}>
            <div className={Splash.inner}>
                <img src='/images/splash/logo.svg' alt='굿굿마켓' className={Splash.logo} />
                <img src='/images/splash/BE.svg' alt='BE' className={Splash.BE} />
                <img src='/images/splash/YOURSELF.svg' alt='Yourself' className={Splash.YOURSELF} />
            </div>
        </div>
    )
}
export default SplashScreen;
//전체적으로 페이지들을 레이아웃으로 묶어줄 것