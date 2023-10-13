<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
                     :index-of-parent-list="indexOfParentList">
    <div :key="widget.id" class="table-container" :class="[selected ? 'selected' : '', customClass]" @click.stop="selectWidget(widget)">
      <PureTable :tableColumnData="tableColumnData" :componentId="`componentId_${Math.round(Math.random()*100)}`" :tableData="tableData" style="height: 300px" />
    </div>
  </container-wrapper>
</template>

<script>
import i18n from "@/utils/i18n"
import PureTable from './components/table/index.vue'
import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
import TableCellWidget from "@/components/form-designer/form-widget/container-widget/table-cell-widget"
import refMixinDesign from "@/components/form-designer/refMixinDesign"
import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin";

export default {
  name: "custom-table-widget",
  componentName: 'ContainerWidget',
  mixins: [i18n, containerMixin, refMixinDesign, fieldMixin],
  inject: ['refList'],
  components: {
    PureTable,
    ContainerWrapper,
    TableCellWidget,
  },
  props: {
    field: Object,
    widget: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
  },
  data() {
    return {
      tableColumnData: [
        { title: '模板名称', align: 'left', prop: 'templateName', filterType: 'tree', width: 180 },
        { title: '医院名称', prop: 'hospitalName', sortProp: 'hospitalId', filterType: 'date', filterDateType: 'daterange', align: 'left', width: 180 },
        { title: '院区名称', align: 'left', prop: 'hospitalAreaName', filterDictProp: 'authCenterWarehouseList', multiple: true, sortProp: 'hospitalAreaId', filterType: 'select', width: 180 },
        { title: '科室名称', prop: 'departmentName', sortProp: 'departmentId', filterType: 'text', align: 'left', width: 180 },
        { title: '科室库房', prop: 'warehouseName', sortProp: 'warehouseId', filterType: 'text', multiple: true, align: 'left', width: 180 },
        { title: '状态', prop: 'templateStatusName', sortProp: 'templateStatus', filterType: 'text', align: 'center', width: 120 },
        { title: '修改人', prop: 'updateUserName', filterType: 'text', align: 'center', editable: true, editType: 'select', editDictProp: 'authCenterWarehouseList', width: 160 },
        { title: '修改时间', prop: 'updateTime', filterType: 'text', align: 'center', width: 180 },
        { title: '操作', prop: 'action', width: 180, align: 'left', fixed: 'right' }
      ],
      tableData: []
    }
  },
  computed: {
    selected() {
      return this.widget.id === this.designer.selectedId
    },
    customClass() {
      return this.widget.options.customClass || ''
    },

  },
  watch: {
    //
  },
  created() {
    this.initRefList()
  },
  mounted() {
    this.handleOnMounted.call(this)
  },
  methods: {


  }
}
</script>

<style lang="scss" scoped>
div.table-container {
  padding: 5px;
  border: 1px dashed #336699;
  box-sizing: border-box;

  table.table-layout {
    width: 100%;
    text-align: center;
    //border: 1px solid #c8ebfb;
    border-collapse: collapse;
    table-layout: fixed;

    :deep(td) {
      height: 48px;
      border: 1px dashed #336699;
      padding: 3px;
      display: table-cell;
    }

    .form-widget-list {
      border: 1px dashed #336699;
      min-height: 36px;
    }
  }
}

.table-container.selected {
  outline: 2px solid $--color-primary !important;
}

</style>
