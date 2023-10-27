import { Box, Container, Stack, TextField, Typography } from '@mui/material'
import { checkLoginErrors } from '../../../const/api_erros'
import { errorMessage } from '../../../const/errors_code'
import { LoadingButton } from '@mui/lab'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import * as auth from '../_redux/authRedux'
import * as Yup from 'yup'
import logoFinesa from '@/assets/LOGO_FINESA_SERVICIOS.png'
import loginImage from '@/assets/image-login.png'
import { login } from '@/services/endpoints'
function Login() {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('El correo es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria')
    }),
    onSubmit: (credentials, formikHelpers) => {
      const { setSubmitting } = formikHelpers
      const { email, password } = credentials

      login(email, password)
        .then(async (response) => {
          console.log(response)
          return await response.data
        })
        .then((user) => {
          dispatch(auth.actions.login(user))
          dispatch(auth.actions.fulfillUser(user))
        })
        .catch((error) => {
          console.log(error)
          enqueueSnackbar(error.message, { variant: 'error' })
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })

  return (
    <Box height='100vh' display='grid' gridTemplateColumns='2fr 1fr'>
      <Box
        sx={{
          background: '#000129',
          display: 'flex',
          flexDirection: 'column',
          padding: 4,
          borderRadius: '0 10px 10px 0',
          color: 'white'
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Stack spacing={1}>
            <div>
              <img src={loginImage} />
            </div>
            <Typography component='h4'>
              Sumamos más de 20 años haciendo realidad los sueños de los colombianos.
              <br />
              Contamos con atención especializada, trayectoria y experiencia.
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Container maxWidth='xs'>
          <Stack gap={6} textAlign='center'>
            <Box margin='auto'>
              <img src={logoFinesa} />
            </Box>
            <Stack gap={1}>
              <Typography color='text.secondary' component='h1' variant='h4' fontWeight='600' fontSize='30px'>
                Inicio de sesión
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack gap={2}>
                <TextField
                  error={errors.email && touched.email}
                  helperText={errors.email}
                  id='email'
                  label='Usuario'
                  name='email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='text'
                  value={values.email}
                />
                <TextField
                  error={errors.password && touched.password}
                  helperText={errors.password}
                  id='password'
                  label='Contraseña'
                  name='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type='password'
                  value={values.password}
                />
                <LoadingButton variant='contained' type='submit' loading={isSubmitting}>
                  Iniciar sesión
                </LoadingButton>
              </Stack>
            </form>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default Login
