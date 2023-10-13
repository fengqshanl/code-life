const { VueLoaderPlugin } = require("vue-loader")
const { compile } = require('vue-template-compiler')
const fs = require("fs")
const path = require("path")

function analyzer() {
  const fileContent = fs.readFileSync(path.join(__dirname, "../../vite-vue-combo/src/App.vue") , 'utf8');
  // 解析为对象
  
  console.log(VueLoaderPlugin)

  const plugin = new VueLoaderPlugin(compile) 

  const componentObject = plugin.analyzer(fileContent);

  return componentObject.template.content
}

module.exports = {
  analyzer
}