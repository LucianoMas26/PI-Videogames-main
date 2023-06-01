export const getRatingStars = (rating, starIcon, emptyStarIcon) => {
  const filledStars = Math.floor(rating)
  const emptyStars = 5 - filledStars

  const stars = []

  for (let i = 0; i < filledStars; i++) {
    stars.push(<img src={starIcon} key={`filled-star-${i}`} />)
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<img src={emptyStarIcon} key={`empty-star-${i}`} />)
  }

  return stars
}
