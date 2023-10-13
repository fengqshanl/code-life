<template>
    <vxe-table
      :id="componentId"
      :ref="componentId"
      v-loading="tableLoading"
      :show-overflow="overflowConfig"
      :tooltip-config="{ theme:'light'}"
      show-header-overflow
      class="spd-table-vxeTable"
      border
      size="mini"
      :row-style="showConfig ? handleRowStyle : rowStyle"
      :cell-style="showConfig ? handleCellStyle : cellStyle"
      :row-class-name="rowClassName"
      highlight-current-row
      :row-id="rowId"
      resizable
      :data="currentData"
      :height="tableHeight"
      :max-height="maxTableHeight"
      :custom-config="customConfig"
      :sort-config="sortConfig"
      :filter-config="filterConfig"
      :checkbox-config="checkboxConfig"
      :edit-config="editConfig"
      @sort-change="commonSortMethod"
      @filter-change="commonFilterMethod"
      @checkbox-change="handleSelect"
      @checkbox-all="handleSelectAll"
      @checkbox-range-end="checkboxRangeEnd"
      @cell-click="handleCellClick"
    >
      <vxe-table-column v-if="selectable" type="checkbox" field="checkbox" width="60" align="center" fixed="left" />
      <vxe-table-column v-if="seqAble" type="seq" field="seq" title="序号" width="60" align="center" fixed="left" />
      <vxe-table-column
        v-for="field in currentColumns"
        :key="field.prop"
        v-bind="field.filterable ? {filterMethod:filterMethod} : {}"
        :field="field.prop"
        :sortBy="field.sortProp"
        :title="field.title"
        :min-width="field.width || field.minWidth || 90"
        :align="field.align"
        :visible="field.visible"
        :sortable="true"
        :params="{sortable: field.sortable,dictProp: field.dictProp}"
        :fixed="field.fixed"
        :filters="field.filter.option"
        :filterRender="field.filterRender"
      >
        <template #filter="{ $panel, column, columnIndex }">
          <component
            :is="field.filter.type"
            style="padding: 4px 8px 4px 8px"
            v-bind="field.filter"
            @input="(val) => changeFilter(val, $panel, column, columnIndex)"
          />
        </template>
        <template #default="{ row }">
          <template v-if="field.editable">
            <component
              :is="field.edit.type"
              v-model="row[field.prop]"
              v-bind="field.edit"
            />
          </template>
          <template>{{ row[field.prop] }}</template>
        </template>
      </vxe-table-column>
    </vxe-table>
</template>

<script>

import util from './utils/util'
import { resolveConfig } from './resolve'
import { prop } from './prop'
import { watch } from './utils/watch'
import components from '../basic/index'

