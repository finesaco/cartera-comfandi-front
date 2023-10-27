export const convertTimestampToDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString()
}

export const formatDate = (inputDate) => {
  // Divide la fecha en partes (año, mes, día)
  const parts = inputDate.split('-')

  // Concatena las partes para obtener el nuevo formato
  const formattedDate = parts.join('')

  return formattedDate
}