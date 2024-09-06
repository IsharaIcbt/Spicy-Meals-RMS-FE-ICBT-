import React, { useState } from "react"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import { Button, Card, CardBody, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import { PlusCircle } from "react-feather"
import Select from "react-select"
import { validateRestaurantDetails } from "@src/utility/validation"
import toast from "react-hot-toast"
import RestaurantTable from "@src/views/adminPanel/restaurant/restaurantTable/restaurantTable"
import { addNewRestaurant, findRestaurantById } from "@src/services/restaurants"


const statusOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" }
]
function Restaurant() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [form, setForm] = useState({
    id:0,
    name: "",
    email: "",
    phone: "",
    address: "",
    branchCode: "",
    status: null
  })

  console.log("form data ========> ", form)

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
      email: "",
      phone: "",
      address: "",
      branchCode: "",
      status: null
    })
  }

  const createNewRestaurant = (form) => ({
    id:form.id ?? null,
    name: form.name ?? null,
    email: form.email ?? null,
    phone: form.phone ?? null,
    address: form.address ?? null,
    branchCode: form.branchCode ?? null,
    status: form.status?.value ?? null
  })

  const apiHandler = () => {
    if (validateRestaurantDetails(form)) {
      setLoading(true)
      addNewRestaurant(createNewRestaurant(form))
        .then((response) => {
          if (response.success) {
            toast.success(response.message)
            clearForm()
            setShow(false)
            //navigate(PLACES_PATH)
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
    findRestaurantById(byId)
      .then(response => {
        if (response.success) {
          const res = response.data
          setForm({
            id:res.id,
            name:res.name,
            email:res.email,
            phone:res.phone,
            address: res.address,
            branchCode: res.branchCode,
            status: statusOptions.find(option => option.value === res.status)
          })
        } else {
          toast.error("Something went wrong !!")
        }
      }).finally(
      setLoading(false)
    )
  }


  const mealModal = (
    <Modal isOpen={show} toggle={() => {
      setShow(!show)
      clearForm()
    }} className="modal-dialog-centered modal-md modal-danger">
      <ModalHeader className={'text-info'} toggle={() => {
        clearForm()
        setShow(!show)
    
      }}> {isEdit ? "Update Restaurant" : "Create Restaurant"}</ModalHeader>
      <ModalBody>
        <Card>
          <CardBody className="py-2 my-25">
            <Form className="mt-2 pt-50">
              <Row>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="name">
                    Restaurant Name
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
                    Restaurant Email
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
                    type={"text"}
                    name="phone"
                    value={form.phone}
                    placeholder="Enter Phone Number"
                    onChange={onTextChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="address">
                    Address
                  </Label>
                  <Input
                    id="address"
                    type={"text"}
                    name="address"
                    value={form.address}
                    placeholder="Enter Address"
                    onChange={onTextChange}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="branchCode">
                    Branch Code
                  </Label>
                  <Input
                    id="branchCode"
                    type={"text"}
                    name="branchCode"
                    value={form.branchCode}
                    placeholder="Enter Branch Code"
                    onChange={onTextChange}
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
              <Breadcrumbs title='Restaurants' data={[{ title: 'Admin' }, { title: 'restaurant' }]} />
            </Col>
            <Col md={6} className={'d-flex justify-content-end align-items-center'}>
              <Button className='width-32-per mt-1 me-2'
                      color={'warning'}
                      onClick={handleAddMealClick}
              >

                <PlusCircle size={18} /> <span > Add Restaurant</span>
              </Button>
            </Col>
          </Row>

          <Row className={'mt-3'}>
            <RestaurantTable onEdit={handleEditClick} /> {/* Pass handleEditClick */}
            {mealModal} {/*model calling place*/}
          </Row>
        </div>)}
    </>
  )
}

export default Restaurant
