import { basic } from './basic'
import util from '../../utils/util'
import filter from './filter'
import edit from './edit'
import validate from './validate'

function filterDefault(configItem) {
  if (filter[configItem.filterType]) {
    util.assignNest(configItem, filter[configItem.filterType], 'filter')
  } else {
    util.assignNest(configItem, filter['text'], 'filter')
  }
}

function editDefault(configItem) {
  if (edit[configItem.editType]) {
    util.assignNest(configItem, edit[configItem.editType], 'edit')
  } else {
    util.assignNest(configItem, edit['text'], 'edit')
  }
}

function validateDefault(configItem) {
  if (validate[configItem.editType]) {
    util.assignNest(configItem, edit[configItem.editType], 'edit')
  } else {
    util.assignNest(configItem, edit['text'], 'edit')
  }
}

function optionsDefault(configItem, name = 'filter') {
  if (configItem[name + 'Type'] === 'select' && !configItem.hasOwnProperty(name + 'Options') && configItem.hasOwnProperty(name + 'DictProp')) {
    configItem[name + 'Options'] = util.injectOptionsByPropName.call(this, configItem[name + 'DictProp'])
  }
}

// 是否采用树状的方式更好、更容易理解一些？采用平面的方式少量的还可以，如果是大量的话就会变的难以理解。
// todo: 优化，将平面式改为树状结构。
export function fillDefaultConfig(config) {
  config.map(configItem => {
    util.assign(configItem, basic(configItem.title))
    if (configItem.filterable) {
      optionsDefault.call(this, configItem, 'filter')
      filterDefault(configItem)
    }

    if (configItem.editable) {
      optionsDefault.call(this, configItem, 'edit')
      editDefault(configItem)
    }
    if (configItem.validate) {
      // 拆分 validate 项，进行校验参数的拼装
      optionsDefault.call(this, configItem, 'validate')
      validateDefault(configItem)
    }
  })
}
