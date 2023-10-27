import { actions } from '../../../modules/Users/_redux/UsersRedux'
import { Input } from '../../DocView/Input'
import { useDispatch } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { useSnackbar } from 'notistack'

export const Password = ({ userId }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Ingresa al menos 8 caracteres')
      .max(100, 'Limite de caracteres alcanzados (100)')
      .required('Por favor ingresa este campo'),
    confirmPassword: Yup.string()
      .required('Por favor ingresa este campo')
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
  })
  const passwordFormik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      setLoading(true)
      dispatch(actions.updateUserPassword(userId, values)).then(() => setLoading(false))
    }
  })

  return (
    <>
      <hr />
      <Box sx={{ mt: 2 }}>
      <Typography variant='h5' color={'warning.main'} sx={{ ml: 2 }}>Editar contraseña</Typography>
        <form onSubmit={passwordFormik.handleSubmit} noValidate>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '100%', padding: 2 }}>
              <Input label={'Nueva Contraseña'} embargoFormik={passwordFormik} inputField={'password'} />
              <Typography fontSize={'0.9rem'} >Ingresa mínimo 8 caracteres.</Typography>
            </Box>
            <Box sx={{ width: '100%', margin: 2 }}>
              <Input label={'Repetir Contraseña'} embargoFormik={passwordFormik} inputField={'confirmPassword'} />
            </Box>
          </Box>
          <Box sx={{ pl: 2 }}>
            {loading ? (
              <div role='status'>
                <span>Loading...</span>
              </div>
            ) : (
              <Button
                onClick={() => {
                  !passwordFormik.isValid &&
                    enqueueSnackbar('Faltan campos por llenar', { variant: 'warning' })
                }}
              >
                Cambiar
              </Button>
            )}
         </Box>

        </form>
      </Box>
    </>
  )
}
