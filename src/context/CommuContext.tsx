import { createContext, useContext,useState } from "react";
import { Commu } from "../types/commu";

interface CommuContextType {
    commuList: Commu[]; //커뮤니티 리스트
    setCommuList: React.Dispatch<React.SetStateAction<Commu[]>>; //커뮤니티 리스트를 바꾸는 함수
}
//처음에는 내용이 없음
export const CommuContext = createContext<CommuContextType | null>(null);

export const useCommu = () => {
    const context = useContext(CommuContext);
    //context에서 값 꺼내기
    if (!context) {
        // 만약 CommuProvider 안에서 사용하지 않으면 에러를 보여줘요
        throw new Error('useCommu must be used within CommuProvider');
    }
    return context;
}

//전체 앱을 감싸서 커뮤니티 정보를 모두에게 나눠주는 컴포넌트
export const CommuProvider = ({children} : {children : React.ReactNode}) => {
    const [commuList,setCommuList] = useState<Commu[]>([])

    return(
        //context provider로 children 안의 모든 컴포넌트에게 데이터를 나눠줌
        <CommuContext.Provider value={{commuList,setCommuList}}>
            {children}
        </CommuContext.Provider>
    )
}