const { html } = require('./template')

exports.html = function htmlByConfig(content) {
    content["index.html"] = html
}
