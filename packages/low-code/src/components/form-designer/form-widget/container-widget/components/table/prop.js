export const prop = {
  rowClassName: {
    type: [String, Function],
    default: 'pure-table-row'
  },
  overflowConfig: {
    type: [String, Boolean],
    default: 'title'
  },
  // 表格Id
  componentId: {
    type: String,
    default: ''
  },
  // 行数据id(唯一) 与勾选保留状态有关，若有勾选功能，则需要传
  rowId: {
    type: String,
    default: 'id'
  },
  // 表格高度
  tableHeight: {
    type: [String, Number],
    default: 'auto'
  },
  maxTableHeight: {
    type: [String, Number]
  },
  // 列表loading
  tableLoading: {
    type: Boolean,
    default: false
  },
  // 是否可以勾选
  selectable: {
    type: Boolean,
    default: false
  },
  // 是否可以单选
  radioAble: {
    type: Boolean,
    default: false
  },
  // 自定义列中不可显示隐藏的列
  disabledRows: {
    type: Array,
    default: () => ([])
  },
  // column数据
  tableColumnData: {
    type: Array,
    required: true,
    default: () => ([])
  },
  // table数据
  tableData: {
    type: Array,
    required: true,
    default: () => ([])
  },
  // 分页部分
  withPager: {
    type: Boolean,
    default: true
  },
  // 是否使用自定义分页器
  isCustomizePager: {
    type: Boolean,
    default: false
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  totalCount: {
    type: Number,
    default: 0
  },
  pageOptions: {
    type: Object,
    default: () => ({
      pageNum: 1,
      pageSize: 100
    })
  },
  sortConfig: {
    type: Object,
    default: () => ({
      remote: false // 改为接口排序 true
    })
  },
  filterConfig: {
    type: Object,
    default: () => ({
      remote: false,
      filterMethod: () => {
        return true
      }
    })
  },
  pageSizeOptions: {
    type: Array,
    default: () => ([])
  },
  showConfig: {
    type: Boolean,
    default: false
  },
  // // 给行附加样式
  rowStyle: {
    type: Function,
    default: () => {
    }
  },
  cellStyle: {
    type: Function
  },
  configPageSize: {
    type: Number,
    default: () => 100
  },
  moduleOptions: {
    type: Array,
    default: () => ([])
  },
  showColumnConfig: {
    type: Boolean,
    default: true
  },
  propCheckboxConfig: {
    type: Object
  },
  indexAble: {
    type: Boolean,
    default: true
  },
  seqAble: {
    type: Boolean,
    default: true
  },
  editConfig: {
    type: Object,
    default: () => ({ trigger: 'manual', mode: 'row', showStatus: true })
  }
}
