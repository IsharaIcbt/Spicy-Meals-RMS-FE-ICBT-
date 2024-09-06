import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSpecificReservations } from "@src/services/orders"
import { Assets } from "@src/assets/images"
import { Button, CardText, Col, Row, Badge, Input, Modal, ModalHeader, ModalBody } from "reactstrap"
import { PlusCircle } from "react-feather"
import moment from "moment"
import axios from "axios"
import { getStatusBadgeColor } from "@utils"
import './reservationDetails.scss'

function ReservationDetails() {
  const { id } = useParams()

  const [reservation, setReservation] = useState(null)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modal, setModal] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")

  useEffect(() => {
    fetchSpecificReservations(id)
  }, [id])

  const fetchSpecificReservations = async (reservationId) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getSpecificReservations(reservationId)
      if (response.data && response.data.length > 0) {
        const fetchedReservation = response.data[0]?.reservation || null
        const fetchedQueries = response.data[0]?.queries || []
        setReservation(fetchedReservation)
        setMessages(fetchedQueries)
      } else {
        setError("No reservation data found.")
      }
    } catch (err) {
      console.error("Error fetching reservation details:", err)
      setError("Failed to load reservation details.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReplySubmit = async () => {
    if (!replyMessage.trim()) {
      return // Do not submit empty comments
    }

    const userData = JSON.parse(localStorage.getItem("USER_OBJECT"))
    if (!userData) {
      alert("User not authenticated.")
      return
    }

    const newMessage = {
      tableReservationId: id,
      userRole: "CUSTOMER",
      queryType: "TABLE",
      message: replyMessage.trim(),
      userId: userData.id
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/reservation/query", newMessage)

      if (response.data.success) {
        const createdDate = response.data.data?.createdDate || new Date().toISOString()
        const newQuery = {
          ...newMessage,
          id: response.data.data?.id || Date.now(), // Use server-provided ID or a fallback
          createdDate,
          user: {
            img: userData.img,
            name: userData.name || "Your Name"
          },
          status: "ACTIVE"
        }
        setMessages((prevMessages) => [...prevMessages, newQuery])
        setReplyMessage("") // Clear the input field
      } else {
        console.error("Failed to submit query:", response.data)
        alert("Failed to send your message. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting query:", error)
      alert("An error occurred while sending your message.")
    }
  }

  const toggleModal = () => setModal(!modal)

  if (isLoading) {
    return <div className="text-center mt-5">Loading reservation details...</div>
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>
  }

  return (
    <>
      <Row
        className="my-4 mx-2 p-3"
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Col
          className="d-flex align-items-center justify-content-center mb-3 mb-md-0"
          md="3"
          xs="12"
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              border: "2px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden"
            }}
          >
            <img
              className="img-fluid"
              src={Assets.logo}
              alt={reservation.reservationCode}
              style={{ maxHeight: "310px", objectFit: "cover", width: "100%" }}
            />
          </div>
        </Col>
        <Col md="9" xs="12">
          <h4 className="mb-2" style={{ fontWeight: "bold", color: "#333" }}>
            Reservation Code: {reservation.reservationCode}
          </h4>
          <CardText style={{ color: "#555", marginBottom: "20px" }}>
            <strong>Reserved Date:</strong>{" "}
            {moment(reservation.reservedDate).format("MMMM Do YYYY, h:mm a")}
          </CardText>
          <CardText style={{ color: "#555", marginBottom: "20px" }}>
            <strong>Table Type:</strong> {reservation.tableReservationType}
          </CardText>
          <CardText style={{ color: "#555", marginBottom: "20px" }}>
            <strong>Status:</strong>{" "}
            <Badge
              color={getStatusBadgeColor(reservation.operationalStatus)}
              className="badge-glow"
            >
              {reservation.operationalStatus}
            </Badge>
          </CardText>
          <CardText style={{ color: "#555", marginBottom: "20px" }}>
            <strong>Customer Note:</strong> {reservation.customerNote}
          </CardText>
          <CardText style={{ color: "#555", marginBottom: "20px" }}>
            <strong>Participation Count:</strong> {reservation.max_count}{" "}
            Members
          </CardText>
          <hr />
          <div className="d-flex flex-column flex-sm-row pt-1">
            <Button
              onClick={toggleModal}
              className="btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
              color="primary"
              style={{ fontWeight: "bold", padding: "10px 20px" }}
            >
              <PlusCircle className="me-50" size={14} />
              Submit Queries
            </Button>
          </div>
        </Col>
      </Row>

      {/* Chat Modal */}
      <Modal scrollable isOpen={modal} toggle={toggleModal} size="md">
        <ModalHeader toggle={toggleModal}>Submit Queries</ModalHeader>
        <ModalBody>
          <div className="chat-container">
            {messages.length !== 0 ? (
              messages.map(query => {
                let avatar, name

                if (query.userRole === 'ADMIN' && query.admin) {
                  avatar = query.admin.img || Assets.avater || "default-admin-img.png"
                  name = query.admin.name || "Admin"
                } else if (query.userRole === 'STAFF' && query.staff) {
                  avatar = query.staff.img || Assets.avater || "default-staff-img.png"
                  name = query.staff.name || "Staff"
                } else if (query.userRole === 'CUSTOMER' && query.user) {
                  avatar = query.user.img || Assets.avater || "default-customer-img.png"
                  name = query.user.name || "Customer"
                } else {
                  avatar = "default-avatar.png"
                  name = "Unknown"
                }

                return (
                  <div key={query.id} className={`chat-message ${query.userRole.toLowerCase()}`}>
                    <div className="message-info">
                      <img src={avatar} alt={`${name} Avatar`} className="avatar" />
                      <div className="message-details" style={{ minWidth: "180px" }}>
                        <div className="message-header">
                          <small color="info" className="message-role pe-2">
                            {query.userRole} | <small className="message-name text-end">{name.split(" ")[0]}</small>
                          </small>
                        </div>
                        <p className="message-text pb-1">{query.message}</p>
                        <small className="text-dark text-end">{moment(query.createdDate).format("MMM D, YYYY h:mm A")}</small>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center">Not found chat yet!</div>
            )}
          </div>
          <div className="reply-section p-1">
            <Input
              type="textarea"
              value={replyMessage}
              onChange={e => setReplyMessage(e.target.value)}
              placeholder="Type your reply..."
              className="reply-input"
            />
            <Button color="primary" onClick={handleReplySubmit} className="reply-button">Send</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default ReservationDetails
