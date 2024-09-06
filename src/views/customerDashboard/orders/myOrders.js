import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllOrders } from "@src/services/orders"

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge, Row, Col } from 'reactstrap'
import { getStatusBadgeColor, isUserLoggedIn } from "@utils";
import moment from "moment/moment"

// ** Styles
import './myOrder.scss'

function MyOrders() {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      const storedUserData = JSON.parse(localStorage.getItem("USER_OBJECT"))
      setUserData(storedUserData)
    }
  }, [])

  useEffect(() => {
    if (userData?.id) {
      fetchAllOrders(userData.id)
    }
  }, [userData])

  const fetchAllOrders = (userId) => {
    getAllOrders(userId).then(response => {
      const orders = response.data.map((item, index) => ({
        ...item.reservation,
        imageUrl: item.items && item.items[0] ? item.items[0].image : null,
        uniqueKey: `${item.reservation.id}-${index}`
      }))
      setData(orders)
    })
  }

  const handleNavigate = (id) => {
    navigate(`/my-orders/details/${id}`)
  }

  return (
    <div className="my-orders-container ">
      <div className="text-center mt-1 mb-1 ">
        <h1>My Orders</h1>
        <hr />
      </div>

      <div className="order-list">
        {data.map(order => (
          <Card key={order.uniqueKey} className="order-card">
            <Row noGutters>
              <Col md="2" className="image-col">
                {order.imageUrl && (
                  <img alt="Meal" src={order.imageUrl} className="order-image" />
                )}
              </Col>
              <Col md="7" className="details-col">
                <CardBody>
                  <CardText className="order-title">
                    <span className={'fw-semibold'}>Order ID: </span> {order?.orderId}
                  </CardText>
                  <CardText>
                    <span className={'fw-semibold'}>Status: </span>
                    <Badge color={getStatusBadgeColor(order.operationalStatus)} className="badge-glow">
                      {order.operationalStatus}
                    </Badge>
                  </CardText>
                  <CardText>
                    <span className={'fw-semibold'}>Order Type: </span>{order?.mealOrderType}
                  </CardText>
                  <CardText>
                    <span className={'fw-semibold'}>Order Date: </span>{moment(order.createdDate).format('MMMM D, YYYY h:mm A')}
                  </CardText>
                </CardBody>
              </Col>

              <Col md="3" className="actions-col text-right" style={{borderLeft:'1px solid #B9B9C3'}}>
                <h4 className="order-price ms-2">RS. {order.total}</h4> {/* Replace with actual price */}
                <Button color="primary" className={'me-2 ms-2'} onClick={() => handleNavigate(order.id)}>
                  Order Details
                </Button>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
