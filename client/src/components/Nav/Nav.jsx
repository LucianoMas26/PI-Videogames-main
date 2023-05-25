import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom"
import styles from "../Nav/Nav.module.css"
import { RiSearchLine } from "react-icons/ri"
import { FaUserCircle } from "react-icons/fa"
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
            <RiSearchLine className={styles.searchIcon} />
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

        <FaUserCircle className={styles.userIcon} />

        <Outlet />
      </div>
    </nav>
  )
}
