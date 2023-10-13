export const prop = {
  dateType: {
    type: String,
    default: 'date'
  },
  align: {
    type: String
  },
  placeholder: {
    type: String,
    default: '选择日期'
  },
  format: {
    type: String,
    default: 'yyyy 第 WW 周'
  },
  rangeSeparator: {
    type: String,
    default: '-'
  },
  startPlaceholder: {
    type: String,
    default: '开始日期'
  },
  endPlaceholder: {
    type: String,
    default: '结束日期'
  },
  unlinkPanels: {
    type: Boolean,
    default: false
  },
  pickerOptions: {
    type: String
  },
  defaultTime: {
    type: Array
  }
}
