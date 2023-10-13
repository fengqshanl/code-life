<template>
  <el-form-item :label="label">
    <template v-bind="$attrs">
      <template v-if="precision">
        <el-input-number
            v-model="startValue"
            style="width:45%"
            :controls="false"
            :min="0"
            :precision="precision"
            :max="999999999"
            size="small"
            @blur="getValue"
        />
      </template>
      <template v-else>
        <el-input-number
            v-model="startValue"
            style="width:45%"
            :controls="false"
            :min="0"
            :max="999999999"
            size="small"
            @blur="getValue"
        />
      </template>
      <span style="display: inline-block; width: 10%; text-align: center;">~</span>
      <template v-if="precision">
        <el-input-number
            v-model="endValue"
            style="width:45%"
            :controls="false"
            :min="0"
            :precision="precision"
            :max="999999999"
            size="small"
            @blur="getValue"
        />
      </template>
      <template v-else>
        <el-input-number
            v-model="endValue"
            style="width:45%"
            :controls="false"
            :min="0"
            :max="999999999"
            size="small"
            @blur="getValue"
        />
      </template>
    </template>
  </el-form-item>
</template>

<script>
export default {
  name: 'SpdRangeInput',
  data() {
    return {
      isStartClearable: false, // 是否清空 当值为true时默认值不生效
      isEndClearable: false, // 是否清空 当值为true时默认值不生效
      currentStartValue: null,
      currentEndValue: null
    }
  },
  computed: {
    precision() {
      return 4
      // return this.$customConfig.precisionFormat ? this.$customConfig.precision : 0
    },
    label() {
      return this.$attrs.isShowLabel ? this.$attrs.title : ''
    },
    startValue: {
      get() {
        return (this.currentStartValue == 0 || this.currentStartValue) ? this.currentStartValue : (this.isStartClearable ? null : this.$attrs.defaultValue[0])
      },
      set(newData) {
        this.currentStartValue = newData
      }
    },
    endValue: {
      get() {
        return (this.currentEndValue == 0 || this.currentEndValue) ? this.currentEndValue : (this.isEndClearable ? null : this.$attrs.defaultValue[1])
      },
      set(newData) {
        this.currentEndValue = newData
      }
    }
  },
  methods: {
    resetValue() {
      this.isStartClearable = false
      this.isEndClearable = false
      this.currentStartValue = null
      this.currentEndValue = null
      return this
    },
    getValue() {
      const obj = { prop: this.$attrs.prop, value: [this.startValue, this.endValue] }
      this.$emit('getFormValue', obj)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
