import ApiService from './apiService'
import qs from "qs"


export async function renewToken(token) {
    const apiObject = {}
    apiObject.method = 'POST'
    apiObject.authentication = false
    apiObject.isBasicAuth = true
    apiObject.urlencoded = true
    apiObject.endpoint = 'oauth/token'
    apiObject.body = token
    apiObject.type = "RENEW_TOKEN"
    return await ApiService.callApi(apiObject)
}

export async function loginUser(userCredentials) {
    const apiObject = {}
    apiObject.method = 'POST'
    apiObject.authentication = false
    apiObject.endpoint = 'oauth/token'
    apiObject.isBasicAuth = true
    apiObject.urlencoded = true
    apiObject.body = qs.stringify(userCredentials)
    apiObject.type = "AUTH"
    return await ApiService.callApi(apiObject)
}