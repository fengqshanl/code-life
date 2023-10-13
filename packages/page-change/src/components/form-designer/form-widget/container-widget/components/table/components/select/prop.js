export const prop = {
  placeholder: {
    type: String,
    default: '请选择'
  },
  allowCreate: {
    type: Boolean,
    default: false
  },
  filterMethod: {
    type: Function
  },
  remote: {
    type: Boolean,
    default: false
  },
  remoteMethod: {
    type: Function
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: '加载中...'
  },
  filterable: {
    type: Boolean,
    default: true
  },
  value: {
    type: String,
    default: 'value'
  },
  label: {
    type: String,
    default: 'label'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  multipleLimit: {
    type: Number,
    default: 0
  },
  clearable: {
    type: Boolean,
    default: true
  },
  options: {
    type: Array,
    default: () => []
  }
}
