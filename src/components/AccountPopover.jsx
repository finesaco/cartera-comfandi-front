import { actions } from '@/app/modules/Auth'
import { Box, Button, Divider, Popover, Typography, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <Popover
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      elevation={3}
      anchorEl={anchorEl}
      onClose={onClose}
      open={open}
    >
      <Box sx={{ p: 2 }}>
        <Typography>Cuenta</Typography>
        <Typography sx={{ fontSize: 14 }} color='text.secondary'>{user.usuario}</Typography>
      </Box>
      <Divider />
      <Stack sx={{ p: 1 }}>
        <Button variant='text' onClick={() => dispatch(actions.logout())}>Cerrar sesión</Button>
      </Stack>
    </Popover>
  )
}
