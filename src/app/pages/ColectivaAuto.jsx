import ErrorAndLogout from '@/components/ErrorAndLogout'
import DownloadIcon from '@mui/icons-material/Download'
import React, { useState, useEffect } from 'react'
import { useDownloadFiles } from '@/hooks/useDownloadsFiles'
import { usePagination } from '@/hooks/usePagination'
import useData from '@/hooks/useData'
import { DropdownFilterButton, Filters, TableGrid } from '@/components'
import { GET_COLECTIVA_AUTO_URL, PATH_REPORT } from '@/services/endpoints'
import { Box, Stack, Typography, Button } from '@mui/material'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined'
import { adapterBodyColectivaAutos } from '@/services/adapters'
import { FILTERS_COLECTIVAS_AUTOS } from '@/utils/filters'
import { adapterColectivaAutos } from '@/utils/adaptersTable'
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
    field: 'vlrprimaiva',
    headerName: 'Valor prima con IVA',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return formatearNumero(params.value)
    }
  },
  {
    field: 'vlrprima',
    headerName: 'Valor prima sin IVA',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return formatearNumero(params.value)
    }
  },
  {
    field: 'ttlretorno',
    headerName: 'Total retorno',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return formatearNumero(params.value)
    }
  },
  {
    field: 'estadoRETORNO',
    headerName: 'Estado Retorno Finesa',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return <Typography sx={{ color: 'primary.main', fontWeight: '600' }}>{params.value}</Typography>
    }
  },
  {
    field: 'retorcomfa',
    headerName: 'Distribución retorno Comfandi',
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
    field: 'retorfinesa',
    headerName: 'Distribución retorno Finesa',
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

const ColectivaAuto = () => {
  const [activeFilter, setActiveFilter] = useState(true)
  // filters
  const [anio, setAnio] = useState('')
  const [mes, setMes] = useState('')
  const [estado, setEstado] = useState('')
  const [estadoCOMISION, setEstadoCOMISION] = useState('')
  const [estadoRETORNO, setEstadoRETORNO] = useState('')
  const [retorcomfa, setRetorcomfa] = useState('')
  const [retorfinesa, setRetorfinesa] = useState('')
  const [ttlasegur, setTtlasegur] = useState('')
  const [ttlretorno, setTtlretorno] = useState('')
  const [vlrprima, setVlrprima] = useState('')
  const [vlrprimaiva, setVlrprimaiva] = useState('')

  const [selectedOptions, setSelectedOptions] = useState([])

  const [open, setOpen] = useState(false)

  const { downloadFile } = useDownloadFiles()
  const pagination = usePagination()

  const { data, isLoading, error, mutate } = useData({
    body: adapterBodyColectivaAutos({
      anio,
      mes,
      estado,
      estadoCOMISION,
      estadoRETORNO,
      retorcomfa,
      retorfinesa,
      ttlasegur,
      ttlretorno,
      vlrprima,
      vlrprimaiva
    }),
    page: pagination.page,
    size: pagination.pageSize,
    url: GET_COLECTIVA_AUTO_URL
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
      case 'mes':
        setMes(value)
        break
      case 'estado':
        setEstado(value)
        break
      case 'estadoCOMISION':
        setEstadoCOMISION(value)
        break
      case 'estadoRETORNO':
        setEstadoRETORNO(value)
        break
      case 'retorcomfa':
        setRetorcomfa(value)
        break
      case 'retorfinesa':
        setRetorfinesa(value)
        break
      case 'ttlasegur':
        setTtlasegur(value)
        break
      case 'ttlretorno':
        setTtlretorno(value)
        break
      case 'vlrprima':
        setVlrprima(value)
        break
      case 'vlrprimaiva':
        setVlrprimaiva(value)
        break
      default:
        break
    }
  }

  const resetFilters = () => {
    setAnio('')
    setMes('')
    setEstado('')
    setEstadoCOMISION('')
    setEstadoRETORNO('')
    setRetorcomfa('')
    setRetorfinesa('')
    setTtlasegur('')
    setTtlretorno('')
    setVlrprima('')
    setVlrprimaiva('')
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
          { idDoc: 3 },
          adapterBodyColectivaAutos({
            anio,
            mes,
            estado,
            estadoCOMISION,
            estadoRETORNO,
            retorcomfa,
            retorfinesa,
            ttlasegur,
            ttlretorno,
            vlrprima,
            vlrprimaiva
          }),
          PATH_REPORT,
          'ColectivaAuto.xls'
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
                Colectiva Autos{' '}
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
                optionsList={FILTERS_COLECTIVAS_AUTOS}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
              <Filters
                clickResetFilters={resetFilters}
                handleFilterChange={handleDates}
                filters={{
                  anio,
                  mes,
                  estado,
                  estadoCOMISION,
                  estadoRETORNO,
                  retorcomfa,
                  retorfinesa,
                  ttlasegur,
                  ttlretorno,
                  vlrprima,
                  vlrprimaiva
                }}
                filtersProps={selectedOptions}
                clickApplyFilters={appliyFilters}
              />
            </Stack>
          )}
        </Stack>
        <TableGrid
          columns={columns}
          rows={isLoading ? [] : adapterColectivaAutos(data.content)}
          pagination={pagination}
          count={isLoading ? 0 : data.totalElements}
          actionButton={actionButton}
        />
      </Box>
    </>
  )
}

export default ColectivaAuto
