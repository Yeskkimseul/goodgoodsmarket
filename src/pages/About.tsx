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