import React from "react"
import styles from "./Landing.module.css"
import videoGame from "../../videos/videoGame.mp4"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const navigate = useNavigate()

  const handleButton = (e) => {
    e.preventDefault()
    navigate("/home")
  }

  return (
    <div className={styles.landingPage}>
      <div className={styles.videoWrapper}>
        <video className={styles.videoBackground} autoPlay muted loop>
          <source src={videoGame} type="video/mp4" />
        </video>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>LET THE GAME BEGIN</h1>
        <button className={styles.landingButton} onClick={handleButton}>
          Start
        </button>
      </div>
    </div>
  )
}

export default LandingPage
