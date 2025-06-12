import React from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import styles from "./About.module.css"
import Marquee from "react-fast-marquee";

const About = () => {
    return (
        <Layout>
            <Header type="type1" title="굿굿마켓 소개" />
            <div className={styles.body}>
                <div className={styles.one}>
                    <img src="/images/about/about1.png" alt="굿굿마켓 소개" />
                    <div className={styles.slogan}>
                        <img src="/images/about/be.svg" alt="slogan" />
                        <img src="/images/about/slogan.svg" alt="slogan" />
                        <img src="/images/about/yourself.svg" alt="slogan" />
                    </div>{/* //.slogan */}
                </div>{/* //.one */}
                <div className={styles.two}>
                    <div className={styles.two_inner}>
                        <div className={styles.two_txt1}><span>찐팬</span>이라면 알아요.<br />
                            <i>굿즈 거래</i>, 아무데서나 못 하죠.</div>
                        <div className="body2">
                            좋아하는 마음이 담긴 굿즈, 아무 데나 올릴 수 없잖아요.<br />믿을 수 있는 곳에서, 같은 팬끼리 주고받는 게 마음 편하죠.<br />그래서 저희가 만들었어요.
                        </div>
                        <h3>덕질도, 거래도, 안심되는 공간.</h3>
                    </div>
                </div>{/* //.two */}

            </div>
            <div className={styles.bgbg}>
                <img src="/images/about/muzi.png" alt="배경" />
                <div className={styles.marquee}>
                    <Marquee speed={30}>
                        <div>
                            <img src="/images/about/marquee1.svg" alt="굿굿마켓" className={styles.mi} />
                            <img src="/images/about/marquee2.svg" alt="슬로건" className={styles.mi} />
                            <img src="/images/about/marquee1.svg" alt="굿굿마켓" className={styles.mi} />
                            <img src="/images/about/marquee2.svg" alt="슬로건" className={styles.mi} />
                            <img src="/images/about/marquee1.svg" alt="굿굿마켓" className={styles.mi} />
                            <img src="/images/about/marquee2.svg" alt="슬로건" className={styles.mi} />
                        </div>
                    </Marquee>
                </div>
                <div className={styles.imgscroll}>
                    <div className={styles.scroll}>
                        <Marquee direction="right" speed={30}>
                            <div>
                                <img src="/images/about/scrolltop1.png" alt="굿굿마켓" />
                                <img src="/images/about/scrolltop2.png" alt="굿굿마켓" />
                                <img src="/images/about/scrolltop3.png" alt="굿굿마켓" />
                                <img src="/images/about/scrolltop4.png" alt="굿굿마켓" />
                                <img src="/images/about/scrolltop5.png" alt="굿굿마켓" />
                                <img src="/images/about/scrolltop6.png" alt="굿굿마켓" />
                                <img src="/images/about/scrolltop7.png" alt="굿굿마켓" />
                                <img src="/images/about/scrolltop5.png" alt="굿굿마켓" />
                            </div>
                        </Marquee>
                    </div>
                    <div className={styles.scroll}>
                        <Marquee speed={40}>
                            <div>
                                <img src="/images/about/scrollbottom1.png" alt="굿굿마켓" />
                                <img src="/images/about/scrollbottom2.png" alt="굿굿마켓" />
                                <img src="/images/about/scrollbottom3.png" alt="굿굿마켓" />
                                <img src="/images/about/scrollbottom4.png" alt="굿굿마켓" />
                                <img src="/images/about/scrollbottom5.png" alt="굿굿마켓" />
                                <img src="/images/about/scrollbottom6.png" alt="굿굿마켓" />
                                <img src="/images/about/scrollbottom7.png" alt="굿굿마켓" />
                                <img src="/images/about/scrollbottom5.png" alt="굿굿마켓" />
                            </div>
                        </Marquee>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default About;