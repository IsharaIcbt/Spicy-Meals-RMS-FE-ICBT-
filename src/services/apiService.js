import axios from './axiosConfig'
import apiConfig from './apiConfig'
import * as constant from '../router/RouteConstant' // Update the correct path for your constant file
import * as commonFunc from "../utility/commonFun"
import * as authService from './auth'
import * as qs from 'qs'
import { errorSweetAlert } from '../component/alert/sweet-alert'


 async function callApi(apiObject) {
   console.log("api object", apiObject)

  let body = {}
  let headers
  const method = apiObject.method ? apiObject.method.toLowerCase() : 'get'

  if (method === 'post' || method === 'put' || method === 'patch') {
    body = apiObject.body ? apiObject.body : {}
  }

   headers = {
     'Content-Type': apiObject.urlencoded ? 'application/x-www-form-urlencoded' : apiObject.multipart ? 'multipart/form-data' : 'application/json'
   }

  if (apiObject.authentication) {
    headers.Authorization = `Bearer ${localStorage.getItem(
      constant.ACCESS_TOKEN
    )}`
  }

  if (apiObject.isBasicAuth) {
    headers.Authorization = `Basic ${constant.BASIC_AUTH}`
  }

  /* localStorage.setItem(constant.ACCESS_TOKEN,)*/

  const serverUrl = apiConfig.serverUrl
  let basePath = apiConfig.basePath

  if (apiObject.basePath) {
    basePath = apiObject.basePath
  }

  const url = `${serverUrl}/${basePath}/${apiObject.endpoint}`
  let result

   console.log('headers', headers)

  await  axios[method](url, method !== 'get' && method !== 'delete' ? body : {headers}, {headers}).then(async response => {
    result = {
      ...response.data,
      desc: response.data.desc ? response.data.desc : response.data.result,
      status: response && response.status ? response.status : 0
    }
  }).catch(async error => {
    if (!error.response) {
      result = {
        success: false,
        status: 2,
        message: 'Your connection was interrupted',
        data: null
      }
    } else if (error.response.status === 401) {
     /* console.log('1', error.response.data);
      console.log('2', error.response.data.message);
      console.log(apiObject.type);*/

      if (apiObject.type === 'RENEW_TOKEN') {
        result = {
          success: false,
          status: 2,
          message: 'Your session expired! Please login again..',
          data: null
        }
      } else if (apiObject.type === 'AUTH') {
        result = {
          success: false,
          status: 0,
          message: error.response.data.message,
          data: null
        }
      } else {
        result = await renewTokenHandler(apiObject)
      }
    } else if (error.response.status === 403) {
      result = {
        success: false,
        status: 2,
        message: 'Access is denied.',
        data: null
      }
    } else if (error.response.status === 417) {
      result = {
        success: false,
        status: 2,
        message: 'Oops! Something went wrong.',
        data: null
      }
    } else if (error.response.data !== undefined) {
      result = {
        success: false,
        status: 0,
        message: error.response.data.result ? error.response.data.result : 'Sorry, something went wrong',
        data: null
      }
    } else {
      result = {
        success: false,
        status: 2,
        message: 'Sorry, something went wrong.',
        data: null
      }
    }
  })

  return result
}

export const renewTokenHandler = async (apiObject) => {
  let result

  try {
    const response = await authService.renewToken(qs.stringify({
      refresh_token: localStorage.getItem(constant.REFRESH_TOKEN),
      grant_type: 'refresh_token'
    }))

    if (response.access_token) {
      localStorage.setItem(constant.ACCESS_TOKEN, response.access_token)
      localStorage.setItem(constant.REFRESH_TOKEN, response.refresh_token)
      result = await callApi(apiObject)
    } else {
      result = response
      errorSweetAlert(
        response.message,
        '',
        'Login',
        () => {
          commonFunc.removeCookiesValues() // Update with your function to remove cookies or local storage data
          window.location = `${constant.ROUTE_PATH}${constant.LOGIN_PATH}`
        }
      )
    }
  } catch (error) {
    //navigate login
    console.error(error)
  }

  return result
}

export default { callApi }
