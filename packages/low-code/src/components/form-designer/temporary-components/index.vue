<template>
  <el-dialog
    :close-on-click-modal="false"
    title="创建一个app"
    :visible.sync="value"
    width="80%"
    @close="back"
  >
    <el-steps :space="200" :active="step.current" finish-status="success">
      <el-step title="技术选型" />
      <el-step title="系统逻辑制定" />
      <el-step title="公共组件编辑" />
      <el-step title="页面编辑" />
      <el-step title="系统代码自动生成" />
      <el-step title="自动发布部署" />
    </el-steps>
    <component :is="step.components" />
    <span slot="footer" class="dialog-footer" >
        <el-button size="mini" @click="back">返回</el-button>
        <el-button type="primary" size="mini" :loading="loading.save" @click="preStep">上一步</el-button>
        <el-button type="primary" size="mini" :loading="loading.save" @click="nextStep">下一步</el-button>
      </span>
  </el-dialog>
</template>

<script>
import components, { keys } from './step/index'
export default {
  name: "CreateAppDialog",
  components: components,
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: {
        save: false
      },
      step: {
        current: 0,
        components: keys[0]
      }
    };
  },
  methods: {
    back() {
      this.$emit("input", false)
    },
    nextStep() {
      this.step.current = this.step.current + 1
      this.step.components = keys[this.step.current]
    },
    preStep() {
      this.step.current = this.step.current - 1
      this.step.components = keys[this.step.current]
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: row;
}
</style>
