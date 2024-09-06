import React, { Fragment, useEffect, useState } from "react"
import NavbarUser from "./NavbarUser"
import { AtSign, FileText, Grid, Home, MapPin, PlusCircle, User, UserPlus } from "react-feather";
import { Col, Row } from "reactstrap"
import themeConfig from "@configs/themeConfig"
import {
  CREATE_ACCOUNT_PATH,
  HOME_PATH, MENUS_PATH, RESERVATION_FORM_PATH,
  SERVICES_PATH, SHOP_PATH
} from "@src/router/routes/route-constant";
import { Link, useNavigate } from "react-router-dom"
import "../../../../main.scss"
import { routePathHandler } from "@store/routePath"
import { useDispatch, useSelector } from "react-redux"
import { IS_LOGIN, LOGIN_PATH } from "@src/router/RouteConstant"
import toast from "react-hot-toast"


const ThemeNavbar = (props) => {
  const {} = props
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userStatus, setUserStatus] = useState(localStorage.getItem(IS_LOGIN))
  const windowPath = useSelector((state) => state.routePath.pathName)

  useEffect(() => {
    setUserStatus(localStorage.getItem(IS_LOGIN))
  }, [userStatus])


  const setWindowPathHandler = (path) => {
    dispatch(routePathHandler(path))
  }

  const handleAddNewPlaceClick = () => {
    if (!userStatus) {
      toast.success("You must register or sign in before making a reservation.")
      navigate(LOGIN_PATH)
    } else if (userStatus === "CUSTOMER") {
      setWindowPathHandler(RESERVATION_FORM_PATH)
    }
  }


  return (<Fragment>
    <Row className="bookmark-wrapper d-flex align-items-center" style={{ width: userStatus ? "78vw" : "110vw" }}>
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
              <h2 className="brand-text  m-0 p-0" style={{ color: '#FF9F43', fontWeight:'900'}}>{themeConfig.app.appName}</h2>
              <h4 className={"m-0 p-0"} style={{ color: 'rgba(47,34,27,0.94)', fontWeight:'600'}}></h4>
            </Col>
          </Row>
        </Col>

        <Col md={6}
             className="navbar-nav d-none_ d-lg-block_ navbar_main d-flex justify-content-center align-items-center ">

          <div className={"top-navigate-btns"}>
            {!userStatus ? (
              <>
                <Link
                  to={HOME_PATH}
                  className={`top-wrapper ${windowPath === HOME_PATH ? "top-wrapper-active" : ""}`}
                  onClick={() => setWindowPathHandler(HOME_PATH)}
                >
                  <div className="nav_itm">
                    <Home />
                    <p>Home</p>
                  </div>
                </Link>

                <Link
                  to={SERVICES_PATH}
                  className={`top-wrapper ${windowPath === SERVICES_PATH ? "top-wrapper-active" : ""}`}
                  onClick={() => setWindowPathHandler(SERVICES_PATH)}
                >
                  <div className="nav_itm">
                    <FileText />
                    <p>Services</p>
                  </div>
                </Link>

                <Link
                  to={MENUS_PATH}
                  className={`top-wrapper ${windowPath === MENUS_PATH ? "top-wrapper-active" : ""}`}
                  onClick={() => setWindowPathHandler(MENUS_PATH)}
                >
                  <div className="nav_itm">
                    <Grid />
                    <p>Our Menus</p>
                  </div>
                </Link>
                <Link
                  to={CREATE_ACCOUNT_PATH}
                  className={`top-wrapper ${windowPath === CREATE_ACCOUNT_PATH ? "top-wrapper-active" : ""}`}
                  onClick={() => setWindowPathHandler(CREATE_ACCOUNT_PATH)}
                >
                  <div className="nav_itm">
                    <User />
                    <p>Login</p>
                  </div>
                </Link>
              </>
            ) : (
              <div className={userStatus === 'ADMIN' || userStatus === 'STAFF' ? 'd-none' : ''}>
                <Link
                  to={SHOP_PATH}
                  className={`top-wrapper ${windowPath === SHOP_PATH ? "top-wrapper-active" : ""}`}
                  onClick={() => setWindowPathHandler(SHOP_PATH)}
                >
                  <div className={"nav_itm"}>
                    <Grid />
                    <p>Explore Meals</p>
                  </div>
                </Link>
              </div>
            )}
            <div className={userStatus === 'ADMIN' || userStatus === 'STAFF' ? 'd-none' : ''}>
              <Link
                to={userStatus === "CUSTOMER" ? RESERVATION_FORM_PATH : LOGIN_PATH}
                className={`top-wrapper ${windowPath === (userStatus === "CUSTOMER" ? RESERVATION_FORM_PATH : LOGIN_PATH) ? "top-wrapper-active" : ""}`}
                onClick={handleAddNewPlaceClick}
              >
                <div className={"nav_itm"}>
                  <PlusCircle />
                  <p>Make Reservation</p>
                </div>
              </Link>
            </div>

          </div>
        </Col>

        <Col md={3} className={"d-flex justify-content-end align-items-center"}>
          {userStatus && (
            <NavbarUser {...props} />
          )}

        </Col>
      </Row>

    </Fragment>
  )
}

export default ThemeNavbar
