import { NavLink, useNavigate } from "react-router-dom";
import styles from './Nav.module.css';

const Nav = () => {
    const navigate = useNavigate();
    const handleClick = (path: string) => {
        console.log('a')
        if (path.startsWith("/mypage")) {
            // 💥 Chatbase DOM 수동 제거
            const bubble = document.querySelector(".chatbase-bubble-container") as HTMLElement;
            if (bubble) { bubble.remove(); }

            const iframe = document.querySelector('iframe[src*="chatbase.co"]') as HTMLIFrameElement;
            if (iframe) iframe.remove();

            // 💥 필요 시 전역 상태도 초기화 가능 (optional)
            // window.chatbase = undefined;
        }

        navigate(path);
    };
    return (
        <nav className={`${styles.nav} `}>
            <ul className={styles.menu}>
                <li>
                    <NavLink to="/home" className={({ isActive }) => (isActive ? styles.active : '')}>
                        {({ isActive }) => (
                            <>
                                <img
                                    src={isActive ? "/images/nav/navhomeon.png" : "/images/nav/navhomeoff.png"}
                                    alt="홈"
                                    className={styles.icon}
                                />
                                홈
                            </>
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/community" className={({ isActive }) => (isActive ? styles.active : '')}>
                        {({ isActive }) => (
                            <>
                                <img
                                    src={isActive ? "/images/nav/navcomuon.png" : "/images/nav/navcomuoff.png"}
                                    alt="커뮤니티"
                                    className={styles.icon}
                                />
                                커뮤니티
                            </>
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/chat" className={({ isActive }) => (isActive ? styles.active : '')}>
                        {({ isActive }) => (
                            <>
                                <img
                                    src={isActive ? "/images/nav/navchaton.png" : "/images/nav/navchatoff.png"}
                                    alt="채팅"
                                    className={styles.icon}
                                />
                                채팅
                            </>
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/mypage" className={({ isActive }) => (isActive ? styles.active : '')}>
                        {({ isActive }) => (
                            <>
                                <img
                                    src={isActive ? "/images/nav/navmypageon.png" : "/images/nav/navmypageoff.png"}
                                    alt="마이페이지"
                                    className={styles.icon}
                                />
                                마이페이지
                            </>
                        )}
                    </NavLink>

                </li>
            </ul>
        </nav>
    )
}
export default Nav;