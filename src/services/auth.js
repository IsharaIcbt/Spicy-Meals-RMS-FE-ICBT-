import ApiService from './apiService'


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

