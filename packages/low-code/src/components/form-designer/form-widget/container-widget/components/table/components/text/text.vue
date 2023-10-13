<template>
  <el-input
    v-model="inputValue"
    class="vxe-filters-text"
    :placeholder="placeholder"
    @input="input"
  />
</template>

<script>
import { prop } from './prop'
export default {
  name: 'FilterText',
  props: prop,
  data() {
    return {
      inputValue: this.value
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.inputValue = newValue
      }
    }
  },
  methods: {
    input(val) {
      this.inputValue = val
      this.$emit('input', this.inputValue)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
