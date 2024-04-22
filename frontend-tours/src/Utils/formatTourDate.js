const formatTourDate = (date, duration) => {
  const startingDate = new Date(date)
  startingDate.setUTCHours(0, 0, 0, 0)
  const startingMonth = startingDate.toLocaleString('es-ES', { month: 'long' })
  const startingDay = startingDate.getUTCDate()
  if (duration === 1) {
    return `${startingDay.toString().padStart(2, '0')} de ${startingMonth.toString()}`
  }
  const endingDate = new Date(date)
  endingDate.setDate(endingDate.getDate() + duration - 1)
  const endingMonth = endingDate.toLocaleString('es-ES', { month: 'long' })
  const endingDay = endingDate.getUTCDate()

  if (startingMonth === endingMonth) {
    return `${startingDay.toString().padStart(2, '0')} al ${endingDay.toString().padStart(2, '0')} de ${startingMonth.toString()}`
  }
  return `${startingDay.toString().padStart(2, '0')} de ${startingMonth.toString()} al ${endingDay.toString().padStart(2, '0')} de ${endingMonth.toString()}`
}

export default formatTourDate
