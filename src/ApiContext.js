import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  setActiveNote: () => {},
  setActiveFolder: () => {}
})