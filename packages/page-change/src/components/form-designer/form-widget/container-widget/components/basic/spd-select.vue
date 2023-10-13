<template>
  <!---->
  <multi-select
    :class="{ 'filter-min-width': isFilter }"
    :value="selectValue"
    track-by="value"
    label="label"
    :placeholder="getPlaceholder()"
    :options="optionsToShow"
    :multiple="multiple"
    selectLabel=""
    selectedLabel="√"
    deselectLabel="√"
    :maxHeight="maxHeight"
    :openDirection="openDirection || (isFilter ? 'above' : '')"
    :closeOnSelect="!multiple"
    :clearOnSelect="false"
    :disabled="disabled"
    :option-height="24"
    @input="inputEvent"
  >
    <template #noOptions>
      <span>无匹配数据</span>
    </template>
    <template #noResult>
      <span>无匹配数据</span>
    </template>
    <template #selection="{ values }">
      <template v-if="values.length > 1 "><span class="mutil-select">{{ values[0].label }}  <i class="el-icon-error" @click="clearFirst" /></span>
        <span class="mutil-select">+{{ values.length-1 }}</span>
      </template>
      <span v-else-if="values.length === 1 " class="mutil-select">{{ values[0].label }}</span>
    </template>
    <template #caret="{toggle}" @mousedown.prevent.stop="toggle">
      <span v-if="((multiple && selectValue.length===0) || (!multiple && !selectValue.value))" class="multiselect__select" />
      <span v-else-if="!mouseOver && ((multiple && selectValue.length!==0) || (!multiple && !!selectValue.value))" class="multiselect__select" @mouseover="mouseOver=true" />
      <span v-else-if="mouseOver" class="multiselect-clear-all-icon" @mouseleave="mouseOver=false">
        <i class="el-icon-circle-close" @click="clearAll" @mousedown.prevent.stop /> </span>
    </template>
  </multi-select>
</template>

