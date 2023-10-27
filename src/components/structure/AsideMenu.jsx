import { AsideContext } from './Aside'
import { Button, ButtonBase, Stack, Typography, Box } from '@mui/material'
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material'
import logoComfandi from '@/assets/Logo-Comfandi.png'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CircleIcon from '@mui/icons-material/Circle'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import fondeoIcon from '@/assets/icons/fondeoIcon.svg'
import homeIcon from '@/assets/icons/homeIcon.svg'
import historyIcon from '@/assets/icons/historyIcon.svg'
import facIcon from '@/assets/icons/facIcon.svg'
import colectivaIcon from '@/assets/icons/colectivaIcon.svg'
import reportIcon from '@/assets/icons/reportIcon.svg'
import controlIcon from '@/assets/icons/controlIcon.svg'

function buscarCadenas(cadenasABuscar, todasLasCadenas) {
  for (let i = 0; i < cadenasABuscar.length; i++) {
    if (!todasLasCadenas.includes(cadenasABuscar[i])) {
      return false
    }
  }
  return true
}

function AsideMenuDropdown({ children, name, icon, outlineIcon, layer = 2, parent }) {
  const [display, setDisplay] = useState(false)
  const location = useLocation()

  const isActive = buscarCadenas(parent.split('/').slice(1), location.pathname.split('/').slice(1))

  return (
    <Stack>
      <ButtonBase
        sx={{
          pr: 2,
          justifyContent: 'space-between',
          color: isActive ? 'primary.main' : 'text.secondary',
          ':hover': {
            backgroundColor: 'action.hover'
          }
        }}
        onClick={() => setDisplay(!display)}
      >
        <Stack sx={{ flexDirection: 'row', alignItems: 'center', pl: layer, py: 1, gap: 1 }}>
          {isActive ? icon : outlineIcon}
          <Typography>{name}</Typography>
        </Stack>
        {display ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ButtonBase>
      {display ? children : null}
    </Stack>
  )
}

function AsideMenuSimpleItem({ to, icon, outlineIcon }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { setOpen } = useContext(AsideContext)
  const isActive = location.pathname === to

  return (
    <ButtonBase
      onClick={() => {
        if (to) {
          navigate(to)
        } else {
          setOpen(true)
        }
      }}
      sx={{
        justifyContent: 'center',
        color: isActive ? 'primary.main' : 'text.secondary',
        backgroundColor: isActive ? 'primary.50' : 'transparent',
        ':hover': {
          backgroundColor: isActive ? 'primary.50' : 'action.hover'
        }
      }}
    >
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', px: 2, py: 1 }}>{isActive ? icon : outlineIcon}</Stack>
    </ButtonBase>
  )
}

function AsideMenuItem({ to, name, icon, outlineIcon, layer = 2 }) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = location.pathname === to

  return (
    <ButtonBase
      onClick={() => navigate(to)}
      sx={{
        justifyContent: 'flex-start',
        color: isActive ? 'primary.main' : 'text.secondary',
        backgroundColor: isActive ? 'primary.50' : 'transparent',
        ':hover': {
          backgroundColor: isActive ? 'primary.50' : 'action.hover'
        }
      }}
    >
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', pl: layer, pr: 2, py: 1, gap: 1 }}>
        {!icon && !outlineIcon && <CircleIcon sx={{ width: 8 }} />}
        {icon && outlineIcon && isActive ? icon : outlineIcon}
        <Typography>{name}</Typography>
      </Stack>
    </ButtonBase>
  )
}

function NoExpanddedMenu() {
  return (
    <>
      <AsideMenuSimpleItem to='/' icon={<img src={homeIcon} />} outlineIcon={<img src={homeIcon} />} />
      <AsideMenuSimpleItem
        parent='/recaudos'
        icon={<img src={historyIcon} />}
        outlineIcon={<img src={historyIcon} />}
      />
      <AsideMenuSimpleItem parent='/fondeos' icon={<img src={fondeoIcon} />} outlineIcon={<img src={fondeoIcon} />} />
      <AsideMenuSimpleItem parent='/facturas' icon={<img src={facIcon} />} outlineIcon={<img src={facIcon} />} />
      <AsideMenuSimpleItem
        parent='/colectivas'
        icon={<img src={colectivaIcon} />}
        outlineIcon={<img src={colectivaIcon} />}
      />
      <AsideMenuSimpleItem parent='/reportes' icon={<img src={reportIcon} />} outlineIcon={<img src={reportIcon} />} />
      <AsideMenuSimpleItem
        parent='/controlSeguros'
        icon={<img src={controlIcon} />}
        outlineIcon={<img src={controlIcon} />}
      />
    </>
  )
}

function ExpandedMenu() {
  return (
    <Stack sx={{ width: '300px', overflow: 'auto' }}>
      <AsideMenuItem name='Inicio' to='/' icon={<img src={homeIcon} />} outlineIcon={<img src={homeIcon} />} />
      <AsideMenuItem
        name='Histórico recaudos'
        to='/recaudos'
        icon={<img src={historyIcon} />}
        outlineIcon={<img src={historyIcon} />}
      />
      <AsideMenuItem
        name='Fondeo'
        to='/fondeos'
        icon={<img src={fondeoIcon} />}
        outlineIcon={<img src={fondeoIcon} />}
      />
      <AsideMenuItem name='Facturas' to='/facturas' icon={<img src={facIcon} />} outlineIcon={<img src={facIcon} />} />
      <AsideMenuDropdown
        name='Colectivas'
        parent='/colectivas'
        icon={<img src={colectivaIcon} />}
        outlineIcon={<img src={colectivaIcon} />}
      >
        <AsideMenuItem name='Autos' layer={4} to='/colectivas/autos' />
        <AsideMenuItem name='Vida' layer={4} to='/colectivas/vida' />
      </AsideMenuDropdown>
      <AsideMenuDropdown
        parent='/reportes'
        name='Reportes'
        icon={<img src={reportIcon} />}
        outlineIcon={<img src={reportIcon} />}
      >
        <AsideMenuItem name='Seguros autos' layer={4} to='/reportes/seguros-autos' />
        <AsideMenuItem name='Seguros vida' layer={4} to='/reportes/seguros-vida' />
        <AsideMenuItem name='Negocios desembolsados' layer={4} to='/reportes/negocios-desembolsados' />
      </AsideMenuDropdown>
      <AsideMenuItem
        name='Control seguros'
        to='/controlSeguros'
        icon={<img src={controlIcon} />}
        outlineIcon={<img src={controlIcon} />}
      />
    </Stack>
  )
}

function AsideMenu() {
  const { open, setOpen } = useContext(AsideContext)

  return (
    <Stack sx={{ justifyContent: 'space-between', overflow: 'hidden' }}>
      <Stack sx={{ overflow: 'hidden' }}>
        <Button
          sx={{ justifyContent: open ? 'flex-end' : 'center', px: 1 }}
          variant='text'
          onClick={() => setOpen((state) => !state)}
        >
          {open ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
        </Button>
        <Stack sx={{ overflow: 'hidden' }}>{open ? <ExpandedMenu /> : <NoExpanddedMenu />}</Stack>
      </Stack>
      {open && (
        <Box sx={{ transform: 'scale(0.8)', display: 'flex', justifyContent: 'center' }}>
          <img src={logoComfandi} />
        </Box>
      )}
    </Stack>
  )
}

export default AsideMenu
