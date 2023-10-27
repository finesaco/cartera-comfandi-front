import ErrorAndLogout from '@/components/ErrorAndLogout'
import DownloadIcon from '@mui/icons-material/Download'
import UploadIcon from '@mui/icons-material/Upload'
import React, { useState, useEffect } from 'react'
import UploadDialog from '@/components/UploadDialog'
import { useDownloadFiles } from '@/hooks/useDownloadsFiles'
import { usePagination } from '@/hooks/usePagination'
import useData from '@/hooks/useData'
import { DropdownFilterButton, Filters, TableGrid } from '@/components'
import { GET_FONDEOS_URL, POST_PAGOS_FONDEO, PATH_REPORT } from '@/services/endpoints'
import { Box, Stack, Typography, Button } from '@mui/material'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined'
import { adapterBodyFondeo } from '@/services/adapters'
import { FILTERS_FONDEOS } from '@/utils/filters'
import { adapterFondeos } from '@/utils/adaptersTable'
import { formatearNumero } from '@/utils/numbers'

const Fondeos = () => {
  const [activeFilter, setActiveFilter] = useState(true)
  // filters
  const [state, setState] = useState('')
  const [anio, setAnio] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [xmil, setXmil] = useState('')
  const [total, setTotal] = useState('')
  const [npr, setNpr] = useState('')
  const [vlrdesembolso, setVlrDesembolso] = useState('')
  const [reintegro, setReintegro] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([])

  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const { downloadFile } = useDownloadFiles()
  const pagination = usePagination()

  const { data, isLoading, error, mutate } = useData({
    body: adapterBodyFondeo({ anio, mes: month, dia: day, estado: state, vlrdesembolso, reintegro, npr, xmil, total }),
    page: pagination.page,
    size: pagination.pageSize,
    url: GET_FONDEOS_URL
  })

  useEffect(() => {
    if (!activeFilter) {
      mutate()
      setActiveFilter(true)
    }
  }, [activeFilter])

  if (error) return <ErrorAndLogout error={error} />

  const columns = [
    {
      field: 'anio',
      headerName: 'Año',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'mes',
      headerName: 'Mes',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'dia',
      headerName: 'Día',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'npr',
      headerName: 'Crédito',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'xmil',
      headerName: '4 x mil',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'total',
      headerName: 'Total a pagar',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'vlrdesembolso',
      headerName: 'Valor desembolso',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'reintegro',
      headerName: 'Reintegro fondeo',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return <Typography sx={{ color: 'primary.main', fontWeight: '600' }}>{params.value}</Typography>
      }
    }
  ]

  const handleDates = (fieldName, value) => {
    switch (fieldName) {
      case 'state':
        setState(value)
        break
      case 'anio':
        setAnio(value)
        break
      case 'month':
        setMonth(value)
        break
      case 'day':
        setDay(value)
        break
      case 'xmil':
        setXmil(value)
        break
      case 'total':
        setTotal(value)
        break
      case 'reintegro':
        setReintegro(value)
        break
      case 'vlrdesembolso':
        setVlrDesembolso(value)
        break
      case 'npr':
        setNpr(value)
        break
      default:
        break
    }
  }
  const resetFilters = () => {
    setState('')
    setAnio('')
    setDay('')
    setMonth('')
    setXmil('')
    setTotal('')
    setNpr('')
    setVlrDesembolso('')
    setReintegro('')
    setActiveFilter(false)
  }

  const appliyFilters = () => {
    mutate()
    setActiveFilter(true)
  }

  const actionButton = [
    {
      title: 'Descargar reporte',
      icon: <DownloadIcon />,
      onClick: () => {
        downloadFile(
          { idDoc: 1 },
          adapterBodyFondeo({ anio, mes: month, dia: day, estado: state, vlrdesembolso, reintegro, npr, xmil, total }),
          PATH_REPORT,
          'Fondeos.xls'
        )
      }
    },
    {
      title: 'Cargar créditos Pagado',
      icon: <UploadIcon />,
      onClick: () => {
        setOpenDialog(true)
      }
    }
  ]

  return (
    <>
      <UploadDialog open={openDialog} close={setOpenDialog} title='Carga créditos pagados' url={POST_PAGOS_FONDEO} />
      <Box sx={{ padding: 3 }} display='grid' overflow='auto' gridTemplateRows='auto 1fr auto'>
        <Stack gap={1} sx={{ mb: 3 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}
          >
            <Stack spacing={1}>
              <Typography color='primary.main' sx={{ fontSize: '24px' }} fontWeight='600'>
                Fondeos{' '}
                <Typography component='span' color='grey.main' sx={{ fontSize: '16px' }} fontWeight='400'>
                  {`${isLoading ? 0 : data.totalElements} en total`}
                </Typography>
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <div>
                <Button onClick={() => setOpen(!open)} variant='text'>
                  {open ? <FilterListOffOutlinedIcon /> : <FilterListOutlinedIcon />}
                  {open ? 'Ocultar' : 'Mostrar'} filtros
                </Button>
              </div>
            </Stack>
          </Box>
          {open && (
            <Stack sx={{ gap: 1 }}>
              <DropdownFilterButton
                optionsList={FILTERS_FONDEOS}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
              <Filters
                clickResetFilters={resetFilters}
                handleFilterChange={handleDates}
                filters={{ state, anio, month, day, xmil, total, npr, vlrdesembolso, reintegro }}
                filtersProps={selectedOptions}
                clickApplyFilters={appliyFilters}
              />
            </Stack>
          )}
        </Stack>

        <TableGrid
          columns={columns}
          rows={isLoading ? [] : adapterFondeos(data.content)}
          pagination={pagination}
          count={isLoading ? 0 : data.totalElements}
          actionButton={actionButton}
        />
      </Box>
    </>
  )
}

export default Fondeos