<script>
import multiSelect from 'vue-multiselect'
export default {
  name: 'SpdSelect',
  components: { multiSelect },
  inject: {
    popperAppendToBody: {
      default: false
    }
  },
  props: {
    value: {
      required: true
    },
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    labelProp: {
      type: [String, Function],
      default: 'label'
    },
    valueProp: {
      type: [String, Function],
      default: 'value'
    },
    size: {
      type: String
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 50
    },
    clearable: {
      type: Boolean,
      default: true
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    defaultFirstOption: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Function
    },
    loading: {
      type: Boolean,
      default: false
    },
    filterInit: {
      type: Function,
      default: null
    },
    // 是否过滤器面板
    isFilter: {
      type: Boolean,
      default: false
    },
    openDirection: {
      type: String,
      default: ''
    },
    maxHeight: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      keyword: '',
      mouseOver: false,
      isLoadMore: false,
      limitSize: this.limit,
      isActive: false,
      timer: null,
      isDestroy: false,
      selectValue: '',
      multiselectEle: null
    }
  },
  computed: {
    optionsToShow() {
      const list = this.options?.filter(o => this.filterFunction(o, this.keyword))
        .map(o => ({ label: this.labelPropComputor(o), value: this.valuePropComputor(o) }))
      this.$emit('optionsChange', list)
      return list
    },
    labelPropComputor() {
      return typeof this.labelProp === 'string' ? option => option[this.labelProp] : this.labelProp
    },
    valuePropComputor() {
      return typeof this.valueProp === 'string' ? option => option[this.valueProp] : this.valueProp
    },
    filterFunction() {
      return this.filter || ((option, keyword) => this.labelPropComputor(option)?.toUpperCase().indexOf(keyword?.toUpperCase()) !== -1)
    }
  },
  watch: {
    options() {
      this.syncValue()
    },
    value: {
      handler(v1) {
        this.keyword = ''
        this.syncValue()
      },
      immediate: true
    }
  },
  created() {
    // this.isActive = !this.$lodash.isNull(this.value) // 如果有数据显示下拉选项
    this.filterInit && this.filterInit()
  },
  mounted() {
    this.addMultiselectClass()
  },
  beforeDestroy() {
    // this.isActive = false
    this.toDoDestroy()
    this.removeMultiselectClass()
    // console.log('UN_WATCH', UN_WATCH)
  },
  methods: {
    // table中单元格如果下拉菜单有div包裹，元素被遮挡。需要判断如果有元素包裹则在上层添加样式
    addMultiselectClass() {
      const classList2 = this.$el.parentNode?.parentNode?.classList
      for (let i = 0; i < classList2?.length; i++) {
        if (classList2[i] === 'vxe-cell') {
          classList2.add('vxe-body--column-multiselect')
          this.multiselectEle = classList2
          return
        }
      }
      this.$el.parentNode.classList.add('vxe-body--column-multiselect')
      this.multiselectEle = this.$el.parentNode.classList
    },
    removeMultiselectClass() {
      // console.log('this.multiselectEle', this.multiselectEle)
      this.multiselectEle?.remove('vxe-body--column-multiselect')
    },
    syncValue() {
      if (this.multiple) {
        if (Array.isArray(this.value)) {
          const selecedValues = this.optionsToShow?.filter(it => this.value?.some(e => e === it.value)) || []
          this.selectValue = selecedValues
        } else {
          this.selectValue = []
        }
      } else {
        const selecedValues = this.optionsToShow?.filter(it => it.value === this.value)
        this.selectValue = selecedValues.length > 0 ? selecedValues[0] : { label: this.value, value: this.value }
      }
    },
    getPlaceholder() {
      if (Array.isArray(this.value)) {
        return this.value?.length ? '' : this.placeholder
      }
      return this.value ? '' : this.placeholder
    },
    setDefaultFirtOnlyOption() {
      // console.log('setDefaultFirtOnlyOption', this.multiple, this.optionsToShow, this.selectValue)
      if (this.multiple) {
        // 如果只有一个下拉选项，则默认选中
        if (this.optionsToShow?.length === 1 && this.value?.length === 0) {
          this.selectValue = this.optionsToShow
          this.$emit('input', [this.selectValue[0].value])
          this.$emit('change', [this.selectValue[0].value])
          return
        }
      } else {
        // 如果只有一个下拉选项，则默认选中
        if (this.optionsToShow?.length === 1 && !(this.selectValue?.value == this.optionsToShow[0]?.value)) {
          this.selectValue = this.optionsToShow[0]
          this.$emit('input', this.selectValue?.value)
          this.$emit('change', this.selectValue?.value)
          return
        }
      }
    },
    clearFirst() {
      if (this.multiple) {
        this.selectValue.shift()
      }
      this.inputEvent(this.selectValue)
    },
    clearAll() {
      this.mouseOver = false
      this._clearFun()
      if (this.multiple) {
        this.inputEvent([])
      } else {
        this.$emit('input', '')
        this.$emit('change', '')
      }
    },
    inputEvent(v) {
      if (!v) return
      let realTitle = null
      if (this.multiple) {
        // console.log('v.map(it => it.value)',v.map(it => it.value))
        this.$emit('input', v.map(it => it.value))
        this.$emit('change', v.map(it => it.value))
        realTitle = v.map(it => it.label).join(',')
      } else {
        this.$emit('input', v.value)
        this.$emit('change', v.value)
        realTitle = v.label
      }
      this.$nextTick(() => {
        const vxeCell = this.$el.parentNode
        const vxeBodyCol = vxeCell.parentNode
        vxeCell?.setAttribute('title', realTitle)
        vxeBodyCol?.setAttribute('title', realTitle)
      })
    },
    toDoDestroy() {
      // this.isDestroy = true
      // this.optionsToShow?.forEach((e, i) => {
      //   this.$refs.elselect?.onOptionDestroy(i)
      // })

      // this.$refs.elselect?.doDestroy()
    },
    setSelectLabel(from) {
      const visible = this.$refs['elselect']?.visible
      // 如果有值并且下拉面板是未激活状态，则渲染选项，以便让选项正常显示
      if (this.value != null && !visible) {
        this.isActive = true
      }
      // console.log('setSelectLabel1', from, visible, this.value)
      // 下拉面板未激活状态
      if (!visible) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          // 这里再判断一次面板是否激活，防止用户点击的太快，造成已经打开的面板被关闭
          const visible = this.$refs['elselect']?.visible
          // console.log('setSelectLabel2', from, visible, this.value)
          if (!visible) {
            this.isActive = false
            this.$nextTick(() => {
              this.toDoDestroy()
              clearTimeout(this.timer)
              this.timer = null
            })
          }
        }, 300)
      }
    },
    _clearFun() {
      // this.clearAll()
      this.keyword = ''
      this.$emit('clear')
    },
    visibleChange(v) {
      // console.log('v', v)
      !v ? this.keyword = '' : ''
      this.isActive = v
    },
    loadMore() {
      this.isLoadMore = true
    }
  }
}
//@import '~@/assets/styles/mutilselect.css';
</script>

<style scoped>
  .el-select-dropdown__wrap{
    max-height: 180px;
  }
  .mutil-select{
    background-color:rgb(244,244,244);
    white-space: nowrap;
    margin-right:5px;
    color:gray;
    padding: 0px 5px;
    border-radius: 3px;
    height: 18px;
    line-height: 18px;
  }
  .filter-min-width{
    min-width:180px
  }
  ::v-deep span.multiselect__placeholder{
    color:white
  }
</style>
