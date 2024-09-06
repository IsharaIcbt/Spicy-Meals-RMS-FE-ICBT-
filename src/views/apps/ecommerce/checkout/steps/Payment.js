import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, Label, Input, Button, Card, CardHeader, CardTitle, CardBody, CardText } from 'reactstrap'
import { addNewMealOrder } from "@src/services/reservation"
import toast from "react-hot-toast"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import { MY_ORDERS_PATH } from "@src/router/routes/route-constant";
import { validateOrderDetails } from "@src/utility/validation";

const Payment = ({ formData, stepper }) => {
  const [loading, setLoading] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card') // Default to credit card
  const navigate = useNavigate()


  const createMealOrderRequest = (form) => {
    // Structure the form data according to your requirements
    return {
      items: form.items.map(item => ({
        id: item.id ?? null,  // Use `null` if `id` is undefined or null
        qty: item.qty ?? null  // Use `null` if `qty` is undefined or null
      })),
      address: {
        address: form.address?.address ?? null,  // Use `null` if `address` is undefined or null
        fullName: form.address?.fullName ?? null,  // Use `null` if `fullName` is undefined or null
        mobileNumber: form.address?.mobileNumber ?? null,  // Use `null` if `mobileNumber` is undefined or null
        restaurantId: form.address?.restaurantId ?? null  // Use `null` if `restaurantId` is undefined or null
      }
    }
  }


  const handlePayment = () => {
    if (validateOrderDetails(formData)) {
      setLoading(true)

      const orderRequest = createMealOrderRequest(formData)

      if (selectedPaymentMethod === 'payment-cod') {
        // Handle Cash on Delivery
        addNewMealOrder(orderRequest)
          .then((response) => {
            if (response.success) {
              toast.success("Your order has been successfully placed!")
              // Optionally, navigate to a different page
              navigate(MY_ORDERS_PATH)
            } else {
              toast.error(response.message || "Failed to place the order")
            }
          })
          .catch((error) => {
            console.error("API Request Error:", error.message)
            toast.error("Failed to place the order. Please try again.")
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        // Handle other payment methods if needed
        console.log('Processing other payment methods...')
      }
    } else {
      toast.error("Please correct the errors in the form")
    }
  }

  return (
    <div>
      {loading ? (
        <SpinnerComponent />
      ) : (
        <Form
          className='list-view product-checkout'
          onSubmit={e => {
            e.preventDefault()
            handlePayment()
          }}
        >
          <div className='payment-type'>
            <Card>
              <CardHeader className='flex-column align-items-start'>
                <CardTitle tag='h4'>Payment options</CardTitle>
                <CardText className='text-muted mt-25'>Be sure to click on the correct payment option</CardText>
              </CardHeader>
              <CardBody>
                <h6 className='card-holder-name my-75'>John Doe</h6>
                <div className='form-check mb-2'>
                  <Input
                    defaultChecked
                    id='us-card'
                    type='radio'
                    name='paymentMethod'
                    onChange={() => setSelectedPaymentMethod('credit-card')}
                  />
                  <Label className='form-check-label' htmlFor='us-card'>
                    US Unlocked Debit Card 12XX XXXX XXXX 0000
                  </Label>
                </div>
                <Row className='customer-cvv mt-1 row-cols-lg-auto'>
                  <Col xs={3} className='d-flex align-items-center'>
                    <Label className='mb-50' for='card-holder-cvv'>
                      Enter CVV:
                    </Label>
                  </Col>
                  <Col xs={4} className='p-0'>
                    <Input className='input-cvv mb-50' id='card-holder-cvv' />
                  </Col>
                  <Col xs={3}>
                    <Button className='btn-cvv mb-50' color='primary'>
                      Continue
                    </Button>
                  </Col>
                </Row>
                <hr className='my-2' />
                <ul className='other-payment-options list-unstyled'>
                  <li className='py-50'>
                    <div className='form-check'>
                      <Input
                        type='radio'
                        name='paymentMethod'
                        id='credit-card'
                        onChange={() => setSelectedPaymentMethod('credit-card')}
                      />
                      <Label className='form-label' for='credit-card'>
                        Credit / Debit / ATM Card
                      </Label>
                    </div>
                  </li>

                  <li className='py-50'>
                    <div className='form-check'>
                      <Input
                        type='radio'
                        name='paymentMethod'
                        id='payment-cod'
                        onChange={() => setSelectedPaymentMethod('payment-cod')}
                      />
                      <Label className='form-label' for='payment-cod'>
                        Cash On Delivery
                      </Label>
                    </div>
                  </li>
                </ul>
                <hr className='my-2' />

                <Button className='btn-cvv mb-50' color='primary' onClick={handlePayment} disabled={loading}>
                  Pay Order
                </Button>
              </CardBody>
            </Card>
          </div>
          <div className='amount-payable checkout-options'>
            <Card>
              <CardHeader>
                <CardTitle tag='h4'>Price Details</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className='list-unstyled price-details'>
                  <li className='price-detail'>
                    <div className='details-title'>Price of 3 items</div>
                    <div className='detail-amt'>
                      <strong>$699.30</strong>
                    </div>
                  </li>
                  <li className='price-detail'>
                    <div className='details-title'>Delivery Charges</div>
                    <div className='detail-amt discount-amt text-success'>Free</div>
                  </li>
                </ul>
                <hr />
                <ul className='list-unstyled price-details'>
                  <li className='price-detail'>
                    <div className='details-title'>Amount Payable</div>
                    <div className='detail-amt fw-bolder'>$699.30</div>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </Form>
      )}
    </div>
  )
}

export default Payment
