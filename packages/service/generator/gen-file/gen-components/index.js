const components = require('./template')

exports.components = function componentsByConfig(content) {
    Object.assign(content.src.components, components)
}
