import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { Commu } from "../types/commu";
import CommuCard from "../components/CommuCard"; 
import styles from './CardListLayout.module.css';

const Community = () =>{

      //커뮤니티 리스트 상태 추가
            const [commuList, setCommuList] = useState<Commu[]>([]);
    useEffect(() => {
        //커뮤니티 데이터 불러오기
        fetch('data/commu.json')
            .then((res) => res.json())
            .then((data) => setCommuList(data));
    },[]);

    return(
        <Layout>
           <div>
                {
                    commuList.map((item) => (
                        <CommuCard
                            key={item.id}
                            item={item}
                            className={styles.card}
                        />
                    ))
                }
            </div>
        </Layout>
    )

}

export default Community;