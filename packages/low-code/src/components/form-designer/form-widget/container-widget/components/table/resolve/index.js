import { fillDefaultConfig } from './config'
const tableFields = [
  { title: '模板名称', align: 'left', prop: 'templateName', filter: 'text', sortable: 'Y' },
  { title: '医院名称', prop: 'hospitalName', dictProp: 'hospitalId', sortProp: 'hospitalId', filter: 'select', sortable: 'Y', align: 'left' },
  { title: '院区名称', align: 'left', prop: 'hospitalAreaName', dictProp: 'hospitalAreaIds', multiple: true, sortProp: 'hospitalAreaId', filter: 'searchSelect', sortable: 'Y' },
  { title: '科室名称', prop: 'departmentName', dictProp: 'departmentId', sortProp: 'departmentId', filter: 'searchSelect', sortable: 'Y', align: 'left' },
  { title: '科室库房', prop: 'warehouseName', dictProp: 'warehouseIds', sortProp: 'warehouseId', filter: 'searchSelect', multiple: true, sortable: 'Y', align: 'left' },
  { title: '状态', prop: 'templateStatusName', dictProp: 'templateStatus', sortProp: 'templateStatus', filter: 'select', sortable: 'Y', align: 'center', width: 120 },
  { title: '修改人', prop: 'updateUserName', filter: 'text', dictProp: 'updateUserName', sortable: 'Y', align: 'center', width: 160 },
  { title: '修改时间', prop: 'updateTime', filter: 'datetimerange', sortable: 'Y', align: 'center', width: 180 },
  { title: '操作', prop: 'action', width: 180, align: 'left', fixed: 'right', sortable: 'N' }
]

console.log(tableFields)

export function resolveConfig(config) {
  fillDefaultConfig.call(this, config)
}
