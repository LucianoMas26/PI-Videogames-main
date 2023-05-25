import React from "react"
import styles from "../Filters/Filters.module.css"
import { useSelector } from "react-redux"

export default function Filters({
  selectedOption,
  handleFilterRating,
  handleSortByName,
  handleCreated,
  handleFilterByGenre
}) {
  const genres = useSelector((state) => state.genres)
  return (
    <div className={styles.filters}>
      <div className={styles.filter}>
        <select id="sort" className={styles.select} onChange={handleSortByName}>
          <option value=""> Sort by </option>
          <option value="ascendent">A - Z</option>
          <option value="descendent">Z - A</option>
        </select>
      </div>
      <div className={styles.filter}>
        <select
          id="filter"
          className={styles.select}
          value={selectedOption}
          onChange={handleFilterRating}
        >
          <option value=""> Filter by </option>
          <option value="all">All games</option>
          <option value="popular">Most popular</option>
          <option value="unpopular">Less popular</option>
        </select>
      </div>
      <div className={styles.filter}>
        <select
          id="status"
          className={styles.select}
          value={selectedOption}
          onChange={handleCreated}
        >
          <option value=""> Select by </option>
          <option value="created">Created</option>
          <option value="existent">Existing</option>
        </select>
      </div>
      <div className={styles.filter}>
        <select
          id="genre"
          className={styles.select}
          value={selectedOption}
          onChange={handleFilterByGenre}
        >
          <option value=""> Genres </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
