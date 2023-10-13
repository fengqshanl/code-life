<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList">
    <div :key="widget.id" class="table-container" :class="[selected ? 'selected' : '', customClass]" @click.stop="selectWidget(widget)">
      <PureForm :propConfig="propConfig" />
    </div>
  </container-wrapper>
</template>

<script>
import i18n from "@/utils/i18n"
import PureForm from './components/form/index.vue'
import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
import TableCellWidget from "@/components/form-designer/form-widget/container-widget/table-cell-widget"
import refMixinDesign from "@/components/form-designer/refMixinDesign"
import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin";

export default {
  name: "custom-form-widget",
  componentName: 'ContainerWidget',
  mixins: [i18n, containerMixin, refMixinDesign, fieldMixin],
  inject: ['refList'],
  components: {
    PureForm,
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
      propConfig: {
        childArray: [
          { type: 'Select', label: '医院名称', prop: 'hospitalId', dictProp: 'authHospitalList', validate: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ] },
          { type: 'Select', label: '院区名称', prop: 'hospitalAreaIds', dictProp: 'authHospitalAreaList', multiple: true },
          { type: 'Select', label: '科室名称', prop: 'departmentIds', dictProp: 'authDepartmentList', multiple: true },
          { type: 'Select', label: '科室库房', prop: 'warehouseIds', dictProp: 'authDeptWarehouseList', multiple: true },
          { type: 'Input', label: '模板名称', prop: 'templateName', validate: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ] },
          { type: 'Select', label: '状态', prop: 'templateStatus', dictProp: 'table_theme_status' }
        ]
      }
    }
  },
  computed: {
    selected() {
      return this.widget.id === this.designer.selectedId
    },
    tableData() {
      return []
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
    //a
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
