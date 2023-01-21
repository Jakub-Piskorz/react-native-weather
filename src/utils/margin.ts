export default function margin(
  marginTop: number | string,
  marginRight?: number | string,
  marginBottom?: number | string,
  marginLeft?: number | string
) {
  return {
    marginTop,
    marginRight: marginRight || marginTop,
    marginBottom: marginBottom || marginTop,
    marginLeft: marginLeft || marginRight || marginTop,
  };
}

// Examples:
// 50 40 30 20 -> 50 40 30 20
// 50          -> 50 50 50 50
// 30 50       -> 30 50 30 50
// 60 70 50    -> 60 70 50 70
