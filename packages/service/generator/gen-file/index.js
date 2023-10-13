const fs = require('fs')
const path = require('path')
const zlib = require("zlib")
const { merge } = require("./util/index")
const gen_html = require('./gen-html/index')
const gen_components = require('./gen-components/index')
const gen_rest = require('./gen-rest/index')

const app_name = 'AutomaticallyCreatedApp'

function mk_file_recursively(config, cur_path) {
    Object.keys(config).map(key => {
        if (config[key] instanceof Object) {
            fs.mkdirSync(path.join(cur_path, key))
            mk_file_recursively(config[key], path.join(cur_path, key))
        } else {
            fs.writeFileSync(path.join(cur_path, key), config[key])
        }
    })
}

// function file_zlib() {
//     const tar_name = "AutomaticallyCreatedApp.zip"
//     const zip_stream = zlib.createGzip()
//     const write_stream = fs.createWriteStream(path.join(__dirname, tar_name))
//
//     fs.readdir(path.join(__dirname, "AutomaticallyCreatedApp"), function(err, files) {
//         files.forEach(function(file) {
//             console.log(file, 'file ---');
//             const read_stream = fs.createReadStream(path.join(__dirname, "AutomaticallyCreatedApp", file))
//             read_stream.pipe(zip_stream)
//         })
//     })
//
//     zip_stream.pipe(write_stream)
// }

exports.genFile = function genFile(context) {
    const basic_path = path.join(__dirname, "basic.json");
    const basic_structure = JSON.parse(fs.readFileSync(basic_path, "utf-8"))

    gen_html.html(basic_structure)
    gen_components.components(basic_structure)
    gen_rest.rest(basic_structure)

    Object.assign(basic_structure, context)
  
    merge(basic_structure)

    fs.mkdirSync(path.join(__dirname, app_name))

    mk_file_recursively(basic_structure, path.join(__dirname, app_name))

    // file_zlib()

    return basic_structure
}
