import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Badge, Button, CardText, Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import axios from "axios"
import moment from "moment"
import { getSpecificOrders } from "@src/services/orders"
import { getStatusBadgeColor } from "@utils"
import './reservationDetails.scss'
import { PlusCircle } from "react-feather";
import { Assets } from "@src/assets/images";
function OrderDetails() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [items, setItems] = useState([])
  const [comment, setComment] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [modal, setModal] = useState(false)
  useEffect(() => {
    fetchSpecificOrders(id)
  }, [id])

  const fetchSpecificOrders = async (orderId) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getSpecificOrders(orderId)
      if (response.data && response.data.length > 0) {
        const fetchedOrder = response.data[0]?.reservation || null
        const fetchedItems = response.data[0]?.items || []
        const fetchedQueries = response.data[0]?.queries || []
        setOrder(fetchedOrder)
        setItems(fetchedItems)
        setMessages(fetchedQueries)
      } else {
        setError("No order data found.")
      }
    } catch (err) {
      console.error("Error fetching order details:", err)
      setError("Failed to load order details.")
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
      mealOrderId: id,
      userRole: "CUSTOMER",
      queryType: "MEAL",
      message: replyMessage.trim(),
      userId: userData.id
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/reservation/query", newMessage)

      if (response.data.success) {
        const createdDate = response.data.data?.createdDate || new Date().toISOString()
        const newQuery = {
          ...newMessage,
          id: response.data.data?.id || Date.now(),
          createdDate,
          user: {
            img: userData.img,
            name: userData.name || "Your Name"
          },
          status: "ACTIVE"
        }
        setMessages((prevMessages) => [...prevMessages, newQuery])
        setComment("")
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
    return <div className="text-center mt-5">Loading order details...</div>
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>
  }

  return (
    <>
      {/* Order Details and Image Section */}
      <Row className="my-4 mx-2 p-2"
           style={{ backgroundColor: "#f8f9fa",
             borderRadius: "12px",
             boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
      }}
      >
        {/* Order Details Column */}
        <Col md="6" xs="12" className="mb-2">
          {items.length > 0 && (
            <div className="d-flex align-items-center justify-content-center me-5 pe-5" style={{ border: "2px solid #ddd", borderRadius: "10px", overflow: "hidden" }}>
              <img
                className="img-fluid"
                src={items[0].image}
                alt={items[0].name}
                style={{ maxHeight: "250px", objectFit: "contain", width: "100%" }}
              />
            </div>
          )}
          <div style={{ marginTop: "20px" }}>
            <h4 className="mb-2" style={{ fontWeight: "bold", color: "#333" }}>Order ID: <span>{order.orderId}</span></h4>
            <CardText style={{ color: "#555", marginBottom: "10px" }}><strong>Order Date:</strong> {moment(order.createdDate).format("MMMM Do YYYY, h:mm a")}</CardText>
            <CardText style={{ color: "#555", marginBottom: "10px" }}><strong>Status:</strong> <Badge color={getStatusBadgeColor(order.operationalStatus)} className="badge-glow">{order.operationalStatus}</Badge></CardText>
            <CardText style={{ color: "#555", marginBottom: "10px" }}><strong>Total Amount:</strong> ${order.total.toFixed(2)}</CardText>
          </div>
        </Col>

        {/* Items List Column */}
        <Col md="6" xs="12">
          <h5 className={"text-center"}>Items List:</h5>
          <hr />
          {items.map((item) => (
            <div key={item.id} className="d-flex mb-2">
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginRight: "10px"
                }}
              />
              <div>
                <h6 className="mb-1" style={{ fontWeight: "bold" }}>{item.name}</h6>
                <p className="mb-1">Quantity : {item.qty} Items</p>
                <p className="mb-1 text-danger fw-semibold">Price: Rs. {item.price.toFixed(2)} | Discount :
                  Rs. {item.discount} % Off</p>
              </div>
            </div>
          ))}
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

export default OrderDetails
