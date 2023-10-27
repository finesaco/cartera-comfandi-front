import ErrorAndLogout from '@/components/ErrorAndLogout'
import DownloadIcon from '@mui/icons-material/Download'
import React, { useState, useEffect } from 'react'
import { useDownloadFiles } from '@/hooks/useDownloadsFiles'
import { usePagination } from '@/hooks/usePagination'
import useData from '@/hooks/useData'
import { DropdownFilterButton, Filters, TableGrid } from '@/components'
import { GET_CONTROL_SEGUROS, PATH_REPORT } from '@/services/endpoints'
import { Box, Stack, Typography, Button } from '@mui/material'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined'
import { adapterBodyControlSeguro } from '@/services/adapters'
import { FILTERS_CONTROL_SEGUROS } from '@/utils/filters'
import { adapterControlSeguros } from '@/utils/adaptersTable'
import { formatearNumero } from '@/utils/numbers'

const columns = [
  {
    field: 'fecfactura',
    headerName: 'Fecha de Facturación',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'tipoprod',
    headerName: 'Tipo Producto',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'npr',
    headerName: 'Número de crédito',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'nombre',
    headerName: 'Nombre cliente',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'nid',
    headerName: 'Identificación',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'tipo',
    headerName: 'Tipo seguro',
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
    field: 'vlrseguro',
    headerName: 'Valor Seguro',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return formatearNumero(params.value)
    }
  },
  {
    field: 'pagocli',
    headerName: 'Pago Cliente',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return formatearNumero(params.value)
    }
  },
  {
    field: 'cobro',
    headerName: 'Cobro Comfandi',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },

  {
    field: 'estado',
    headerName: 'Estado servicio',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return <Typography sx={{ color: 'primary.main', fontWeight: '600' }}>{params.value}</Typography>
    }
  }
]

const ControlSeguros = () => {
  const [activeFilter, setActiveFilter] = useState(true)

  // filters
  const [aseguradora, setAseguradora] = useState('')
  const [cobro, setCobro] = useState('')
  const [estado, setEstado] = useState('')
  const [fecfactura, setFecFactura] = useState('')
  const [nid, setNid] = useState('')
  const [nombre, setNombre] = useState('')
  const [npr, setNpr] = useState('')
  const [pagocli, setPagoCli] = useState('')
  const [tipo, setTipo] = useState('')
  const [tipoprod, setTipoProd] = useState('')
  const [vlrseguro, setVlrSeguro] = useState('')

  const [selectedOptions, setSelectedOptions] = useState([])

  const [open, setOpen] = useState(false)

  const { downloadFile } = useDownloadFiles()
  const pagination = usePagination()

  const { data, isLoading, error, mutate } = useData({
    body: adapterBodyControlSeguro({
      aseguradora,
      cobro,
      estado,
      fecfactura,
      nid,
      nombre,
      npr,
      pagocli,
      tipo,
      tipoprod,
      vlrseguro
    }),
    page: pagination.page,
    size: pagination.pageSize,
    url: GET_CONTROL_SEGUROS
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
      case 'aseguradora':
        setAseguradora(value)
        break
      case 'cobro':
        setCobro(value)
        break
      case 'estado':
        setEstado(value)
        break
      case 'fecfactura':
        setFecFactura(value)
        break
      case 'nid':
        setNid(value)
        break
      case 'nombre':
        setNombre(value)
        break
      case 'npr':
        setNpr(value)
        break
      case 'pagocli':
        setPagoCli(value)
        break
      case 'tipo':
        setTipo(value)
        break
      case 'tipoprod':
        setTipoProd(value)
        break
      case 'vlrseguro':
        setVlrSeguro(value)
        break
      default:
        break
    }
  }
  const resetFilters = () => {
    setAseguradora('')
    setCobro('')
    setEstado('')
    setFecFactura('')
    setNid('')
    setNombre('')
    setNpr('')
    setPagoCli('')
    setTipo('')
    setTipoProd('')
    setVlrSeguro('')
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
          { idDoc: 5 },
          adapterBodyControlSeguro({
            aseguradora,
            cobro,
            estado,
            fecfactura,
            nid,
            nombre,
            npr,
            pagocli,
            tipo,
            tipoprod,
            vlrseguro
          }),
          PATH_REPORT,
          'ControlSeguros.xls'
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
                Control seguros{' '}
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
                optionsList={FILTERS_CONTROL_SEGUROS}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />

              <Filters
                clickResetFilters={resetFilters}
                handleFilterChange={handleDates}
                filters={{
                  aseguradora,
                  cobro,
                  estado,
                  fecfactura,
                  nid,
                  nombre,
                  npr,
                  pagocli,
                  tipo,
                  tipoprod,
                  vlrseguro
                }}
                filtersProps={selectedOptions}
                clickApplyFilters={appliyFilters}
              />
            </Stack>
          )}
        </Stack>
        <TableGrid
          columns={columns}
          rows={isLoading ? [] : adapterControlSeguros(data.content)}
          pagination={pagination}
          count={isLoading ? 0 : data.totalElements}
          actionButton={actionButton}
        />
      </Box>
    </>
  )
}

export default ControlSeguros
