import ApiService from "@src/services/apiService"

export async function getAllRestaurants() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `restaurant`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}

export async function getAllRestaurantsIds() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `restaurant/branch/ids`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}

export async function addNewRestaurant(userDetails) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = "restaurant"
  apiObject.multipart = false
  apiObject.urlencoded = false
  apiObject.body = userDetails
  return await ApiService.callApi(apiObject)
}

export async function findRestaurantById(id) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `restaurant/branch/${id}`
  apiObject.isBasicAuth = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}