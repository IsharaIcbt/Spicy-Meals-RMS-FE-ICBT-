import React, { useEffect, useState } from "react"
import { validateReservation } from "@src/utility/validation"
import { getAllRestaurantsIds } from "@src/services/restaurants"
import toast from "react-hot-toast"
import { Button, Card, CardBody, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import Select from "react-select"
import { Assets } from "@src/assets/images"
import PickerDefault from "@components/picker/PickerDefault"
import { addNewReservation } from "@src/services/reservation"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import MyProfile from "@src/views/customerDashboard/myProfile"
import { useNavigate } from "react-router-dom"
import { ALL_RESERVATIONS_PATH, MY_PROFILE_PATH } from "@src/router/routes/route-constant"

const reservationTypeOptions = [
  { value: "FAMILY_DINING", label: "Family Dining" },
  { value: "STREET_DINING", label: "Street Dining" },
  { value: "PARTIES_AND_CELEBRATION", label: "Parties & Celebration" },
  { value: "BYOB", label: "BYOB" }
]

function ReservationForm() {
  const [loading, setLoading] = useState(false)
  const [restaurantsOptions, setRestaurantsOptions] = useState([])
  const [show, setShow] = useState(true)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    restaurantId:null,
    name: "",
    email: "",
    phone: "",
    date: new Date(),
    reservationType: null,
    seats: 0,
    note:""
  })

  console.log("form data ========> ", form)

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

  const onTextChange = (event) => {
    const { name, value } = event.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDateChange = (newDate) => {
    setForm(prev => ({
      ...prev,
      date: newDate
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
      restaurantId:null,
      name: "",
      email: "",
      phone: "",
      date: new Date(),
      reservationType: null,
      seats: 0,
      note:""
    })
  }

  const createNewRestaurant = (form) => ({
    restaurantId: form.restaurantId?.value ?? null,
    name: form.name ?? null,
    email: form.email ?? null,
    phone: form.phone ?? null,
    date: form.date ?? null,
    reservationType: form.reservationType?.value ?? null,
    seats: form.seats ?? null,
    note: form.note ?? null
  })

  const apiHandler = () => {
    if (validateReservation(form)) {
      setLoading(true)
      addNewReservation(createNewRestaurant(form))
        .then((response) => {
          if (response.id) {
            toast.success("Your reservation has been successfully submitted!")
            clearForm()
            navigate(ALL_RESERVATIONS_PATH)
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
  const reservationModal = (
    <Modal  isOpen={show} toggle={() => { /*scrollable*/
      setShow(!show)
      clearForm()
      navigate(MY_PROFILE_PATH)
    }} className="modal-dialog-centered modal-lg bg-transparent ">
      <ModalHeader className={'text-info'} toggle={() => {
        clearForm()
        setShow(!show)
        navigate(MY_PROFILE_PATH)
      }}> Make New Reservation</ModalHeader>
      <ModalBody>
      <Card className={'mb-2'}>
        <div className={"text-center mt-1"}>
          <img src={Assets.logo} alt={"image"} width={100} />
          <h1 className={""} style={{ fontSize: "30px", fontWeight:'600' }}>Make a Reservation</h1>
          <h6>GOT A PROBLEM BOOKING? PLEASE CONTACT US ON</h6>
          <h6 className={'text-warning'}>isharaicbt@gmail.com | 0776127572</h6>
          <small>We’re here to answer any question you may have.</small>
          <hr className={"me-2 ms-2 text-light-emphasis"} />
        </div>
        <CardBody className="py-0 my-50">
          <Form className="pt-50">
            <Row>
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
                <Label className="form-label" for="name">
                  Your Name
                </Label>
                <Input
                  id="name"
                  type={"text"}
                  name="name"
                  value={form.name}
                  placeholder="Enter name"
                  onChange={onTextChange}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="email">
                  Your Email
                </Label>
                <Input
                  id="email"
                  type={"email"}
                  name="email"
                  value={form.email}
                  placeholder="Enter email"
                  onChange={onTextChange}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="phone">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type={"number"}
                  name="phone"
                  value={form.phone}
                  placeholder="Enter Phone Number"
                  onChange={onTextChange}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="date">
                  Date
                </Label>
                <PickerDefault
                  value={form.date ? new Date(form.date) : null}
                  onChange={handleDateChange}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="reservationType">
                  Reservation Type
                </Label>
                <Select
                  id="reservationType"
                  name="reservationType"
                  options={reservationTypeOptions}
                  className="react-select"
                  classNamePrefix="select"
                  value={form.reservationType}
                  onChange={onSelectChange}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label className="form-label" for="seats">
                  Seats
                </Label>
                <Input
                  id="seats"
                  type={"number"}
                  name="seats"
                  value={form.seats}
                  placeholder="Enter Seats Count"
                  onChange={onTextChange}
                />
              </Col>

              <Col sm="6" className="mb-1">
                <Label className="form-label" for="note">
                  Add Note
                </Label>
                <Input
                  id="note"
                  type={"textarea"}
                  name="note"
                  value={form.note}
                  placeholder="Enter some Note"
                  onChange={onTextChange}
                />
              </Col>
            </Row>
            <Col className="mt-1" sm="12">
              <Button type="button"
                      className="me-1"
                      color="primary"
                      onClick={apiHandler}
              >
                Submit Reservation
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
    <div>
      {loading === true ? (
        <SpinnerComponent />
      ) : (
        <div>
          <MyProfile/>
          {reservationModal}
        </div>
        )}
    </div>
  )
}

export default ReservationForm