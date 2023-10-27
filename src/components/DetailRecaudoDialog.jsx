import { adapterEstadoCobro, adapterEstadoRetorno } from '@/utils/adaptersTable'
import { formatearNumero } from '@/utils/numbers'
import { Dialog, Typography, DialogContentText, DialogContent, Divider } from '@mui/material'

const DetailRecaudoDialog = ({ open, close, data }) => {
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
            <div>
              <DialogContentText>
                <Typography sx={{ fontWeight: '600', fontSize: '1.1rem', color: '#808080' }}>
                  Información del cliente
                </Typography>
              </DialogContentText>
              <Divider sx={{ mb: '20px' }} />
              <div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                    Número de identificación:
                  </Typography>
                  <Typography color='primary.main'>{data.nid}</Typography>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                    Nombre:
                  </Typography>
                  <Typography color='primary.main'>{data.nombre}</Typography>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                    Categoría:
                  </Typography>
                  <Typography color='primary.main'>{data.categoria}</Typography>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                    Tasa nominal:
                  </Typography>
                  <Typography color='primary.main'>{data.tasa + '%'}</Typography>
                </div>
              </div>
            </div>
            <div>
              <DialogContentText sx={{ mt: '30px' }}>
                <Typography sx={{ fontWeight: '600', fontSize: '1.1rem', color: '#808080' }}>
                  Estados de la factura
                </Typography>
              </DialogContentText>
              <Divider sx={{ mb: '20px' }} />
              <div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                    Estado factura:
                  </Typography>
                  <Typography color='primary.main'>
                    {data.estadofactura === 1 ? 'Parcialmente pago' : 'Totalmente pago'}
                  </Typography>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                    Estado cobro:
                  </Typography>
                  <Typography color='primary.main'>{adapterEstadoCobro(data.estadocobro)}</Typography>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                    Estado retorno:
                  </Typography>
                  <Typography color='primary.main'>{adapterEstadoRetorno(data.estadoretorno)}</Typography>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                    Valor a pagar Comfandi:
                  </Typography>
                  <Typography color='primary.main'>{formatearNumero(data.pagocomfandi)}</Typography>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                    Fecha de pago Comfandi:
                  </Typography>
                  <Typography color='primary.main'>{data.fecpagocomfandi}</Typography>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                    Comisión Finesa:
                  </Typography>
                  <Typography color='primary.main'>{formatearNumero(data.comision)}</Typography>
                </div>
              </div>
            </div>
          </div>
          <div>
            <DialogContentText>
              <Typography sx={{ fontWeight: '600', fontSize: '1.1rem', color: '#808080' }}>
                Detalles de la obligación
              </Typography>
            </DialogContentText>
            <Divider sx={{ mb: '20px' }} />
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Fecha de facturación:
              </Typography>
              <Typography color='primary.main'>{data.fecfactura}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Día de pago:
              </Typography>
              <Typography color='primary.main'>{data.diapago}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Concepto:
              </Typography>
              <Typography color='primary.main'>{data.concepto}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Saldo a capital:
              </Typography>
              <Typography color='primary.main'>{formatearNumero(data.saldo)}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Cuota actual:
              </Typography>
              <Typography color='primary.main'>{data.cuota}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Capital:
              </Typography>
              <Typography color='primary.main'>{formatearNumero(data.capital)}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Intereses corrientes:
              </Typography>
              <Typography color='primary.main'>{formatearNumero(data.intcor)}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Subsidio:
              </Typography>
              <Typography color='primary.main'>{formatearNumero(data.subsidio)}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Intereses mora:
              </Typography>
              <Typography color='primary.main'>{formatearNumero(data.intmor)}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Valor recibido:
              </Typography>
              <Typography color='primary.main'>{formatearNumero(data.ttlrecbido)}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Valor facturado:
              </Typography>
              <Typography color='primary.main'>{formatearNumero(data.vlrfactura)}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Crédito:
              </Typography>
              <Typography color='primary.main'>{data.npr}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Seguro todo riesgo:
              </Typography>
              <Typography color='primary.main'>{formatearNumero(data.segriesgo)}</Typography>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Typography color='primary.main' sx={{ fontWeight: '600' }}>
                Seguro de vida:
              </Typography>
              <Typography color='primary.main'>{formatearNumero(data.segvida)}</Typography>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default DetailRecaudoDialog
