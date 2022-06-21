const formatDate = (date, locale, removeDay = false) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  if (removeDay) delete options.day
  const now = new Date(date).toLocaleDateString(locale, options)

  return now
}

export default formatDate
