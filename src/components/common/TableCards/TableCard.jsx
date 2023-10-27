import { LinearProgress, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'

import {
  Container,
  MuiTable,
  MuiTableCell,
  MuiTableRow,
  TablePaginationActions,
  labelDisplayedRows
} from './components'
import OptionMenu from '@/components/OptionButton'

function TableCard({ count, head, body, pagination, isLoading, actions }) {
  return (
    <Container>
      <LinearProgress sx={{ visibility: isLoading ? 'visible' : 'hidden' }} />
      <TableContainer sx={{ overflow: 'auto' }}>
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow>
              {head.map((h) => (
                <MuiTableCell key={h}>{h}</MuiTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {body.map((b) => (
              <MuiTableRow key={b.id}>
                {Object.entries(b.fields).map(([key, field]) => (
                  <MuiTableCell key={key}>{field}</MuiTableCell>
                ))}
              </MuiTableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ display: 'flex', justifyContent: 'left' }}>
          <TablePagination
            ActionsComponent={TablePaginationActions}
            component='div'
            count={count}
            labelDisplayedRows={labelDisplayedRows}
            labelRowsPerPage='Filas por página'
            onPageChange={pagination.onPageChange}
            onRowsPerPageChange={pagination.onRowsPerPageChange}
            page={pagination.page}
            rowsPerPage={pagination.rowsPerPage}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <OptionMenu actions={actions} />
        </div>
      </div>
    </Container>
  )
}

export default TableCard
