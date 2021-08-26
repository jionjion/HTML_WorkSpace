let tools = {
  // yyyy-MM-dd
  dateFormat: (date) => {
    return date.getFullYear(date) + '-' + tools.prefixInteger((date.getMonth() + 1), 2) + '-' + date.getDate()
  },
  // yyyy-MM-dd hh24:mi:ss
  datetimeFormat: (date) => {
    return date.getFullYear(date) + '-' + tools.prefixInteger((date.getMonth() + 1), 2) + '-' + date.getDate() +
      ' ' +
      tools.prefixInteger(date.getHours(), 2) + ':' + tools.prefixInteger(date.getMinutes(), 2) + ':' + tools.prefixInteger(
        date.getSeconds(), 2)
  },
  // 左补零 num传入的数字，n需要的字符长度
  prefixInteger: (num, n) => {
    return (Array(n).join(0) + num).slice(-n)
  }
}

export default tools
