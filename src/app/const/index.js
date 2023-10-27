//export const API_PATH = 'https://apireportescomfandi.finesa.local/api/'
export const API_PATH = 'http://localhost:8080'

export const paginateProps = {
  currentPage: 0,
  sizePerPage: 10,
  sort: ['id', 'asc']
}

export const inputTypes = {
  select: 'SELECT',
  text: 'TEXT',
  date: 'DATE'
}

export function getQueryParams(filters) {
  let ans = ''
  let first = true
  for (const filter in filters) {
    if (filters[filter] !== '') {
      let str
      if (first) [str, first] = ['?', false]
      else str = '&'

      switch (filter) {
        case 'id':
          ans += str + `id=${filters[filter]}`
          break
        case 'factura':
          ans += str + `factura=${filters[filter]}`
          break
        case 'fecfactura':
          ans += str + `fecFactura=${filters[filter]}`
          break
        case 'fecpagocomfandi':
          ans += str + `fecPagoComfandi=${filters[filter]}`
          break
        case 'observacion':
          ans += str + `observacion=${filters[filter]}`
          break
        case 'user':
          ans += str + `user=${filters[filter]}`
          break
        case 'password':
          ans += str + `password=${filters[filter]}`
          break
        case 'idDoc':
          ans += str + `idDoc=${filters[filter]}`
          break
        case 'tipoRecaudo':
          ans += str + `tipoRecaudo=${filters[filter]}`
          break
        case 'size':
          ans += str + `size=${filters[filter]}`
          break
        case 'currentPage':
          ans += str + `page=${filters[filter]}`
          break
        case 'tipoSeguro':
          ans += str + `tipoSeguro=${filters[filter]}`
          break
        case 'sort':
          if (Array.isArray(filters[filter]) === true) {
            // eslint-disable-next-line no-loop-func
            filters[filter].forEach((sort) => {
              ans += str + `sort=${sort}`
            })
          } else {
            ans += str + `sort=${filters[filter]}`
          }
          break
        case 'pageNumber':
          ans += str + `pageNumber=${filters[filter]}`
          break
        case 'pageSize':
          ans += str + `pageSize=${filters[filter]}`
          break
        case 'paged':
          ans += str + `paged=${filters[filter]}`
          break
        case 'sorted':
          ans += str + `sort.sorted=${filters[filter]}`
          break
        default:
          ans += str + `${filter}=${filters[filter]}`
          break
      }
    }
  }
  return ans
}
