function merge_js(config) {
  if (Array.isArray(config)) {
    return config.join(';')
  }
  if (config instanceof Object) {
    let tar = []
    Object.keys(config).map(key => {
      tar = tar.concat(config[key])
    })
    return tar.join(";")
  }
  return config
}

function merge_style(config) {
  if (Array.isArray(config)) {
    return config.join(' ')
  }
  return config
}

function merge_vue(config) {
  if (Array.isArray(config)) {
    return config.join(' ')
  }
  if (config instanceof Object) {
    let tar = []
    Object.keys(config).map(key => {
      if (key.includes('template')) {
        const tag_name = key.split(" ")[0]
        tar.push( '<' + key + '>' + merge_style(config[key]) + '</' + tag_name + '>' )
      } else if (key.includes('script')) {
        const tag_name = key.split(" ")[0]
        tar.push('<' + key + '>' + merge_js(config[key]) + '</' + tag_name + '>')
      } else if (key.includes('style')) {
        const tag_name = key.split(" ")[0]
        tar.push('<' + key + '>' + merge_style(config[key]) + '</' + tag_name + '>')
      }
    })
    return tar.join(" ")
  } 
  return config
}

const style_l = ["css", "scss", "sass", "less"]
const js_l = ["js", "ts"]
const mixture_l = ["vue"]

function merge_mixture(config, file_name) {
  const suffix = file_name.split('.').slice(-1)[0]
  if (style_l.includes(suffix)) {
    return merge_style(config)
  } else if (js_l.includes(suffix)) {
    return merge_js(config)
  } else if (mixture_l.includes(suffix)) {
    return merge_vue(config)
  }
  return config
}

exports.merge = function merge(config) {
  Object.keys(config).map(key => {
    if (key.includes(".")) {
      config[key] = merge_mixture(config[key], key)
    } else if(config[key] instanceof Object) {
      merge(config[key])
    }
  })
}
