import "../App.css"
import Nav from "./Nav"


const Layout = ({ children }: { children: React.ReactNode }) => {
    //children 컴포넌트 안에 들어가는 컨텐츠
    return (
        <div className="layout">
            <main className="inner">
                {children}
            </main>
            <footer>
                <div className="footer-inner">
                <Nav />
                </div>
            </footer>
        </div>
    )
}
export default Layout;
//전체적으로 페이지들을 레이아웃으로 묶어줄 것