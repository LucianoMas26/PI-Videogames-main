export const validateName = (name) => {
  const rejexName = /^[a-zA-Z\s]{1,25}$/
  if (name.trim() === "") {
    return "Name is required"
  }
  if (!rejexName.test(name)) {
    return "Name must be alphanumeric and have 25 characters or less"
  }
  return null
}

export const validateDescription = (description) => {
  const regexDescription = /^[a-zA-Z0-9\s]{1,}$/

  if (!regexDescription.test(description)) {
    return "Description must be alphanumeric"
  }

  return null
}

export const validatePlatforms = (platforms) => {
  if (platforms.length === 0) {
    return "Must pick at least one platform"
  }

  return null
}

export const validateBackgroundImage = (backgroundImage) => {
  const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/

  if (!urlRegex.test(backgroundImage)) {
    return "Please enter a valid image URL"
  }

  return null
}

export const validateReleased = (released) => {
  const dateRegex = /^\d{2}\s\d{2}\s\d{4}$/

  if (!dateRegex.test(released)) {
    return "Date must be in the format DD MM YYYY"
  }

  return null
}

export const validateRating = (rating) => {
  if (rating <= 0 || rating > 5) {
    return "Rating must be between 1 and 5"
  }

  return null
}

export const validateGenres = (genres) => {
  if (genres.length === 0) {
    return "Must pick at least one genre"
  }

  return null
}
