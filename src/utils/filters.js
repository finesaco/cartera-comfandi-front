export const FILTERS_COLECTIVAS_AUTOS = [
  {
    field: 'anio',
    title: 'Año',
    type: 'TEXT'
  },
  {
    field: 'mes',
    title: 'Mes',
    type: 'TEXT'
  },
  {
    field: 'estado',
    title: 'Estado',
    type: 'SELECT',
    options: [
      { value: 2, text: 'Pagado' },
      { value: 1, text: 'Pendiente' }
    ]
  },
  {
    field: 'estadoCOMISION',
    title: 'Estado Comisión',
    type: 'SELECT',
    options: [
      { value: 1, text: 'Notificado' },
      { value: 2, text: 'Facturado' },
      { value: 3, text: 'Pagado' }
    ]
  },
  {
    field: 'estadoRETORNO',
    title: 'Estado Retorno',
    type: 'SELECT',
    options: [
      { value: 1, text: 'Pendiente' },
      { value: 2, text: 'En proceso' },
      { value: 3, text: 'Pagado' }
    ]
  },
  {
    field: 'retorcomfa',
    title: 'Retorno Comfandi',
    type: 'TEXT'
  },
  {
    field: 'retorfinesa',
    title: 'Retorno Finesa',
    type: 'TEXT'
  },
  {
    field: 'ttlasegur',
    title: 'Valor asegurado',
    type: 'TEXT'
  },
  {
    field: 'ttlretorno',
    title: 'Valor retorno',
    type: 'TEXT'
  },
  {
    field: 'vlrprima',
    title: 'Valor prima',
    type: 'TEXT'
  },
  {
    field: 'vlrprimaiva',
    title: 'Valor prima (IVA)',
    type: 'TEXT'
  }
]

export const FILTERS_COLECTIVAS_VIDA = [
  {
    field: 'anio',
    title: 'Año',
    type: 'TEXT'
  },
  {
    field: 'estado',
    title: 'Estado',
    type: 'SELECT',
    options: [
      { value: 2, text: 'Pagado' },
      { value: 1, text: 'Pendiente' }
    ]
  },
  {
    field: 'estadoCOMISION',
    title: 'Estado Comisión Comfandi',
    type: 'SELECT',
    options: [
      { value: 1, text: 'Notificado' },
      { value: 2, text: 'Facturado' },
      { value: 3, text: 'Pagado' }
    ]
  },
  {
    field: 'mes',
    title: 'Mes',
    type: 'TEXT'
  },
  {
    field: 'pagoASEGURADORA',
    title: 'Pago Aseguradora',
    type: 'SELECT',
    options: [
      { value: 1, text: 'Pendiente' },
      { value: 2, text: 'En proceso' },
      { value: 3, text: 'Pagado' }
    ]
  },
  {
    field: 'ttlasegur',
    title: 'Total asegurados',
    type: 'TEXT'
  },
  {
    field: 'vlrcomfandi',
    title: 'Valor comisión Comfandi',
    type: 'TEXT'
  },
  {
    field: 'vlrfinesa',
    title: 'Valor comisión Finesa',
    type: 'TEXT'
  },
  {
    field: 'vlrprima',
    title: 'Valor primas',
    type: 'TEXT'
  }
]

export const FILTERS_CONTROL_SEGUROS = [
  {
    field: 'aseguradora',
    title: 'Aseguradora',
    type: 'TEXT'
  },
  {
    field: 'cobro',
    title: 'Cobro Comfandi',
    type: 'TEXT'
  },
  {
    field: 'estado',
    title: 'Estado servicio',
    type: 'SELECT',
    options: [
      { value: 1, text: 'En gestión' },
      { value: 2, text: 'Pago Comfandi' },
      { value: 3, text: 'Pago cliente' },
      { value: 4, text: 'Reintegrado' }
    ]
  },
  {
    field: 'fecfactura',
    title: 'Fecha de Facturación',
    type: 'DATE'
  },
  {
    field: 'nid',
    title: 'Identificación',
    type: 'TEXT'
  },
  {
    field: 'nombre',
    title: 'Nombre cliente',
    type: 'TEXT'
  },
  {
    field: 'npr',
    title: 'Número de crédito',
    type: 'TEXT'
  },
  {
    field: 'pagocli',
    title: 'Pago Cliente',
    type: 'TEXT'
  },
  {
    field: 'tipo',
    title: 'Tipo seguro',
    type: 'TEXT'
  },
  {
    field: 'tipoprod',
    title: 'Tipo Producto',
    type: 'TEXT'
  },
  {
    field: 'vlrseguro',
    title: 'Valor Seguro',
    type: 'TEXT'
  }
]

