import ErrorAndLogout from '@/components/ErrorAndLogout'
import DownloadIcon from '@mui/icons-material/Download'
import React, { useState, useEffect } from 'react'
import { useDownloadFiles } from '@/hooks/useDownloadsFiles'
import { usePagination } from '@/hooks/usePagination'
import useData from '@/hooks/useData'
import { DetailFacturaDialog, DropdownFilterButton, Filters, TableGrid } from '@/components'
import { GET_FACTURAS_URL, GET_FACTURA_URL, PATH_REPORT } from '@/services/endpoints'
import { Box, Stack, Typography, Button } from '@mui/material'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined'
import { adapterBodyFactura } from '@/services/adapters'
import axios from 'axios'
import { FILTERS_FACTURAS } from '@/utils/filters'
import { adapterFacturas } from '@/utils/adaptersTable'
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
    field: 'mesfacturado',
    headerName: 'Mes facturado',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'mesemision',
    headerName: 'Mes emisión factura',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'factura',
    headerName: 'Número de Factura',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'fecfactura',
    headerName: 'Fecha de Factura',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  },
  { field: 'concepto', headerName: 'Concepto', width: 'auto', flex: 1, headerClassName: 'super-app-theme--header' },
  {
    field: 'basecobro',
    headerName: 'Base de Cobro',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => {
      return formatearNumero(params.value)
    } 
  },
  {
    field: 'fecpagocomfandi',
    headerName: 'Fecha de Pago Comfandi',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
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
  },
  {
    field: 'observacion',
    headerName: 'Observación',
    width: 'auto',
    flex: 1,
    headerClassName: 'super-app-theme--header'
  }
]

const Facturas = () => {
  const [activeFilter, setActiveFilter] = useState(true)

  const [basecobro, setBaseCobro] = useState('')
  const [concepto, setConcepto] = useState('')
  const [estado, setEstado] = useState('')
  const [factura, setFactura] = useState('')
  const [fecfactura, setFecFactura] = useState('')
  const [fecpagocomfandi, setFecPagoComfandi] = useState('')
  const [mesemision, setMesEmision] = useState('')
  const [mesfacturado, setMesFacturado] = useState('')
  const [observacion, setObservacion] = useState('')
  const [open, setOpen] = useState(false)

  const [selectedOptions, setSelectedOptions] = useState([])

  const [openDetail, setOpenDetail] = useState(false)
  const [detailData, setDetailData] = useState('')

  const { downloadFile } = useDownloadFiles()
  const pagination = usePagination()

  const { data, isLoading, error, mutate } = useData({
    body: adapterBodyFactura({
      basecobro,
      concepto,
      estado,
      factura,
      fecfactura,
      fecpagocomfandi,
      mesemision,
      mesfacturado,
      observacion
    }),
    page: pagination.page,
    size: pagination.pageSize,
    url: GET_FACTURAS_URL
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
      case 'basecobro':
        setBaseCobro(value)
        break
      case 'concepto':
        setConcepto(value)
        break
      case 'estado':
        setEstado(value)
        break
      case 'factura':
        setFactura(value)
        break
      case 'fecfactura':
        setFecFactura(value)
        break
      case 'fecpagocomfandi':
        setFecPagoComfandi(value)
        break
      case 'mesemision':
        setMesEmision(value)
        break
      case 'mesfacturado':
        setMesFacturado(value)
        break
      case 'observacion':
        setObservacion(value)
        break
      default:
        break
    }
  }

  const resetFilters = () => {
    setBaseCobro('')
    setConcepto('')
    setEstado('')
    setFactura('')
    setFecFactura('')
    setFecPagoComfandi('')
    setMesEmision('')
    setMesFacturado('')
    setObservacion('')
    setActiveFilter(false)
  }

  const clickRowDetails = async (id) => {
    try {
      const response = await axios.get(GET_FACTURA_URL + `?idFactura=${id}`)
      setDetailData(response.data)
      setOpenDetail(true)
    } catch (error) {}
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
          { idDoc: 6 },
          adapterBodyFactura({
            basecobro,
            concepto,
            estado,
            factura,
            fecfactura,
            fecpagocomfandi,
            mesemision,
            mesfacturado,
            observacion
          }),
          PATH_REPORT,
          'Facturas.xls'
        )
      }
    }
  ]

  return (
    <>
      <DetailFacturaDialog
        data={isLoading ? {} : detailData === undefined ? {} : detailData}
        open={openDetail}
        close={setOpenDetail}
        update={mutate}
      />
      <Box sx={{ padding: 3 }} display='grid' overflow='auto' gridTemplateRows='auto 1fr auto'>
        <Stack gap={1} sx={{ mb: 3 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}
          >
            <Stack spacing={1}>
              <Typography color='primary.main' sx={{ fontSize: '24px' }} fontWeight='600'>
                Facturas{' '}
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
                optionsList={FILTERS_FACTURAS}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
              <Filters
                clickResetFilters={resetFilters}
                handleFilterChange={handleDates}
                filters={{
                  basecobro,
                  concepto,
                  estado,
                  factura,
                  fecfactura,
                  fecpagocomfandi,
                  mesemision,
                  mesfacturado,
                  observacion
                }}
                filtersProps={selectedOptions}
                clickApplyFilters={appliyFilters}
              />
            </Stack>
          )}
        </Stack>
        <TableGrid
          columns={columns}
          rows={isLoading ? [] : adapterFacturas(data.content)}
          loading={isLoading}
          pagination={pagination}
          count={isLoading ? 0 : data.totalElements}
          handleRowData={clickRowDetails}
          actionButton={actionButton}
        />
      </Box>
    </>
  )
}

export default Facturas
