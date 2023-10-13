<template>
  <el-form-item :prop="prop" style="height:29px">
    <span v-if="$attrs.isShowLabel" slot="label">
      <!-- 业务层有些地方需要替换这个名字，但是组件内写死了这个类型，这里替换一下 -->
      {{ $attrs.spdTreeSelectLabel ? $attrs.spdTreeSelectLabel : currentConfig.label }}
    </span>
    <tree-select
      v-model="selectedValue"
      :append-to-body="true"
      :options="options"
      :flat="flat"
      :normalizer="normalizer"
      :show-count="true"
      :multiple="isMultiple"
      :limit="1"
      :noOptionsText="'暂无数据'"
      :noResultsText="noResultText"
      :placeholder="currentConfig.placeholder"
      :limitText="limitText"
      sort-value-by="INDEX"
      :valueConsistsOf="valueConsistsOf"
      @input="val => handleInput(val)"
      @select="handleSelect"
    />
  </el-form-item>
</template>

<script>

/**
   * 搜索条件中的树形选择框
   * 关键参数 prop
   * 目前支持 管理分类 核算科目
   * */

import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { CommonAPI } from '@/api'

export default {
  name: 'TreeSelectMultiple',
  components: { TreeSelect },
  props: {
    prop: {
      type: String
    },
    treeProp: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    },
    styleHeight: {
      type: String
    },
    defaultValue: {
      default: null
    },
    toDefaultValue: {
      default: () => null
    },
    valueConsistsOf: {
      default: 'BRANCH_PRIORITY'
    },
    flat: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedValue: null,
      noResultText: '无匹配数据',
      // isMultiple: false,
      config: {
        nmpaKindId: {
          paramKey: 'id',
          label: '药监分类',
          placeholder: '请选择',
          level: 7,
          status: 'NORMAL',
          needTopKind: false,
          parsedAsCategory: true,
          categoryList: ['CFDA_KIND']
        },
        accountKindId: {
          paramKey: 'id',
          label: '核算科目',
          placeholder: '请选择',
          level: 7,
          status: 'NORMAL',
          needTopKind: false,
          parsedAsCategory: true,
          categoryList: ['FINANCE_KIND']
        },
        manageKindId: {
          paramKey: 'id',
          label: '管理分类',
          placeholder: '请选择',
          level: 7,
          status: 'NORMAL',
          needTopKind: false,
          parsedAsCategory: true,
          categoryList: ['MANAGE_KIND']
        },
        materialCustomKindId: {
          paramKey: 'id',
          label: '耗材分类',
          placeholder: '请选择',
          level: 7,
          status: 'NORMAL',
          needTopKind: false,
          parsedAsCategory: true,
          categoryList: []
        }
      },
      options: [],
      selectData: []
    }
  },
  computed: {
    currentConfig() {
      return this.config[this.prop]
    },
    isMultiple() {
      this.selectData = []
      return Array.isArray(this.defaultValue)
    }
  },
  watch: {
    categoryList() {
      this.getMaterialTree()
    }
  },
  created() {
    this.getMaterialTree()
    // 设置默认值
    if (this.toDefaultValue) {
      this.selectedValue = this.toDefaultValue
    }
  },
  methods: {
    limitText(count) {
      return ` +${count}`
    },
    handleInput(val) {
      const obj = {
        [this.prop]: val
      }
      this.$emit('getFormValue', obj)
    },
    handleSelect(node, instanceId) {
      this.$emit('getFormValue', { [this.prop]: this.selectedValue })
      // 返回当前的节点，用于取label
      this.$nextTick(it => {
        this.$emit('getFormHandleSelect', { selectedValue: this.selectedValue, node: node })
      })
    },
    getMaterialTree() {
      const { categoryList } = this.currentConfig
      if (categoryList.length) {
        this.getMaterialKindTree4MaterialUseType(categoryList)
      } else {
        this.getMaterialKindTree()
      }
    },
    getMaterialKindTree4MaterialUseType(categoryList) {
      const params = {
        materialCategory: categoryList[0],
        materialUseType: ''
      }
      CommonAPI.getMaterialKindTree4MaterialUseType(params).then(response => {
        if (response.code === 200) {
          this.options = response.data
        } else {
          console.error(response.msg)
        }
      }).catch((e) => {
        this.$msgError(e.messgae)
      })
    },
    getMaterialKindTree() {
      const params = {
        needTopKind: true,
        parsedAsCategory: true,
        status: 'NORMAL'
      }
      CommonAPI.getMaterialKindTree(params).then(response => {
        if (response.code === 200) {
          if (response.code === 200) {
            this.options = response.data
          } else {
            console.error(response.msg)
          }
        }
      }).catch((e) => {
        this.$msgError(e.messgae)
      })
    },
    /** 转换数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.label,
        children: node.children
      }
    },
    resetValue() {
      this.selectedValue = null
      this.selectData = []
      return this
    },
    getValue() {
      let obj = {}
      if (this.isMultiple) {
        obj = {
          prop: this.prop,
          value: []
        }
      } else {
        obj = {
          prop: this.prop,
          value: ''
        }
      }
      this.$emit('getFormValue', obj)
    }
  }

}
</script>

<style>
  .vue-treeselect div, .vue-treeselect span {
    font-size: inherit;
  }
</style>
