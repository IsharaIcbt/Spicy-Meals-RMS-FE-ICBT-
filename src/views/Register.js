// ** React Imports
import { Link, useNavigate } from "react-router-dom"

// ** Icons Imports

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle"

// ** Reactstrap Imports
import { Button, CardText, CardTitle, Col, Form, Input, Label, Row } from "reactstrap"

// ** Styles
import "@styles/react/pages/page-authentication.scss"
import { Assets } from "@src/assets/images"
import React, { useState } from "react"
import { validateRegisterDetails } from "@src/utility/validation"
import { createNewClient } from "@src/services/user"
import { LOGIN_PATH } from "@src/router/RouteConstant"
import toast from "react-hot-toast"
import SpinnerComponent from "@components/spinner/Fallback-spinner"

const Register = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    user_img: null // Use only user_img property for the file
  })


  const createRegisterUser = form => {
    return {
      username: form.username ?? null,
      email: form.email ?? null,
      password: form.password ?? null,
      user_img: form.user_img ?? null
    }
  }


  console.log("register details ---> ", form)


  const onTextChange = async (event) => {
    await setForm(prev => ({
        ...prev,
        [event.target.name]: event.target.value
      })
    )
  }

  const apiHandler = () => {
    if (validateRegisterDetails(form)) {
      setLoading(true)

      createNewClient(createRegisterUser(form))
        .then((response) => {
          if (response.data) {
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


  return (
    <>
      {loading === true ? (
        <SpinnerComponent />
      ) : (
        <div className="auth-wrapper auth-cover">
          <Row className="auth-inner m-0">

            <Col className="d-none d-lg-flex align-items-center m-0 p-0" lg="8" sm="12">
              <div className="w-100 d-lg-flex align-items-center justify-content-center">
                <img className="img-fluid" style={{ width: "100%", height: "100vh", objectFit: "cover" }}
                     src={Assets.open_kitchen}
                     alt="Login Cover"
                />
              </div>
            </Col>
            <Col
              className="d-flex align-items-center auth-bg px-2 p-lg-5"
              lg="4"
              sm="12"
            >
              <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
                <div className={"text-center"}>
                  <img src={Assets.logo} alt={"log_img"} width={100} />
                </div>
                <CardTitle tag="h2" className="fw-bold mb-1">
                  Adventure starts here 🚀
                </CardTitle>
                <CardText className="mb-2">
                  Make your app management easy and fun!
                </CardText>
                <Form
                  className="auth-register-form mt-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="mb-1">
                    <Label className="form-label" for="register-username">
                      Username
                    </Label>
                    <Input
                      type="text"
                      id="register-username"
                      placeholder="johndoe"
                      name="username"
                      value={form.username}
                      autoFocus
                      onChange={onTextChange}
                    />
                  </div>
                  <div className="mb-1 mt-1">
                    <Label className="form-label" for="register-email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="register-email"
                      placeholder="john@example.com"
                      name="email"
                      value={form.email}
                      onChange={onTextChange}
                    />
                  </div>
                  <div className="mb-1 mt-1">
                    <Label className="form-label" for="register-password">
                      Password
                    </Label>
                    <InputPasswordToggle
                      className="input-group-merge"
                      id="register-password"
                      name="password"
                      value={form.password}
                      onChange={onTextChange}
                    />
                  </div>
                  <hr className={"mt-2 mb-1"} />
                  <Button
                    color="warning"
                    block
                    onClick={apiHandler}
                  >
                    Sign up
                  </Button>
                </Form>
                <p className="text-center mt-2">
                  <span className="me-25">Already have an account?</span>
                  <Link to="/login">
                    <span className={'text-warning fw-bold'}>Sign in instead</span>
                  </Link>
                </p>
              </Col>
            </Col>
          </Row>
        </div>
      )}
    </>

  )
}

export default Register
