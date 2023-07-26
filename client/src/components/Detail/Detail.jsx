import React from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import styles from "../Detail/Detail.module.css"
import axios from "axios"
import { getRatingStars } from "../../utils/getRatingStars"
import Loading from "../Loading/Loading"
import starIcon from "../../img/starIcon.png"
import emptyStarIcon from "../../img/emptyStarIcon.png"

export default function Detail() {
  const { id } = useParams()
  const [videogame, setVideogame] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://pi-videogames-main-production-fa1b.up.railway.app/videogames/${id}`
        )
        if (data.name) {
          setVideogame(data)
        } else {
          alert("Videogame doesn't exist")
        }
      } catch (err) {
        console.log(err)
        window.alert("Videogame doesn't exist")
      }
      setIsLoading(false)
    }
    fetchData()
  }, [id])

  const { name, background_image, description, rating, genres } = videogame

  const backgroundImageStyle = {
    backgroundImage: `url(${background_image})`
  }
  const location = useLocation()

  const MAX_DESCRIPTION_LENGTH = 600

  return (
    <div className={styles.containerDetail}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.blackBackground}></div>
          <div
            className={styles.imageBackground}
            loading="lazy"
            style={backgroundImageStyle}
          ></div>
          <div className={styles.content}>
            <button
              className={styles.goBackButton}
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
            <div>
              {genres?.map((genre) => (
                <span key={genre} className={styles.genre}>
                  {genre}
                </span>
              ))}
            </div>
            <h1 className={styles.detailTitle}>{name}</h1>
            <p className={styles.detailDescription}>
              {description?.length > MAX_DESCRIPTION_LENGTH
                ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                : description}
            </p>
            <div className={styles.ratingDetailStars}>
              {getRatingStars(rating, starIcon, emptyStarIcon)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
