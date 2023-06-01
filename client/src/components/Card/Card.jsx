import React from "react"
import styles from "./Card.module.css"
import starIcon from "../../img/starIcon.png"
import emptyStarIcon from "../../img/emptyStarIcon.png"
import { Link } from "react-router-dom"
import { getRatingStars } from "../../utils/getRatingStars"

const Card = ({
  id,
  name,
  background_image,
  rating,
  released,
  genres,
  platforms
}) => {
  return (
    <Link to={`/detail/${id}`}>
      <div className={styles.card}>
        <img
          src={background_image}
          loading="lazy"
          alt={name}
          className={styles.cardImage}
        />
        <div className={styles.cardContent}>
          <h3>{name}</h3>
          <div className={styles.ratingStars}>
            {getRatingStars(rating, starIcon, emptyStarIcon)}
          </div>
          <h5>Released: {released}</h5>
          <h5>Genres: {genres}</h5>
          <h5>Platforms: {platforms}</h5>
        </div>
      </div>
    </Link>
  )
}

export default Card
