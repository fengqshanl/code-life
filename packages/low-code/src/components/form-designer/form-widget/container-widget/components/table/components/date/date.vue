<template>
  <el-date-picker
    v-model="dateValue"
    :type="dateType"
    :placeholder="placeholder"
    :range-separator="rangeSeparator"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :align="align"
    :unlink-panels="unlinkPanels"
    :picker-options="pickerOptions"
    :default-time="defaultTime"
    @change="val => change(val)"
  />
</template>

<script>
import { prop } from './prop'

export default {
  name: 'FilterDate',
  props: prop,
  data() {
    return {
      dateValue: null
    }
  },
  methods: {
    change() {
      this.$emit('input', this.dateValue)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
