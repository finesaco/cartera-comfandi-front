export const adapterEstadoRetorno = (estado) => {
  switch (estado) {
    case 1:
      return 'Pendiente'
    case 2:
      return 'En proceso'
    case 3:
      return 'Pagado'
    default:
      return 'Pendiente'
  }
}

const adapterEstadoComision = (estado) => {
  switch (estado) {
    case 1:
      return 'Pendiente'
    case 2:
      return 'Notificado'
    case 3:
      return 'Facturado'
    case 4:
      return 'Pagado'
    default:
      return 'Pendiente'
  }
}

const adapterEstadoServicio = (estado) => {
  switch (estado) {
    case 1:
      return 'En gestión'
    case 2:
      return 'Pagado Comfandi'
    case 3:
      return 'Pagado cliente'
    case 4:
      return 'Reintegrado Comfandi'
    default:
      return 'En gestión'
  }
}

export const adapterEstadoFacturas = (estado) => {
  switch (estado) {
    case 1:
      return 'Rechazado'
    case 2:
      return 'Pendiente'
    case 3:
      return 'En proceso'
    case 4:
      return 'Pagado'
    default:
      return 'Pendiente'
  }
}
export const adapterEstadoCobro = (estado) => {
  switch (estado) {
    case 1:
      return 'Pendiente'
    case 2:
      return 'Notificado'
    case 3:
      return 'Facturado'
    case 4:
      return 'Pagado'
    default:
      return 'Pendiente'
  }
}

export const adapterColectivaAutos = (colectivaAutos) => {
  return colectivaAutos.map((auto) => ({
    id: auto.colectiva_ID,
    anio: auto.anio,
    mes: auto.mes,
    ttlasegur: auto.ttlasegur,
    vlrprimaiva: auto.vlrprimaiva,
    vlrprima: auto.vlrprima,
    ttlretorno: auto.ttlretorno,
    estadoRETORNO: adapterEstadoRetorno(auto.estado_RETORNO),
    retorcomfa: auto.retorcomfa,
    estadoCOMISION: adapterEstadoComision(auto.estado_COMISION),
    retorfinesa: auto.retorfinesa,
    estado: auto.estado === 1 ? 'Pendiente' : 'Enviado'
  }))
}
export const adapterColectivaVida = (colectivaVida) => {
  return colectivaVida.map((colectiva) => ({
    id: colectiva.colectiva_ID,
    anio: colectiva.anio,
    mes: colectiva.mes,
    ttlasegur: colectiva.ttlasegur,
    vlrprima: colectiva.vlrprima,
    pagoASEGURADORA: adapterEstadoRetorno(colectiva.pago_ASEGURADORA),
    vlrcomfandi: colectiva.vlrcomfandi,
    estadoCOMISION: adapterEstadoComision(colectiva.estado_COMISION),
    vlrfinesa: colectiva.vlrfinesa,
    estado: colectiva.estado === 1 ? 'Pendiente' : 'Enviado'
  }))
}

export const adapterControlSeguros = (ctlSeguros) => {
  return ctlSeguros.map((ctlSeguro) => ({
    id: ctlSeguro.id,
    fecfactura: ctlSeguro.fecfactura,
    tipoprod: ctlSeguro.tipoprod,
    npr: ctlSeguro.npr,
    nombre: ctlSeguro.nombre,
    nid: ctlSeguro.nid,
    tipo: ctlSeguro.tipo,
    aseguradora: ctlSeguro.aseguradora,
    vlrseguro: ctlSeguro.vlrseguro,
    pagocli: ctlSeguro.pagocli,
    cobro: ctlSeguro.cobro,
    estado: adapterEstadoServicio(ctlSeguro.estado)
  }))
}

export const adapterFacturas = (facturas) => {
  return facturas.map((factura) => ({
    id: factura.id,
    anio: factura.anio,
    mesfacturado: factura.mesfacturado,
    mesemision: factura.mesemision,
    factura: factura.factura,
    fecfactura: factura.fecfactura,
    concepto: factura.concepto,
    basecobro: factura.basecobro,
    fecpagocomfandi: factura.fecpagocomfandi,
    estado: adapterEstadoFacturas(factura.estado),
    observacion: factura.observacion
  }))
}

export const adapterFondeos = (fondeos) => {
  return fondeos.map((fondeo) => ({
    id: fondeo.id,
    anio: fondeo.anio,
    mes: fondeo.mes,
    dia: fondeo.dia,
    npr: fondeo.npr,
    xmil: fondeo.xmil,
    total: fondeo.total,
    vlrdesembolso: fondeo.vlrdesembolso,
    reintegro: fondeo.reintegro,
    estado: fondeo.estado === 1 ? 'Pendiente' : 'Pagado'
  }))
}

export const adapterNegocios = (negocios) => {
  return negocios.map((negocio) => ({
    id: negocio.nid,
    anio: negocio.anio,
    mes: negocio.mes,
    dia: negocio.dia,
    categoria: negocio.categoria,
    fasecolda: negocio.fasecolda,
    fecdese: negocio.fecdese,
    garantia: negocio.garantia,
    linea: negocio.linea,
    marca: negocio.marca,
    modelo: negocio.modelo,
    nombre: negocio.nombre,
    npr: negocio.npr,
    plazo: negocio.plazo,
    porcentaje: negocio.porcentaje,
    segriesgo: negocio.segriesgo,
    segvida: negocio.segvida,
    tasa: negocio.tasa,
    tasasub: negocio.tasasub,
    tipo: negocio.tipo,
    vlrfinanciado: negocio.vlrfinanciado,
    vlrvehiculo: negocio.vlrvehiculo
  }))
}

export const adapterRecaudos = (recaudos) => {
  return recaudos.map((recaudo) => ({
    id: recaudo.id,
    idRecaudo: recaudo.id,
    nid: recaudo.nid,
    nombre: recaudo.nombre,
    categoria: recaudo.categoria,
    tasa: recaudo.tasa,
    segvida: recaudo.segvida,
    fecfactura: recaudo.fecfactura,
    diapago: recaudo.diapago,
    concepto: recaudo.concepto,
    saldo: recaudo.saldo,
    cuota: recaudo.cuota,
    capital: recaudo.capital,
    intcor: recaudo.intcor,
    subsidio: recaudo.subsidio,
    intmor: recaudo.intmor,
    ttlrecbido: recaudo.ttlrecbido,
    vlrfactura: recaudo.vlrfactura,
    npr: recaudo.npr,
    segriesgo: recaudo.segriesgo,
    estadocobro: adapterEstadoCobro(recaudo.estadocobro),
    estadoretorno: adapterEstadoRetorno(recaudo.estadoretorno),
    estadofactura: recaudo.estadofactura === 1 ? 'Parcialmente pago' : 'Totalmente pago'
  }))
}

export const adapterSeguros = (seguros) => {
  return seguros.map((seguro, id) => ({
    id,
    anio: seguro.anio,
    mes: seguro.mes,
    npr: seguro.npr,
    placa: seguro.placa,
    nombre: seguro.nombre,
    vlrasegu: seguro.vlrasegu,
    aseguradora: seguro.aseguradora,
    fecini: seguro.fecini,
    fecfin: seguro.fecfin
  }))
}
