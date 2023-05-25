import React from "react"
import styles from "./Card.module.css"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import image from "../../img/defaultImage.jpg"
const getRatingStars = (rating) => {
  const filledStars = Math.floor(rating)
  const emptyStars = 5 - filledStars

  const stars = []

  for (let i = 0; i < filledStars; i++) {
    stars.push(<AiFillStar key={`filled-star-${i}`} />)
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<AiOutlineStar key={`empty-star-${i}`} />)
  }

  return stars
}

const Card = ({
  name,
  background_image,
  rating,
  released,
  genres,
  platforms
}) => {
  const imageSource = background_image || image
  return (
    <div className={styles.card}>
      <img src={imageSource} alt={name} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3>{name}</h3>
        <div className={styles.ratingStars}>{getRatingStars(rating)}</div>
        <h5>Released: {released}</h5>
        <h5>Genres: {genres}</h5>
        <h5>Platforms: {platforms}</h5>
      </div>
    </div>
  )
}

export default Card
