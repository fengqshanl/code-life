<template>
  <div class="spdForm">
    <el-form
      ref="pureForm"
      :rules="rules"
      size="small"
      :model="form"
      :label-width="labelWidth"
      :inline="true"
    >
      <el-row :gutter="20">
        <template v-for="(config, index) in childArray">
          <el-col
            v-if="config.visible"
            :key="config.prop + index"
            :span="config.span*1"
            :xs="24"
            :sm="12"
            :md="12"
            :lg="config.span*1"
            :xl="config.span*1"
          >
            <component :is="config.type" v-model="form[config.prop]" v-bind="config" />
          </el-col>
        </template>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="search">查询</el-button>
            <el-button size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import resolve from './resolve'
import utils from './config/utils'
import components from '../basic/index'
import { defaultConfig } from './config/defaultConfig'
export default {
  name: 'PureForm',
  components: components,
  // todo: 拆分 props 并修改默认值处理函数
  props: {
    propConfig: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return defaultConfig.configDefault
  },
  created() {
    this.init()
  },
  watch: {
    propConfig(val) {
      this.init()
    }
  },
  methods: {
    init() {
      const newState = resolve.resolveConfig.call(this)
      this.form = newState.form
      this.childArray = newState.childArray
      if (Object.keys(newState.rules).length) this.rules = newState.rules
    },
    search() {
      console.log(this.form, 'form', this.$refs[this.formRef])
      this.$refs[this.formRef].validate((valid) => {
        console.log(valid, 'valid');
        if (valid) {
          console.log('submit!', this.rules)
        } else {
          console.log('error submit!!', this.rules)
          return false
        }
      })
    },
    reset() {
      this.form = utils.getFormInit(this.childArray)
    }
  }
}
</script>
<style lang="scss" scoped>
.spdForm {
  margin-bottom: 5px;
  padding: 5px;
}
</style>
