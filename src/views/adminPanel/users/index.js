import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import UsersTable from "@src/views/adminPanel/users/userTable/userTable"
import Select from "react-select"
import { Assets } from "@src/assets/images"
import { createUser, validateUserProfile } from "@src/utility/validation"
import toast from "react-hot-toast"
import { addNewUser, findUserById } from "@src/services/userManage"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import Breadcrumbs from "@components/breadcrumbs"
import { UserPlus } from "react-feather"
import { getAllRestaurantsIds } from "@src/services/restaurants";


const rolesOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "STAFF", label: "Staff" }
]

const statusOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" }
]

export const data = {
  avatar: Assets.avater
}
function Index() {
  // ** States
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [enableRestaurant, setEnableRestaurant] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [restaurantsOptions, setRestaurantsOptions] = useState([])

  const [form, setForm] = useState({
    id:null,
    employeeId:null,
    name:"",
    email: "",
    password: "",
    nic: "",
    phoneNumber: "",
    homeAddress: "",
    role: null,
    status: null,
    restaurantId:null
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

  /** handle api request */
  const apiHandler =  () => {
    if (validateUserProfile(form)) {
      setLoading(true)
      addNewUser(createUser(form))
        .then(response => {
          setLoading(false)
          // eslint-disable-next-line no-use-before-define
          clearForm()
          if (response.success) {
            toast.success("Successfully saved User account...")
          } else {
            toast.error("Something went wrong, email settings not saved")
          }
        }).finally(
          setShow(false)
      )
    }
  }

  /** on text change common function */
  const onTextChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  /** clear form data */
  function clearForm() {
    setForm({
      name:"",
      email: "",
      password: "",
      nic: "",
      phoneNumber: "",
      homeAddress: "",
      role: null,
      status: null }
    )
  }

  /** handle Add user model*/
  const handleAddUserModal = () => {
    setIsEdit(false)  // Ensure it's in save mode
    setShow(true)
  }


  /** user role onchange function*/
  const handleUserRoleChange = (selectedOption) => {
    setForm((prev) => ({
      ...prev,
      role: selectedOption,
      id:0,
      employeeId: selectedOption.value === "STAFF" ? 0 : null
    }))

    if (selectedOption.value === "STAFF") {
      setEnableRestaurant(true)
    } else {
      setEnableRestaurant(false)
    }
  }

  const handleRestaurantIdChange = (selectedOption) => {
    setForm((prev) => ({
      ...prev,
      restaurantId: selectedOption
    }))

  }

  /** user status onchange function*/
  const handleUserStatusChange = (selectedOption) => {
    setForm((prev) => ({
      ...prev,
      status: selectedOption
    }))
  }

  const handleEditClick = (email) => {
    setIsEdit(true) // Set to edit mode
    setShow(true)
    setLoading(true) // Indicate loading while fetching user data
     findUserById({email})
        .then(response => {
          if (response.success) {
            const res = response.data

            setForm({
              id:res.id,
              employeeId:res.role === "STAFF" ? res.employeeId : null,
              name:res.name,
              email: res.email,
              password: res.tempPassword,
              nic: res.nic,
              phoneNumber: res.phoneNumber,
              homeAddress: res.homeAddress,
              role:  res.userRole ? res.userRole === "ADMIN" ? rolesOptions[0] : rolesOptions[1] : null,
              status:  res.status ? res.status === "ACTIVE" ? statusOptions[0] : statusOptions[1] : null,
              restaurantId: res.userRole === "STAFF" ? restaurantsOptions.find(
                opt => opt.value === res.restaurantId) : null
            })
            // Set enableRestaurant based on role
            setEnableRestaurant(res.userRole === "STAFF")
          } else {
            toast.error("Something went wrong !!")
          }
        }).finally(
          setLoading(false)
     )
    }


  const userModal =  <Modal isOpen={show} toggle={() => {
    setShow(!show)
    clearForm()
  } } className="modal-dialog-centered modal-md ">
    <ModalHeader toggle={() => {
      clearForm()
      setShow(!show)
}}>{isEdit ? 'Update User Account' : 'Create New User Account'}</ModalHeader>
    <ModalBody>
      <Card>

        <CardBody className="py-2 my-25">
          <div className="d-flex justify-content-center">
            <div className="me-25">
              <img className="rounded me-50 " src={data.avatar} alt="Generic placeholder image" height="75"
                   width="75" />
            </div>
          </div>
          <Form className="mt-2 pt-50">
            <Row>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="role">
                  User Role
                </Label>
                <Select
                  id="role"
                  value={form.role}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={null}
                  options={rolesOptions}
                  isClearable={false}
                  onChange={handleUserRoleChange}
                />
              </Col>

              {/* eslint-disable-next-line no-mixed-operators */}
              {enableRestaurant  && (
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="restaurantId">
                    Select Restaurant
                  </Label>
                  <Select
                    id="restaurantId"
                    value={form.restaurantId}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder={'Select Restaurant'}
                    defaultValue={null}
                    options={restaurantsOptions}
                    isClearable={false}
                    onChange={handleRestaurantIdChange}
                  />
                </Col>
              )}
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="name">
                  User Name
                </Label>
                <Input
                  id='name'
                  type={'text'}
                  name={'name'}
                  value={form.name}
                  placeholder='John perera'
                  onChange={onTextChange}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="email">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Email"
                  onChange={onTextChange}
                  disabled={isEdit}  // Disable email field when editing
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type={"password"}
                  name="password"
                  value={form.password}
                  placeholder="********"
                  onChange={onTextChange}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="nic">
                  Nic Number
                </Label>
                <Input
                  id="nic"
                  type={"text"}
                  name="nic"
                  value={form.nic}
                  placeholder="970060402v"
                  onChange={onTextChange}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="phoneNumber">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type={'number'}
                  name="phoneNumber"
                  value={form.phoneNumber}
                  placeholder="1 234 567 8900"
                  onChange={onTextChange}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="homeAddress">
                  Address
                </Label>
                <Input
                  id="homeAddress"
                  type={"text"}
                  name="homeAddress"
                  value={form.homeAddress}
                  placeholder="12, Business Park"
                  onChange={onTextChange}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="status">
                  User Status
                </Label>
                <Select
                  id="status"
                  value={form.status}
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={null}
                  options={statusOptions}
                  isClearable={false}
                  onChange={handleUserStatusChange}
                />
              </Col>
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
            </Row>
          </Form>
        </CardBody>
      </Card>
    </ModalBody>
  </Modal>

  return (
    <>
      {loading === true ? (
        <SpinnerComponent />
        ) : (
        <div>
        <Row className="d-flex ">
          <Col md={6} cla>
            <Breadcrumbs title='Manage Users ' data={[{ title: 'Admin' }, { title: 'users' }]} />
          </Col>
          <Col md={6} className={'d-flex justify-content-end align-items-center'}>
            <Button className='width-30-per mt-1 me-2'
                    color={'warning'}
                    onClick={handleAddUserModal}
            >
              <UserPlus size={18}/> <span className={'fs-5'}> Add New User</span>
            </Button>
          </Col>
        </Row>

        <Row className={'mt-3'}>
          <UsersTable onEdit={handleEditClick} /> {/* Pass handleEditClick */}
          {userModal}
        </Row>
      </div>)}
    </>
  )
}

export default Index
