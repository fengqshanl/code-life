export default {
  injectOptionsByDictionaryName(dictionaryName) {
    // const { dictionary, dictionary2 } = this.$store.state
    const dictionary2 = {}
    const dictionary = {
      authHospitalList: [{
        label: '实例医院', value: 'example'
      },{
        label: '需要对接医院接口', value: 'need2'
      }],
      authHospitalAreaList: [{
        label: '实例院区', value: 'example'
      },{
        label: '需要对接院区接口', value: 'need2'
      }],
      authDepartmentList: [{
        label: '实例科室', value: 'example'
      },{
        label: '需要对接科室接口', value: 'need2'
      }],
      authDeptWarehouseList: [{
        label: '实例DeptWarehouse', value: 'example'
      },{
        label: '需要对接DeptWarehouse接口', value: 'need2'
      }],
      table_theme_status: [{
        label: '正常', value: 'NORMAL'
      },{
        label: '不正常', value: 'NOTNORMAL'
      }]
    }
    const res = []
    for (let i =1; i <= 100; i++) {
      res.push({
        label: dictionaryName + i,
        value: dictionaryName + i
      })
    }
    if (dictionaryName) return res
    const dictionaryList = dictionary[dictionaryName]
    if (dictionaryList) return dictionaryList
    const dictionary2List = dictionary2.dictMap[dictionaryName]
    if (dictionary2List) return dictionary2List
    console.error('not found select options')
    return []
  },
  // todo: prop 与 dict prop 应该是有所区别的
  injectOptionsByPropName(PropName) {
    // const { dictionary, dictionary2 } = this.$store.state
    const dictionary2 = {}
    const dictionary = {}
    const res = []
    for (let i =1; i <= 100; i++) {
      res.push({
        label: PropName + i,
        value: PropName + i
      })
    }
    if (PropName) return res
    const dictionaryList = dictionary[PropName]
    if (dictionaryList) return dictionaryList
    const dictionary2List = dictionary2.dictMap[PropName]
    if (dictionary2List) return dictionary2List
    console.error('not found select options')
    return []
  },
  mergeConfig(config, configDefault, childDefaultConfig) {
    // todo: object.assign 是浅拷贝,可能有隐患
    const mergedConfig = Object.assign({}, configDefault, config)
    mergedConfig.childArray = mergedConfig.childArray.map(item => {
      return Object.assign({}, childDefaultConfig, item)
    })
    return mergedConfig
  },
  setPlaceholder(item) {
    if (item.placeholder) return item.placeholder
    switch (item.type) {
      case ('Input'): return `请输入${item.label}`
      default: return `请选择${item.label}`
    }
  },
  setDefaultValue(item) {
    if (item.defaultValue) return item.defaultValue
    if (item.multiple) return []
    return ''
  },
  // todo: 这个函数跟下面这个函数重复了，可以优化
  setFormModel(config) {
    const _config = {}
    config.childArray.map(child => {
      _config[child.prop] = child.defaultValue
    })
    return _config
  },
  getFormInit(childs) {
    const newForm = {}
    childs.map(child => {
      newForm[child.prop] = child.defaultValue
    })
    return newForm
  }
}
