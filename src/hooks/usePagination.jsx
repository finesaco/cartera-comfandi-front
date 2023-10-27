import { useState } from 'react'

export const usePagination = () => {
  const [pagination, setPagination] = useState({
    pageSize: 50,
    page: 0
  })

  const handleChangePage = (_, page) => {
    setPagination((state) => ({ ...state, page }))
  }

  const handleChangeRowsPerPage = (event) => {
    const pageSize = parseInt(event.target.value, 10)
    setPagination((state) => ({ ...state, pageSize }))
    setPagination((state) => ({ ...state, page: 0 }))
  }

  return {
    ...pagination,
    setPagination,
    onRowsPerPageChange: handleChangeRowsPerPage,
    onPageChange: handleChangePage
  }
}
