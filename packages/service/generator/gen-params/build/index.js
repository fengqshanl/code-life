const util = require('./util/index')

exports.build = function buildByConfig(params, content) {
    util[params](content)
}
