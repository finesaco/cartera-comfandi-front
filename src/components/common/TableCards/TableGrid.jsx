import { DataGrid } from '@mui/x-data-grid'
import { Container } from './components'
import React from 'react'
import { Pagination } from '@/components'

export default function TableGrid({ rows, columns, pagination, count, handleRowData, loading, actionButton }) {
  const handleCellClick = (params) => {
    const rowData = params.row
    handleRowData(rowData.id)
  }

  return (
    <Container
      sx={{
        '& .super-app-theme--header': {
          backgroundColor: '#F5F5F5'
        }
      }}
    >
      <DataGrid
        rows={rows}
        rowCount={count}
        columns={columns}
        loading={loading}
        paginationModel={{ page: pagination.page, pageSize: pagination.pageSize }}
        onPaginationModelChange={pagination.setPagination}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationMode='server'
        onCellClick={handleCellClick}
        slots={{ footer: () => <Pagination pagination={pagination} count={count} actions={actionButton} /> }}
      />
    </Container>
  )
}
