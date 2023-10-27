export const errosCode = {
  /* API errors */
  sessionExpired: 'SESSION_EXPIRED',
  internalServerError: 'INTERNAL_SERVER_ERROR',
  unexpectedError: 'UNEXPECTED_ERROR',
  serverOutOfService: 'SERVER_OUT_OF_SERVICE',
  errorServer: 'ERR_BAD_RESPONSE'
}

export const errorMessage = (errorStr) => {
  switch (errorStr) {
    /* API errors */
    case errosCode.sessionExpired:
      return 'La sesión ha expirado'

    case errosCode.internalServerError:
      return 'Error en el servidor'

    case errosCode.unexpectedError:
      return 'Error inesperado'

    case errosCode.serverOutOfService:
      return 'Servidor fuera de servicio'

    case errosCode.errorServer:
      return 'Error en el servidor'

    /* Default */
    default:
      return 'Error inesperado'
  }
}
