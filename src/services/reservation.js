import ApiService from "@src/services/apiService"

export async function addNewReservation(userDetails) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = "reservation/table"
  apiObject.multipart = false
  apiObject.urlencoded = false
  apiObject.body = userDetails
  return await ApiService.callApi(apiObject)
}

export async function addNewMealOrder(userDetails) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = "reservation/meal"
  apiObject.multipart = false
  apiObject.urlencoded = false
  apiObject.body = userDetails
  return await ApiService.callApi(apiObject)
}


export async function getAllReservationsForStaff() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `reservation/TABLE`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}

export async function getAllOrdersForStaff() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `reservation/MEAL`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}

export async function submitQueryForReservation(userDetails) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = `reservation/query`
  apiObject.multipart = false
  apiObject.urlencoded = false
  apiObject.body = userDetails
  return await ApiService.callApi(apiObject)
}

export async function getSpecificQueries(id) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `reservation/TABLE/${id}`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}
export async function getSpecificQueriesForOrder(id) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `reservation/MEAL/${id}`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}
export async function sendBackOrderId(id) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = `reservation/payment/order/session/MEAL/${id}`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}
export async function updateOperationStatusForReservation(userDetails) {
  const apiObject = {}
  apiObject.method = "PATCH"
  apiObject.authentication = false
  apiObject.endpoint = `reservation/${userDetails.orderId}`
  apiObject.multipart = false
  apiObject.urlencoded = false
  apiObject.body = userDetails
  return await ApiService.callApi(apiObject)
}
