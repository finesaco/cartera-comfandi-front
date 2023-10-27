import { errorMessage } from '@/app/const/errors_code'
import { useSnackbar } from 'notistack'
import { createContext, useContext, useReducer } from 'react'
import { getReporte } from '@/services/endpoints'

export const FilesContext = createContext()

export const initialState = { isLoading: false }

export function reducer(state, action) {
  const { type } = action

  if (type === 'DOWNLOAD_FILES') {
    return {
      ...state,
      isLoading: true
    }
  }

  if (type === 'DOWNLOADED_FILES') {
    return {
      ...state,
      isLoading: false
    }
  }

  if (type === 'DOWNLOADED_WITH_ERRORS') {
    return {
      ...state,
      isLoading: false
    }
  }
}

export function DownloadFilesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { enqueueSnackbar } = useSnackbar()

  const downloadFile = async (params, body, url, nameReport) => {
    dispatch({ type: 'DOWNLOAD_FILES' })
    try {
      const response = await getReporte(params, body, url)
      const blobData = new Blob([response.data], { type: response.headers['content-type'] })
      const downloadLink = document.createElement('a')
      downloadLink.href = window.URL.createObjectURL(blobData)
      downloadLink.download = nameReport
      // Agregar el enlace al documento y simular el clic
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)

      enqueueSnackbar('Documentos descargados exitosamente', { variant: 'success' })
    } catch (error) {
      dispatch({ type: 'DOWNLOADED_WITH_ERRORS' })
      enqueueSnackbar(`No se ha podido descargar el archivo, ${errorMessage(error.error)}`, { variant: 'error' })
    } finally {
      dispatch({ type: 'DOWNLOADED_FILES' })
    }
  }

  const value = {
    ...state,
    downloadFile
  }

  return <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
}

export const useDownloadFiles = () => {
  return useContext(FilesContext)
}
