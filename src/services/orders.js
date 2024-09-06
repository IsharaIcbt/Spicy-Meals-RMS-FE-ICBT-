import ApiService from "@src/services/apiService";

export async function getAllOrders(userId) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `reservation/order/MEAL/${userId}`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}

export async function getAllReservations(userId) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `reservation/order/TABLE/${userId}`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}
export async function getSpecificReservations(id) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `reservation/by-order/TABLE/${id}`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}

export async function getSpecificOrders(id) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `reservation/by-order/MEAL/${id}`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}