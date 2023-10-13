export default {
  retPromise(validate) {
    return new Promise((resolve, reject) => {
      validate()
        .then(errMap => {
          if (errMap) {
            reject(errMap)
          } else {
            resolve()
          }
        })
        .catch(errMap => console.error(errMap))
    })
  },
  cacheParams(func, ...params) {
    const _params = params
    return () => {
      func(_params)
    }
  }
}
