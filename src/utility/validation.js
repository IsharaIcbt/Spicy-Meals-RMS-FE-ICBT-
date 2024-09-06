import toast from "react-hot-toast"
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const PASSWORD_REGEX = /^.{3,}$/
export const NAME_REGEX = /^[A-z ]+$/
const OTP_REGEX = /^.{5,}$/
const MOBILE_REGEX = /^(0)[0-9]{9}$|^(07)[0-9]{8}$/
export const SEARCH_SPACE_REGEXP = /\s+/g
export const validateRegisterDetails = (state) => {
  if (state.name.trim() === "" || !NAME_REGEX.test(state.name)) {
    toast.error("Please enter a valid username")
    return false
  }
  if (state.email.trim() === "" || !EMAIL_REGEX.test(state.email)) {
    toast.error("Please enter a valid email address")
    return false
  }
  if (state.password.trim() === "" || !PASSWORD_REGEX.test(state.password)) {
    toast.error("Please enter a valid password")
    return false
  }
  if (state.nic.trim() === "") {
    toast.error("Please enter valid nic")
    return false
  }
  if (state.phoneNumber.trim() === "" || !MOBILE_REGEX.test(state.phoneNumber)) {
    toast.error("Please enter valid phone number")
    return false
  }
  if (state.homeAddress.trim() === "") {
    toast.error("Please enter valid address")
    return false
  }
  if (state.user_img === null) {
    toast.error("Please upload a valid image")
    return false
  }
  return true
}

export const validateLoginDetails = (state) => {
  if (state.username.trim() === "" || !EMAIL_REGEX.test(state.username)) {
    toast.error("Please enter valid email address")
    return false
  }
  if (state.password.trim() === "" || !PASSWORD_REGEX.test(state.password)) {
    toast.error("Please enter valid password")
    return false
  }
  return true
}



/* ********************************************************************************************* */
/** Validate user profile validations */
export const validateUserProfile = (state) => {
  if (!state.role || !state.role.value || state.role.value.trim() === "") {
    toast.error("Please enter valid user role")
    return false
  }

  if (state.role.value === 'STAFF' && (!state.restaurantId || !state.restaurantId.value || !state.restaurantId.value.toString().trim())) {
    toast.error("Please select a valid restaurant Id")
    return false
  }
  if (state.name.trim() === "" || !NAME_REGEX.test(state.name)) {
    toast.error("Please enter valid user name")
    return false
  }
  if (state.email.trim() === "" || !EMAIL_REGEX.test(state.email)) {
    toast.error("Please enter valid email address")
    return false
  }
  if (state.password.trim() === "" || !PASSWORD_REGEX.test(state.password)) {
    toast.error("Please enter valid password")
    return false
  }
  if (state.nic.trim() === "") {
    toast.error("Please enter valid nic")
    return false
  }
  if (state.phoneNumber.trim() === "" || !MOBILE_REGEX.test(state.phoneNumber)) {
    toast.error("Please enter valid phone number")
    return false
  }
  if (state.homeAddress.trim() === "") {
    toast.error("Please enter valid address")
    return false
  }
  if (!state.status || !state.status.value || state.status.value.trim() === "") {
    toast.error("Please enter valid user status")
    return false
  }
  return true
}

/** Check whether the data value exists or not */
export const createUser = form => {
  return {
    id:form.id ?? null,
    employeeId:form.employeeId ?? null,
    name: form.name ?? null,
    email: form.email ?? null,
    password: form.password ?? null,
    nic: form.nic ?? null,
    phoneNumber: form.phoneNumber ?? null,
    homeAddress: form.homeAddress ?? null,
    role: form.role?.value ?? null,
    status: form.status?.value ?? null,
    restaurantId: form.restaurantId?.value ?? null

  }
}
/* ********************************************************************************************* */

export const validateRestaurantDetails = (state) => {
  if (state.name.trim() === "") {
    toast.error("Please enter valid restaurant name")
    return false
  }
  if (state.email.trim() === "" || !EMAIL_REGEX.test(state.email)) {
    toast.error("Please enter valid email address")
    return false
  }
  if (state.phone.trim() === "" || !MOBILE_REGEX.test(state.phone)) {
    toast.error("Please enter valid phone number")
    return false
  }
  if (state.address.trim() === "") {
    toast.error("Please enter valid address")
    return false
  }
  if (state.branchCode.trim() === "") {
    toast.error("Please enter valid branch code")
    return false
  }
  if (!state.status || !state.status.value) {
    toast.error("Please select a valid status")
    return false
  }
  return true
}

