import { InputBase, Paper, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

function InputSearch() {
  return (
    <Paper
      component='form'
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: 45,
        width: 400,
        overflow: 'hidden',
        border: 'solid',
        borderColor: 'primary.main'
      }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder='Buscar' inputProps={{ 'aria-label': 'search google maps' }} />

      <IconButton
        type='button'
        sx={{ p: '15px', borderRadius: '0', backgroundColor: 'primary.main' }}
        aria-label='search'
      >
        <SearchIcon sx={{ color: 'white' }} />
      </IconButton>
    </Paper>
  )
}
export default InputSearch
