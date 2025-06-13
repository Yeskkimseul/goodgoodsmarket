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
                        <img src="/images/about/BE.svg" alt="slogan" />
                        <img src="/images/about/slogan.svg" alt="slogan" />
                        <img src="/images/about/YOURSELF.svg" alt="slogan" />
                    </div>{/* //.slogan */}
                </div>{/* //.one */}

                <div className={styles.two}>
                    <div className={styles.inner}>
                        <div className={styles.txt1}
                        >
                            <span>찐팬</span>이라면 알아요.<br />
                            <div className={styles.underlineWrap}>
                                <i>굿즈 거래</i>
                                <img src="/images/about/underline.svg" alt="underline" className={styles.underlineSvg} />
                            </div>
                            , 아무데서나 못 하죠.</div>
                        <div className="body2">
                            좋아하는 마음이 담긴 굿즈, 아무 데나 올릴 수 없잖아요. 믿을 수 있는 곳에서, 같은 팬끼리 주고받는 게 마음 편하죠. 그래서 저희가 만들었어요.
                        </div>
                        <div className={styles.txt2}>덕질도, 거래도, 안심되는 공간.</div>
                    </div>{/* //.two_inner */}
                </div>{/* //.two */}

                <div className={styles.three}>
                    <img src="/images/about/about2.png" alt="굿굿마켓 소개 이미지" />
                    <div className={styles.inner}>
                        <div className={styles.txt3}>
                            서랍 속 굿즈, 이제는 <span className={styles.pink}>빛</span>을 볼 차례예요.
                        </div>
                        <div className="body2">
                            필요없는 굿즈는 판매하고, 원하는 굿즈는 교환으로 찾아보세요. 중고거래와 교환을 팬들끼리 쉽고 안전하게 주고받을 수 있는 굿즈 전용 거래 플랫폼입니다.
                        </div>{/* //.body2 */}
                        <img src="/images/about/icon.svg" alt="굿굿이" />
                    </div>{/* //.three_inner */}
                </div>{/* //.three */}
                <div className={styles.four}>
                    <img src="/images/about/about3.png" alt="굿굿마켓 소개 이미지" />
                    <div className={styles.inner}>
                        <div className={styles.txt3}>
                            덕질은 <span className={styles.mint}>함께</span>할 때 더 즐겁잖아요.
                        </div>
                        <div className="body2">
                            굿즈 거래만으로는 부족하니까, 덕후들끼리 자유롭게 소통할 수 있는 커뮤니티 공간도 함께 준비했어요. 자랑도, 후기 공유도, 소소한 정보 나눔도 이제는 굿굿마켓에서 부담 없이 즐기세요.
                        </div>{/* //.body2 */}
                    </div>{/* //.four_inner */}
                </div>{/* //.four */}
                <div className={styles.five}>
                    <img src="/images/about/about4.png" alt="굿굿마켓 소개 이미지" />
                    <div className={styles.inner}>
                        <div className={styles.txt3}>
                            <span className={styles.pink}>팬심</span>이 머무는 거래,<br />기억이 남는 커뮤니티
                        </div>
                        <div className="body2">
                            굿굿 마켓은 안전한 거래, 빠른 탐색, 깊은 팬심을 위한 굿즈 팬덤 생태계를 만들어갑니다.
                        </div>{/* //.body2 */}
                    </div>{/* //.three_inner */}
                </div>{/* //.three */}
            </div>{/* //.body */}
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