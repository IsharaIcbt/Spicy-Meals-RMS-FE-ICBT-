import React, { useEffect, useState } from "react"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import { Button, Card, CardBody, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import { UserPlus } from "react-feather"
import MealTable from "@src/views/adminPanel/meals/mealTable/mealTable"
import { Assets } from "@src/assets/images"
import { USER_LOGIN_DETAILS } from "@src/router/RouteConstant"
import Select from "react-select"
import { validateMealsDetails } from "@src/utility/validation"
import toast from "react-hot-toast"
import { addNewMeal, findMealById } from "@src/services/meals"
import { getAllRestaurantsIds } from "@src/services/restaurants"

const statusOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" }
]

const mainCategoryOptions = [
  { value: "LUNCH", label: "Lunch" },
  { value: "DINNER", label: "Dinner" },
  { value: "BREAKFAST", label: "Breakfast" },
  { value: "TEA_TIME", label: "Tea-Time" }
]


const subCategoryOptions = [
  { value: "STARTERS_SOUP", label: "Starters & Soup" },
  { value: "SALAD", label: "Salad" },
  { value: "CHICKEN", label: "Chicken" },
  { value: "BIRIYANI", label: "Biryani" },
  { value: "BBQ", label: "BBQ" },
  { value: "INTERNATIONAL", label: "International" },
  { value: "SANDWICH", label: "Sandwich" },
  { value: "DESSERT", label: "Dessert" },
  { value: "EXTRA", label: "Extra" },
  { value: "FRESH_JUICE", label: "Fresh Juice" },
  { value: "TEA_COFFEE", label: "Tea & Coffee" }
]

const mealTypeOptions = [
  { value: "SRI_LANKAN", label: "Sri Lankan" },
  { value: "INDIAN", label: "Indian" },
  { value: "FRENCH", label: "French" },
  { value: "ITALIAN", label: "Italian" }
]

