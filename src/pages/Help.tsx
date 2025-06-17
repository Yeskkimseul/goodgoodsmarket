import Layout from "../components/Layout"
import style from "./Help.module.css"
import Header from "../components/header/Header"
import form from "./form.module.css"

const Help = () => {
    return (
        <Layout>
            <Header type="type1" title="도움센터" />
            <div className={style.con}>
                <div className={style.content}>
                    <p className="subtitle2">도움이 필요하신가요?</p>
                    <ul className={style.helpinner}>
                        <li className={style.helpitem}>
                            <img src="/images/icon/alerm_warnning.svg" alt="신고" className={style.icon} />
                            <h4>신고하기</h4>
                        </li>
                        <li className={style.helpitem}>
                            <img src="/images/icon/twochat.svg" alt="신고내역" className={style.icon} />
                            <h4>신고내역</h4>
                        </li>
                        <li className={style.helpitem}>
                            <img src="/images/icon/warnning.svg" alt="패널티내역" className={style.icon} />
                            <h4>패널티 내역</h4>
                        </li>
                    </ul>
                </div>
                <div className={style.content}>
                    <p className="subtitle2">고객센터</p>
                    <div className={style.bts}>
                        <button className={form.button_big} style={{background:'var(--bg-white)', color: 'var(--text-grey)', border: '1px solid var(--stroke-grey)'}}>
                            1:1 문의하기
                        </button>
                        <button className={form.button_big} style={{background:'var(--bg-white)', color: 'var(--text-grey)', border: '1px solid var(--stroke-grey)'}}>
                            1:1 문의내역
                        </button>
                        <button className={form.button_big} style={{background:'var(--bg-white)', color: 'var(--text-grey)', border: '1px solid var(--stroke-grey)'}}>
                            FAQ
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Help;