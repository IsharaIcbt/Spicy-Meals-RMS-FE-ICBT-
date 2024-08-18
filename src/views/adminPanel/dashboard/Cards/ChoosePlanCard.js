import React from 'react'
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap'
import illustration from '@src/assets/images/illustration/Pot3.svg'
import { useNavigate } from "react-router-dom"
import { RESERVATION_FORM_PATH, SHOP_PATH } from "@src/router/routes/route-constant";

const ChoosePlanCard = () => {
  const navigate = useNavigate()
  return (
    <Card className='text-center shadow-sm'>
      {/* Header Row */}
      <CardHeader className='bg-light-warning text-white p-1'>
        <h4 className='mb-0'>Choose the Plan</h4>
      </CardHeader>

      {/* Content Row */}
      <CardBody className='p-4'>
        <Row>
          {/* Image Column */}
          <Col md='6' className='d-flex justify-content-center align-items-center'>
            <img
              src={illustration}
              alt='Logo'
              className='img-fluid'
              style={{ maxWidth: '150%', borderRadius: '8px' }} // Modern, rounded image
            />
          </Col>

          {/* Buttons Column */}
          <Col md='6' className='d-flex flex-column justify-content-center align-items-center'>
            <Button color='warning' size='md' className='mb-3 w-75' onClick={() => navigate(SHOP_PATH)}>
              Take Away
            </Button>
            <Button color='success' size='md' className='w-75' onClick={() => navigate(RESERVATION_FORM_PATH)}>
              Dining
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default ChoosePlanCard
