import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getVideogames,
  filterVideogamesByRating,
  sortVideogamesByName,
  filterCreated,
  filterVideogamesByGenre
} from "../../actions/index"
import Card from "../Card/Card"
import styles from "../Home/Home.module.css"
import Pagination from "../Pagination/Pagination"
import Sidebar from "../Sidebar/Sidebar"
import Nav from "../Nav/Nav"
import Loading from "../Loading/Loading"
import Filters from "../Filters/Filters"
import { getGenres } from "../../actions/index"

export default function Home() {
  const dispatch = useDispatch()
  const allVideogames = useSelector((state) => state.videogames)
  const [currentPage, setCurrentPage] = useState(1)
  const [videogamePerPage, setVideogamePerPage] = useState(15)
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedSort, setSelectedSort] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  const indexOfLastVideogame = currentPage * videogamePerPage
  const indexOfFirstVideogame = indexOfLastVideogame - videogamePerPage
  const currentVideogame = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  )
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  useEffect(() => {
    const data = async () => {
      setIsLoading(true)

      try {
        await dispatch(getVideogames())
      } catch (error) {
        console.error("Error searching videogames:", error)
      }

      setIsLoading(false)
    }

    data()
  }, [dispatch])

  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  useEffect(() => {
    setCurrentPage(1)
  }, [allVideogames])

  const handleFilterRating = (e) => {
    const selectedOption = e.target.value
    setSelectedOption(selectedOption)
    if (selectedOption === "all") {
      dispatch(getVideogames())
    } else if (selectedOption === "popular") {
      dispatch(filterVideogamesByRating("popular"))
    } else if (selectedOption === "unpopular") {
      dispatch(filterVideogamesByRating("unpopular"))
    }
  }
  const handleSortByName = (e) => {
    const selectedOption = e.target.value
    setSelectedSort(selectedSort)
    if (selectedOption === "ascendent" || selectedOption === "descendent") {
      dispatch(sortVideogamesByName(selectedOption))
    }
  }

  const handleCreated = (e) => {
    const selectedOption = e.target.value
    if (selectedOption === "created") {
      dispatch(filterCreated("created"))
    } else if (selectedOption === "existent") {
      dispatch(filterCreated("existent"))
    }
  }

  const handleFilterByGenre = (e) => {
    const selectedOption = e.target.value
    setSelectedOption(selectedOption)
    dispatch(filterVideogamesByGenre(selectedOption))
  }

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <Sidebar />
          <Nav />
          <div className={styles.mainContent}>
            <Filters
              selectedOption={selectedOption}
              handleFilterRating={handleFilterRating}
              handleSortByName={handleSortByName}
              handleCreated={handleCreated}
              handleFilterByGenre={handleFilterByGenre}
            />
            <Pagination
              videogamePerPage={videogamePerPage}
              allVideogames={allVideogames}
              pagination={pagination}
              currentPage={currentPage}
            />
            <div className={styles.cardGrid}>
              {currentVideogame?.map((videogame) => {
                return (
                  <Card
                    id={videogame.id}
                    name={videogame.name}
                    background_image={videogame.background_image}
                    rating={videogame.rating}
                    released={videogame.released}
                    genres={videogame?.genres}
                    platforms={
                      videogame?.parent_platforms
                        ? videogame.parent_platforms
                        : videogame.platforms
                    }
                    key={videogame.id}
                    currentPage={currentPage}
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
