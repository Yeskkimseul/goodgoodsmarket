import { NavLink } from "react-router-dom";
import styles from './Nav.module.css';

const Nav = () => {
    return (
        <nav className={`${styles.nav} inner`}>
            <ul className={styles.menu}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
                        굿굿마켓
                    </NavLink>
                </li>
                     <li>
                    <NavLink to="/popular" className={({ isActive }) => (isActive ? styles.active : '')}>
                        인기굿즈
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/upload" className={({ isActive }) => (isActive ? styles.active : '')}>
                        업로드
                    </NavLink>
                </li>

            </ul>
        </nav>
    )
}
export default Nav;