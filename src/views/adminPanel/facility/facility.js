import React, { useEffect, useState } from "react"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import { Button, Card, CardBody, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import { PlusCircle } from "react-feather"
import { Assets } from "@src/assets/images"
import { USER_LOGIN_DETAILS } from "@src/router/RouteConstant"
import Select from "react-select"
import { getAllRestaurantsIds } from "@src/services/restaurants"
import PickerDefault from "@components/picker/PickerDefault"
import FacilityTable from "@src/views/adminPanel/facility/facilityTable/facilityTable"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { validateFacilityDetails } from "@src/utility/validation"
import toast from "react-hot-toast"
import { addNewFacility, findFacilityById } from "@src/services/facility";

const availabilityOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" }
]

const facilityTypeOptions = [
  { value: "EVENT", label: "Event" },
  { value: "SERVICE", label: "Service" }
]

const frequencyTypeOptions = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "YEARLY", label: "Yearly" }
]


function Facility() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loggedUser, setLoggedUser] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [featuredImg, setFeaturedImg] = useState(Assets.emptyImg)
  const [restaurantsOptions, setRestaurantsOptions] = useState([])
  const [form, setForm] = useState({
    id:0,
    restaurantId: 0,
    name: "",
    imgURL: null,
    description: "",
    frequency:null,
    reservedDate:new Date(),
    start: "",
    close: "",
    weekDays: "",
    maxParticipantCount:0,
    price: 0,
    discount: 0,
    facilityType:null,
    availability:null
  })

  console.log("form data => ", form)

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
        imgURL: files[0] // Set the file in the form state
      }))
    }
  }

  const handleReservedDateChange = (date) => {
    setForm(prev => ({
      ...prev,
      reservedDate: date
    }))
  }


  const clearForm = () => {
    setForm({
      id: 0,
      restaurantId: 0,
      name: "",
      imgURL: null,
      description: "",
      frequency: null,
      reservedDate: new Date(),
      start: "",
      close: "",
      weekDays: "",
      maxParticipantCount: 0,
      price: 0,
      discount: 0,
      facilityType: null,
      availability: null
    })
    setFeaturedImg(Assets.emptyImg)
  }

  const createNewFacility = (form) => ({
    id: form.id ?? null,
    restaurantId: form.restaurantId?.value ?? null,
    name: form.name ?? null,
    imgURL: form.imgURL ?? null,
    description: form.description ?? null,
    frequency: form.frequency?.value ?? null,
    reservedDate: form.reservedDate ?? null,
    start: form.start ?? null,
    close: form.close ?? null,
    weekDays: form.weekDays ?? null,
    maxParticipantCount: form.maxParticipantCount ?? 0,
    price: form.price ?? 0,
    discount: form.discount ?? 0,
    facilityType: form.facilityType?.value ?? null,
    availability: form.availability?.value ?? null
  })

  const apiHandler = () => {
    if (validateFacilityDetails(form, isEdit)) {
      setLoading(true)
      addNewFacility(createNewFacility(form))
        .then(response => {
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

  const handleAddFacilityClick = () => {
    setIsEdit(false)
    setShow(true)
    clearForm()
  }
  const handleEditClick = (byId) => {
    setIsEdit(true)
    setShow(true)
    setLoading(true)

    // Fetch the facility by ID and populate the form
    // Example:
    findFacilityById(byId)
      .then(response => {
        if (response.success) {
          const res = response.data
          setForm({
            id: res.id,
            restaurantId:restaurantsOptions.find(option => option.value === res.restaurantId),
            name: res.name,
            imgURL: null,
            description: res.description,
            frequency:frequencyTypeOptions.find(option => option.value === res.frequency),
            reservedDate: new Date(res.reservedDate),
            start: res.start,
            close: res.close,
            weekDays: res.weekDays,
            maxParticipantCount: res.maxParticipantCount,
            price: res.price,
            discount: res.discount,
            facilityType: facilityTypeOptions.find(option => option.value === res.facilityType),
            availability: availabilityOptions.find(option => option.value === res.availability)
          })
          setFeaturedImg(res.imgURL)
        } else {
          toast.error("Something went wrong!")
          setFeaturedImg(null)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }


  const facilityModal = (
    <Modal isOpen={show} toggle={() => {
      setShow(!show)
      clearForm()
    }} className="modal-dialog-centered modal-lg modal-danger">
      <ModalHeader className={'text-info'} toggle={() => {
        clearForm()
        setShow(!show)
      }}> {isEdit ? "Update Facility" : "Create New Facility"}</ModalHeader>
      <ModalBody>
        <Card>
          <CardBody className="py-2 my-25">
            <Form className="mt-2 pt-50">
              <Row>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="facility-name">
                    Facility Name
                  </Label>
                  <Input
                    id="facility-name"
                    type={"text"}
                    name="name"
                    value={form.name}
                    placeholder="Enter facility name"
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
                  <Label className="form-label" for="facility-type">
                    Facility Type
                  </Label>
                  <Select
                    id="facility-type"
                    name="facilityType"
                    options={facilityTypeOptions}
                    className="react-select"
                    classNamePrefix="select"
                    value={form.facilityType}
                    onChange={onSelectChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="availability">
                    Availability
                  </Label>
                  <Select
                    id="availability"
                    name="availability"
                    options={availabilityOptions}
                    className="react-select"
                    classNamePrefix="select"
                    value={ form.availability}
                    onChange={onSelectChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="frequency">
                    Frequency
                  </Label>
                  <Select
                    id="frequency"
                    name="frequency"
                    options={frequencyTypeOptions}
                    className="react-select"
                    classNamePrefix="select"
                    value={form.frequency}
                    onChange={onSelectChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="max-participant-count">
                    Max Participants
                  </Label>
                  <Input
                    id="max-participant-count"
                    type={"number"}
                    name="maxParticipantCount"
                    value={form.maxParticipantCount}
                    placeholder="Enter max participants"
                    onChange={onTextChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label required-lbl" for="reserved-date">
                    Reserved Date
                  </Label>
                  <PickerDefault
                    value={form.reservedDate ? new Date(form.reservedDate) : null}
                    onChange={handleReservedDateChange}
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
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="week-days">
                    Week Days
                  </Label>
                  <Input
                    id="week-days"
                    type={"text"}
                    name="weekDays"
                    value={form.weekDays}
                    placeholder="Enter week days"
                    onChange={onTextChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="start-time">
                    Start Time
                  </Label>
                  <Input
                    id="start-time"
                    type={"time"}
                    name="start"
                    value={form.start}
                    onChange={onTextChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="close-time">
                    Close Time
                  </Label>
                  <Input
                    id="close-time"
                    type={"time"}
                    name="close"
                    value={form.close}
                    onChange={onTextChange}
                  />
                </Col>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="description">
                    Description
                  </Label>
                  <Input
                    id="description"
                    type={"textarea"}
                    name="description"
                    value={form.description}
                    placeholder="Enter facility description"
                    onChange={onTextChange}
                  />
                </Col>
                <Col sm="12" className="mb-1">
                  <Label className="form-label" for="facility-img">
                    Facility Image
                  </Label>
                  <Input
                    id="facility-img"
                    type={"file"}
                    name="imgURL"
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
              <Breadcrumbs title='Facilities' data={[{ title: 'Admin' }, { title: 'Facilities' }]} />
            </Col>
            <Col md={6} className={'d-flex justify-content-end align-items-center'}>
              <Button className='width-36-per mt-1 me-2'
                      color={'warning'}
                      onClick={handleAddFacilityClick}
              >

                <PlusCircle size={18}/> <span > Add New Facility</span>
              </Button>
            </Col>
          </Row>

          <Row className={'mt-3'}>
            <FacilityTable onEdit={handleEditClick} /> {/* Pass handleEditClick */}
            {facilityModal} {/*model calling place*/}
          </Row>
        </div>)}
    </>
  )
}

export default Facility
