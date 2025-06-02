import { NavLink } from "react-router-dom";
import styles from './Nav.module.css';

const Nav = () => {
    return (
        <nav className={`${styles.nav} inner`}>
            <ul className={styles.menu}>
                <li>
                    <NavLink to="/home" className={({ isActive }) => (isActive ? styles.active : '')}>
                        홈
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/community" className={({ isActive }) => (isActive ? styles.active : '')}>
                        커뮤니티
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/chat" className={({ isActive }) => (isActive ? styles.active : '')}>
                        채팅
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/mypage" className={({ isActive }) => (isActive ? styles.active : '')}>
                        마이페이지
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Nav;