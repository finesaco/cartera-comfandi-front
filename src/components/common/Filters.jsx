import { TextField, Stack, Typography, Box, FormControl, Select, MenuItem, FormHelperText, Button } from '@mui/material'
import { inputTypes } from '@/app/const'

function Filters({ filtersProps, handleFilterChange, filters, clickApplyFilters, clickResetFilters }) {
  const onChangeFilters = (event) => {
    handleFilterChange(event.target.name, event.target.value)
  }
  return (
    <Stack sx={{ gap: 1 }}>
      <Typography color='text.secondary'>Filtros</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {filtersProps.map((value, index) => {
          switch (value.type) {
            case inputTypes.select:
              return (
                <FormControl key={inputTypes.select + index}>
                  <Select
                    size='small'
                    displayEmpty
                    name={value.field}
                    onChange={onChangeFilters}
                    value={filters[value.field] || ''}
                    sx={{ minWidth: '170px' }}
                  >
                    <MenuItem value=''>Seleccionar</MenuItem>
                    {value.options.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{value.title}</FormHelperText>
                </FormControl>
              )

            case inputTypes.text:
              return (
                <TextField
                  size='small'
                  helperText={value.title}
                  key={inputTypes.text + index}
                  name={value.field}
                  onChange={onChangeFilters}
                  placeholder={value.title}
                  type='text'
                  value={filters[value.field] || ''}
                  sx={{ width: '170px' }}
                />
              )

            case inputTypes.date:
              return (
                <TextField
                  size='small'
                  helperText={value.title}
                  key={inputTypes.date + index}
                  name={value.field}
                  onChange={onChangeFilters}
                  placeholder={value.title}
                  type='date'
                  value={filters[value.field] || ''}
                  sx={{ width: '170px' }}
                />
              )

            default:
              return null
          }
        })}
        {filtersProps.length > 0 && (
          <Stack sx={{ flexDirection: 'row', gap: 2 }}>
            <Button sx={{ height: 'fit-content' }} variant='contained' onClick={() => clickApplyFilters()}>
              Filtrar
            </Button>
            <Button sx={{ height: 'fit-content' }} variant='outlined' onClick={clickResetFilters}>
              Limpiar filtros
            </Button>
          </Stack>
        )}
      </Box>
    </Stack>
  )
}
export default Filters
