// 自定义index
export const indexMethodFn = (num:any, state:any) => {
  // console.log('state: ', num, state)
  return num + 1 + (state.pageSize * (state.currentPage - 1))
  // return num
}
