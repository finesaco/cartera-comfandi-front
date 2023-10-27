import { createContext, useState } from 'react'

export const AsideContext = createContext()

export function AsideProvider({ children }) {
  const [expanded, setExpanded] = useState([])
  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(true)
  const handleToggle = (_, nodeIds) => setExpanded(nodeIds)
  const value = { open, expanded, selected, setOpen, setExpanded, setSelected, handleToggle }
  return <AsideContext.Provider value={value}>{children}</AsideContext.Provider>
}
