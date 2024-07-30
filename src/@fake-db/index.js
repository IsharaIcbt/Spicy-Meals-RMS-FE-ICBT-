import mock from './mock'

import './jwt'
import './select'

import './pages/profile'
import './apps/eCommerce'
import './pages/blog-data'
import './tables/datatables'
import './pages/pricing-data'
import './navbar/navbarSearch'
import './pages/knowledge-base'
import './cards/card-analytics'
import './cards/card-statistics'
import './pages/account-settings'
import './autoComplete/autoComplete'

mock.onAny().passThrough()
