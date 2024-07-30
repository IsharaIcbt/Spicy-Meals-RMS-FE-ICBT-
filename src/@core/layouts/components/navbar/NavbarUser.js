// ** Dropdowns Imports
import UserDropdown from "./UserDropdown"
import CartDropdown from "@layouts/components/navbar/CartDropdown"
import React from "react"

const NavbarUser = () => {
  return (<ul className="nav navbar-nav align-items-center ms-auto">
      <UserDropdown />
      <CartDropdown />
    </ul>)
}
export default NavbarUser