export const FILTERS_FACTURAS = [
  { field: 'basecobro', title: 'Base de Cobro', type: 'TEXT' },
  { field: 'concepto', title: 'Concepto', type: 'TEXT' },
  {
    field: 'estado',
    title: 'Estado',
    type: 'SELECT',
    options: [
      { value: 1, text: 'Rechazado' },
      { value: 2, text: 'Pendiente' },
      { value: 3, text: 'En proceso' },
      { value: 4, text: 'Pagado' }
    ]
  },
  { field: 'factura', title: 'Número de Factura', type: 'TEXT' },
  { field: 'fecfactura', title: 'Fecha de Factura', type: 'DATE' },
  { field: 'fecpagocomfandi', title: 'Fecha de Pago Comfandi', type: 'DATE' },
  { field: 'mesemision', title: 'Mes de Emisión Factura', type: 'TEXT' },
  { field: 'mesfacturado', title: 'Mes Facturado', type: 'TEXT' },
  { field: 'observacion', title: 'Observación', type: 'TEXT' }
]

export const FILTERS_FONDEOS = [
  {
    field: 'anio',
    title: 'Año',
    type: 'TEXT'
  },
  {
    field: 'month',
    title: 'Mes',
    type: 'TEXT'
  },
  {
    field: 'day',
    title: 'Día',
    type: 'TEXT'
  },
  {
    field: 'xmil',
    title: '4 x mil',
    type: 'TEXT'
  },
  {
    field: 'total',
    title: 'Total a pagar',
    type: 'TEXT'
  },
  {
    field: 'npr',
    title: 'Crédito',
    type: 'TEXT'
  },
  {
    field: 'vlrdesembolso',
    title: 'Valor desembolso',
    type: 'TEXT'
  },
  {
    field: 'reintegro',
    title: 'Reintegro fondeo',
    type: 'TEXT'
  },
  {
    field: 'state',
    title: 'estado de factura',
    type: 'SELECT',
    options: [
      { value: 2, text: 'Pagado' },
      { value: 1, text: 'Pendiente' }
    ]
  }
]

export const FILTERS_NEGOCIOS = [
  {
    field: 'anio',
    title: 'Año',
    type: 'TEXT'
  },
  {
    field: 'mes',
    title: 'Mes',
    type: 'TEXT'
  },
  {
    field: 'dia',
    title: 'Día',
    type: 'TEXT'
  },
  {
    field: 'categoria',
    title: 'Categoría',
    type: 'TEXT'
  },
  {
    field: 'fasecolda',
    title: 'Fasecolda',
    type: 'TEXT'
  },
  {
    field: 'fecdese',
    title: 'Fecha desembolso',
    type: 'TEXT'
  },
  {
    field: 'garantia',
    title: 'Garantía',
    type: 'TEXT'
  },
  {
    field: 'linea',
    title: 'Linea',
    type: 'TEXT'
  },
  {
    field: 'marca',
    title: 'Marca',
    type: 'TEXT'
  },
  {
    field: 'modelo',
    title: 'Modelo',
    type: 'TEXT'
  },
  {
    field: 'nombre',
    title: 'Nombre',
    type: 'TEXT'
  },
  {
    field: 'npr',
    title: 'Crédito',
    type: 'TEXT'
  },
  {
    field: 'plazo',
    title: 'Plazo',
    type: 'TEXT'
  },
  {
    field: 'porcentaje',
    title: '% Financiamiento',
    type: 'TEXT'
  },
  {
    field: 'segriesgo',
    title: 'Seguro todo riesgo',
    type: 'TEXT'
  },
  {
    field: 'segvida',
    title: 'Seguro Vida',
    type: 'TEXT'
  },
  {
    field: 'tasa',
    title: 'Tasa mensual',
    type: 'TEXT'
  },
  {
    field: 'tasasub',
    title: 'Tasa con subsidio',
    type: 'TEXT'
  },
  {
    field: 'tipo',
    title: 'Tipo',
    type: 'TEXT'
  },
  {
    field: 'vlrfinanciado',
    title: 'Valor financiado',
    type: 'TEXT'
  },
  {
    field: 'vlrvehiculo',
    title: 'Valor vehículo',
    type: 'TEXT'
  }
]

