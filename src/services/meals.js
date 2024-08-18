import ApiService from "@src/services/apiService"

export async function getAllMeals() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `meal`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}

export async function addNewMeal(mealDetails) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = "meal/product"
  apiObject.multipart = true
  apiObject.urlencoded = false
  apiObject.body = mealDetails
  return await ApiService.callApi(apiObject)
}

export async function findMealById(id) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `meal/product/${id}`
  apiObject.isBasicAuth = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}
