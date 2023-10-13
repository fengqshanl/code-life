<template>
  <el-row :gutter="20">
    <el-form
      ref="spdLinkageForm"
      :rules="rules"
      :model="spdLinkageForm"
      size="small"
      :label-width="labelWidth"
      style="width: 100%"
    >
      <el-col
        :span="currentSpan"
        :xs="currentSpan"
        :sm="currentSpan"
        :md="currentSpan"
        :lg="currentSpan"
        :xl="currentSpan"
      >
        <el-form-item :label="configObj.label1" prop="value1">
          <spd-select
            v-model="spdLinkageForm.value1"
            :disabled="disabled"
            :options="options1"
            label="label"
            value="value"
            clearable
            filterable
            @change="getValue"
          />
        </el-form-item>
      </el-col>
      <el-col
        :span="currentSpan"
        :xs="currentSpan"
        :sm="currentSpan"
        :md="currentSpan"
        :lg="currentSpan"
        :xl="currentSpan"
      >
        <el-form-item :key="value2Key" :label="configObj.label2" prop="value2">
          <spd-select
            v-model="spdLinkageForm.value2"
            :disabled="disabled"
            :options="options2"
            label="label"
            value="value"
            clearable
            filterable
            @change="getValue"
          />
        </el-form-item>
      </el-col>
      <el-col
        v-if="$attrs.label"
        :span="currentSpan"
        :xs="currentSpan"
        :sm="currentSpan"
        :md="currentSpan"
        :lg="currentSpan"
        :xl="currentSpan"
      >
        <el-form-item :label="configObj.label3" prop="value3">
          <spd-select
            v-model="spdLinkageForm.value3"
            :disabled="disabled"
            :options="options3"
            label="label"
            value="value"
            clearable
            filterable
            @change="getValue(3)"
          />
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>

</template>
<script>
import { mapGetters } from 'vuex'
import { CommonAPI } from '@/api'
export default {
  name: 'Linkage',
  props: {
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    labelWidth: String || Number,
    spdLinkValue: Object,
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      changeMultiple: this.multiple,
      spdLinkageForm: {
        value1: '',
        value2: '',
        value3: ''
      },
      timer: null,
      options2: [],
      typeList: {
        // 医院--院区联动 label:科室类型
        hospitalList: {
          label1: '医院名称',
          label2: '院区名称',
          label3: '库房类型',
          api: 'systemHospitalArea',
          prop1: 'hospitalId',
          prop2: 'hospitalAreaId',
          prop3: 'warehouseType',
          message1: '请选择医院',
          message2: '请选择院区',
          message3: '请选择库房类型'
        },
        departmentList: {
          label1: '科室名称',
          label2: '库房名称',
          api: 'warehouseList',
          prop1: 'departmentId',
          prop2: 'warehouseId',
          message1: '请选择科室',
          message2: '请选择库房'
        }
      },
      value2Key: '1'
    }
  },
  computed: {
    ...mapGetters([
      'departmentList',
      'hospitalList'
    ]),
    currentSpan() {
      return this.$attrs.span == 18 ? 8 : this.$attrs.span
    },
    isMultiple: {
      get() {
        return this.multiple
      },
      set(val) {
        this.changeMultiple = val
      }
    },
    rules() {
      return {
        value1: [
          { required: this.required, message: this.configObj.message1, trigger: 'change' }
        ],
        value2: [
          { required: this.required, message: this.configObj.message2, trigger: 'change' }
        ],
        value3: [
          { required: this.required, message: this.configObj.message3, trigger: 'change' }
        ]
      }
    },
    configObj() {
      return this.typeList[this.$attrs.prop] // 获取type
    },
    options1() {
      return this[this.$attrs.prop]
    },
    /** 科室列表 */
    options3() {
      return this.$getTypeDict('warehouseType')
    }
  },
  watch: {
    spdLinkValue: {
      handler(value) {
        this.spdLinkageForm = { ...value }
        this.timer && clearTimeout(this.timer)
        const timer = setTimeout(() => {
          // value2 watch会清空
          this.spdLinkageForm.value2 = value.value2
        })
        this.timer = timer
      }
    },
    'spdLinkageForm.value1': {
      handler(val) {
        this.spdLinkageForm.value2 = ''
        CommonAPI[this.configObj.api]({ id: val }).then(response => {
          if (response.code === 200) {
            this.getOptions(response.data)
          } else {
            console.error(response.msg)
          }
        })
      }
    },
    'spdLinkageForm.value3': {
      handler(value) {
        this.spdLinkageForm.value2 = ''
        this.spdLinkageForm.valueKey = new Date().getTime()
        this.isMultiple = value !== 'DEPARTMENT_WAREHOUSE'
      }
    },
    defaultValue() {
      // 用于重置表单时，二次触发组件值的变化
      this.getValue()
    }
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer)
    this.timer = null
  },
  methods: {
    /** ref调用验证 返回Boolean
     * 见库房目录新增 */
    onsubmit() {
      let flag = null
      this.$refs['spdLinkageForm'].validate((valid) => {
        flag = valid
      })
      return flag
    },
    getOptions(params) {
      if (this.$attrs.prop == 'hospitalList') {
        this.options2 = params.rows.map(it => {
          return {
            label: it.hospitalAreaName,
            value: it.id
          }
        })
      } else if (this.$attrs.prop == 'departmentList') {
        this.options2 = params.map(it => {
          return {
            label: it.warehouseName,
            value: it.id
          }
        })
      }
    },
    resetValue() {
      this.spdLinkageForm.value1 = null
      this.spdLinkageForm.value2 = null
      this.spdLinkageForm.value3 = null
      this.getValue()
      return this
    },
    getValue(current) {
      const obj = {}
      obj[this.configObj.prop1] = this.spdLinkageForm.value1
      obj[this.configObj.prop2] = this.spdLinkageForm.value2
      if (this.$attrs.label) {
        obj[this.configObj.prop3] = this.spdLinkageForm.value3
      }
      if (current == 3) {
        obj[this.configObj.prop2] = ''
        obj[this.configObj.prop3] = this.spdLinkageForm.value3
      }
      this.$emit('getFormValue', obj)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
