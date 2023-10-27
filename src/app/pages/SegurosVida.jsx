import ErrorAndLogout from '@/components/ErrorAndLogout'
import DownloadIcon from '@mui/icons-material/Download'
import React, { useState, useEffect } from 'react'
import { useDownloadFiles } from '@/hooks/useDownloadsFiles'
import { usePagination } from '@/hooks/usePagination'
import useData from '@/hooks/useData'
import { DropdownFilterButton, Filters, TableGrid } from '@/components'
import { GET_REPORTES_URL, GET_REPORTES_FILTER_UTL } from '@/services/endpoints'
import { Box, Stack, Typography, Button } from '@mui/material'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined'
import { adapterBodySeguros } from '@/services/adapters'
import { FILTERS_SEGUROS } from '@/utils/filters'
import { adapterSeguros } from '@/utils/adaptersTable'

const SegurosVida = () => {
  const [activeFilter, setActiveFilter] = useState(true)
  const [open, setOpen] = useState(false)

  const [anio, setAnio] = useState('')
  const [mes, setMes] = useState('')
  const [npr, setNpr] = useState('')
  const [placa, setPlaca] = useState('')
  const [nombre, setNombre] = useState('')
  const [vlrasegu, setVlrasegu] = useState('')
  const [aseguradora, setAseguradora] = useState('')
  const [fecini, setFecini] = useState('')
  const [fecfin, setFecfin] = useState('')

  const [selectedOptions, setSelectedOptions] = useState([])

  const { downloadFile } = useDownloadFiles()
  const pagination = usePagination()

  const { data, isLoading, error, mutate } = useData({
    body: adapterBodySeguros({ anio, mes, npr, placa, nombre, vlrasegu, aseguradora, fecini, fecfin }),
    reports: 2,
    page: pagination.page,
    size: pagination.pageSize,
    url: GET_REPORTES_FILTER_UTL
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
      headerName: 'Mes desembolso',
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
      field: 'placa',
      headerName: 'Placa',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'nombre',
      headerName: 'Cliente',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'vlrasegu',
      headerName: 'Valor vehículo',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'aseguradora',
      headerName: 'Aseguradora',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'fecini',
      headerName: 'Fecha inicio',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'fecfin',
      headerName: 'Fecha finalización',
      width: 'auto',
      flex: 1,
      headerClassName: 'super-app-theme--header'
    }
  ]

  const handleDates = (fieldName, value) => {
    switch (fieldName) {
      case 'anio':
        setAnio(value)
        break
      case 'mes':
        setMes(value)
        break
      case 'npr':
        setNpr(value)
        break
      case 'placa':
        setPlaca(value)
        break
      case 'nombre':
        setNombre(value)
        break
      case 'vlrasegu':
        setVlrasegu(value)
        break
      case 'aseguradora':
        setAseguradora(value)
        break
      case 'fecini':
        setFecini(value)
        break
      case 'fecfin':
        setFecfin(value)
        break
      default:
        break
    }
  }
  const resetFilters = () => {
    setAnio('')
    setMes('')
    setNpr('')
    setPlaca('')
    setNombre('')
    setVlrasegu('')
    setAseguradora('')
    setFecini('')
    setFecfin('')
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
          { tipoSeguro: 2 },
          adapterBodySeguros({ anio, mes, npr, placa, nombre, vlrasegu, aseguradora, fecini, fecfin }),
          GET_REPORTES_URL,
          'SegurosVida.xls'
        )
      }
    }
  ]

  return (
    <>
      <Box sx={{ padding: 3 }} display='grid' overflow='auto' gridTemplateRows='auto 1fr auto'>
        <Stack gap={1} sx={{ mb: 3 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}
          >
            <Stack spacing={1}>
              <Typography color='primary.main' sx={{ fontSize: '24px' }} fontWeight='600'>
                Seguros Vida{' '}
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
                optionsList={FILTERS_SEGUROS}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
              <Filters
                clickResetFilters={resetFilters}
                handleFilterChange={handleDates}
                filters={{ anio, mes, npr, placa, nombre, vlrasegu, aseguradora, fecini, fecfin }}
                filtersProps={selectedOptions}
                clickApplyFilters={appliyFilters}
              />
            </Stack>
          )}
        </Stack>
        <TableGrid
          columns={columns}
          rows={isLoading ? [] : adapterSeguros(data.content)}
          pagination={pagination}
          count={isLoading ? 0 : data.totalElements}
          actionButton={actionButton}
        />
      </Box>
    </>
  )
}

export default SegurosVida
