import ErrorAndLogout from '@/components/ErrorAndLogout'
import DownloadIcon from '@mui/icons-material/Download'
import React, { useState, useEffect } from 'react'
import { useDownloadFiles } from '@/hooks/useDownloadsFiles'
import { usePagination } from '@/hooks/usePagination'
import useData from '@/hooks/useData'
import { DropdownFilterButton, Filters, TableGrid } from '@/components'
import { GET_COLECTIVA_VIDA_URL, PATH_REPORT } from '@/services/endpoints'
import { Box, Stack, Typography, Button } from '@mui/material'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined'
import { adapterBodyColectivaVida } from '@/services/adapters'
import { FILTERS_COLECTIVAS_VIDA } from '@/utils/filters'
import { adapterColectivaVida } from '@/utils/adaptersTable'
import { formatearNumero } from '@/utils/numbers'

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
    field: 'ttlasegur',
    headerName: 'Total asegurados',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'vlrprima',
    headerName: 'Valor primas',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return formatearNumero(params.value)
    }
  },
  {
    field: 'pagoASEGURADORA',
    headerName: 'Pago Aseguradora',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'vlrcomfandi',
    headerName: 'Valor comisión Comfandi',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return formatearNumero(params.value)
    }
  },
  {
    field: 'estadoCOMISION',
    headerName: 'Estado Comisión Comfandi',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return <Typography sx={{ color: 'primary.main', fontWeight: '600' }}>{params.value}</Typography>
    }
  },
  {
    field: 'vlrfinesa',
    headerName: 'Valor comisión Finesa',
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

const ColectivaVida = () => {
  const [activeFilter, setActiveFilter] = useState(true)
  // filters
  const [anio, setAnio] = useState('')
  const [estado, setEstado] = useState('')
  const [estadoCOMISION, setEstadoCOMISION] = useState('')
  const [mes, setMes] = useState('')
  const [pagoASEGURADORA, setPagoASEGURADORA] = useState('')
  const [ttlasegur, setTtlasegur] = useState('')
  const [vlrcomfandi, setVlrcomfandi] = useState('')
  const [vlrfinesa, setVlrfinesa] = useState('')
  const [vlrprima, setVlrprima] = useState('')
  const [open, setOpen] = useState(false)

  const [selectedOptions, setSelectedOptions] = useState([])

  const { downloadFile } = useDownloadFiles()
  const pagination = usePagination()

  const { data, isLoading, error, mutate } = useData({
    body: adapterBodyColectivaVida({
      anio,
      estado,
      estadoCOMISION,
      mes,
      pagoASEGURADORA,
      ttlasegur,
      vlrcomfandi,
      vlrfinesa,
      vlrprima
    }),
    page: pagination.page,
    size: pagination.pageSize,
    url: GET_COLECTIVA_VIDA_URL
  })

  useEffect(() => {
    if (!activeFilter) {
      mutate()
      setActiveFilter(true)
    }
  }, [activeFilter])

  if (error) return <ErrorAndLogout error={error} />

  const handleDates = (fieldName, value) => {
    switch (fieldName) {
      case 'anio':
        setAnio(value)
        break
      case 'estado':
        setEstado(value)
        break
      case 'estadoCOMISION':
        setEstadoCOMISION(value)
        break
      case 'mes':
        setMes(value)
        break
      case 'pagoASEGURADORA':
        setPagoASEGURADORA(value)
        break
      case 'ttlasegur':
        setTtlasegur(value)
        break
      case 'vlrcomfandi':
        setVlrcomfandi(value)
        break
      case 'vlrfinesa':
        setVlrfinesa(value)
        break
      case 'vlrprima':
        setVlrprima(value)
        break
      default:
        break
    }
  }

  const resetFilters = () => {
    setAnio('')
    setEstado('')
    setEstadoCOMISION('')
    setMes('')
    setPagoASEGURADORA('')
    setTtlasegur('')
    setVlrcomfandi('')
    setVlrfinesa('')
    setVlrprima('')
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
          { idDoc: 4 },
          adapterBodyColectivaVida({
            anio,
            estado,
            estadoCOMISION,
            mes,
            pagoASEGURADORA,
            ttlasegur,
            vlrcomfandi,
            vlrfinesa,
            vlrprima
          }),
          PATH_REPORT,
          'ColectivaVida.xls'
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
                Colectiva Vida{' '}
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
                optionsList={FILTERS_COLECTIVAS_VIDA}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
              <Filters
                clickResetFilters={resetFilters}
                handleFilterChange={handleDates}
                filters={{
                  anio,
                  estado,
                  estadoCOMISION,
                  mes,
                  pagoASEGURADORA,
                  ttlasegur,
                  vlrcomfandi,
                  vlrfinesa,
                  vlrprima
                }}
                filtersProps={selectedOptions}
                clickApplyFilters={appliyFilters}
              />
            </Stack>
          )}
        </Stack>
        <TableGrid
          columns={columns}
          rows={isLoading ? [] : adapterColectivaVida(data.content)}
          pagination={pagination}
          count={isLoading ? 0 : data.totalElements}
          actionButton={actionButton}
        />
      </Box>
    </>
  )
}

export default ColectivaVida
