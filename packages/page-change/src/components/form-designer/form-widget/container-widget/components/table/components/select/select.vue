<template>
  <el-select
    v-model="selectValue"
    :multiple="multiple"
    class="vxe-filters-text"
    type="type"
    :filterable="filterable"
    :multipleLimit="multipleLimit"
    :placeholder="placeholder"
    :clearable="clearable"
    @input="(val) => change(val)"
  >
    <el-option
      v-for="item in options"
      :key="item[value]"
      :label="item[label]"
      :value="item[value]"
    />
  </el-select>
</template>

<script>
import { prop } from './prop'

export default {
  name: 'FilterSelect',
  props: prop,
  data() {
    return {
      selectValue: this.value
    }
  },
  watch: {
    value(val) {
      this.selectValue = val
    }
  },
  methods: {
    change(val) {
      this.selectValue = val
      this.$emit('input', this.selectValue)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
