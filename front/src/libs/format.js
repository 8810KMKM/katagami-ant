import { savedTiles } from './tile'

export const labelNameJp = nameEn => {
  switch (nameEn) {
    case 'kasuri':
      return { kanji: '絣', ruby: 'かすり' }
    case 'kiku':
      return { kanji: '菊', ruby: 'きく' }
    case 'ume':
      return { kanji: '梅', ruby: 'うめ' }
    case 'hishi':
      return { kanji: '菱', ruby: 'ひし' }
    case 'sakura':
      return { kanji: '桜', ruby: 'さくら' }
    case 'karakusa':
      return { kanji: '唐草', ruby: 'からくさ' }
    case 'chou':
      return { kanji: '蝶', ruby: 'ちょう' }
    case 'matsu':
      return { kanji: '松', ruby: 'まつ' }
    case 'kamenokou':
      return { kanji: '亀甲', ruby: 'かめのこう' }
    case 'asanoha':
      return { kanji: '麻の葉', ruby: 'あさのは' }
    default:
      return { kanji: '不明', ruby: 'ふめい' }
  }
}

export const convertBoolToNumOfTiles = tileStates => {
  const numbersStr = tileStates
    .map((tile, i) => (tile ? i + 1 : ' '))
    .filter(number => number !== ' ')
    .join(' ')

  return numbersStr ? numbersStr : '該当無し'
}

export const convertNumToBoolOfTiles = saveTiles => {
  let convertArray = new Array(9).fill(false)
  if (saveTiles) {
    saveTiles
      .split(' ')
      .forEach(tileNumber => (convertArray[tileNumber - 1] = true))
  }
  return convertArray
}

export const hasLabelsForPost = labels =>
  labels.map((label, i) => label.id + ' ' + savedTiles(i)).join(',')
