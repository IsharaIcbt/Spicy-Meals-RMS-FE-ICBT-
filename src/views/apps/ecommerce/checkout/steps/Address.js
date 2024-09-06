// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Select from 'react-select'

// ** Reactstrap Imports
import { Form, Input, Card, Label, CardHeader, CardTitle, CardBody, CardText, Button, Row, Col } from 'reactstrap'
import { getAllRestaurantsIds } from "@src/services/restaurants"

const defaultValues = {
  fullName: '',
  mobileNumber: '',
  address: '',
  restaurantId: ''
}

const Address = ({ stepper, updateFormData }) => {

  // ** Local State
  const [restaurantsOptions, setRestaurantsOptions] = useState([])

  // ** React Hook Form setup
  const { control, setError, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  // Fetch restaurant IDs for select box
  useEffect(() => {
    fetchAllRestaurantsIds()
  }, [])

  const fetchAllRestaurantsIds = async () => {
    try {
      const response = await getAllRestaurantsIds()
      if (response.success) {
        const data = response.data.map(item => ({
          value: item.value,
          label: item.label
        }))
        setRestaurantsOptions(data)
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error)
    }
  }

  // ** Handle form submit
  const onSubmit = data => {
    if (Object.values(data).every(field => field)) {
      updateFormData('address', data)
      stepper.next()
    } else {
      for (const key in data) {
        if (!data[key]) {
          setError(key, {
            type: 'manual',
            message: 'This field is required'
          })
        }
      }
    }
  }

  // Handle button click to trigger form submission
  const handleClick = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <Form className='list-view product-checkout'>
      <Card>
        <CardHeader className='flex-column align-items-start'>
          <CardTitle tag='h4'>Shipping Address</CardTitle>
          <CardText className='text-muted mt-25'>
            Be sure to check "Deliver to this address" when you have finished
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='6' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='fullName'>
                  Full Name:
                </Label>
                <Controller
                  control={control}
                  name='fullName'
                  render={({ field }) => (
                    <Input
                      id='fullName'
                      placeholder='John Doe'
                      invalid={!!errors.fullName}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='6' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='mobileNumber'>
                  Mobile Number:
                </Label>
                <Controller
                  control={control}
                  name='mobileNumber'
                  render={({ field }) => (
                    <Input
                      type='text'
                      id='mobileNumber'
                      placeholder='0123456789'
                      invalid={!!errors.mobileNumber}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='12' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='address'>
                  Address:
                </Label>
                <Controller
                  control={control}
                  name='address'
                  render={({ field }) => (
                    <Input
                      id='address'
                      placeholder='1234 Elm Street'
                      invalid={!!errors.address}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='12' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='restaurantId'>
                  Select Restaurant:
                </Label>
                <Controller
                  control={control}
                  name='restaurantId'
                  render={({ field }) => (
                    <Select
                      id='restaurantId'
                      options={restaurantsOptions}
                      className='react-select'
                      classNamePrefix='select'
                      value={restaurantsOptions.find(option => option.value === field.value)}
                      onChange={option => field.onChange(option ? option.value : '')}
                    />
                  )}
                />
              </div>
            </Col>
            <Col sm='12'>
              <Button type='button' className='btn-next delivery-address' color='primary' onClick={handleClick}>
                Save And Deliver Here
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Form>
  )
}

export default Address
