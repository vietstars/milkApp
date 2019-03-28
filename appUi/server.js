module.exports = function() {
  return {
    logged: require('./src/app/sys/logged.json'),
    farm: require('./src/app/sys/farm.json'),
    factory: require('./src/app/sys/factory.json'),
    store: require('./src/app/sys/store.json'),
    draff: require('./src/app/sys/draff.json')
  }
}