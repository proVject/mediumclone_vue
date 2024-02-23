export const range = (start, end) => {
  // const result = []
  // for (let i = start; i <= end; i++) {
  //   result.push(i)
  // }
  // return result
  return [...Array(end).keys()].map((el) => el + start)
}
