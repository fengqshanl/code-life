<template>
  <div style="margin: 10px auto 10px auto">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="打包工具">
        <el-radio-group v-model="form.build">
          <el-radio label="vite">vite</el-radio>
          <el-radio label="webpack">webpack</el-radio>
          <el-radio label="rspack">rspack</el-radio>
          <el-radio label="rest">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="框架">
        <el-radio-group v-model="form.frame">
          <el-radio v-for="item in frames" :key="item.label" :label="item.value" >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="ui轮子">
        <el-radio-group v-model="form.UIframe">
          <el-radio label="element">elementJS</el-radio>
          <el-radio label="rest">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="代码规范">
        <el-radio-group v-model="form.format">
          <el-radio label="ESLINT" name="eslint"></el-radio>
          <el-radio label="其他" name="rest"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="语言">
        <el-radio-group v-model="form.language">
          <el-radio label="ts">TS</el-radio>
          <el-radio label="js">JS</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button @click="createApp">createApp</el-button>
  </div>
</template>

<script>
import request from '../request/index'

// 参考 https://cn.vitejs.dev/guide/
const frames = [
  {label: 'Vue', value: 'vue'},
  {label: 'React', value: 'react'},
  {label: 'Angular', value: 'angular'},
  {label: 'Vanilla', value: 'vanilla'},
  {label: 'Preact', value: 'preact'},
  {label: 'Lit', value: 'lit'},
  {label: 'Svelte', value: 'svelte'},
  {label: 'Solid', value: 'solid'},
  {label: 'Qwik', value: 'qwik'},
  {label: '其他', value: 'rest'}
]
export default {
  name: "TechnologySelection",
  data() {
    return {
      form: {
        build: 'vite',
        frame: 'vue',
        UIframe: 'element',
        format: 'ESLINT',
        language: 'ts'
      },
      frames: frames,
      loading: {
        save: false
      },
      step: {
        current: 0
      }
    };
  },
  methods: {
    back() {
      this.$emit("input", false)
    },
    nextStep() {

    },
    createApp() {
      request({
        url: '/create/app',
        method: 'POST',
        data: this.form
      }).then(res => {
        console.log(res, 'res');
      }).catch(e => {
        console.log(e, 'e');
      })
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
