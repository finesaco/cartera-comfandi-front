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
import { FILTERS_NEGOCIOS } from '@/utils/filters'
import { adapterNegocios } from '@/utils/adaptersTable'

const columns = [
  {
    field: 'anio',
    headerName: 'Año',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'mes',
    headerName: 'Mes',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'dia',
    headerName: 'Día',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'categoria',
    headerName: 'Categoría',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'fasecolda',
    headerName: 'Fasecolda',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'fecdese',
    headerName: 'Fecha desembolso',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'garantia',
    headerName: 'Garantía',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'linea',
    headerName: 'Línea',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'marca',
    headerName: 'Marca',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'modelo',
    headerName: 'Modelo',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'npr',
    headerName: 'Crédito',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'plazo',
    headerName: 'Plazo',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'porcentaje',
    headerName: '% Financiamiento',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'segriesgo',
    headerName: 'Seguro todo riesgo',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'segvida',
    headerName: 'Seguro Vida',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'tasa',
    headerName: 'Tasa mensual',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'tasasub',
    headerName: 'Tasa con subsidio',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'tipo',
    headerName: 'Tipo',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'vlrfinanciado',
    headerName: 'Valor financiado',
    width: 150,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'vlrvehiculo',
    headerName: 'Valor vehículo',
    width: 150,
    headerClassName: 'super-app-theme--header'
  }
]

const NegociosDesembolsados = () => {
  const [activeFilter, setActiveFilter] = useState(true)
  const [open, setOpen] = useState(false)

  const [anio, setAnio] = useState('')
  const [mes, setMes] = useState('')
  const [dia, setDia] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fasecolda, setFasecolda] = useState('')
  const [fecdese, setFecdese] = useState('')
  const [garantia, setGarantia] = useState('')
  const [linea, setLinea] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [nombre, setNombre] = useState('')
  const [npr, setNpr] = useState('')
  const [plazo, setPlazo] = useState('')
  const [porcentaje, setPorcentaje] = useState('')
  const [segriesgo, setSegriesgo] = useState('')
  const [segvida, setSegvida] = useState('')
  const [tasa, setTasa] = useState('')
  const [tasasub, setTasasub] = useState('')
  const [tipo, setTipo] = useState('')
  const [vlrfinanciado, setVlrfinanciado] = useState('')
  const [vlrvehiculo, setVlrvehiculo] = useState('')

  const [selectedOptions, setSelectedOptions] = useState([])

  const { downloadFile } = useDownloadFiles()
  const pagination = usePagination()

  const { data, isLoading, error, mutate } = useData({
    body: adapterBodySeguros({
      anio,
      mes,
      dia,
      categoria,
      fasecolda,
      fecdese,
      garantia,
      linea,
      marca,
      modelo,
      nombre,
      npr,
      plazo,
      porcentaje,
      segriesgo,
      segvida,
      tasa,
      tasasub,
      tipo,
      vlrfinanciado,
      vlrvehiculo
    }),
    reports: 3,
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

  const handleDates = (fieldName, value) => {
    switch (fieldName) {
      case 'anio':
        setAnio(value)
        break
      case 'mes':
        setMes(value)
        break
      case 'dia':
        setDia(value)
        break
      case 'categoria':
        setCategoria(value)
        break
      case 'fasecolda':
        setFasecolda(value)
        break
      case 'fecdese':
        setFecdese(value)
        break
      case 'garantia':
        setGarantia(value)
        break
      case 'linea':
        setLinea(value)
        break
      case 'marca':
        setMarca(value)
        break
      case 'modelo':
        setModelo(value)
        break
      case 'nombre':
        setNombre(value)
        break
      case 'npr':
        setNpr(value)
        break
      case 'plazo':
        setPlazo(value)
        break
      case 'porcentaje':
        setPorcentaje(value)
        break
      case 'segriesgo':
        setSegriesgo(value)
        break
      case 'segvida':
        setSegvida(value)
        break
      case 'tasa':
        setTasa(value)
        break
      case 'tasasub':
        setTasasub(value)
        break
      case 'tipo':
        setTipo(value)
        break
      case 'vlrfinanciado':
        setVlrfinanciado(value)
        break
      case 'vlrvehiculo':
        setVlrvehiculo(value)
        break
      default:
        break
    }
  }

  const resetFilters = () => {
    setAnio('')
    setMes('')
    setDia('')
    setCategoria('')
    setFasecolda('')
    setFecdese('')
    setGarantia('')
    setLinea('')
    setMarca('')
    setModelo('')
    setNombre('')
    setNpr('')
    setPlazo('')
    setPorcentaje('')
    setSegriesgo('')
    setSegvida('')
    setTasa('')
    setTasasub('')
    setTipo('')
    setVlrfinanciado('')
    setVlrvehiculo('')
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
          {},
          adapterBodySeguros({
            anio,
            mes,
            dia,
            categoria,
            fasecolda,
            fecdese,
            garantia,
            linea,
            marca,
            modelo,
            nombre,
            npr,
            plazo,
            porcentaje,
            segriesgo,
            segvida,
            tasa,
            tasasub,
            tipo,
            vlrfinanciado,
            vlrvehiculo
          }),
          GET_REPORTES_URL,
          'NegociosDesembolsados.xls'
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
                Negocios desembolsados
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
                optionsList={FILTERS_NEGOCIOS}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
              <Filters
                clickResetFilters={resetFilters}
                handleFilterChange={handleDates}
                filters={{
                  anio,
                  mes,
                  dia,
                  categoria,
                  fasecolda,
                  fecdese,
                  garantia,
                  linea,
                  marca,
                  modelo,
                  nombre,
                  npr,
                  plazo,
                  porcentaje,
                  segriesgo,
                  segvida,
                  tasa,
                  tasasub,
                  tipo,
                  vlrfinanciado,
                  vlrvehiculo
                }}
                filtersProps={selectedOptions}
                clickApplyFilters={appliyFilters}
              />
            </Stack>
          )}
        </Stack>
        <TableGrid
          columns={columns}
          rows={isLoading ? [] : adapterNegocios(data.content)}
          pagination={pagination}
          count={isLoading ? 0 : data.totalElements}
          actionButton={actionButton}
        />
      </Box>
    </>
  )
}

export default NegociosDesembolsados
