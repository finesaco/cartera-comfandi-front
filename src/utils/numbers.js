export const convertBytesToMb = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(2)
}

export const formatearNumero = (numero) => {
  const numeroFinal = Number(numero)
  const formateado = numeroFinal.toLocaleString('en')

  return '$' + formateado
}