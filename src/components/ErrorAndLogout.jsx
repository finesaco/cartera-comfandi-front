import { actions } from '@/app/modules/Auth'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSnackbar } from 'notistack'

function ErrorAndLogout({ error }) {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  useEffect(() => {
    enqueueSnackbar(error.message, { variant: 'error' })
    dispatch(actions.logout())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default ErrorAndLogout
