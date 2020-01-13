// アノテーション対象のラベル数(number)だけ'0'をローカルストレージ(LS)に保存
export const initAllTiles = (number, division) => {
  for (let i = 0; i < number; i++) {
    saveSelectedTiles('0', i)
    saveDivision(division, i)
  }
}

export const saveDivision = (division, labelNumber) => {
  localStorage.setItem(`division${labelNumber}`, division)
}

export const getDivision = labelNumber =>
  parseInt(localStorage.getItem(`division${labelNumber}`), 10)

// アノテーション結果をLSに保存
export const saveSelectedTiles = (tiles, labelNumber) => {
  localStorage.setItem(`label${labelNumber}`, tiles)
}

// LSに保存されたアノテーション結果を取得
export const savedTiles = labelNumber =>
  localStorage.getItem(`label${labelNumber}`)

// LSにアノテーション結果が保存され, かつ'0'=該当無しではないか
export const tilesAreSaved = labelNumber =>
  savedTiles(labelNumber) && savedTiles(labelNumber) !== '0'

// レンダリング用にLSに保存されたアノテーション結果を取得
export const displayedTiles = labelNumber =>
  tilesAreSaved(labelNumber) ? savedTiles(labelNumber) : '該当無し'

// LSに保存されたアノテーション結果を削除
export const clearTiles = labelNumber => {
  localStorage.removeItem(`label${labelNumber}`)
}

// LSに保存された全てのラベルに対するアノテーション結果を削除
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
  for (let i = 0; i < 3; i++) console.log(displayedTiles(i))
}
