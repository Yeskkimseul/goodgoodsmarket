import Layout from "../components/Layout"
import Header from "../components/header/Header";
import style from "./Notice.module.css"

const Notice = () => {
    return (
        <Layout>
            <Header type="type1" title="공지사항" />
            <div className={style.card}>
                <div className={style.cardLeft}>
                    <span className={style.categoryBox}>
                        안내
                    </span>
                    <h4 className={style.title}>
                        브랜드 콜라보 카페 관련 굿즈 등록 정책 변경 예정 안내
                    </h4>
                    <p className={style.userName}>굿굿지기</p>
                </div>
            </div>{/* card */}
            <div className={style.card}>
                <div className={style.cardLeft}>
                    <span className={style.categoryBox}>
                        이벤트
                    </span>
                    <h4 className={style.title}>
                        굿즈 박물관 공유하기 이벤트
                    </h4>
                    <p className={style.userName}>굿굿지기</p>
                </div>
            </div>{/* card */}
            <div className={style.card}>
                <div className={style.cardLeft}>
                    <span className={style.categoryBox} style={{backgroundColor:'var( --button-bgdisabled)', color: 'var(--button-textdisabled)'}}>
                        마감
                    </span>
                    <h4 className={style.title}>
                        (~07.01) 자체제작 굿즈 자랑대회
                    </h4>
                    <p className={style.userName}>굿굿지기</p>
                </div>
            </div>{/* card */}
        </Layout>
    )
}

export default Notice;
