export const initAllTiles = number => {
  for (let i = 0; i < number; i++) saveSelectedTiles('0', i)
}

export const saveSelectedTiles = (tiles, labelNumber) => {
  localStorage.setItem(`label${labelNumber}`, tiles)
}

export const savedTiles = labelNumber =>
  localStorage.getItem(`label${labelNumber}`)

export const tilesAreSaved = labelNumber =>
  savedTiles(labelNumber) && savedTiles(labelNumber) !== '0'

export const diplayedTiles = labelNumber =>
  tilesAreSaved(labelNumber) ? savedTiles(labelNumber) : '該当無し'

export const clearTiles = labelNumber => {
  localStorage.removeItem(`label${labelNumber}`)
}

export const clearAllTiles = () => {
  console.log('* --- * --- * --- *')
  tiles()
  console.log(' ||| ')
  for (let i = 0; i < 3; i++) {
    clearTiles(i)
  }
  tiles()
  console.log('* --- * --- * --- *')
}

export const tiles = () => {
  for (let i = 0; i < 3; i++) console.log(diplayedTiles(i))
}
