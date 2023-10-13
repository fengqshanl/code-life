<template>
  <el-input
    v-model="value"
    class="vxe-filters-text"
    type="type"
    placeholder="按回车确认筛选"
    @input="panel.changeOption($event, !!option.data, option)"
    @keyup.enter="panel.confirmFilter()"
  /></template>

<script>

export default {
  name: 'FilterRate',
  props: {
    panel: {
      type: Object,
      default: () => {
      },
      required: true
    },
    column: {
      type: Object,
      default: () => {
      },
      required: true
    },
    // 返回值的类型
    filterValType: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.vxe-filters-text {
  margin: 10px;
}
</style>
