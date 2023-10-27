import { Box } from '@mui/material'

function Center({ children }) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      {children}
    </Box>
  )
}

export default Center
