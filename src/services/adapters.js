export const adaptResponseError = (error) => {
  return {
    error: error.code,
    message: error.response.data
  }
}

export const adapterBodyFondeo = ({ anio, mes, dia, npr, xmil, total, vlrdesembolso, reintegro, estado }) => {
  const body = {}

  const addToBody = (key, value) => {
    if (value) {
      body[key] = { equal: value }
    }
  }

  addToBody('ANIO', anio)
  addToBody('MES', mes)
  addToBody('DIA', dia)
  addToBody('NPR', Number(npr))
  addToBody('XMIL', Number(xmil))
  addToBody('TOTAL', Number(total))
  addToBody('VLRDESEMBOLSO', Number(vlrdesembolso))
  addToBody('REINTEGRO', Number(reintegro))
  addToBody('ESTADO', Number(estado))

  return body
}

export const adapterBodyRecaudos = ({
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
}) => {
  const body = {}

  const addToBody = (key, value) => {
    if (value) {
      body[key] = { equal: value }
    }
  }

  addToBody('NPR', npr)
  addToBody('NID', Number(nid))
  addToBody('NOMBRE', nombre)
  addToBody('CATEGORIA', categoria)
  addToBody('TASA', Number(tasa))
  addToBody('SEGVIDA', segvida)
  addToBody('FECFACTURA', fecfactura)
  addToBody('DIAPAGO', Number(diapago))
  addToBody('CONCEPTO', concepto)
  addToBody('SALDO', Number(saldo))
  addToBody('CUOTA', cuota)
  addToBody('CAPITAL', Number(capital))
  addToBody('INTCOR', Number(intcor))
  addToBody('SUBSIDIO', Number(subsidio))
  addToBody('INTMOR', Number(intmor))
  addToBody('TTLRECBIDO', Number(ttlrecbido))
  addToBody('VLRFACTURA', Number(vlrfactura))
  addToBody('SEGRIESGO', Number(segriesgo))
  addToBody('ESTADOCOBRO', Number(estadocobro))
  addToBody('ESTADORETORNO', Number(estadoretorno))
  addToBody('ESTADOFACTURA', Number(estadofactura))

  return body
}

export const adapterBodySeguros = ({ anio, mes, npr, placa, nombre, vlrasegu, aseguradora, fecini, fecfin }) => {
  const body = {}

  const addToBody = (key, value) => {
    if (value) {
      body[key] = { equal: value }
    }
  }

  addToBody('ANIO', anio)
  addToBody('MES', mes)
  addToBody('NPR', npr)
  addToBody('PLACA', placa)
  addToBody('NOMBRE', nombre)
  addToBody('VLRASEGU', Number(vlrasegu))
  addToBody('ASEGURADORA', aseguradora)
  addToBody('FECINI', Number(fecini))
  addToBody('FECFIN', Number(fecfin))

  return body
}

export const adapterBodyNegocios = ({
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
}) => {
  const body = {}

  const addToBody = (key, value) => {
    if (value) {
      body[key] = { equal: value }
    }
  }

  addToBody('ANIO', anio)
  addToBody('MES', mes)
  addToBody('DIA', dia)
  addToBody('CATEGORIA', categoria)
  addToBody('FASECOLDA', Number(fasecolda))
  addToBody('FECDESE', Number(fecdese))
  addToBody('GARANTIA', Number(garantia))
  addToBody('LINEA', linea)
  addToBody('MARCA', marca)
  addToBody('MODELO', Number(modelo))
  addToBody('NOMBRE', nombre)
  addToBody('NPR', Number(npr))
  addToBody('PLAZO', Number(plazo))
  addToBody('PORCENTAJE', Number(porcentaje))
  addToBody('SEGRIESGO', Number(segriesgo))
  addToBody('SEGVIDA', Number(segvida))
  addToBody('TASA', Number(tasa))
  addToBody('TASASUB', Number(tasasub))
  addToBody('TIPO', tipo)
  addToBody('VLRFINANCIADO', Number(vlrfinanciado))
  addToBody('VLRVEHICULO', Number(vlrvehiculo))

  return body
}

