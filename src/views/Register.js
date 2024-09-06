import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, CardText, CardTitle, Col, Form, Input, Label, Row } from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import { validateRegisterDetails } from "@src/utility/validation"
import { createNewClient } from "@src/services/user"
import { LOGIN_PATH } from "@src/router/RouteConstant"
import toast from "react-hot-toast"
import "@styles/react/pages/page-authentication.scss"
import { Assets } from "@src/assets/images"

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(Assets.avater)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "", 
    password: "",
    nic: "",
    phoneNumber: "",
    homeAddress: "", 
    imgFile: null 
  })

  const createRegisterUser = form => {
    return {
      name: form.name ?? null,
      email: form.email ?? null,
      password: form.password ?? null,
      nic: form.nic ?? null,
      phoneNumber: form.phoneNumber ?? null,
      homeAddress: form.homeAddress ?? null,
      imgFile: form.imgFile ?? null
    }
  }

  const onTextChange = (event) => {
    const { name, value } = event.target
    setForm(prev => ({
      ...prev, [name]: value
    }))
  }

  const onChange = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      const reader = new FileReader()
      reader.onload = function() {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(files[0])

      // Update form state with the file
      setForm((prev) => ({ ...prev, imgFile: files[0] }))
    }
  }

  const handleImgReset = () => {
    setAvatar(null)
    setForm((prev) => ({ ...prev, imgFile: null }))
  }

  const apiHandler = () => {
    if (validateRegisterDetails(form)) {
      setLoading(true)
      createNewClient(createRegisterUser(form))
        .then((response) => {
          if (response.success) {
            navigate(LOGIN_PATH)
            toast.success(response.message)
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

  return (<>
      {loading ? (<SpinnerComponent />) : (<div className="auth-wrapper auth-cover">
          <Row className="auth-inner m-0 p-0">
            <Col className="d-none d-lg-flex align-items-center m-0 p-0" lg="7" sm="12">
              <div className="w-100 d-lg-flex align-items-center justify-content-center">
                <img
                  className="img-fluid"
                  style={{ width: "100%", height: "100vh", objectFit: "cover" }}
                  src={Assets.open_kitchen}
                  alt="Login Cover"
                />
              </div>
            </Col>
            <Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="5" sm="12">
              <Col className="px-xl-0 mx-auto" xs="12" sm="8" md="6" lg="12">
                <div className={"text-center"}>
                  <img src={Assets.logo} alt={"log_img"} width={100} />
                </div>
                <CardTitle tag="h2" className="fw-bold mb-1 text-center">
                  Adventure starts here 🚀
                </CardTitle>
                <hr className={"text-warning"} />
                <Form className="auth-register-form mt-2" onSubmit={(e) => e.preventDefault()}>
                  <Row>
                    <div className="d-flex mb-1">
                      <div className="me-25">
                        <img className="rounded me-50" src={avatar || Assets.placeholder} alt="Avatar" height="100"
                             width="100" />
                      </div>
                      <div className="d-flex align-items-end mt-75 ms-1">
                        <div>
                          <Button tag={Label} className="mb-75 me-75" size="sm" color="primary">
                            Upload
                            <Input type="file" onChange={onChange} hidden accept="image/*" />
                          </Button>
                          <Button className="mb-75" color="secondary" size="sm" outline onClick={handleImgReset}>
                            Reset
                          </Button>
                          <p className="mb-0">Allowed JPG, GIF or PNG. Max size of 800kB</p>
                        </div>
                      </div>
                    </div>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="name">Username</Label>
                      <Input
                        type="text"
                        id="register-username"
                        placeholder="johndoe"
                        name="name"
                        value={form.name}
                        autoFocus
                        onChange={onTextChange} />
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="register-email">Email</Label>
                      <Input
                        type="email"
                        id="register-email"
                        placeholder="john@example.com"
                        name="email"
                        value={form.email}
                        onChange={onTextChange} />
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="register-password">Password</Label>
                      <InputPasswordToggle
                        className="input-group-merge"
                        id="register-password"
                        name="password"
                        value={form.password}
                        onChange={onTextChange} />
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="register-nic">NIC</Label>
                      <Input
                        type="text"
                        id="register-nic"
                        placeholder="Enter NIC"
                        name="nic"
                        value={form.nic}
                        onChange={onTextChange} />
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="register-phoneNumber">Phone Number</Label>
                      <Input type="text" id="register-phoneNumber" placeholder="Enter Phone Number" name="phoneNumber"
                             value={form.phoneNumber} onChange={onTextChange} />
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="register-homeAddress">Home Address</Label>
                      <Input type="text" id="register-homeAddress" placeholder="Enter Home Address" name="homeAddress"
                             value={form.homeAddress} onChange={onTextChange} />
                    </Col>
                    <Button color="warning" block onClick={apiHandler}>
                      Sign up
                    </Button>
                  </Row>
                </Form>
                <p className="text-center mt-2">
                  <span className="me-25">Already have an account?</span>
                  <Link to="/login">
                    <span className={"text-warning fw-bold"}>Sign in instead</span>
                  </Link>
                </p>
              </Col>
            </Col>
          </Row>
        </div>)}
    </>)
}

export default Register
