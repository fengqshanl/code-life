<template>
  <el-form-item :label="label">
    <el-date-picker
      v-model="_value"
      :type="renderType"
      :clearable="$attrs.clearable"
      placeholder="选择日期"
      :size="'small'"
      :format="currentFormat"
      :value-format="currentFormat"
      @change="getValue"
      style="width:100%"
    />
  </el-form-item>
</template>

<script>
export default {
  name: 'Date',
  props: {
    defaultValue: {
      default: null
    }
  },
  data() {
    return {
      currentValue: null,
      typeFormatContrast: {
        date: 'yyyy-MM-dd',
        month: 'yyyy-MM'
      }
    }
  },
  computed: {
    renderType() {
      console.log(this.$attrs.type, 'this.$attrs.type');
      return this.$attrs.dateType
    },
    currentFormat() {
      // 若配置中存在 format 属性，则优先使用，否则使用默认配置
      return this.$attrs.format || this.typeFormatContrast[this.renderType]
    },
    label() {
      return this.$attrs.label
    },
    _value: {
      get() {
        return this.currentValue || this.defaultValue
      },
      set(newData) {
        this.currentValue = newData
      }
    }
  },
  watch: {
    defaultValue() {
      // 用于重置表单时，二次触发组件值的变化
      this.getValue()
    }
  },
  methods: {
    resetValue() {
      this.currentValue = null
      return this
    },
    getValue() {
      const obj = { prop: this.$attrs.prop, value: this._value }
      this.$emit('getFormValue', obj)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
