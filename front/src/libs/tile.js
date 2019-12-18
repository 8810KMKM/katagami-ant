export const saveSelectedTiles = (tiles, labelNunmber) => {
  localStorage.setItem(`label${labelNunmber}`, tiles)
}

export const isSaved = labelNumber =>
  localStorage.getItem(`label${labelNumber}`) !== null

export const savedTiles = labelNunmber =>
  isSaved(labelNunmber) ? localStorage.getItem(`label${labelNunmber}`) : '-'
