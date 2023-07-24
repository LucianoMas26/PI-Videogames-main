import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom"
import styles from "../Nav/Nav.module.css"
import userIcon from "../../img/userIcon.png"
import searchIcon from "../../img/searchIcon.png"
import { useDispatch } from "react-redux"
import { filterVideogameName } from "../../actions"

export default function Nav() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    dispatch(filterVideogameName(searchQuery))
  }

  if (location.pathname === "/") {
    return null
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.flexNav}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <div className={styles.searchInputContainer}>
            <img src={searchIcon} className={styles.searchIcon} alt="" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search here..."
              className={styles.searchInput}
            />
          </div>
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        <img src={userIcon} className={styles.userIcon} alt="" />

        <Outlet />
      </div>
    </nav>
  )
}
