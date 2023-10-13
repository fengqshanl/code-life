const fs = require('fs')
const path = require('path')

exports.basic = function basicByConfig(params, content) {
    const data = fs.readFileSync(path.join(__dirname, 'basic.json'), 'utf-8')
    Object.assign(content, JSON.parse(data))
}
