// 用户tab menu
import util from './util'

export default {
  methods: {
    valid() {
      return util.retPromise(this.$refs[this.componentId].validate)
    },
    fullValidEvent() {
      return util.retPromise(this.$refs[this.componentId].fullValidate)
    },
    validAllEvent() {
      return util.retPromise(util.cacheParams(this.$refs[this.componentId].validate, true))
    },
    selectValidEvent() {
      const $table = this.$refs[this.componentId]
      const selectRecords = $table.getCheckboxRecords()
      if (selectRecords.length > 0) {
        return util.retPromise(util.cacheParams($table.validate, selectRecords))
      } else {
        this.$message.error('未选中数据！')
      }
    }
  }
}
