<template>
  <el-form-item :label="label" :prop="prop" style="width: 100%">
    <template v-if="getRealLen(label) > 6" #label>
      <div class="item-label">
        {{ label }}
      </div>
    </template>
    <el-select
      v-model="_value"
      style="width: 100%;min-width: 80px"
      :multiple="multiple"
      :options="options"
      collapse-tags
      :disabled="disabled"
      :placeholder="placeholder"
      filterable
      :size="'small'"
      :filter="filter"
      :clearable="$attrs.clearable"
      @change="getValue(), changeValue()"
      @clear="_clearFun"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
// import SpdSelect from './spd-select.vue'
export default {
  name: 'Select',
  // components: { SpdSelect },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String, Array],
    prop: String,
    options: {
      type: Array,
      default: () => ([])
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String
    },
    defaultValue: {
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isClearable: false, // 是否清空 当值为true时默认值不生效
      currentValue: null,
      filter: null // 定义一个变量，用了过了 select内的数据过滤，这个变量，只有外包通过 ref 访问，暂无其他使用
    }
  },
  computed: {
    _value: {
      get() {
        if (this.currentValue) {
          return this.currentValue
        }
        if (this.isClearable) {
          return Array.isArray(this.defaultValue) ? [] : ''
        }
        return this.defaultValue
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
      this.currentValue = null
      this.getValue()
    }
  },
  methods: {
    // spd-select.syncValue 的逻辑，在syncValue中加逻辑，影响自定义弹窗的渲染，把里面的逻辑移到这里
    optionsChange(list) {
      let value = ''
      if (this.multiple) {
        const selecedValues = list?.filter(it => this.value?.some(e => e === it.value)) || []
        if (selecedValues?.length > 0) {
          // console.log('selecedValues',selecedValues)
          value = selecedValues
        }
      } else {
        const selecedValues = list?.filter(it => it.value === this.value)
        // console.log('selecedValues',selecedValues)
        if (selecedValues?.length > 0) {
          value = selecedValues.length > 0 ? selecedValues[0] : { label: this.value, value: this.value }
        }
      }
      if (!value) {
        this._value = value
      }
    },
    // 获取中文长度
    getRealLen(str = '') {
      return str?.replace(/[^x00-xff]/g, 'xx')?.length / 2
    },
    resetValue() {
      this.currentValue = null
      this.isClearable = false
      return this
    },
    _clearFun() {
      this.isClearable = true
      this.getValue()
    },
    getValue() {
      this.$emit('change', this._value)
    },
    changeValue() {
      // this.getFormData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.item-label{
  font-size: 0.1rem;
  line-height: 0.8rem;
}
</style>
