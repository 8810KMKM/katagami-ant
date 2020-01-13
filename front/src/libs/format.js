import { savedTiles, getDivision } from './tile'
import { MAX_DIVISION } from 'datas/tile'

// APIから取得したラベル名を日本語化
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

// ラベル付け : state (Array of Boolean) => レンダリング用 (String)
export const convertBoolToNumOfTiles = tileStates => {
  const numbersStr = tileStates
    .map((tile, i) => (tile ? i + 1 : ' '))
    .filter(number => number !== ' ')
    .join(' ')

  return numbersStr ? numbersStr : '該当無し'
}

// ラベル付け : レンダリング用 (String) => state (Array of Boolean)
export const convertNumToBoolOfTiles = saveTiles => {
  let convertArray = new Array(MAX_DIVISION).fill(false)
  if (saveTiles) {
    saveTiles
      .split(' ')
      .forEach(tileNumber => (convertArray[tileNumber - 1] = true))
  }
  return convertArray
}

// ラベル付け : 保存済み (Array of Number) => POST用 (String)
export const hasLabelsForPost = labels =>
  labels
    .map((label, i) => label.id + ' ' + getDivision(i) + ' ' + savedTiles(i))
    .join(',')

// idを0詰め表示
export const zeroPaddingOf = (num, zeros) =>
  (new Array(zeros).fill(0).join('') + num).slice(-1 * zeros)

// グラフに使うデータを整形
export const graphDataOf = (hasLabel, wholeLabels) => {
  if (hasLabel === undefined) {
    return wholeLabels.map(label => ({
      label: labelNameJp(label).kanji,
      users: [],
      score: 0,
    }))
  }

  const _score = hasLabel.score

  return wholeLabels.map(label => {
    const s = _score[label]
    const hasScore = s !== undefined
    return {
      label: labelNameJp(label).kanji,
      users: hasScore ? s : [],
      score: hasScore ? s.length : 0,
    }
  })
}
