import { TablePagination } from '@mui/material'
import React from 'react'
import OptionMenu from './OptionButton'
const Pagination = ({ pagination, count, actions }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
        <OptionMenu actions={actions} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
        <TablePagination
          component='div'
          count={count}
          labelRowsPerPage='Filas por página'
          onPageChange={pagination.onPageChange}
          onRowsPerPageChange={pagination.onRowsPerPageChange}
          page={pagination.page}
          rowsPerPage={pagination.pageSize}
        />
      </div>
    </div>
  )
}
export default Pagination
