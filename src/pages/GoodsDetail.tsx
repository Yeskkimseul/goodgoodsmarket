import style from "./GoodsDetail.module.css"
import form from "./form.module.css"
import Header from "../components/header/Header";
import Layout2 from "../components/Layout2";

const GoodsDetail = () => {
    return (
        <Layout2>
            <Header type="type2" />
            굿즈디테일페이지


            <div className={style.bottom}>
                <div className={style.bts}>
                    <div className={form.button_big} style={{background: 'var(--bg-white)', color: 'var(--text-grey)', border: '1px solid var(--stroke-grey)'}}>
                        찜하기
                    </div>
                    <div className={form.button_big}>
                        채팅하기
                    </div>
                </div>
            </div>
        </Layout2>
    )

}

export default GoodsDetail;