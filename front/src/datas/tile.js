export const DIVISIONS = [12, 48, 192]
export const MAX_DIVISION = DIVISIONS[DIVISIONS.length - 1]
export const DEFAULT_DIVISION = DIVISIONS[0]

export const DIV_X = division => {
  switch (division) {
    case 12:
      return 3
    case 48:
      return 6
    case 192:
      return 12
    default:
      return 3
  }
}

export const DIV_Y = division => {
  switch (division) {
    case 12:
      return 4
    case 48:
      return 8
    case 192:
      return 16
    default:
      return 4
  }
}
