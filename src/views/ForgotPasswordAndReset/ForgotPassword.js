// ** React Imports
import { Link, useNavigate } from "react-router-dom"

import "./resetpassword.scss"
// ** Icons Imports
import { ChevronLeft } from "react-feather"

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button, Modal, ModalHeader, ModalBody, Badge
} from "reactstrap"


// ** Styles
import "@styles/react/pages/page-authentication.scss"


import { useFormik } from "formik"
import toast from "react-hot-toast"
import logo from "@src/assets/images/logo/logo.png"
import React, { useEffect, useState } from "react"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import { forgotPassword, sendOTP } from "@src/services/auth"
import { LOGIN_PATH } from "@src/router/RouteConstant"
import { RESET_PASSWORD_PATH } from "@src/router/routes/route-constant";
import { Assets } from "@src/assets/images";


/** Forget Password */
const ForgotPassword = () => {

  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()
  const [otpModalVisible, setOtpModalVisible] = useState(false)
  const [count, setCount] = useState(120)
  const [resendLinkVisible, setResendLinkVisible] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const initialValues = {
    email: ''
  }
  const onSubmit = async (values, { resetForm }) => {
    const userEmail = {
      email: values.email
    }
    setLoading(true)
    try {
      const response = await forgotPassword(userEmail.email)
      setLoading(false)

      if (response.success) {
        setLoading(false)
        setOtpModalVisible(true) // Open the OTP modal
        startCountdown() // Start the countdown timer
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    } catch (e) {
      setLoading(false)
      toast.error("An error occurred. Please try again.")
    }
  }

  const validate = (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Invalid email'
      setEmailValid(false) // Email is not valid
    } else {
      setEmailValid(true) // Email is valid
    }
    return errors
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  const startCountdown = () => {
    let timerInterval
    setCount(120)
    // eslint-disable-next-line prefer-const
    timerInterval = setInterval(() => {
      if (count <= 0) {
        clearInterval(timerInterval)
      } else {
        setCount((prevCount) => prevCount - 1) // Decrement the count
      }
    }, 2000) // Decrease count every second
  }

  useEffect(() => { // Add useEffect to start countdown when modal is visible
    if (otpModalVisible) {
      startCountdown()
    }
  }, [otpModalVisible])

  const handleResendVerification = async () => {
    const userEmail = {
      email: formik.values.email
    }
    setLoading(true)

    try {
      const response = await forgotPassword(userEmail.email)
      setLoading(false)

      if (response.success) {
        toast.success(response.message)
        setResendLinkVisible(false)
        setCount(120) // Reset the countdown to 120 seconds
        startCountdown() // Start the countdown timer
      } else {
        toast.error(response.message)
      }
    } catch (e) {
      setLoading(false)
      toast.error("An error occurred. Please try again.")
    }
  }

  const handleModalKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Prevent the default behavior of Enter key
      handleOtpFromUser() // Call the function to submit OTP
    }
  }

  useEffect(() => {
    // Add useEffect to set the visibility of the "Resend Verification Email" link
    if (count === 0) {
      setResendLinkVisible(true)
    }
  }, [count])

  const handleOtpFromUser = async () => {
    const otpDetails = {
      email: formik.values.email,
      otp
    }
    setLoading(true)

    try {
      /** Call the sendOTP API */
      const otpResponse = await sendOTP(otpDetails)

      setLoading(false)


      if (otpResponse.success) {
        toast.success(otpResponse.message)

        localStorage.setItem("resetEmail", otpDetails.email) // Save the email to localStorage
        localStorage.setItem("resetOTP", otpDetails.otp) // Save the otp to localStorage

        setOtpModalVisible(false) // Close the OTP modal
        navigate(RESET_PASSWORD_PATH) // Redirect to reset password page
      } else {
        setOtpModalVisible(true)
        toast.error(otpResponse.message)
      }
    } catch (error) {
      setLoading(false)
      toast.error("An error occurred. Please try again.")
    }
  }


  /** My Creation User Roles Sign Up Form */
  const userOTPModal = (
    <Modal
      isOpen={otpModalVisible}
      className="modal-dialog-centered modal-sm modal_forget "
      onKeyDown={handleModalKeyPress}
    >
      <ModalHeader
        className="bg-transparent"
        style={{ color: "black" }}
        toggle={() => setOtpModalVisible(false)}
      ></ModalHeader>
      <ModalBody className="bg-white px-sm-5 mx-0 ">
        <div className="user_roles ">
          <Col className="px-xl-2  mx-0">
            <CardTitle tag="h2" className="fw-bold mb-1  text-center">
              <span className="fs-1">🔑</span>
              <br />
            </CardTitle>
            <CardText className="mb-1 text-center">
              <p className={"fw-bold"}>Please Enter Your Pin</p>
            </CardText>
            <Form className="auth-login-form">
              <div className="mb-1 mt-1">
                <Input
                  type="text"
                  id="login-otp"
                  placeholder="Enter Your Pin"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              {/* Display the "Resend Verification Email" link */}
              {resendLinkVisible ? (
                <div className="countdown-text text-center">
                  <hr/>
                  <a
                    className='cursor-pointer text-primary'
                    onClick={
                      handleResendVerification
                    }>
                    Resend Verification Pin
                  </a>
                </div>
              ) : (
                // Display the countdown timer
                <div className="countdown-text text-center mt-1 text-danger fw-bolder">
                  {`Time remaining: ${Math.floor(count / 60)}:${count % 60 < 10 ? '0' : ''}${count % 60} minutes`}
                </div>
              )}

              <Button
                type="button"
                className="btn mt-3 mb-2 send_otp"
                block
                onClick={handleOtpFromUser}
                /*disabled={count <= 0}*/
              >
                Submit
              </Button>
            </Form>
          </Col>
        </div>
      </ModalBody>
    </Modal>
  )
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
            <Col className="d-flex align-items-center auth-bg px-2 p-lg-5"
                 lg="4"
                 sm="12">
              <Col className="px-xl-2 mx-auto " sm="8" md="6" lg="12">
                <div className={"text-center"}>
                  <img src={Assets.logo} alt={"log_img"} width={100} />
                </div>
                <CardTitle tag="h2" className="fw-bold mb-1 ">
                  Forgot Password ? 🔒
                </CardTitle>
                <CardText>
                  Enter your email and we'll send instructions to reset your password
                </CardText>
                <Form className="auth-forgetPwd-form mt-1" onSubmit={formik.handleSubmit}>
                  <div className="mb-1 mt-1">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoFocus
                      reqired
                    />
                    {formik.touched.email && formik.errors.email && (
                      <span className="small text-danger">{formik.errors.email}</span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="button mt-3"
                    block
                    onClick={() => {
                      if (emailValid) {
                        setOtpModalVisible(true);
                      }
                    }}
                    disabled={!emailValid} // Disable the button if email is not valid
                  >
                    Send Verification Pin
                  </Button>
                </Form>
                <p className="mt-2">
                  <Link to={LOGIN_PATH}>
                    <ChevronLeft className="rotate-rtl me-25" size={14} />
                    <span className="align-middle">Back to login</span>
                  </Link>
                </p>
              </Col>
            </Col>
          </Row>
          {userOTPModal}
        </div>
      )}
    </>

  )
}

export default ForgotPassword;