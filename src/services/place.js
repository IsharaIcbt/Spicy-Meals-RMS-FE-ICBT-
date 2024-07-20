import ApiService from "@src/services/apiService"

export async function addNewPlace(placeDetails) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = "createPlace"
  apiObject.multipart = true
  apiObject.urlencoded = false
  apiObject.body = placeDetails
  return await ApiService.callApi(apiObject)
}

export async function getAllPlaces() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = "placesWithComments"
  apiObject.isBasicAuth = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}


export async function getPlaceByPlaceId(placeId) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `placesWithComments/${placeId}`
  apiObject.isBasicAuth = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}

export async function updateRateScoreInPlaceWithFeedback(placeId) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = `places/scoreAndUpdate/${placeId}`
  apiObject.isBasicAuth = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}

export async function searchPlaceByTypeText(searchText) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `placesWithComments/search/${searchText}`
  apiObject.isBasicAuth = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}

export async function searchPlaceByTag_Min_Max(placeDetails) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = `places/getByPlace`
  apiObject.isBasicAuth = false
  apiObject.urlencoded = false
  apiObject.multipart = true
  apiObject.body = placeDetails
  return await ApiService.callApi(apiObject)
}