import { actions } from '@/app/modules/Auth'
import { Box } from '@mui/material'
import { Header, AsideMenu } from '@/components'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AsideProvider } from './Aside'

function Layout() {
  const dispatch = useDispatch()
  const location = useLocation()

  const { sessionExpired } = useSelector(({ auth }) => ({
    sessionExpired: auth.sessionExpired
  }))

  useEffect(() => {
    if (sessionExpired) dispatch(actions.logout())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionExpired, location])

  return (
    <Box overflow='hidden' height='100vh' display='grid' gridTemplateRows='auto 1fr'>
      <Header />
      <Box overflow='hidden' display='grid' gridTemplateColumns='auto 1fr'>
        <AsideProvider>
          <AsideMenu />
        </AsideProvider>
        <Box
          display='grid'
          overflow='auto'
          sx={{ backgroundColor: 'primary.50', padding: 1.7, borderTopLeftRadius: '12px' }}
        >
          <Box display='grid' overflow='auto' sx={{ backgroundColor: 'white', borderRadius: 4 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
