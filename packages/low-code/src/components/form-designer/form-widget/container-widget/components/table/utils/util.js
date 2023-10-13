function getNestName(name, nest = 'nest') {
  return nest + name[0].toUpperCase() + name.substring(1, name.length)
}
function injectOptionsByPropName(PropName) {
  // const { dictionary, dictionary2 } = this.$store.state
  const dictionary2 = {}
  const dictionary = {authCenterWarehouseList: []}
  const dictionaryList = dictionary[PropName]
  if (dictionaryList) return dictionaryList
  const dictionary2List = dictionary2.dictMap[PropName]
  if (dictionary2List) return dictionary2List
  console.error('not found select options')
  return []
}
export default {
  columnsFormat(columns) {
    return columns.map(it => {
      const mergeItem = { ...it }
      if (it?.filter) {
        mergeItem.filterable = true
        if (it?.filter === 'text') {
          mergeItem.options = [{ data: '' }]
        } else if (it?.filter === 'select') {
          mergeItem.options = it.options || []
          mergeItem.filterMultiple = false
        } else if (it?.filter === 'searchSelect') {
          mergeItem.filterParam = [{ data: mergeItem.multiple ? [] : '' }]
        } else if (it.filter === 'date') {
          mergeItem.options = [{ data: it?.defaultDateRange || this.defaultDateRange[0] || [], resetValue: it?.defaultDateRange || this.defaultDateRange[0] }]
        }
        mergeItem.params = Object.assign({}, mergeItem.params || {}, { dictProp: mergeItem.dictProp })
      }
      return Object.freeze(mergeItem)
    })
  },
  assign(target, source) {
    Object.keys(source).map(i => {
      if (!target.hasOwnProperty(i)) {
        target[i] = source[i]
      }
    })
  },
  assignNest(target = {}, source = {}, nestName = 'nest') {
    const sourceNameList = Object.keys(source)
    const nestNameList = Object.keys(target).filter(i => i.includes(nestName))
    target[nestName] = {}
    sourceNameList.map(key => {
      const name = getNestName(key, nestName)
      if (nestNameList.includes(name)) {
        target[nestName][key] = target[name]
        delete target[name]
      } else {
        target[nestName][key] = source[key]
      }
    })
    target[nestName]['type'] = source['type']
  },
  injectOptionsByPropName: injectOptionsByPropName
}
