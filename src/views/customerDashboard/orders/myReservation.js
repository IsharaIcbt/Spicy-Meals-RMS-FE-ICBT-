import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllReservations } from "@src/services/orders"

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge, Row, Col } from 'reactstrap'
import { getStatusBadgeColor, isUserLoggedIn } from "@utils";
import moment from "moment"

// ** Styles
import './myReservation.scss'
import { Assets } from "@src/assets/images"

function MyReservation() {
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
      fetchAllReservations(userData.id)
    }
  }, [userData])

  const fetchAllReservations = (userId) => {
    getAllReservations(userId).then(response => {
      const reservations = response.data.map((item, index) => ({
        ...item.reservation,
        uniqueKey: `${item.reservation.id}-${index}`,
        imageUrl: Assets.logo // Hard-coded image path
      }))
      setData(reservations)
    })
  }

  const handleNavigate = (id) => {
    navigate(`/reservations/details/${id}`)
  }

  return (
    <div className="my-reservations-container">
      <div className="text-center mt-1 mb-1 ">
        <h1>My Reservations</h1>
        <hr />
      </div>

      <div className="reservation-list">
        {data.map(reservation => (
          <Card key={reservation.uniqueKey} className="reservation-card">
            <Row noGutters>
              <Col md="2" className="image-col">
                <img alt="Reservation" src={reservation.imageUrl} className="reservation-image" />
              </Col>
              <Col md="7" className="details-col">
                <CardBody>
                  <CardText className="reservation-code">
                    <span className={'text-dark fw-semibold'}>Reservation Code: </span>
                    <span>{reservation.reservationCode}</span>
                  </CardText>
                  <CardText>
                    <span
                      className={'text-primary fw-semibold'}>Reserve Date: </span>{moment(reservation.reservedDate).format('MMMM D, YYYY h:mm A')}
                  </CardText>
                  <CardText>
                    <span className={'text-success fw-semibold'}>Max Count: </span> {reservation.max_count}
                  </CardText>
                  <CardText>
                    <span className={'text-primary fw-semibold'}>Status: </span>
                    <Badge color={getStatusBadgeColor(reservation.operationalStatus)} className="badge-glow small">
                      {reservation.operationalStatus}
                    </Badge>
                  </CardText>
                  <CardText>
                    <span className={'text-primary fw-semibold'}>Type: </span>{reservation.tableReservationType}
                  </CardText>
                  <CardText>
                    <span
                      className={'text-primary fw-semibold'}>Created Date: </span>{moment(reservation.createdDate).format('MMMM D, YYYY h:mm A')}
                  </CardText>
                </CardBody>
              </Col>
              <Col md="3" className="actions-col text-right" style={{ borderLeft: '1px solid #B9B9C3' }}>
                <Button color="primary" onClick={() => handleNavigate(reservation.id)}>
                  Reservation Details
                </Button>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyReservation
