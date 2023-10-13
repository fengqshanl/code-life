<template>
  <div class="filters-cascader">
    <template v-for="(option, index) in column.filters">
      <template v-if="filterValType === 'text'">
        <input
          :key="index"
          v-model="option.data"
          class="vxe-filters-text"
          type="type"
          placeholder="按回车确认筛选"
          @input="panel.changeOption($event, !!option.data, option)"
          @keyup.enter="panel.confirmFilter()"
        >
      </template>
      <template v-else-if="filterValType === 'number'">
        <vxe-input
          :key="index"
          v-model="option.data"
          placeholder="按回车确认筛选"
          type="number"
          @input="panel.changeOption($event, !!option.data, option)"
        />
      </template>
    </template>
  </div>
</template>

<script>

// FiltersText 文字筛选
export default {
  name: 'FilterCascader',
  props: {
    panel: {
      type: Object,
      default: () => {},
      required: true
    },
    column: {
      type: Object,
      default: () => {},
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

<style lang='scss' scoped>
//.filters-cascader {
//  margin: 10px;
//}
</style>
