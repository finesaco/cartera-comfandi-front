import { Box } from '@mui/material'
import logoFinesa from '@/assets/LOGO_FINESA_SERVICIOS.png'

function HomePage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <img src={logoFinesa}/>
    </Box>
  )
}

export default HomePage
