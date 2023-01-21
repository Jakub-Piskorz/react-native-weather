export default function padding(
  paddingTop: number | string,
  paddingRight?: number | string,
  paddingBottom?: number | string,
  paddingLeft?: number | string
) {
  return {
    paddingTop,
    paddingRight: paddingRight || paddingTop,
    paddingBottom: paddingBottom || paddingTop,
    paddingLeft: paddingLeft || paddingRight || paddingTop,
  };
}

// Examples:
// 50 40 30 20 -> 50 40 30 20
// 50          -> 50 50 50 50
// 30 50       -> 30 50 30 50
// 60 70 50    -> 60 70 50 70
