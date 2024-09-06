// ** Dropdowns Imports
import UserDropdown from "./UserDropdown"
import CartDropdown from "@layouts/components/navbar/CartDropdown"
import React, { useEffect, useState } from "react"
import { IS_LOGIN } from "@src/router/RouteConstant"

const NavbarUser = () => {
  const [userStatus, setUserStatus] = useState(localStorage.getItem(IS_LOGIN))

  useEffect(() => {
    setUserStatus(localStorage.getItem(IS_LOGIN))
  }, [userStatus])
  
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <div className={userStatus === 'ADMIN' || userStatus === 'STAFF' ? 'd-none' : ''}>
        <CartDropdown />
      </div>

      <UserDropdown />
    </ul>)
}
export default NavbarUser
