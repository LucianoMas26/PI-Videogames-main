import React from "react"
import styles from "../Sidebar/Sidebar.module.css"
import { Outlet } from "react-router-dom"
import { NavLink, Link } from "react-router-dom"
import image from "../../img/otherLogo.png"
import houseIcon from "../../img/houseIcon.png"
import formIcon from "../../img/formIcon.png"
import cartIcon from "../../img/cartIcon.png"
import infoIcon from "../../img/infoIcon.png"
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link to="/home">
        <img className={styles.logo} src={image} alt="" />
      </Link>
      <ul className={styles.sidebarList}>
        <li>
          <img src={houseIcon} className={styles.homeIcon} alt="" />
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? styles.activeClassHome : { color: "#93a8b4" }
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <img src={formIcon} className={styles.formIcon} alt="" />
          <NavLink
            to="/form"
            className={({ isActive }) =>
              isActive ? styles.activeClassForm : { color: "#93a8b4" }
            }
          >
            Form
          </NavLink>
        </li>
        <li>
          <img src={cartIcon} className={styles.cartIcon} alt="" />
          <NavLink
            to="/detail"
            className={({ isActive }) =>
              isActive ? styles.activeClassDetail : { color: "#93a8b4" }
            }
          >
            Cart
          </NavLink>
        </li>
        <li>
          <img src={infoIcon} className={styles.aboutIcon} alt="" />
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.activeClassAbout : { color: "#93a8b4" }
            }
          >
            About
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}
export default Sidebar
