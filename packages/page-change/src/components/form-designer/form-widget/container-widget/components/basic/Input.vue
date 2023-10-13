<template>
  <el-form-item :label="label" :prop="prop">
    <template v-if="getRealLen(label) > 8" #label>
      <div class="item-label">
        {{ label }}
      </div>
    </template>
    <el-input
      v-model.trim="_value"
      clearable
      :placeholder="placeholder"
      @input="isClearable=true"
      @blur="e => getValue(e.target.value)"
      @clear="_clearFun"
    />
  </el-form-item>
</template>

<script>
export default {
  name: 'Input',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String,
    prop: String,
    defaultValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      isClearable: false, // 是否清空 当值为true时默认值不生效
      currentValue: null
    }
  },
  computed: {
    label() {
      return this.$attrs.label
    },
    _value: {
      get() {
        return this.currentValue || (this.isClearable ? '' : this.defaultValue)
      },
      set(newData) {
        this.currentValue = newData
      }
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this._value = newValue
      },
      immediate: true
    },
    defaultValue() {
      // 用于重置表单时，二次触发组件值的变化
      this.getValue(this.defaultValue)
    }
  },
  methods: {
    // 获取中文长度
    getRealLen(str = '') {
      return str?.replace(/[^x00-xff]/g, 'xx')?.length / 2
    },
    _clearFun() {
      this.isClearable = true
      this.getValue('')
    },
    getValue(val) {
      this.$emit('change', val)
    }
    // enter event
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.item-label {
  font-size: 0.1rem;
  line-height: 0.8rem;
}
</style>
