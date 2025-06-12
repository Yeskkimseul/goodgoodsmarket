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
            <Marquee>
                <ul>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                                        <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                    <li>되나보자...</li>
                </ul>
            </Marquee>

            </div>
        </Layout>
    )
}
export default About;