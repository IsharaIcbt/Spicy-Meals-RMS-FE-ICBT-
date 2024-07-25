import React, { Fragment, useEffect } from "react"
import NavbarUser from "./NavbarUser"
import { FileText, Grid, Home, MapPin, PlusCircle } from "react-feather";
import { Col, Row } from "reactstrap"
import themeConfig from "@configs/themeConfig"
import {
  ADD_NEW_PLACE_PATH,
  CATEGORIES_PATH,
  HOME_PATH,
  SERVICES_PATH
} from "@src/router/routes/route-constant";
import { Link } from "react-router-dom"
import "../../../../main.scss"
import { routePathHandler } from "@store/routePath"
import { useDispatch, useSelector } from "react-redux"
import { IS_LOGIN, LOGIN_PATH } from "@src/router/RouteConstant"
import toast from "react-hot-toast"

const ThemeNavbar = (props) => {
  const {} = props
  const dispatch = useDispatch()
  const routePathStore = useSelector((state) => state.routePath)
  let windowPath = routePathStore.pathName

  const setWindowPathHandler = (path) => {
    dispatch(routePathHandler(path))
  }

  useEffect(() => {
    windowPath = routePathStore.pathName
  }, [routePathStore.pathName])

  const userStatus = localStorage.getItem(IS_LOGIN)
  const handleAddNewPlaceClick = () => {
    setWindowPathHandler(LOGIN_PATH)
    toast.success("You must register or sign in before adding a new place.")
  }


  return (<Fragment>
      <Row className="bookmark-wrapper d-flex align-items-center " style={{ width: "95vw" }}>
        {/*     <Col className="navbar-nav d-xl-none">
          <NavItem className="mobile-menu me-auto">
            <NavLink className="nav-menu-main menu-toggle hidden-xs is-active" onClick={() => setMenuVisibility(true)}>
              <Menu className="ficon" />
            </NavLink>
          </NavItem>
        </Col>*/}
        <Col md={3} className={"nav-logo-wrapper d-flex justify-content-start align-items-center"}>
          <Row>
            <Col md={3}>
              <Link to={HOME_PATH} className="navbar-brand">
              <span className="brand-logo">
                <img src={themeConfig.app.appLogoImage} width={150}  alt="logo" />
              </span>
              </Link>
            </Col>
            <Col md={9} style={{ marginTop: "8px" }}>
              <h2 className="brand-text  m-0 p-0" style={{ color: '#FF9F43',fontWeight:'900'}}>{themeConfig.app.appName}</h2>
              <h4 className={"m-0 p-0"} style={{ color: 'rgba(47,34,27,0.94)',fontWeight:'600'}}>Restaurant</h4>
            </Col>
          </Row>
        </Col>

        <Col md={7}
             className="navbar-nav d-none_ d-lg-block_ navbar_main d-flex justify-content-center align-items-center ">

          <div className={"top-navigate-btns"}>
            <Link
              to={HOME_PATH}
              className={`top-wrapper ${windowPath === HOME_PATH ? "top-wrapper-active" : ""}`}
              onClick={() => setWindowPathHandler(HOME_PATH)}
            >
              <div className={"nav_itm"}>
                <Home />
                <p>Home</p>
              </div>
            </Link>

            <Link
              to={SERVICES_PATH}
              className={`top-wrapper ${windowPath === SERVICES_PATH ? "top-wrapper-active" : ""}`}
              onClick={() => setWindowPathHandler(SERVICES_PATH)}
            >
              <div className={"nav_itm"}>
                <FileText />
                <p>Services</p>
              </div>
            </Link>


            <Link
              to={CATEGORIES_PATH}
              className={`top-wrapper ${windowPath === CATEGORIES_PATH ? "top-wrapper-active" : ""}`}
              onClick={() => setWindowPathHandler(CATEGORIES_PATH)}
            >
              <div className={"nav_itm"}>
                <Grid />
                <p>Our-Menus</p>
              </div>
            </Link>

            {userStatus === "USER" ? (<Link
                to={ADD_NEW_PLACE_PATH}
                className={`top-wrapper ${windowPath === ADD_NEW_PLACE_PATH ? "top-wrapper-active" : ""}`}
                onClick={() => setWindowPathHandler(ADD_NEW_PLACE_PATH)}
              >
                <div className={"nav_itm"}>
                  <PlusCircle />
                  <p>Add New Place</p>
                </div>
              </Link>) : (<Link
                to={LOGIN_PATH}
                className={`top-wrapper ${windowPath === LOGIN_PATH ? "top-wrapper-active" : ""}`}
                onClick={handleAddNewPlaceClick}
              >
                <div className={"nav_itm"}>
                  <PlusCircle />
                  <p>Make Reservation</p>
                </div>
              </Link>)}
          </div>
        </Col>

        <Col md={2} className={"d-flex justify-content-end align-items-center"}>
          <NavbarUser {...props} />
        </Col>
      </Row>

    </Fragment>)
}

export default ThemeNavbar
