// 全局过滤器
const dateFormatFilter = inputStr => {
  if (inputStr !=null){
    return inputStr.substring(0, 10)
  }else {
    return "过滤器。。"
  }
}

export default {
  dateFormatFilter
}
