import {
  Dialog,
  Typography,
  DialogContentText,
  DialogContent,
  Divider,
  IconButton,
  TextField,
  Button,
  DialogActions
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useState, useEffect } from 'react'
import { changeFactura } from '@/services/endpoints'
import { useSnackbar } from 'notistack'
import { adapterEstadoFacturas } from '@/utils/adaptersTable'
import { formatearNumero } from '@/utils/numbers'

const DetailFacturaDialog = ({ open, close, data, update }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [activeChangeFactura, setActiveChangeFactura] = useState(false)
  const [activeChangeFecfactura, setActiveChangeFecfactura] = useState(false)
  const [activeChangeFecpagocomfandi, setActiveChangeFecpagocomfandi] = useState(false)
  const [activeChangeObservacion, setActiveChangeObservacion] = useState(false)
  const [factura, setFactura] = useState('')
  const [fecpagocomfandi, setFecpagocomfandi] = useState('')
  const [fecfactura, setFecfactura] = useState('')
  const [observacion, setObservacion] = useState('')

  const onChangeFactura = (field) => {
    switch (field) {
      case 'factura':
        setActiveChangeFactura(!activeChangeFactura)
        break
      case 'fecfactura':
        setActiveChangeFecfactura(!activeChangeFecfactura)
        break
      case 'fecpagocomfandi':
        setActiveChangeFecpagocomfandi(!activeChangeFecpagocomfandi)
        break
      case 'observacion':
        setActiveChangeObservacion(!activeChangeObservacion)
        break
    }
  }

  useEffect(() => {
    if (data) {
      setFactura(data.factura)
      setFecpagocomfandi(data.fecpagocomfandi)
      setFecfactura(data.fecfactura)
      setObservacion(data.observacion)
      reset()
    }
  }, [data])

  const reset = () => {
    setActiveChangeFactura(false)
    setActiveChangeFecfactura(false)
    setActiveChangeFecpagocomfandi(false)
    setActiveChangeObservacion(false)
  }

  const onSubmit = async () => {
    try {
      const response = await changeFactura({
        id: data.id,
        factura: factura ?? '',
        fecfactura: fecfactura ?? '',
        fecpagocomfandi: fecpagocomfandi ?? '',
        observacion: observacion ?? ''
      })
      if (response.status === 200) {
        enqueueSnackbar(response.data, { variant: 'success' })
        reset()
        update()
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  const handleClose = () => {
    close(false)
  }

  return (
    <Dialog fullWidth maxWidth='lg' open={open} onClose={handleClose}>
      <DialogContentText
        sx={{
          m: '20px',
          textAlign: 'center'
        }}
      >
        <Typography sx={{ fontSize: '1.6rem', fontWeight: 'bolder', color: '#808080' }}>
          Detalles del registro
        </Typography>
      </DialogContentText>
      <DialogContent>
        <div>
          <DialogContentText>
            <Typography sx={{ fontWeight: '600', fontSize: '1.1rem', color: '#808080' }}>
              Información factura
            </Typography>
          </DialogContentText>
          <Divider sx={{ mb: '20px' }} />
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Base de cobro:
              </Typography>
              <Typography color='primary.main'>{formatearNumero(data.basecobro)}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Concepto:
              </Typography>
              <Typography color='primary.main'>{data.concepto}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Estado:
              </Typography>
              <Typography color='primary.main'>{adapterEstadoFacturas(data.estado)}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Número de Factura:
              </Typography>
              {activeChangeFactura ? (
                <TextField
                  size='small'
                  onChange={(e) => setFactura(e.target.value)}
                  type='text'
                  value={factura || ''}
                  sx={{ width: '170px' }}
                />
              ) : (
                <Typography color='primary.main'>{factura}</Typography>
              )}

              <IconButton onClick={() => onChangeFactura('factura')}>
                <EditIcon />
              </IconButton>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Fecha de Factura:
              </Typography>
              {activeChangeFecfactura ? (
                <TextField
                  size='small'
                  onChange={(e) => setFecfactura(e.target.value)}
                  type='date'
                  value={fecfactura || ''}
                  sx={{ width: '170px' }}
                />
              ) : (
                <Typography color='primary.main'>{fecfactura}</Typography>
              )}

              <IconButton onClick={() => onChangeFactura('fecfactura')}>
                <EditIcon />
              </IconButton>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Fecha de Pago Comfandi:
              </Typography>
              {activeChangeFecpagocomfandi ? (
                <TextField
                  size='small'
                  onChange={(e) => setFecpagocomfandi(e.target.value)}
                  type='date'
                  value={fecpagocomfandi || ''}
                  sx={{ width: '170px' }}
                />
              ) : (
                <Typography color='primary.main'>{fecpagocomfandi}</Typography>
              )}

              <IconButton onClick={() => onChangeFactura('fecpagocomfandi')}>
                <EditIcon />
              </IconButton>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Mes de Emisión Factura:
              </Typography>
              <Typography color='primary.main'>{data.mesemision}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Mes Facturado:
              </Typography>
              <Typography color='primary.main'>{data.mesfacturado}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Observación:
              </Typography>
              {activeChangeObservacion ? (
                <TextField
                  size='small'
                  onChange={(e) => setObservacion(e.target.value)}
                  type='text'
                  value={observacion || ''}
                  sx={{ width: '170px' }}
                />
              ) : (
                <Typography color='primary.main'>{observacion}</Typography>
              )}

              <IconButton onClick={() => onChangeFactura('observacion')}>
                <EditIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <DialogActions>
          <Button
            onClick={onSubmit}
            disabled={
              !activeChangeFactura &&
              !activeChangeFecfactura &&
              !activeChangeFecpagocomfandi &&
              !activeChangeObservacion
            }
          >
            {' '}
            Actualizar
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
export default DetailFacturaDialog