export const validateMealsDetails = (state, isedit) => {
  if (state.name.trim() === "") {
    toast.error("Please enter a valid meal name")
    return false
  }

  if (!state.restaurantId || !state.restaurantId.value) {
    toast.error("Please select a valid restaurant")
    return false
  }

  if (!state.mainCategory || !state.mainCategory.value) {
    toast.error("Please select a valid main category")
    return false
  }

  if (!state.subCategory || !state.subCategory.value) {
    toast.error("Please select a valid sub-category")
    return false
  }

  if (!state.mealType || !state.mealType.value) {
    toast.error("Please select a valid meal type")
    return false
  }
  if (!state.status || !state.status.value) {
    toast.error("Please select a valid status")
    return false
  }
  if (!state.rating || !state.rating.value) {
    toast.error("Please select a valid rating")
    return false
  }

  if (!state.price || state.price < 0) {
    toast.error("Please enter a valid price")
    return false
  }

  if (state.description.trim() === "") {
    toast.error("Please enter a valid description")
    return false
  }
  // Conditionally validate img based on isEdit
  if (!isedit && state.img === null) {
    toast.error("Please provide a valid image")
    return false
  }
  return true
}


export const validateFacilityDetails = (form, isEdit) => {
  if (form.name.trim() === "") {
    toast.error("Please enter a valid facility name")
    return false
  }

  if (!form.restaurantId || form.restaurantId === 0) {
    toast.error("Please select a valid restaurant")
    return false
  }

  if (!form.facilityType) {
    toast.error("Please select a valid facility type")
    return false
  }

  if (!form.availability) {
    toast.error("Please select the availability status")
    return false
  }

  if (!form.frequency) {
    toast.error("Please select a valid frequency")
    return false
  }

  if (form.maxParticipantCount <= 0) {
    toast.error("Please enter a valid maximum participant count")
    return false
  }

  if (form.price < 0) {
    toast.error("Please enter a valid price")
    return false
  }

  if (form.discount < 0 || form.discount > 100) {
    toast.error("Please enter a valid discount percentage")
    return false
  }

  if (form.weekDays.trim() === "") {
    toast.error("Please enter valid week days")
    return false
  }

  if (form.start.trim() === "") {
    toast.error("Please select a valid start time")
    return false
  }

  if (form.close.trim() === "") {
    toast.error("Please select a valid close time")
    return false
  }

  if (form.description.trim() === "") {
    toast.error("Please enter a valid description")
    return false
  }

  if (!isEdit && !form.imgURL) {
    toast.error("Please upload a valid image")
    return false
  }

  return true
}

export const validateReservation = (state) => {
  if (!state.restaurantId || state.restaurantId === 0) {
    toast.error("Please select a valid restaurant")
    return false
  }

  if (state.name.trim() === "") {
    toast.error("Please enter valid  name")
    return false
  }

  if (state.email.trim() === "" || !EMAIL_REGEX.test(state.email)) {
    toast.error("Please enter valid email address")
    return false
  }

  if (state.phone.trim() === "" || !MOBILE_REGEX.test(state.phone)) {
    toast.error("Please enter valid phone number")
    return false
  }

  if (!state.reservationType || !state.reservationType.value) {
    toast.error("Please select a valid reservation Type")
    return false
  }

  const seats = parseInt(state.seats, 10)

  if (isNaN(seats) || seats <= 0 || seats > 100) {
    toast.error("Please enter a valid seats count between 1 and 100")
    return false
  }

  if (state.note.trim() === "") {
    toast.error("Please enter valid note")
    return false
  }
  return true
}

export const validateOrderDetails = (formData) => {
  // Check if items array exists and is not empty
  if (!formData.items || formData.items.length === 0) {
    toast.error("Order must contain at least one item.")
    return false
  }

  // Check if each item in the items array has valid id and qty
  for (const item of formData.items) {
    if (!item.id || isNaN(item.qty) || item.qty <= 0) {
      toast.error("Each item must have a valid ID and quantity greater than zero.")
      return false
    }
  }

  // Check if address object exists
  if (!formData.address) {
    toast.error("Address information is required.")
    return false
  }

  // Check if address fields are valid
  const { address, fullName, mobileNumber, restaurantId } = formData.address
  if (!address || address.trim() === "") {
    toast.error("Address is required.")
    return false
  }

  if (!fullName || fullName.trim() === "") {
    toast.error("Full name is required.")
    return false
  }

  if (!mobileNumber || !MOBILE_REGEX.test(mobileNumber)) { // Assuming a 10-digit mobile number
    toast.error("A valid mobile number is required.")
    return false
  }

  if (!restaurantId || isNaN(restaurantId)) {
    toast.error("A valid restaurant ID is required.")
    return false
  }

  // If all validations pass
  return true
}


export const validatePlaceSearchDetails = (state) => {
  if (state.tag.trim() === "") {
    toast.error("Please select valid category type")
    return false
  }
  if (!state.minscore) {
    toast.error("Please select valid Ratings range")
    return false
  }
  return true
}

export const isOnlyNumbersValidator = value => {
  return new RegExp('^[0-9]+$').test(value)
}
