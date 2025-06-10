import "../App.css"


const Layout2 = ({ children }: { children: React.ReactNode }) => {
    //children 컴포넌트 안에 들어가는 컨텐츠
    return (
        <div className="layout">
            <main className="inner">
                {children}
            </main>
        </div>
    )
}
export default Layout2;
//전체적으로 페이지들을 레이아웃으로 묶어줄 것