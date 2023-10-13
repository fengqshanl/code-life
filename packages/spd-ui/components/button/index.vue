<template>
  <el-button :type="type" @click="click">{{ content }}</el-button>
</template>

<script>
import life from '../../mixin/lifeMixin'
export default {
  name: "SpdButton",
  mixins: [life],
  props: {
    type: String,
    content: String,
    field: Object
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
