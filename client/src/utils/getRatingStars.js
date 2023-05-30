export const getRatingStars = (rating, AiFillStar, AiOutlineStar) => {
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
