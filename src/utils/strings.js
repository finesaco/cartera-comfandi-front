const fileTypes = {
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'text/csv': 'CSV'
}

export const convertSimpleFileType = (fileType) => {
  return fileTypes[fileType]
}
