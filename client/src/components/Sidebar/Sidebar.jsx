import React from "react"
import styles from "../Sidebar/Sidebar.module.css"
import { Outlet } from "react-router-dom"
import { NavLink, Link } from "react-router-dom"
import image from "../../img/otherLogo.png"
import { RiHomeLine } from "react-icons/ri"
import { FaWpforms } from "react-icons/fa"
import { FiInfo } from "react-icons/fi"
import { BiDetail } from "react-icons/bi"
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link to="/home">
        <img className={styles.logo} src={image} alt="" />
      </Link>
      <ul className={styles.sidebarList}>
        <li>
          <RiHomeLine className={styles.homeIcon} />
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
          <FaWpforms className={styles.formIcon} />
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
          <BiDetail className={styles.detailIcon} />
          <NavLink
            to="/detail"
            className={({ isActive }) =>
              isActive ? styles.activeClassDetail : { color: "#93a8b4" }
            }
          >
            Detail
          </NavLink>
        </li>
        <li>
          <FiInfo className={styles.aboutIcon} />
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
