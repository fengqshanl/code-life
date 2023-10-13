<template>
  <div class="filters-tree">
    <el-select
      ref="selectUpResId"
      v-model="value"
      placeholder="请选择"
      :multiple="multiple"
      clearable
      collapse-tags
    >
      <el-option
        key="id"
        :value="''"
        :label="''"
        class="tree-select-option"
        style="height: auto"
        @click.passive="() => {}"
      >
        <el-tree
          ref="tree"
          :data="data"
          class="tree-select-tree"
          :props="defaultProps"
          node-key="id"
          :check-on-click-node="multiple"
          :expand-on-click-node="false"
          @node-click="handleCheckChange"
        />
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { prop, data } from './prop'
export default {
  name: 'FilterTree',
  props: prop,
  data() {
    return data
  },
  methods: {
    handleCheckChange(chose) {
      if (!this.multiple) {
        this.value = chose.label
        this.$refs.selectUpResId.blur()
        this.$emit('input', chose.label)
      } else {
        if (!Array.isArray(this.column.filters[0].data)) {
          this.value = []
        }
        if (this.column.filters[0].data.includes(chose.label)) {
          this.value = this.value.filter(i => i !== chose.label)
        } else {
          this.value.push(chose.label)
        }
        this.$emit('input', this.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filters-tree {
  padding: 10px;
}

.tree-select-option {
  &:hover {
    background: transparent !important;
  }

  padding: 0;
}

.tree-select-tree {
  width: 100% !important;
  margin: 0
}
</style>
