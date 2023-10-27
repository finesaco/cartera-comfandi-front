import { getData } from '@/services/endpoints'
import useSWR from 'swr'

const generateQueryParams = ({ page, size, sorts, reports, idRecaudo }) => {
  let queryParams = '?'

  if (page != null) queryParams += `page=${page}&`
  if (size != null) queryParams += `size=${size}&`
  if (reports != null) queryParams += `idReporte=${reports}&`
  if (idRecaudo != null) queryParams += `idRecaudo=${idRecaudo}&`

  if (sorts != null) {
    sorts.forEach((s) => {
      queryParams += `sort=${s.column},${s.sort}&`
    })
  }

  if (queryParams.includes('&', -1)) {
    queryParams = queryParams.slice(0, -1)
  }

  return queryParams
}

function useData({ page, size, sorts, reports, url, body, idRecaudo }) {
  const queryParams = generateQueryParams({
    page,
    size,
    sorts,
    reports,
    idRecaudo
  })

  const finalURL = url + queryParams

  const { data, error, isLoading, isValidating, mutate } = useSWR(finalURL, () => getData(finalURL, body), {
    keepPreviousData: true,
    revalidateOnFocus: false
  })

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate
  }
}

export default useData
