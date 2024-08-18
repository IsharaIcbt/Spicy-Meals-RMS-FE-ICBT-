import Cookies from "js-cookie"
import * as constants from "../router/RouteConstant"
import React, { Fragment } from "react"

export const removeCookiesValues = async () => {
  //localstorage remove data
  await Cookies.remove(constants.ACCESS_TOKEN)
  await Cookies.remove(constants.REFRESH_TOKEN)
  await Cookies.remove(constants.USER_OBJECT)
  await Cookies.remove(constants.IS_LOGIN)
}
export const removeLocalStorageValues =  () => {
  //localstorage remove data

  localStorage.removeItem(constants.ACCESS_TOKEN)
  localStorage.removeItem(constants.REFRESH_TOKEN)
  localStorage.removeItem(constants.USER_OBJECT)
  localStorage.removeItem(constants.IS_LOGIN)
}

