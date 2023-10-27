import ErrorAndLogout from '@/components/ErrorAndLogout'
import DownloadIcon from '@mui/icons-material/Download'
import UploadIcon from '@mui/icons-material/Upload'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined'
import { Box, Stack, Typography, Button } from '@mui/material'
import { Filters, DropdownFilterButton, TableGrid, DetailRecaudoDialog } from '@/components'
import React, { useState, useEffect } from 'react'
import { useDownloadFiles } from '@/hooks/useDownloadsFiles'
import { usePagination } from '@/hooks/usePagination'
import useData from '@/hooks/useData'
import { GET_RECAUDOS_URL, POST_PAGOS_RECAUDOS, POST_COBROS_RECAUDOS, PATH_REPORT, GET_RECAUDO_URL } from '@/services/endpoints'
import UploadDialog from '@/components/UploadDialog'
import { adapterBodyRecaudos } from '@/services/adapters'
import axios from 'axios'
import { FILTERS_RECAUDOS } from '@/utils/filters'
import { adapterRecaudos } from '@/utils/adaptersTable'
import { formatearNumero } from '@/utils/numbers'
import { formatDate } from '@/utils/dates'

const Recaudos = () => {
  const [activeFilter, setActiveFilter] = useState(true)
  const [nid, setNid] = useState('')
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [tasa, setTasa] = useState('')
  const [segvida, setSegvida] = useState('')
  const [fecfactura, setFecfactura] = useState('')
  const [diapago, setDiapago] = useState('')
  const [concepto, setConcepto] = useState('')
  const [saldo, setSaldo] = useState('')
  const [cuota, setCuota] = useState('')
  const [capital, setCapital] = useState('')
  const [intcor, setIntcor] = useState('')
  const [subsidio, setSubsidio] = useState('')
  const [intmor, setIntmor] = useState('')
  const [ttlrecbido, setTtlrecbido] = useState('')
  const [vlrfactura, setVlrfactura] = useState('')
  const [npr, setNpr] = useState('')
  const [segriesgo, setSegriesgo] = useState('')
  const [estadocobro, setEstadocobro] = useState('')
  const [estadoretorno, setEstadoretorno] = useState('')
  const [estadofactura, setEstadofactura] = useState('')

  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [openCobro, setOpenCobro] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])

  const [openDetail, setOpenDetail] = useState(false)
  const [detailData, setDetailData] = useState('')

  const { downloadFile } = useDownloadFiles()
  const pagination = usePagination()

  const { data, isLoading, error, mutate } = useData({
    body: adapterBodyRecaudos({
      nid,
      nombre,
      categoria,
      tasa,      
      fecfactura,
      diapago,
      concepto,
      saldo,
      cuota,
      capital,
      intcor,
      subsidio,
      intmor,
      ttlrecbido,
      vlrfactura,
      npr,
      segriesgo,
      segvida,
      estadocobro,
      estadoretorno,
      estadofactura
    }),
    page: pagination.page,
    size: pagination.pageSize,
    url: GET_RECAUDOS_URL
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
      field: 'npr',
      headerName: 'Crédito',
      width: 150,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'nid',
      headerName: 'Número de identificación',
      width: 200,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'nombre', headerName: 'Nombre', width: 220, headerClassName: 'super-app-theme--header' },
    { field: 'categoria', headerName: 'Categoría', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'tasa', 
      headerName: 'Tasa', 
      width: 150, 
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return params.value + '%'
      } 
    },
    {
      field: 'fecfactura',
      headerName: 'Fecha de facturación',
      width: 180,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatDate(params.value)
      }
    },
    { field: 'diapago', headerName: 'Día de pago', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'concepto', headerName: 'Concepto', width: 150, headerClassName: 'super-app-theme--header' },
    {
      field: 'saldo',
      headerName: 'Saldo',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    { field: 'cuota', headerName: 'Cuota', width: 150, headerClassName: 'super-app-theme--header' },
    {
      field: 'capital',
      headerName: 'Capital',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'intcor',
      headerName: 'Intereses corrientes',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'subsidio',
      headerName: 'Subsidio',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'intmor',
      headerName: 'Intereses mora',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'ttlrecbido',
      headerName: 'Valor recibido',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'vlrfactura',
      headerName: 'Valor facturado',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'segriesgo',
      headerName: 'Seguro todo riesgo',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'segvida',
      headerName: 'Seguro de vida',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return formatearNumero(params.value)
      }
    },
    {
      field: 'estadocobro',
      headerName: 'Estado cobro',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return <Typography sx={{ color: 'primary.main', fontWeight: '600' }}>{params.value}</Typography>
      }
    },
    {
      field: 'estadoretorno',
      headerName: 'Estado retorno',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return <Typography sx={{ color: 'primary.main', fontWeight: '600' }}>{params.value}</Typography>
      }
    },
    {
      field: 'estadofactura',
      headerName: 'Estado factura',
      width: 180,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return <Typography sx={{ color: 'primary.main', fontWeight: '600' }}>{params.value}</Typography>
      }
    }
  ]

  const clickRowDetails = (id) => {
    axios.get(GET_RECAUDO_URL + `?idRecaudo=${id}`).then((res) => setDetailData(res.data))
    setOpenDetail(true)
  }

  const handleDates = (fieldName, value) => {
    switch (fieldName) {
      case 'nid':
        setNid(value)
        break
      case 'nombre':
        setNombre(value)
        break
      case 'categoria':
        setCategoria(value)
        break
      case 'tasa':
        setTasa(value)
        break
      case 'segvida':
        setSegvida(value)
        break
      case 'fecfactura':
        setFecfactura(value)
        break
      case 'diapago':
        setDiapago(value)
        break
      case 'concepto':
        setConcepto(value)
        break
      case 'saldo':
        setSaldo(value)
        break
      case 'cuota':
        setCuota(value)
        break
      case 'capital':
        setCapital(value)
        break
      case 'intcor':
        setIntcor(value)
        break
      case 'subsidio':
        setSubsidio(value)
        break
      case 'intmor':
        setIntmor(value)
        break
      case 'ttlrecbido':
        setTtlrecbido(value)
        break
      case 'vlrfactura':
        setVlrfactura(value)
        break
      case 'npr':
        setNpr(value)
        break
      case 'segriesgo':
        setSegriesgo(value)
        break
      case 'estadocobro':
        setEstadocobro(value)
        break
      case 'estadoretorno':
        setEstadoretorno(value)
        break
      case 'estadofactura':
        setEstadofactura(value)
        break
      default:
        break
    }
  }
  const resetFilters = () => {
    setNid('')
    setNombre('')
    setCategoria('')
    setTasa('')
    setSegvida('')
    setFecfactura('')
    setDiapago('')
    setConcepto('')
    setSaldo('')
    setCuota('')
    setCapital('')
    setIntcor('')
    setSubsidio('')
    setIntmor('')
    setTtlrecbido('')
    setVlrfactura('')
    setNpr('')
    setSegriesgo('')
    setEstadocobro('')
    setEstadoretorno('')
    setEstadofactura('')
    setActiveFilter(false)
  }

  const appliyFilters = () => {
    mutate()
    setActiveFilter(true)
  }

  const actionButton = [
    {
      title: 'Descargar base histórico',
      icon: <DownloadIcon />,
      onClick: () => {
        downloadFile(
          { idDoc: 2 },
          adapterBodyRecaudos({
            nid,
            nombre,
            categoria,
            tasa,
            segvida,
            fecfactura,
            diapago,
            concepto,
            saldo,
            cuota,
            capital,
            intcor,
            subsidio,
            intmor,
            ttlrecbido,
            vlrfactura,
            npr,
            segriesgo,
            estadocobro,
            estadoretorno,
            estadofactura
          }),
          PATH_REPORT,
          'BaseHistorico.xls'
        )
      }
    },
    {
      title: 'Comisión Finesa Servicios',
      icon: <PointOfSaleIcon />,
      onClick: () => {
        downloadFile(
          { idDoc: 2, tipoRecaudo: 1 },
          adapterBodyRecaudos({
            nid,
            nombre,
            categoria,
            tasa,
            segvida,
            fecfactura,
            diapago,
            concepto,
            saldo,
            cuota,
            capital,
            intcor,
            subsidio,
            intmor,
            ttlrecbido,
            vlrfactura,
            npr,
            segriesgo,
            estadocobro,
            estadoretorno,
            estadofactura
          }),
          PATH_REPORT,
          'ComisionFinesa.xls'
        )
      }
    },
    {
      title: 'Liquidador',
      icon: <AttachMoneyIcon />,
      onClick: () => {
        downloadFile(
          { idDoc: 2, tipoRecaudo: 2 },
          adapterBodyRecaudos({
            nid,
            nombre,
            categoria,
            tasa,
            segvida,
            fecfactura,
            diapago,
            concepto,
            saldo,
            cuota,
            capital,
            intcor,
            subsidio,
            intmor,
            ttlrecbido,
            vlrfactura,
            npr,
            segriesgo,
            estadocobro,
            estadoretorno,
            estadofactura
          }),
          PATH_REPORT,
          'Liquidador.xls'
        )
      }
    },
    {
      title: 'Cargar fecha de pago',
      icon: <UploadIcon />,
      onClick: () => {
        setOpenDialog(true)
      }
    },
    {
      title: 'Cargar fecha de cobro',
      icon: <UploadIcon />,
      onClick: () => {
        setOpenCobro(true)
      }
    }
  ]

  return (
    <>
      <DetailRecaudoDialog
        data={isLoading ? {} : detailData === undefined ? {} : detailData}
        open={openDetail}
        close={setOpenDetail}
      />
      <UploadDialog open={openDialog} close={setOpenDialog} title='Cargar fecha de pago' url={POST_PAGOS_RECAUDOS} />
      <UploadDialog open={openCobro} close={setOpenCobro} title='Cargar fecha de Cobro' url={POST_COBROS_RECAUDOS} />
      <Box sx={{ padding: 3 }} display='grid' overflow='auto' gridTemplateRows='auto 1fr auto'>
        <Stack gap={1} sx={{ mb: 3 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}
          >
            <Stack spacing={1}>
              <Typography color='primary.main' sx={{ fontSize: '24px' }} fontWeight='600'>
                Histórico recaudos{' '}
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
                optionsList={FILTERS_RECAUDOS}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
              <Filters
                clickResetFilters={resetFilters}
                handleFilterChange={handleDates}
                clickApplyFilters={appliyFilters}
                filters={{
                  nid,
                  nombre,
                  categoria,
                  tasa,
                  segvida,
                  fecfactura,
                  diapago,
                  concepto,
                  saldo,
                  cuota,
                  capital,
                  intcor,
                  subsidio,
                  intmor,
                  ttlrecbido,
                  vlrfactura,
                  npr,
                  segriesgo,
                  estadocobro,
                  estadoretorno,
                  estadofactura
                }}
                filtersProps={selectedOptions}
              />
            </Stack>
          )}
        </Stack>
        <TableGrid
          columns={columns}
          rows={isLoading ? [] : adapterRecaudos(data.content)}
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

export default Recaudos
