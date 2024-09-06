// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Button, Input } from 'reactstrap'
import { isUserLoggedIn } from "@utils"
import { Mail, PhoneCall } from "react-feather"
import { Assets } from "@src/assets/images"

const FaqContact = () => {
  const [comment, setComment] = useState('')
  const [messages, setMessages] = useState([])
  const [userData, setUserData] = useState(null)

  // ** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("USER_OBJECT")))
    }
  }, [])

  const STAFF_PLACEHOLDER_IMAGE = Assets.avater // Replace with your placeholder image URL

  useEffect(() => {
    // Fetch chat data from the API
    axios.get('http://localhost:8080/api/v1/reservation/query/CUSTOM/1')
      .then(response => {
        if (response.data.success) {
          setMessages(response.data.data)
        }
      })
      .catch(error => {
        console.error('Error fetching chat data:', error)
      })
  }, [])

  const handleSubmit = () => {
    if (comment.trim() && userData) {
      const newMessage = {
        message: comment,
        userRole: userData.userRole,
        userId: userData.id,
        queryType: 'CUSTOM',
        user: {
          img: userData.img,
          name: userData.name || 'Your Name'
        },
        createdDate: new Date().toISOString()
      }

      // Send POST request to the API
      axios.post('http://localhost:8080/api/v1/reservation/query', {
        userRole: newMessage.userRole,
        queryType: newMessage.queryType,
        message: newMessage.message,
        userId: newMessage.userId
      })
        .then(response => {
          if (response.data.success) {
            // Update the messages state with the new message
            setMessages([...messages, newMessage])
            setComment('') // Clear the textarea
          }
        })
        .catch(error => {
          console.error('Error submitting query:', error)
        })
    }
  }

  return (
    <div className='faq-contact ' style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Row className=''>
        <Col md='7' className='mb-4'>
          <div
            style={{
              maxHeight: '330px',
              overflowY: 'scroll',
              borderRadius: '10px',
              padding: '15px',
              cursor:'pointer',
              backgroundColor: '#f8f9fa',
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none' // For Internet Explorer and Edge
            }}
          >
            {messages.map((msg, index) => {
              const isCustomer = msg.userRole === 'CUSTOMER'
              const sender = isCustomer ? msg.user : msg.staff
              return (
                <div key={index} style={{ marginBottom: '10px', display: 'flex', flexDirection: isCustomer ? 'row-reverse' : 'row', alignItems: 'flex-start' }}>
                  <img
                    src={isCustomer ? sender?.img : sender?.img || STAFF_PLACEHOLDER_IMAGE}
                    alt={sender?.name}
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      marginLeft: isCustomer ? '10px' : '0',
                      marginRight: isCustomer ? '0' : '10px'
                    }}
                  />
                  <div style={{
                    maxWidth: '75%',
                    backgroundColor: isCustomer ? '#6092fa' : '#e2e3e5',
                    color: isCustomer ? '#fff' : '#000',
                    borderRadius: '15px',
                    padding: '8px 12px',
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    minHeight: '40px' // Reduced height for message bubbles
                  }}>
                    <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '3px', fontSize: '0.9rem' }}>{sender?.name}</span> {/* Increased font size */}
                    <span>{msg.message}</span>
                    <span style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      color: '#6c757d', // Preferred color for date/time
                      marginTop: '5px',
                      textAlign: isCustomer ? 'right' : 'left'
                    }}>
                      <div className={isCustomer && 'text-dark'}>
                        {moment(msg.createdDate).format('MMMM D, YYYY h:mm A')} {/* Using moment.js for date/time formatting */}
                      </div>

                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Col>

        <Col md="5" style={{ borderLeft: "1px solid #B9B9C3" }}>
          <div className={"mt-5 pt-3 "} >
            <Input
              type="textarea"
              value={comment}
              placeholder="Add your comment here..."
              onChange={(e) => setComment(e.target.value)}
              style={{ marginBottom: "10px", height: "120px", borderRadius: "8px", borderColor: "#ddd" }}
            />
            <Button
              color="primary"
              onClick={handleSubmit}
              style={{ borderRadius: "8px" }}
            >
              Submit Query
            </Button>
          </div>
        </Col>

        <hr className={"mt-4 mb-1 text-dark"} />

        <Col sm="12" className="text-center ">
          <h4>Contact Information</h4>
        </Col>

        <Col sm="6">
          <Card className="text-center faq-contact-card shadow-none">
            <CardBody>
              <div className="avatar avatar-tag bg-light-primary mb-2 mx-auto">
                <PhoneCall size={18} />
              </div>
              <h4>+ (810) 2548 2568</h4>
              <span className="text-body">We are always happy to help!</span>
            </CardBody>
          </Card>
        </Col>
        <Col sm='6'>
          <Card className='text-center faq-contact-card shadow-none '>
            <CardBody>
              <div className='avatar avatar-tag bg-light-primary mb-2 mx-auto'>
                <Mail size={18} />
              </div>
              <h4>hello@help.com</h4>
              <span className='text-body'>Best way to get answer faster!</span>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default FaqContact