const ratingsOptions = [
  { value: 1, label:'1 Star'},
  { value: 2, label:'2 Star' },
  { value: 3, label:'3 Star'},
  { value: 4, label:'4 Star'},
  { value: 5, label:'5 Star'}
]
function Meals() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loggedUser, setLoggedUser] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [featuredImg, setFeaturedImg] = useState(Assets.emptyImg)
  const [restaurantsOptions, setRestaurantsOptions] = useState([])
  const [form, setForm] = useState({
    id:0,
    name: "",
    restaurantId: null,
    mainCategory: null,
    subCategory: null,
    mealType: null,
    price: 0,
    discount: 0,
    status: null,
    rating: null,
    description: "",
    img: null
  })

  useEffect(() => {
    fetchAllRestaurantsIds()
  }, [])

  const fetchAllRestaurantsIds = () => {
    getAllRestaurantsIds().then(async response => {

      const data = response.data.map((item, index) => ({
        ...item,
        uniqueKey: `${item.id}-${index}`
      }))
      await setRestaurantsOptions(data)
    })
  }

  useEffect(() => {
    // Fetch the logged-in user details from local storage
    const storedUserDetails = localStorage.getItem(USER_LOGIN_DETAILS)
    const user = storedUserDetails ? JSON.parse(storedUserDetails) : null
    setLoggedUser(user)

  }, [])

  const onChangeImg = (e) => {
    const reader = new FileReader()
    const files = e.target.files
    if (files.length > 0) {
      reader.onload = function() {
        setFeaturedImg(reader.result)
      }
      reader.readAsDataURL(files[0])
      setForm((prev) => ({
        ...prev,
        img: files[0] // Set the file in the form state
      }))
    }
  }

  const onTextChange = (event) => {
    const { name, value } = event.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onSelectChange = (selectedOption, actionMeta) => {
    setForm(prev => ({
      ...prev,
      [actionMeta.name]: selectedOption
    }))
  }

  const clearForm = () => {
    setForm({
      id:0,
      name: "",
      restaurantId: null,
      mainCategory: null,
      subCategory: null,
      mealType: null,
      price: 0,
      discount: 0,
      status: null,
      rating: null,
      description: "",
      img: null
    })
    setFeaturedImg(Assets.emptyImg)
  }

  const createNewMeal = (form) => ({
    id:form.id ?? null,
    restaurantId: form.restaurantId?.value ?? null,
    name: form.name ?? null,
    mainCategory: form.mainCategory?.value ?? null,
    subCategory: form.subCategory?.value ?? null,
    mealType: form.mealType?.value ?? null,
    price: form.price ?? 0,
    discount: form.discount ?? 0,
    status: form.status?.value ?? null,
    rating: form.rating?.value ?? null,
    description: form.description ?? "",
    img: form.img ?? null
  })

  const apiHandler = () => {
    if (validateMealsDetails(form, isEdit)) {
      setLoading(true)

      addNewMeal(createNewMeal(form))
        .then((response) => {
          if (response.success) {
            toast.success(response.message)
            clearForm()
            setShow(false)
          } else {
            toast.error(response.message)
          }
        })
        .catch((error) => {
          console.error("API Request Error:", error.message)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const handleAddMealClick = () => {
    setIsEdit(false)  // Ensure it's in save mode
    setShow(true)
    clearForm()
  }

  const handleEditClick = (byId) => {
    setShow(true)
    setLoading(true)
    setIsEdit(true) // Set to edit mode
    findMealById(byId)
      .then(response => {
        if (response.success) {
          const res = response.data
    setForm({
      id:res.id,
      restaurantId: restaurantsOptions.find(option => option.value === res.restaurantId),
      name:res.name,
      mainCategory: mainCategoryOptions.find(option => option.value === res.mainCategory),
      subCategory: subCategoryOptions.find(option => option.value === res.subCategory),
      mealType: mealTypeOptions.find(option => option.value === res.mealType),
      price:res.price,
      discount: res.discount,
      status: statusOptions.find(option => option.value === res.status),
      rating: ratingsOptions.find(option => option.value === res.rating),
      description:res.description,
      img: null
    })
          setFeaturedImg(res.img)
        } else {
          toast.error("Something went wrong !!")
          setFeaturedImg(Assets.emptyImg)
        }
      }).finally(
      setLoading(false)
    )

  }


  const mealModal = (
    <Modal isOpen={show} toggle={() => {
      setShow(!show)
      clearForm()
    }} className="modal-dialog-centered modal-lg modal-danger">
      <ModalHeader className={'text-info'} toggle={() => {
        clearForm()
        setShow(!show)
      }}> {isEdit ? "Update Meal Product" : "Create New Meal"}</ModalHeader>
      <ModalBody>
        <Card>
          <CardBody className="py-2 my-25">
            <Form className="mt-2 pt-50">
              <Row>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="meal-name">
                    Meal Name
                  </Label>
                  <Input
                    id="meal-name"
                    type={"text"}
                    name="name"
                    value={form.name}
                    placeholder="Enter meal name"
                    onChange={onTextChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="restaurant-id">
                    Restaurant
                  </Label>
                  <Select
                    id="restaurant-id"
                    name="restaurantId"
                    options={restaurantsOptions}
                    className="react-select"
                    classNamePrefix="select"
                    value={form.restaurantId}
                    onChange={onSelectChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="main-category">
                    Main Category
                  </Label>
                  <Select
                    id="main-category"
                    name="mainCategory"
                    options={mainCategoryOptions}
                    className="react-select"
                    classNamePrefix="select"
                    value={form.mainCategory}
                    onChange={onSelectChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="sub-category">
                    Sub Category
                  </Label>
                  <Select
                    id="sub-category"
                    name="subCategory"
                    options={subCategoryOptions}
                    className="react-select"
                    classNamePrefix="select"
                    value={form.subCategory}
                    onChange={onSelectChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="meal-type">
                    Meal Type
                  </Label>
                  <Select
                    id="meal-type"
                    name="mealType"
                    options={mealTypeOptions}
                    className="react-select"
                    classNamePrefix="select"
                    value={form.mealType}
                    onChange={onSelectChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="status">
                    Status
                  </Label>
                  <Select
                    id="status"
                    name="status"
                    options={statusOptions}
                    className="react-select"
                    classNamePrefix="select"
                    value={form.status}
                    onChange={onSelectChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="rating">
                    Rating
                  </Label>
                  <Select
                    id="rating"
                    name="rating"
                    options={ratingsOptions}
                    className="react-select"
                    classNamePrefix="select"
                    value={form.rating}
                    onChange={onSelectChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="price">
                    Price
                  </Label>
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    value={form.price}
                    placeholder="Enter price"
                    onChange={onTextChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="discount">
                    Discount
                  </Label>
                  <Input
                    type="number"
                    id="discount"
                    name="discount"
                    value={form.discount}
                    placeholder="Enter discount"
                    onChange={onTextChange}
                  />
                </Col>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="description">
                    Description
                  </Label>
                  <Input
                    type="textarea"
                    id="description"
                    name="description"
                    value={form.description}
                    placeholder="Enter description"
                    onChange={onTextChange}
                  />
                </Col>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="meal-image">
                    Meal Image
                  </Label>
                  <Input
                    type="file"
                    id="meal-image"
                    name="img"
                    onChange={onChangeImg}
                  />
                  <img className="rounded mt-1" src={featuredImg} alt="Meal" height="200" width="250" />
                </Col>
              </Row>
              <Col className="mt-2" sm="12">
                <Button type="button"
                        className="me-1"
                        color="primary"
                        onClick={apiHandler}
                >
                  Save Changes
                </Button>
                <Button color="secondary"
                        outline
                        type={"button"}
                        onClick={clearForm}
                >
                  Discard
                </Button>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  )

  return (
    <>
      {loading === true ? (
        <SpinnerComponent />
      ) : (
        <div>
          <Row className="d-flex ">
            <Col md={6} cla>
              <Breadcrumbs title='Manage Meals' data={[{ title: 'Admin' }, { title: 'meals' }]} />
            </Col>
            <Col md={6} className={'d-flex justify-content-end align-items-center'}>
              <Button className='width-30-per mt-1 me-2'
                      color={'warning'}
                      onClick={handleAddMealClick}
              >

                <UserPlus size={18}/> <span > Add New Meals</span>
              </Button>
            </Col>
          </Row>

          <Row className={'mt-3'}>
            <MealTable onEdit={handleEditClick} /> {/* Pass handleEditClick */}
            {mealModal} {/*model calling place*/}
          </Row>
        </div>)}
    </>
  )
}

export default Meals
