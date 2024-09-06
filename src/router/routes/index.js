// ** React Imports
import { Fragment, lazy } from "react"
import { Navigate } from "react-router-dom"
// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import VerticalLayout from "@src/layouts/VerticalLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute"

// ** Utils
import { isObjEmpty } from "@utils"
import * as constant from "./route-constant"
import { HOME_PATH, ORDERS_DETAILS_PATH, RESERVATION_DETAILS_PATH } from "./route-constant";


const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Default Route
const DefaultRoute = HOME_PATH
const Home = lazy(() => import("../../views/home"))
const Category = lazy(() => import("../../views/category/category"))
const Menus = lazy(() => import("../../views/menus/menus"))
const MenuDetails = lazy(() => import("../../views/menuDetails/menuDetails"))
const MealsShop = lazy(() => import('../../views/apps/ecommerce/shop'))
const MealsDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
const MealsCheckout = lazy(() => import('../../views/apps/ecommerce/checkout'))

const Services = lazy(() => import("../../views/services/Services"))
const ReservationForm = lazy(() => import("../../views/customerDashboard/reservationForm"))
const MyReservations = lazy(() => import("../../views/customerDashboard/orders/myReservation"))
const MyOrders = lazy(() => import("../../views/customerDashboard/orders/myOrders"))
const OrderDetails = lazy(() => import("../../views/customerDashboard/orders/reservationDetails/orderDetails"))
const ReservationDetails = lazy(() => import("../../views/customerDashboard/orders/reservationDetails/reservationDetails"))

const MyProfile = lazy(() => import("../../views/customerDashboard/myProfile"))
const MyQueries = lazy(() => import("../../views/customerDashboard/faq/index"))

const Login = lazy(() => import("../../views/Login"))
const Register = lazy(() => import("../../views/Register"))
const ForgotPassword = lazy(() => import("../../views/ForgotPasswordAndReset/ForgotPassword"))

const AdminDashboard = lazy(() => import("../../views/adminPanel/dashboard/dashboard"))
const AdminMealsManage = lazy(() => import("../../views/adminPanel/meals/meals"))
const AdminRestaurantsManage = lazy(() => import("../../views/adminPanel/restaurant/restaurant"))
const AdminFacilitiesManage = lazy(() => import("../../views/adminPanel/facility/facility"))
const AdminUsersManage = lazy(() => import("../../views/adminPanel/users/index"))
const Customers = lazy(() => import("../../views/adminPanel/customers/customer"))
const AdminPaymentsManage = lazy(() => import("../../views/adminPanel/payments"))
const AdminReportsManage = lazy(() => import("../../views/adminPanel/reports"))
const AdminReservations = lazy(() => import("../../views/adminPanel/ManageReservations/reservation"))
const AdminOrders = lazy(() => import("../../views/adminPanel/manageOrders/orders"))

const ReportsSummary = lazy(() => import("../../views/adminPanel/reports/summery"))
const ReportsDetail = lazy(() => import("../../views/adminPanel/reports/details"))
const ResetPassword = lazy(() => import("../../views/ForgotPasswordAndReset/ResetPassword"))
// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: constant.HOME_PATH,
    element: <Home />
  },
  {
    path: constant.MENUS_PATH,
    element: <Menus />
  },
  {
    path: constant.MENU_DETAILS_PATH,
    element: <MenuDetails />,
    children: [{ path: ':menuId', element: <MenuDetails /> }]
  },
  {
    path: constant.SHOP_PATH,
    element: <MealsShop />,
    meta: {
      layout: "vertical",
      className: 'ecommerce-application'
    }
  },
  {
    path: constant.SHOP_PRODUCTS_DETAILS_PATH,
    element: <Navigate to='/apps/meals/product-detail/sample' />,
    meta: {
      layout: "vertical",
      className: 'ecommerce-application'
    }
  },
  {
    path: constant.SPECIFIC_PRODUCT_DETAILS_PATH,
    element: <MealsDetail />,
    meta: {
      layout: "vertical",
      className: 'ecommerce-application'
    }
  },
  {
    path: constant.MEALS_CHECKOUT,
    element: <MealsCheckout />,
    meta: {
      layout: "vertical",
      className: 'ecommerce-application'
    }
  },
  {
    path: constant.SERVICES_PATH,
    element: <Services />
  },
  {
    path: constant.RESERVATION_FORM_PATH,
    element: <ReservationForm />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.ALL_RESERVATIONS_PATH,
    element: <MyReservations />,
    meta: {
      layout: "vertical"
    }
  },

  {
    path: constant.RESERVATION_DETAILS_PATH,
    element: <ReservationDetails />,
    meta: {
      layout: "vertical"
    }
  }, {
    path: constant.ORDERS_DETAILS_PATH,
    element: <OrderDetails />,
    meta: {
      layout: "vertical"
    }
  },

  {
    path: constant.MY_PROFILE_PATH,
    element: <MyProfile />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.MY_ORDERS_PATH,
    element: <MyOrders />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.MY_QUERIES_PATH,
    element: <MyQueries />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.CATEGORY_PATH,
    element: <Category />,
    children: [{ path: ':categoryTitle', element: <Category /> }]
  },
  
  {
    path: constant.ADMIN_DASHBOARD_PATH,
    element: <AdminDashboard />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.ADMIN_MANAGE_MEALS_PATH,
    element: <AdminMealsManage />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.ADMIN_MANAGE_RESTAURANT_PATH,
    element: <AdminRestaurantsManage />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.ADMIN_MANAGE_FACILITY_PATH,
    element: <AdminFacilitiesManage />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.USER_MANAGE_PATH,
    element: <AdminUsersManage />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.CUSTOMERS_PATH,
    element: <Customers />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.PAYMENTS_PATH,
    element: <AdminPaymentsManage />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.REPORTS_PATH,
    element: <AdminReportsManage />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.MANAGE_RESERVATION_PATH,
    element: <AdminReservations />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: constant.MANAGE_ORDERS_PATH,
    element: <AdminOrders />,
    meta: {
      layout: "vertical"
    }
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: constant.RESET_PASSWORD_PATH,
    element: <ResetPassword />,
    meta: {
      layout: "blank"
    }
  },
]

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false)
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical"
  const layouts = ["vertical", "horizontal", "blank"]

  const AllRoutes = []

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, Routes, getRoutes }
