import ApiService from "@src/services/apiService";

export async function addNewUser(userDetails) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = "admin/register"
  apiObject.multipart = true
  apiObject.urlencoded = false
  apiObject.body = userDetails
  return await ApiService.callApi(apiObject)
}
export async function findUserById(userDetails) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = `admin/user`
  apiObject.multipart = true
  apiObject.urlencoded = false
  apiObject.body = userDetails
  return await ApiService.callApi(apiObject)
}

export async function getAllAdinUsers() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `admin`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)

}
export async function getAllCustomers() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `user`
  apiObject.multipart = false
  apiObject.urlencoded = false
  return await ApiService.callApi(apiObject)
}