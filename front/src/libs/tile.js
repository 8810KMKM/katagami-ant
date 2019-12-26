export const initAllTiles = number => {
  for (let i = 0; i < number; i++) saveSelectedTiles('0', i)
}

export const saveSelectedTiles = (tiles, labelNumber) => {
  localStorage.setItem(`label${labelNumber}`, tiles)
}

export const tilesAreSaved = labelNumber =>
  localStorage.getItem(`label${labelNumber}`) &&
  localStorage.getItem(`label${labelNumber}`) !== '0'

export const savedTiles = labelNumber =>
  tilesAreSaved(labelNumber)
    ? localStorage.getItem(`label${labelNumber}`)
    : '該当無し'

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
  for (let i = 0; i < 3; i++) console.log(savedTiles(i))
}