export const adapterBodyColectivaAutos = ({
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
}) => {
  const body = {}

  const addToBody = (key, value) => {
    if (value) {
      body[key] = { equal: value }
    }
  }

  addToBody('ANIO', anio)
  addToBody('MES', mes)
  addToBody('ESTADO', Number(estado))
  addToBody('ESTADO_COMISION', Number(estadoCOMISION))
  addToBody('ESTADO_RETORNO', Number(estadoRETORNO))
  addToBody('RETORCOMFA', Number(retorcomfa))
  addToBody('RETORFINESA', Number(retorfinesa))
  addToBody('TTLASEGUR', Number(ttlasegur))
  addToBody('TTLRETORNO', Number(ttlretorno))
  addToBody('VLRPRIMA', Number(vlrprima))
  addToBody('VLRPRIMAIVA', Number(vlrprimaiva))

  return body
}

export const adapterBodyColectivaVida = ({
  anio,
  estado,
  estadoCOMISION,
  mes,
  pagoASEGURADORA,
  ttlasegur,
  vlrcomfandi,
  vlrfinesa,
  vlrprima
}) => {
  const body = {}

  const addToBody = (key, value) => {
    if (value) {
      body[key] = { equal: value }
    }
  }

  addToBody('ANIO', anio)
  addToBody('ESTADO', Number(estado))
  addToBody('ESTADO_COMISION', Number(estadoCOMISION))
  addToBody('MES', mes)
  addToBody('PAGO_ASEGURADORA', Number(pagoASEGURADORA))
  addToBody('TTLASEGUR', Number(ttlasegur))
  addToBody('VLRCOMFANDI', Number(vlrcomfandi))
  addToBody('VLRFINESA', Number(vlrfinesa))
  addToBody('VLRPRIMA', Number(vlrprima))

  return body
}

export const adapterBodyControlSeguro = ({
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
}) => {
  const body = {}

  const addToBody = (key, value) => {
    if (value) {
      body[key] = { equal: value }
    }
  }

  addToBody('ASEGURADORA', aseguradora)
  addToBody('COBRO', Number(cobro))
  addToBody('ESTADO', Number(estado))
  addToBody('FECFACTURA', Number(fecfactura))
  addToBody('NID', Number(nid))
  addToBody('NOMBRE', nombre)
  addToBody('NPR', npr)
  addToBody('PAGOCLI', Number(pagocli))
  addToBody('TIPO', tipo)
  addToBody('TIPOPROD', tipoprod)
  addToBody('VLRSEGURO', Number(vlrseguro))

  return body
}

export const adapterBodyFactura = ({
  basecobro,
  concepto,
  estado,
  factura,
  fecfactura,
  fecpagocomfandi,
  mesemision,
  mesfacturado,
  observacion
}) => {
  const body = {}

  const addToBody = (key, value) => {
    if (value) {
      body[key] = { equal: value }
    }
  }

  addToBody('BASECOBRO', Number(basecobro))
  addToBody('CONCEPTO', concepto)
  addToBody('ESTADO', estado)
  addToBody('FACTURA', factura)
  addToBody('FECFACTURA', fecfactura)
  addToBody('FECPAGOCOMFANDI', fecpagocomfandi)
  addToBody('MESEMSION', mesemision)
  addToBody('MESFACTURADO', mesfacturado)
  addToBody('OBSERVACION', observacion)

  return body
}

export const adapterBodyChangeFactura = ({ id, factura, fecfactura, fecpagocomfandi, observacion }) => {
  const body = {}

  const addToBody = (key, value) => {
    if (value) {
      body[key] = { equal: value }
    }
  }

  addToBody('id', id)
  addToBody('factura', factura)
  addToBody('fecfactura', fecfactura)
  addToBody('fecpagocomfandi', fecpagocomfandi)
  addToBody('observacion', observacion)

  return body
}
