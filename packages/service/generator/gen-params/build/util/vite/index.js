const package = require('./package')
const { config } = require('./config')


exports.vite = function viteByConfig(content) {
    // package.json
    Object.keys(package).map(key => {
        Object.assign(content["package.json"][key], package[key])
    })
    // vite.config
    Object.assign(content, {
        'vite.config.js': config
    })
}
