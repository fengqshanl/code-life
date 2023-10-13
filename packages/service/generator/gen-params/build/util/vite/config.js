const import_str = [
`import { defineConfig } from 'vite'`,
`import vue from '@vitejs/plugin-vue'`
]

const export_default_str = `export default defineConfig({ plugins: [ vue() ] })`

exports.config = import_str.join(';') +  ';' + export_default_str