export const FILTERS_RECAUDOS = [
  { field: 'nid', title: 'Número de identificación', type: 'TEXT' },
  { field: 'nombre', title: 'Nombre', type: 'TEXT' },
  { field: 'categoria', title: 'Categoría', type: 'TEXT' },
  { field: 'tasa', title: 'Tasa', type: 'TEXT' },
  { field: 'segvida', title: 'Seguro de vida', type: 'TEXT' },
  { field: 'fecfactura', title: 'Fecha de facturación', type: 'DATE' },
  { field: 'diapago', title: 'Día de pago', type: 'TEXT' },
  { field: 'concepto', title: 'Concepto', type: 'TEXT' },
  { field: 'saldo', title: 'Saldo', type: 'TEXT' },
  { field: 'cuota', title: 'Cuota', type: 'TEXT' },
  { field: 'capital', title: 'Capital', type: 'TEXT' },
  { field: 'intcor', title: 'Intereses corrientes', type: 'TEXT' },
  { field: 'subsidio', title: 'Subsidio', type: 'TEXT' },
  { field: 'intmor', title: 'Intereses mora', type: 'TEXT' },
  { field: 'ttlrecbido', title: 'Valor recibido', type: 'TEXT' },
  { field: 'vlrfactura', title: 'Valor facturado', type: 'TEXT' },
  { field: 'npr', title: 'Crédito', type: 'TEXT' },
  { field: 'segriesgo', title: 'Seguro todo riesgo', type: 'TEXT' },
  {
    field: 'estadocobro',
    title: 'Estado cobro',
    type: 'SELECT',
    options: [
      { value: 1, text: 'Pendiente' },
      { value: 2, text: 'Notificado' },
      { value: 3, text: 'Facturado' },
      { value: 4, text: 'Pagado' }
    ]
  },
  {
    field: 'estadoretorno',
    title: 'Estado retorno',
    type: 'SELECT',
    options: [
      { value: 1, text: 'Pendiente' },
      { value: 2, text: 'En proceso' },
      { value: 3, text: 'Pagado' }
    ]
  },
  {
    field: 'estadofactura',
    title: 'Estado factura',
    type: 'SELECT',
    options: [
      { value: 1, text: 'Parcialmente pago' },
      { value: 2, text: 'Totalmente pago' }
    ]
  }
]

export const FILTERS_SEGUROS = [
  {
    field: 'anio',
    title: 'Año',
    type: 'TEXT'
  },
  {
    field: 'mes',
    title: 'Mes desembolso',
    type: 'TEXT'
  },
  {
    field: 'npr',
    title: 'Crédito',
    type: 'TEXT'
  },
  {
    field: 'placa',
    title: 'Placa',
    type: 'TEXT'
  },
  {
    field: 'nombre',
    title: 'Cliente',
    type: 'TEXT'
  },
  {
    field: 'vlrasegu',
    title: 'Valor vehículo',
    type: 'TEXT'
  },
  {
    field: 'aseguradora',
    title: 'Aseguradora',
    type: 'TEXT'
  },
  {
    field: 'fecini',
    title: 'Fecha inicio',
    type: 'TEXT'
  },
  {
    field: 'fecfin',
    title: 'Fecha finalización',
    type: 'TEXT'
  }
]
