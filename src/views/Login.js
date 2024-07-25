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
import { useState } from "react"
import { HOME_PATH } from "@src/router/routes/route-constant"
import { IS_LOGIN, USER_LOGIN_DETAILS } from "@src/router/RouteConstant"
import { validateLoginDetails } from "@src/utility/validation"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import { loginExistingClient } from "@src/services/user"
import toast from "react-hot-toast"

const Login = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "", password: ""
  })

  const createLoginUser = form => {
    return {
      username: form.username ?? null, password: form.password ?? null
    }
  }

  const onTextChange = async (event) => {
    await setForm(prev => ({
      ...prev, [event.target.name]: event.target.value
    }))
  }


  const apiHandler = () => {
    if (validateLoginDetails(form)) {
      setLoading(true)
      loginExistingClient(createLoginUser(form))
        .then(response => {
          console.log("------------------->", response)
          if (response.data) {
            console.log("**********************>>>>>", response.data)
            const userData = {
              user_id: response.data.id, username: response.data.username, email: response.data.email
            }
            localStorage.setItem(IS_LOGIN, "USER")
            localStorage.setItem(USER_LOGIN_DETAILS, JSON.stringify(userData))
            navigate(HOME_PATH)
            toast.success(response.message)
          } else {
            toast.error(response.message)
          }

        })
        .catch(error => {
          console.error("API Request Error:", error.message)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (<>
      {loading === true ? (<SpinnerComponent />) : (<div className="auth-wrapper auth-cover">
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
              <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
                <div className={"text-center"}>
                  <img src={Assets.logo} alt={"log_img"} width={100} />
                </div>

                <CardTitle tag="h2" className="fw-bold mb-1">
                  Welcome to Spicy Meals!
                </CardTitle>
                <CardText className="mb-2">
                  Please sign-in to your account and start the adventure
                </CardText>
                <Form
                  className="auth-login-form mt-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="mb-1">
                    <Label className="form-label" for="login-email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="emailAddress"
                      placeholder="john@example.com"
                      name="username"
                      autoFocus
                      onChange={onTextChange}
                    />
                  </div>
                  <div className="mb-2 mt-2">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label" for="login-password">
                        Password
                      </Label>
                      <Link to="/forgot-password">
                        <small className={"text-warning fw-bold"}>Forgot Password?</small>
                      </Link>
                    </div>
                    <InputPasswordToggle
                      className="input-group-merge"
                      id="password"
                      name="password"
                      onChange={onTextChange}
                    />
                  </div>
                  <div className="form-check text-warning mb-1">
                    <Input type="checkbox" id="remember-me" />
                    <Label className="form-check-label " for="remember-me">
                      Remember Me
                    </Label>
                  </div>
                  <hr className={"mt-1 mb-1"} />
                  <Button
                    color={"warning"}
                    className={"signIn_btn mb-1"}
                    block
                    onClick={apiHandler}
                  >
                    Sign in
                  </Button>
                </Form>
                <p className="text-center mt-2">
                  <span className="me-25">New on our platform?</span>
                  <Link to="/register">
                    <span className={"text-warning fw-bold"}>Create an account</span>
                  </Link>
                </p>

              </Col>
            </Col>
          </Row>
        </div>)}
    </>)
}

export default Login
