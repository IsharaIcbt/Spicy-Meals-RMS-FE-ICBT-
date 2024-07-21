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

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

import * as constant from './route-constant'
import { PLACES_PATH_FILTER } from "./route-constant";

// ** Default Route
const DefaultRoute = "/home"
const Home = lazy(() => import("../../views/home"))
const Places = lazy(() => import("../../views/places/list/index"))
const PlacesWithFilter = lazy(() => import("../../views/places/list/filterPlace"))
const PlaceDetails = lazy(() => import('../../views/places/details'))
const PlaceEdit = lazy(() => import('../../views/places/edit'))
const Categories = lazy(() => import("../../views/categories/categories"))
const Category = lazy(() => import("../../views/category/category"))
const Services = lazy(() => import("../../views/services/Services"))

const AddNewPlace = lazy(() => import("../../views/places/add_new_place"))
const Login = lazy(() => import("../../views/Login"))
const Register = lazy(() => import("../../views/Register"))
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"))

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: constant.HOME_PATH,
    element: <Home />,
    meta: {
      menuHidden: true
    }
  },
  {
    path: constant.PLACES_PATH,
    element: <Places />
  },
  {
    path: constant.PLACES_PATH_FILTER,
    element: <PlacesWithFilter />
  },
  {
    path: '/pages/blog/detail/:id',
    element: <PlaceDetails />
  },
  {
    path: '/pages/blog/detail',
    element: <Navigate to='/pages/blog/detail/1' />
  },
  {
    path: '/pages/blog/edit/:id',
    element: <PlaceEdit />
  },
  {
    path: '/pages/blog/edit',
    element: <Navigate to='/pages/blog/edit/1' />
  },
  {
    path: constant.CATEGORIES_PATH,
    element: <Categories />
  },
  {
    path: constant.SERVICES_PATH,
    element: <Services />,
  },
  {
    path: constant.CATEGORY_PATH,
    element: <Category />,
    children: [{ path: ':categoryTitle', element: <Category /> }]
  },
  {
    path: constant.ADD_NEW_PLACE_PATH,
    element: <AddNewPlace/>
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
  }
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
