const useGetCurrentFormattedDate = () => {
  const formattedDate = new Date()
  // formattedDate.setUTCHours(0, 0, 0, 0)
  const year = formattedDate.getFullYear()
  const month = formattedDate.getMonth() + 1
  const day = formattedDate.getDate()
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export default useGetCurrentFormattedDate
