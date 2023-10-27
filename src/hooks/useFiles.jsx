import { checkRequestErrors } from '@/app/const/api_erros'
import { errorMessage } from '@/app/const/errors_code'
import { UploadFile } from '@/services/endpoints'
import { useSnackbar } from 'notistack'
import { createContext, useContext, useReducer } from 'react'
import { useDispatch } from 'react-redux'

export const FilesContext = createContext()

export const initialState = { isLoading: false, files: [] }

export function reducer(state, action) {
  const { type, payload } = action

  if (type === 'LOAD_FILES') {
    return {
      ...state,
      files: payload
    }
  }

  if (type === 'REMOVE_FILES') {
    return {
      ...state,
      files: []
    }
  }

  if (type === 'UPLOAD_FILES') {
    return {
      ...state,
      isLoading: true
    }
  }

  if (type === 'UPLOADED_FILES') {
    return {
      ...state,
      files: [],
      isLoading: false
    }
  }

  if (type === 'UPLOADED_WITH_ERRORS') {
    return {
      ...state,
      isLoading: false
    }
  }
}

export function FilesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { enqueueSnackbar } = useSnackbar()

  const loadFiles = (files) => {
    console.log('carga', files)
    dispatch({ type: 'LOAD_FILES', payload: files })
  }

  const removeFiles = () => {
    dispatch({ type: 'REMOVE_FILES' })
  }

  const uploadFile = async (url) => {
    dispatch({ type: 'UPLOAD_FILES' })
    try {
      const response = await UploadFile(state.files, url)
      if (response.status === 200) enqueueSnackbar('Documentos subidos exitosamente', { variant: 'success' })
    } catch (error) {
      dispatch({ type: 'UPLOADED_WITH_ERRORS' })
      enqueueSnackbar(`No se ha podido subir el archivo, ${errorMessage(error.error)}`, { variant: 'error' })
    } finally {
      dispatch({ type: 'UPLOADED_FILES' })
    }
  }

  const value = {
    ...state,
    loadFiles,
    removeFiles,
    uploadFile
  }

  return <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
}

export const useFiles = () => {
  return useContext(FilesContext)
}
