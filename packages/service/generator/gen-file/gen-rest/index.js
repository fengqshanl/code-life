const components = require('./template')

exports.rest = function restByConfig(content) {
  Object.assign(content.src, components)
}
