import React from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import styles from "./About.module.css"

const About = () => {
    return (
        <Layout>
            <Header type="type1" title="굿굿마켓 소개"/>
            <div className={styles.body}>

            </div>
        </Layout>
    )
}
export default About;