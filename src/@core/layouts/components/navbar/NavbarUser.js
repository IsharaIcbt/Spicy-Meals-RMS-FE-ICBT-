// ** Dropdowns Imports
import UserDropdown from "./UserDropdown"
import CartDropdown from "@layouts/components/navbar/CartDropdown"
import React from "react"

const NavbarUser = () => {
  return (<ul className="nav navbar-nav align-items-center ms-auto">
      <CartDropdown />
      <UserDropdown />
    </ul>)
}
export default NavbarUser
