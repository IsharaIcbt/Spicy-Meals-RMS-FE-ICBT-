// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import routePath from "./routePath"
import ecommerce from '@src/views/apps/ecommerce/store'
const rootReducer = {
  navbar,
  layout,
  routePath,
  ecommerce
}

export default rootReducer
