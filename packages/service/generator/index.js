const genParams = require('./gen-params/index')
const { genFile } = require('./gen-file/index')

exports.generateApp = function generateApp(config) {
    const context = {
        "package.json": {},
        "vite.config.js": {}
    }

    genParams.basic(config, context["package.json"])
    Object.keys(config).map(key => {
        genParams[key](config[key], context)
    })

    context["package.json"] = JSON.stringify(context["package.json"])

    return genFile(context)
}

