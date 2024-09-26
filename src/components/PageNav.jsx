import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useState } from "react";
function PageNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={styles.nav}>
      <Logo />
      <i
        className={`bx bx-${isOpen ? "x" : "menu"} menu-icon`}
        id="menu-icon"
        role="button"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      ></i>

      <ul className={isOpen ? styles.open : styles.closed}>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