export default {
  name: 'PureTable',
  components: components,
  props: prop,
  data() {
    return {
      tableKey: 'spd-table',
      fieldsMapping: this.tableColumnData,
      localDisabledRows: ['index', 'action'],
      pageLayouts: ['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total'],
      customConfig: { storage: true, checkMethod: this.checkColumnMethod },
      checkboxConfig: { trigger: 'cell', highlight: true, reserve: true, ...this.propCheckboxConfig },
      treeConfig: { children: 'children', accordion: true, trigger: 'cell' },
      datePickerTypes: ['daterange', 'datetimerange', 'date', 'monthrange'],
      extraPageSize: 100, // 自定义分页器的页码
      testValue: ''
    }
  },
  computed: {
    /**
     * vxe表格Element
     * 调用vxe-table内部方法
     * clearCheckboxRow 清空checkbox勾选
     * updateData 手动处理数据
     * reloadData 加载数据并清除所有状态（重载表格）
     * */
    // 自定义列中不可操作部分
    currentDisabledRows() {
      const handledList = this.localDisabledRows.concat(this.disabledRows)
      const setList = new Set(handledList)
      const result = Array.from(setList)
      return result
    },
    // 处理后的column数据
    currentColumns: {
      get() {
        // 处理column数据 filterable sortable filterMultiple options 为默认值
        const columns = Object.freeze(util.columnsFormat.call(this, this.fieldsMapping))
        return columns
      },
      set(newData) {
        this.fieldsMapping = newData
      }
    },
    currentPageOptions() {
      return this.pageOptions
    },
    // 当前列表数据
    currentData() {
      return Object.freeze(this.tableData)
    }
  },
  watch: {
    tableColumnData(val) {
      this.fieldsMapping = val
      resolveConfig.call(this, val)
    },
    tableData(val) {
      this.currentData = val
    },
    ...watch
  },
  created() {
    if (this.showColumnConfig) {
      this.cs_currentGridRef = this.componentId
    }
    // 如果有自定义设置，就不需要在打开列设置
    if (!this.showConfig) {
      this.cs_currentGridRef = this.componentId
    }
    resolveConfig.call(this, this.tableColumnData)
  },
  mounted() {
    this.testValue = 'is a new value use to test'
  },
  methods: {
    changeFilter(val, $panel, column, columnIndex) {
      console.log(val, $panel, column, columnIndex, 'changeFilter')
      const option = column.filters[0]
      option.data = val
      $panel.changeOption(this.$event, !!option.data, option)
    },
    /**
     * 配置列中当前行样式
     */
    handleRowStyle({ row }) {
      const thisRows = this.fieldsMapping.find(it => it.style)
      if (!thisRows) return
      const rowStyle = JSON.parse(thisRows.style)[0]
      const rowCount = rowStyle.name
      if (rowCount === '=') {
        if (row[thisRows.prop] === rowStyle.value) {
          return 'color:' + rowStyle.color
        }
      } else if (rowCount === '>') {
        if (row[thisRows.prop] > rowStyle.value) {
          return 'color:' + rowStyle.color
        }
      } else if (rowCount === '<') {
        if (row[thisRows.prop] < rowStyle.value) {
          return 'color:' + rowStyle.color
        }
      } else if (rowCount === 'in') {
        if (row[thisRows.prop]?.indexOf(rowStyle?.value) > -1) {
          return 'color:' + rowStyle.color
        }
      } else if (rowCount === 'notin') {
        if (row[thisRows.prop]?.indexOf(rowStyle?.value) === -1) {
          return 'color:' + rowStyle.color
        }
      }
    },
    handleCellStyle({ row, column }) {
      const cellStyle = this.fieldsMapping.find(it => it.prop === column.property)?.style
      if (!cellStyle) return
      const newCellStyle = JSON.parse(cellStyle)[1]
      const rowCount = newCellStyle.name
      if (rowCount === '=') {
        if (row[column.property] === newCellStyle?.value) {
          return {
            color: newCellStyle?.color
          }
        }
      } else if (rowCount === '>') {
        if (row[column.property] > newCellStyle?.value) {
          return {
            color: newCellStyle?.color
          }
        }
      } else if (rowCount === '<') {
        if (row[column.property] < newCellStyle?.value) {
          return {
            color: newCellStyle?.color
          }
        }
      } else if (rowCount === 'in') {
        if (row[column.property]?.indexOf(newCellStyle?.value) > -1) {
          return {
            color: newCellStyle?.color
          }
        }
      } else if (rowCount === 'notin') {
        if (row[column.property]?.indexOf(newCellStyle?.value) === -1) {
          return {
            color: newCellStyle?.color
          }
        }
      }
    },
    /**
     * 本地搜索方法,只针对于文字检索
     */
    filterMethod({ option, row, column }) {
      if (typeof row[column.property] !== 'string') {
        return false
      }
      return row[column.property]?.indexOf(option.data) !== -1
    },
    /**
     * 表格中自定义列功能 回调
     */
    checkColumnMethod({ column }) {
      if (this.currentDisabledRows.includes(column.property)) {
        return false
      }
      return true
    },
    /**
     * 每一列的排序功能 回调
     */
    commonSortMethod(options) {
      const params = options.column?.params
      if (params?.sortable) {
        this.$emit('commonSortMethod', options.column)
      } else {
        // 本地排序
        this.$refs[this.componentId].sort(options.property, options.order)
      }
    },
    commonFilterMethod(options) {
      if (options?.column?.params?.filterable === false) {
        return
      }
      this.$emit('commonFilterMethod', options)
    },
    checkboxRangeEnd({ records, reserves }) {
      const totalList = reserves.concat(records)
      this.$emit('handleSelect', totalList)
    },
    handleSelect(event) {
      const totalList = event.reserves.concat(event.records)
      this.$emit('handleSelect', totalList)
      // 新增一个返回的事件，原来的事件，无法返回当前选择的行，以spd开头，避免和原事件冲突
      this.$emit('spdCheckboxChange', event)
    },
    handleSelectAll({ records, reserves }) {
      const totalList = reserves.concat(records)
      this.$emit('handleSelect', totalList)
      // 新增一个返回的事件，handleSelect事件无法区分权限或单选
      this.$emit('spdCheckboxAll', ...arguments)
    },
    handleCellClick({ data, $rowIndex, column }) {
      if (column.property === 'checkbox') {
        return
      }
      const rowData = data[$rowIndex]
      this.$emit('handleCellClick', rowData)
    },
    handlePageChange(options) {
      this.$emit('handlePageChange', options)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination.is-background {
  ::v-deep {
    .btn-prev,
    .btn-next {
      border-radius: 4px;
      font-weight: 400;
      background-color: #FFFFFF;
      border: 1px solid #dcdfe6;
    }
    .el-pager {
      li {
        border-radius: 4px;
        font-weight: 400;
        background-color: #FFFFFF;
        border: 1px solid #dcdfe6;
      }
    }
    .el-pager li:not(.disabled).active {
      background: #409eff;
      color: #ffffff !important;
      border: 1px solid #dcdfe6 !important;
    }
    .el-pager li:not(.disabled).active:hover {
      background: #5faeff;
    }
  }
}
.custom-pagination {
  font-size: 1rem;
  .pagination-slot {
    font-size: 1rem;
    width: 110px;
    .size-input {
      font-size: 1rem;
      width: 80px;
      ::v-deep {
        .el-input__inner {
          font-size: 1rem;
          width: 100%;
        }
      }
    }
  }
}
.spd-custom-table {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.spd-table-container {
  flex-grow: 1;
  position: relative;
  .spd-table-vxeTable {
    position: absolute;
    width: 100%;
    height: auto;
  }
}
.toolbar-container {
  margin-right: 10px;
  .other-button {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .action-toolbar {
    float: right;
  }
}
.action-toolbar {
  float: right;
}
.custom-pagination {
  &::v-deep .el-pager li:hover {
    color: #419eff !important;
  }
  &::v-deep button:hover {
    color: #419eff !important;
  }
}
</style>
