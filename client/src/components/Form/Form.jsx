import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postVideogame, getGenres, getPlatforms } from "../../actions"
import { useEffect, useState } from "react"
import styles from "../Form/Form.module.css"
import image from "../../img/formImage.jpg"
import Loading from "../Loading/Loading"
import {
  validateName,
  validateDescription,
  validatePlatforms,
  validateBackgroundImage,
  validateRating,
  validateReleased,
  validateGenres
} from "../../utils/validations"

export default function Form() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const genres = useSelector((state) => state.genres)
  const platforms = useSelector((state) => state.platforms)
  console.log(platforms)
  const [input, setInput] = useState({
    name: "",
    description: "",
    platforms: [],
    background_image: "",
    released: "",
    rating: 0,
    genres: []
  })
  const [errors, setErrors] = useState({})
  const [showPlatformModal, setShowPlatformModal] = useState(false)
  const [showGenreModal, setShowGenreModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(getGenres())
    dispatch(getPlatforms())
  }, [dispatch])

  useEffect(() => {
    if (genres.length > 0 && platforms.length > 0) {
      setIsLoading(false)
    }
  }, [genres, platforms])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    if (name === "released") {
      const numericValue = value.replace(/\D/g, "")
      const formattedValue = numericValue.replace(
        /(\d{2})(\d{2})(\d{4})/,
        "$1 $2 $3"
      )
      const validationError = validateReleased(formattedValue)

      setInput({
        ...input,
        [name]: formattedValue,
        error: {
          ...input.error,
          [name]: validationError
        }
      })
    } else {
      setInput({
        ...input,
        [name]: value
      })
    }

    console.log(input)
  }

  const handlePlatformChange = (event) => {
    const { value, checked } = event.target
    setInput((prevInput) => {
      if (checked) {
        return {
          ...prevInput,
          platforms: [...prevInput.platforms, value]
        }
      } else {
        return {
          ...prevInput,
          platforms: prevInput.platforms.filter(
            (platform) => platform !== value
          )
        }
      }
    })
  }
  const handleGenreChange = (event) => {
    const { value, checked } = event.target
    setInput((prevInput) => {
      if (checked) {
        return {
          ...prevInput,
          genres: [...prevInput.genres, value]
        }
      } else {
        return {
          ...prevInput,
          genres: prevInput.genres.filter((genre) => genre !== value)
        }
      }
    })
  }

  const togglePlatformModal = () => {
    setShowPlatformModal(!showPlatformModal)
  }

  const toggleGenreModal = () => {
    setShowGenreModal(!showGenreModal)
  }

  const validateForm = () => {
    const newErrors = {}
    const validations = {
      name: validateName,
      description: validateDescription,
      platforms: validatePlatforms,
      background_image: validateBackgroundImage,
      released: validateReleased,
      rating: validateRating,
      genres: validateGenres
    }

    Object.entries(validations).forEach(([field, validate]) => {
      const error = validate(input[field])
      if (error) {
        newErrors[field] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      dispatch(postVideogame(input))
      setInput({
        name: "",
        description: "",
        platforms: [],
        background_image: "",
        released: "",
        rating: 0,
        genres: []
      })
      alert("videogame created")
      navigate("/home")
    }
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.formContainer}>
          <button className={styles.buttonForm} onClick={() => navigate(-1)}>
            Go back
          </button>
          <div className={styles.imageContainer}>
            <img className={styles.sideImage} src={image} alt="" />
          </div>
          <div className={styles.formContent}>
            <div className={styles.formContainer}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <h2>Create your videogame</h2>
                <div>
                  <label>Nombre:</label>
                  <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={handleInputChange}
                    className={errors.name ? styles.errorInput : ""}
                    placeholder={errors.name || "videogame name.."}
                  />
                </div>
                <div>
                  <label>Description:</label>

                  <input
                    type="text"
                    value={input.description}
                    name="description"
                    onChange={handleInputChange}
                    className={errors.description ? styles.errorInput : ""}
                    placeholder={
                      errors.description || "videogame description.."
                    }
                  />
                </div>
                <div className={styles.inputFlex}>
                  <button type="button" onClick={togglePlatformModal}>
                    Select Platforms
                  </button>
                  {errors.platforms ? <p>{errors.platforms}</p> : null}
                </div>
                {showPlatformModal && (
                  <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                      <div className={styles.modalFlex}>
                        <h3 className={styles.modalTitle}>Select Platforms</h3>
                        <div className={styles.modalActions}>
                          <button
                            className={styles.closeButton}
                            type="button"
                            onClick={togglePlatformModal}
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                      <div className={styles.modalContent}>
                        {platforms.map((platform) => (
                          <label key={platform.id}>
                            <input
                              type="checkbox"
                              value={platform.name}
                              checked={input.platforms.includes(platform.name)}
                              onChange={handlePlatformChange}
                            />
                            {platform.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label>Image:</label>

                  <input
                    type="text"
                    value={input.background_image}
                    name="background_image"
                    onChange={handleInputChange}
                    className={errors.background_image ? styles.errorInput : ""}
                    placeholder={
                      errors.background_image || "videogame url image.."
                    }
                  />
                </div>
                <div>
                  <label>Released:</label>

                  <input
                    type="text"
                    value={input.released}
                    name="released"
                    onChange={handleInputChange}
                    className={errors.released ? styles.errorInput : ""}
                    placeholder={errors.released || "date released.."}
                  />
                </div>
                <div>
                  <label>Rating:</label>

                  <input
                    type="text"
                    value={input.rating}
                    name="rating"
                    onChange={handleInputChange}
                    className={errors.rating ? styles.errorInput : ""}
                    placeholder={errors.rating || "videogame rating.."}
                  />
                </div>
                <div className={styles.inputFlex}>
                  <button type="button" onClick={toggleGenreModal}>
                    Select Genre
                  </button>
                  {errors.genres ? <p>{errors.genres}</p> : null}
                </div>
                {showGenreModal && (
                  <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                      <div className={styles.modalFlex}>
                        <h3 className={styles.modalTitle}>Select Genre</h3>
                        <div className={styles.modalActions}>
                          <button
                            className={styles.closeButton}
                            type="button"
                            onClick={toggleGenreModal}
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                      <div className={styles.modalContent}>
                        {genres.map((genre) => (
                          <label key={genre.id}>
                            <input
                              type="checkbox"
                              value={genre.name}
                              checked={input.genres.includes(genre.name)}
                              onChange={handleGenreChange}
                            />
                            {genre.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <button className={styles.createButton} type="submit">
                  Create videogame
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
