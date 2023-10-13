<template>
  <el-form-item :label="label">
    <el-row style="display:flex;flex-wrap:nowrap">
      <template>
        <el-date-picker
          ref="datePickerStart"
          v-model="startValue"
          v-date-format
          class="spd-date-range"
          :type="renderType"
          :clearable="$attrs.clearable"
          placeholder="选择日期"
          :value-format="currentFormat"
          :picker-options="pikerVerifyStart(endValue)"
          @keydown.enter.capture.native="keyDownValue('datePickerStart','isStartClearable')"
          @change="getValue('isStartClearable')"
        />
        <span class="spd-date-range-line">-</span>
        <el-date-picker
          ref="datePickerEnd"
          v-model="endValue"
          v-date-format
          class="spd-date-range"
          :type="renderType"
          :clearable="$attrs.clearable"
          placeholder="选择日期"
          :default-time="'23:59:59'"
          :value-format="currentFormat"
          :picker-options="pikerVerifyEnd(startValue)"
          @keydown.enter.capture.native="keyDownValue('datePickerEnd','isEndClearable')"
          @change="getValue('isEndClearable')"
        />
      </template>
    </el-row>

  </el-form-item>
</template>

<script>
export default {
  name: 'DateRange',
  props: {},
  data() {
    return {
      isStartClearable: false, // 是否清空 当值为true时默认值不生效
      isEndClearable: false, // 是否清空 当值为true时默认值不生效
      currentStartValue: null,
      currentEndValue: null,
      timer: null,
      typeFormatContrast: {
        date: 'yyyy-MM-dd',
        datetime: 'yyyy-MM-dd HH:mm:ss',
        month: 'yyyy-MM'
      },
      pikerVerifyStart(val) {
        let endLimit = ''
        // 五年前的时间不可选
        let yearLimit = ''
        const threeYearsAgo = this.$dayjs().subtract(5, 'year').valueOf()
        return {
          disabledDate: (time) => {
            yearLimit = this.$dayjs(time).valueOf() < threeYearsAgo
            if (val) {
              endLimit = this.$dayjs(time).valueOf() > this.$dayjs(val).valueOf()
              return endLimit || yearLimit
            } else {
              return yearLimit
            }
          }
        }
      },
      pikerVerifyEnd(val) {
        const threeYearsAgo = this.$dayjs().subtract(3, 'year').valueOf()
        return {
          disabledDate: (time) => {
            if (val) {
              return this.$dayjs(time).valueOf() < this.$dayjs(val).valueOf()
            } else {
              return this.$dayjs(time).valueOf() < threeYearsAgo
            }
          }
        }
      }
    }
  },
  computed: {
    renderType() {
      return this.$attrs.type
    },
    currentFormat() {
      return this.typeFormatContrast[this.renderType]
    },
    label() {
      return this.$attrs.isShowLabel ? this.$attrs.label : ''
    },
    startValue: {
      get() {
        return this.currentStartValue || (this.isStartClearable ? null : this.$attrs.defaultValue[0])
      },
      set(newData) {
        this.currentStartValue = newData
      }
    },
    endValue: {
      get() {
        return this.currentEndValue || (this.isEndClearable ? null : this.$attrs.defaultValue[1])
      },
      set(newData) {
        this.currentEndValue = newData
      }
    }
  },
  watch: {
    defaultValue() {
      // 用于重置表单时，二次触发组件值的变化
      // console.log('watch defaultValue')
      this.getValue()
    }
  },
  created() {
  },
  methods: {
    resetValue() {
      this.isStartClearable = false
      this.isEndClearable = false
      this.currentStartValue = null
      this.currentEndValue = null
      return this
    },
    getValue(str) {
      this[str] = true
      const obj = { prop: this.$attrs.prop, value: [this.startValue, this.endValue] }
      this.$emit('getFormValue', obj)
    },
    keyDownValue(ref, str) {
      this.getValue(str)
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs[ref].handleClose()
      }, 100)
      if (ref === 'datePickerStart') {
        this.$refs['datePickerEnd'].focus()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
::v-deep .el-input--suffix .el-input__inner {
    padding-right: 5px;
}
::v-deep  .el-input--prefix .el-input__inner {
    padding-left: 5px;
}
::v-deep  .el-input__prefix{
  display: none;
}
.spd-date-range {
  width: calc(51% - 2px) !important;
}
.spd-date-range-line{
  padding: 0 1px 0 1px;
  line-height: 26px;
}
</style>
