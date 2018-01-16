const path = require('path')
const static = "../../static"
const view = "../../views"
const ViewConfig = {
  static:path.join( __dirname,static),
  view:path.join(__dirname,view),
}
module.exports = ViewConfig;
