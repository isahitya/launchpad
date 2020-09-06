const middleware = {}

middleware['loadData'] = require('../middleware/loadData.js')
middleware['loadData'] = middleware['loadData'].default || middleware['loadData']

export default middleware
