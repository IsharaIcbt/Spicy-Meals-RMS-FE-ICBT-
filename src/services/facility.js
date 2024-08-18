import ApiService from "@src/services/apiService";

export async function getAllFacilities() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `facility`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}

export async function addNewFacility(userDetails) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = "facility/save"
  apiObject.multipart = true
  apiObject.urlencoded = false
  apiObject.body = userDetails
  return await ApiService.callApi(apiObject)
}

export async function findFacilityById(id) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `facility/${id}`
  apiObject.isBasicAuth = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}