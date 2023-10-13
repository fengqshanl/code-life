import utils from './utils'
export class defaultConfig {
  static configDefault = {
    size: 'mini',
    formRef: 'pureForm',
    labelWidth: '100px',
    rules: {},
    form: {},
    childArray: []
  }
  // 欲添加的配置项： autoFill: any, 填充的值 创建一个 enum
  static childDefault = {
    clearable: true,
    visible: true,
    span: 6
  }
  static mergeDefaultConfig(config) {
    const _config = utils.mergeConfig(config, this.configDefault, this.childDefault)
    _config.childArray.map(child => {
      child.placeholder = utils.setPlaceholder(child)
      child.defaultValue = utils.setDefaultValue(child)
    })
    _config.form = utils.setFormModel(_config)
    return _config
  }

  static injectSelectComponentsOptions(config) {
    config.childArray.map(child => {
      if (child.type !== 'Select') return
      if (child.dictProp) {
        child.options = utils.injectOptionsByDictionaryName.call(this, child.dictProp)
      } else {
        child.options = utils.injectOptionsByPropName.call(this, child.prop)
      }
    })
  }

  static generateRules(config) {
    const _rules = {}
    config.childArray.map(child => {
      if (child?.validate) {
        _rules[child.prop] = child.validate
      }
    })
    config.rules = _rules
  }
}
