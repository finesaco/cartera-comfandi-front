import { Button, Checkbox, Menu, MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useState } from 'react'

const DropdownFilterButton = ({ selectedOptions, setSelectedOptions, optionsList }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOptionSelect = (value) => () => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value))
    } else {
      setSelectedOptions([...selectedOptions, value])
    }
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleButtonClick}>
        <AddIcon /> Añadir filtro
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} sx={{ maxHeight: '50vh' }} onClose={handleMenuClose}>
        <MenuItem disabled>Seleccione opciones</MenuItem>
        {optionsList.map((option, i) => (
          <MenuItem key={i} onClick={handleOptionSelect(option)}>
            <Checkbox checked={selectedOptions.includes(option)} />
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
export default DropdownFilterButton
