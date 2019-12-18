export const saveSelectedTiles = (tiles, labelNunmber) => {
  localStorage.setItem(`label${labelNunmber}`, tiles)
}

export const savedTiles = labelNunmber =>
  localStorage.getItem(`label${labelNunmber}`)
