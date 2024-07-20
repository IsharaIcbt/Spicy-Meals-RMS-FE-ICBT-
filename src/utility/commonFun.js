import Cookies from "js-cookie";
import * as constants from "../router/RouteConstant";
import React, { Fragment } from "react";

export const removeCookiesValues = async () => {
  //localstorage remove data
  await Cookies.remove(constants.ACCESS_TOKEN);
  await Cookies.remove(constants.REFRESH_TOKEN);

}

