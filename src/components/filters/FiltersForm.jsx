import React, { useState } from 'react'
import { TextField, FormControl, Button, MenuItem, InputLabel, Select } from '@mui/material'

const FilterForm = ({ filters, onSubmit }) => {
  const [filterValues, setFilterValues] = useState({})
  const [activeFilters, setActiveFilters] = useState([])

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleActiveFilterChange = (event) => {
    const selectedFilters = event.target.value
    setActiveFilters(selectedFilters)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const activeFilterValues = activeFilters.reduce((result, filter) => {
      result[filter] = filterValues[filter]
      return result
    }, {})
    onSubmit(activeFilterValues)
  }

  const renderFilters = (filterList) => {
    return filterList.map((filter) => {
      if (filter.children) {
        return (
          <div key={filter.name}>
            <h4>{filter.name}</h4>
            {renderFilters(filter.children)}
          </div>
        )
      }

      const filterValue = filterValues[filter.name] || ''

      if (filter.type === 'select') {
        return (
          <FormControl key={filter.name}>
            <InputLabel>{filter.label}</InputLabel>
            <Select name={filter.name} value={filterValue} onChange={handleFilterChange}>
              {filter.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      }

      if (filter.type === 'date') {
        return (
          <TextField
            key={filter.name}
            label={filter.label}
            name={filter.name}
            type='date'
            value={filterValue}
            onChange={handleFilterChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        )
      }

      return (
        <TextField
          key={filter.name}
          label={filter.label}
          name={filter.name}
          value={filterValue}
          onChange={handleFilterChange}
        />
      )
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel>Seleccionar filtros</InputLabel>
        <Select multiple value={activeFilters} onChange={handleActiveFilterChange}>
          {filters.map((filter) => (
            <MenuItem key={filter.name} value={filter.name}>
              {filter.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {renderFilters(filters)}
      <Button variant='contained' color='primary' type='submit'>
        Aplicar filtros
      </Button>
    </form>
  )
}

export default FilterForm
