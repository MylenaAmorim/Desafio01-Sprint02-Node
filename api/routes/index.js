const bodyParser = require('body-parser')
const project = require('./projectRota')

module.exports = app => {
    app.use(bodyParser.json())
    app.use("/api", project)
}