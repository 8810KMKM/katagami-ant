export const saveSelectedTiles = (tiles, labelNunmber) => {
  localStorage.setItem(`label${labelNunmber}`, tiles)
}

export const savedTiles = labelNunmber => {
  const tiles = localStorage.getItem(`label${labelNunmber}`)
  return tiles ? tiles : '-'
}
