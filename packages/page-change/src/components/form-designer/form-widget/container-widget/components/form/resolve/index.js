import { defaultConfig } from '../config/defaultConfig'

export default {
  resolveConfig() {
    const _data = defaultConfig.mergeDefaultConfig(this.propConfig)
    defaultConfig.generateRules(_data)
    defaultConfig.injectSelectComponentsOptions.call(this, _data)
    return _data
  }
}
