import React from 'react'
import Pagination from '@mui/material/Pagination'

export function CustomPagination(props) {
  const { paginateProps, setPaginateProps, totalPage } = props

  const paginate = (number) => {
    setPaginateProps({ ...paginateProps, currentPage: number - 1 })
  }

  return <Pagination sx={{ pt: 3 }} count={totalPage} onChange={(_, page) => paginate(page)} showFirstButton showLastButton />
}
