import { AccountPopover } from '../AccountPopover'
import { Stack, Avatar, Typography } from '@mui/material'
import { usePopover } from '../../hooks/UsePopover'
import { useSelector } from 'react-redux'
import logoFinesa from '@/assets/LOGO_FINESA_SERVICIOS.png'

function Header() {
  const accountPopover = usePopover()
  const user = useSelector(({ auth }) => auth.user)

  return (
    <>
      <Stack sx={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', px: 2, py: 1 }}>
        <img style={{ width: '100px' }} src={logoFinesa} />
        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Typography color='primary.main' fontWeight={'500'}>Hola, {user.nombre}</Typography>
          <Avatar onClick={accountPopover.handleOpen} ref={accountPopover.anchorRef} sx={{ cursor: 'pointer' }} />
        </Stack>
      </Stack>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  )
}

export default Header
