import React from "react"
import toast from "react-hot-toast"
import { useFormik } from "formik"
import { Button, CardText, CardTitle, Col, Form, Label, Row } from "reactstrap"
import source from "@src/assets/images/bg_img/cover_img.jpg"
import { Link, useNavigate } from "react-router-dom"
import InputPasswordToggle from "@components/input-password-toggle"
import './resetpassword.scss'
import { ChevronLeft } from "react-feather"
import logo from "@src/assets/images/logo/logo.png"
import { resetPassword } from "@src/services/auth"
import { LOGIN_PATH } from "@src/router/RouteConstant"
import { Assets } from "@src/assets/images";
function ResetPassword() {
  const navigate = useNavigate()

  const initialValues = {
    newPassword: '',
    confirmPassword: ''
  }

  const validate = (values) => {
    const errors = {}

    if (!values.newPassword) {
      errors.newPassword = 'New Password is empty, Check Again!!'
    } else if (values.newPassword.length < 8) {
      errors.newPassword = 'New Password must be at least 8 characters long'
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is empty, Check Again!!'
    } else if (values.newPassword.length < 8) {
      errors.newPassword = 'Confirm Password must be at least 8 characters long'
    }
    return errors
  }

  const onSubmit = async (values, { resetForm }) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        toast.error("Passwords do not match. Please check again.")
        return
      }
      const userCredentials = {
        password: values.newPassword,
        otp: localStorage.getItem("resetOTP"), // Get OTP from local storage
        email: localStorage.getItem("resetEmail") // Get email from local storage
      }

      const response = await resetPassword(userCredentials)

      if (response.success) {
        toast.success(response.message)
        navigate(LOGIN_PATH)
        localStorage.removeItem("resetEmail") // Clear the email from localStorage
        localStorage.removeItem("resetOTP") // Clear the otp from localStorage
        resetForm({ values: '' }) // Reset the form if needed
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  const HelperText = ({ error }) => {
    return error ? <span className="small text-danger">{error}</span> : null
  }

  return (
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
          <Col className="px-xl-2 mx-auto " sm="8" md="6" lg="12">
            <div className={"text-center"}>
              <img src={Assets.logo} alt={"log_img"} width={100} />
            </div>
            <CardTitle tag="h2" className="fw-bold mb-1 mt-1">
              Reset Password 🔒
            </CardTitle>
            <CardText>
              Your new password must be different from previously used passwords
            </CardText>
            <Form className="auth-login-form mt-1" onSubmit={formik.handleSubmit}>
              <div className="mb-1 mt-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="newPassword">
                    New Password
                  </Label>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <HelperText error={formik.touched.newPassword && formik.errors.newPassword} />
              </div>
              <div className="mb-1 mt-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="confirmPassword">
                    Confirm Password
                  </Label>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <HelperText error={formik.touched.confirmPassword && formik.errors.confirmPassword} />
              </div>

              <Button type="submit" className="button mt-3" block>
                Set New Password
              </Button>
            </Form>
            <p className='mt-2'>
              <Link to={LOGIN_PATH}>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ResetPassword