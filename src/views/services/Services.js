import React from "react"
import { Assets } from "@src/assets/images"
import FooterPage from "@src/views/home/footer/footer"
import { CardText, Col, Row } from "reactstrap";
import { Award, Clock, Feather, Shield, UserCheck, Users } from "react-feather";
import './service.scss'
function Services() {
  const coverImageStyles = {
    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${Assets.services})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "55vh"
  }

  return (
    <div className={"category_page"}>

      <div className="container-fluid main_sec" style={coverImageStyles}>
        <Row className={"pt-5"}>
          <h1 className={"text-center text-white fw-bold"}
              style={{ fontSize: "5rem", fontWeight: "600" }}>
            Our Services
          </h1>
          <h2 className={"text-center text-white"}> Let's Enjoy Favorite Restaurant Experience. </h2>
        </Row>
      </div>

      {/* INTRODUCTION PAGE  */}
      <div className={"container-fluid bg-white pb-3"}>
        <h2 className={"text-center service_sub_header mt-1 p-4"}> Our Values </h2>
        <div className='item-features'>
          <Row className='text-center'>
            <Col className='mb-4 mb-md-0' md='3' xs='12'>
              <div className='w-75 mx-auto'>
                <Award size={40} color={"#FD7E14"}/>
                <h3 className='mt-2 mb-1 text-warning'>Integrity</h3>
                <CardText> Upholding honesty and transparency in everything we do. We believe
                  in building trust with our customers and team by being consistent and
                  straightforward in our actions and communications.</CardText>
              </div>
            </Col>
            <Col className='mb-4 mb-md-0' md='3' xs='12'>
              <div className='w-75 mx-auto'>
                <Feather size={40} color={"#FD7E14"}/>
                <h3 className='mt-2 mb-1 text-warning'>Compassion</h3>
                <CardText>Showing empathy and understanding towards our customers
                  and team. We strive to create a supportive and caring environment,
                  ensuring everyone feels valued and respected.</CardText>
              </div>
            </Col>
            <Col className='mb-4 mb-md-0' md='3' xs='12'>
              <div className='w-75 mx-auto'>
                <Users size={40} color={"#FD7E14"}/>
                <h3 className='mt-2 mb-1 text-warning'>People Power</h3>
                <CardText>Recognizing the strength of our team.
                  We believe in empowering our employees and fostering a collaborative
                  culture where everyone's contributions are appreciated.</CardText>
              </div>
            </Col>
            <Col className='mb-4 mb-md-0' md='3' xs='12'>
              <div className='w-75 mx-auto'>
                <UserCheck size={40} color={"#FD7E14"} />
                <h3 className='mt-2 mb-1 text-warning'>Customer Service</h3>
                <CardText>Committed to providing best service and ensuring customer satisfaction.
                  We are dedicated to meeting our customers' needs and their expectations
                  through best service.</CardText>
              </div>
            </Col>
          </Row>
        </div>
      </div>


      {/* INTRODUCTION PAGE  */}
      <div className={"container-fluid bg-white mb-5 pb-3"}>
        <h2 className={"text-center service_sub_header mt-3 p-4"}> Our Services </h2>
        <div className='item-features'>
          <Row className='text-center'>
            <Col className='mb-4 mb-md-0' md='3' xs='12'>
              <div className='w-75 mx-auto'>
                <img src={Assets.family_dining} alt={'family_dining'} width={80}/>
                <h3 className='mt-2 mb-1 text-warning'>Family Dining</h3>
                <CardText>Create family moments in our welcoming atmosphere.</CardText>
              </div>
            </Col>
            <Col className='mb-4 mb-md-0' md='3' xs='12'>
              <div className="w-75 mx-auto">
                <img src={Assets.street_dining} alt={"family_dining"} width={80} />
                <h3 className="mt-2 mb-1 text-warning">Street Dining</h3>
                <CardText>Experience the vibrant street food culture in a cozy setting.</CardText>
              </div>
            </Col>
            <Col className="mb-4 mb-md-0" md='3' xs='12'>
              <div className="w-75 mx-auto">
                <img src={Assets.prepare_own_dish} alt={"family_dining"} width={80} />
                <h3 className="mt-2 mb-1 text-warning">Prepare Your Own Dish</h3>
                <CardText>Customization at its best – unleash your inner chef!</CardText>
              </div>
            </Col>
            <Col className="mb-4 mb-md-0" md='3' xs='12'>
              <div className="w-75 mx-auto">
                <img src={Assets.parties_celebration} alt={"family_dining"} width={80} />
                <h3 className="mt-2 mb-1 text-warning">Parties and Celebrations</h3>
                <CardText>Host your special events and celebrations with us.</CardText>
              </div>
            </Col>
          </Row>
        </div>

        <div className='item-features mt-4'>
          <Row className='text-center'>
            <Col className='mb-4 mb-md-0' md='3' xs='12'>
              <div className="w-75 mx-auto">
                <img src={Assets.ample_parking} alt={"family_dining"} width={80} />
                <h3 className="mt-2 mb-1 text-warning">Ample Parking</h3>
                <CardText>Hassle-free parking facilities for our valued customers.</CardText>
              </div>
            </Col>
            <Col className="mb-4 mb-md-0" md='3' xs='12'>
              <div className="w-75 mx-auto">
                <img src={Assets.online_ordering} alt={"family_dining"} width={80} />
                <h3 className="mt-2 mb-1 text-warning">Online Ordering and Pick Up</h3>
                <CardText>Save time by ordering online and picking up at your convenience.</CardText>
              </div>
            </Col>
            <Col className="mb-4 mb-md-0" md='3' xs='12'>
              <div className="w-75 mx-auto">
                <img src={Assets.table_reservation} alt={"family_dining"} width={80} />
                <h3 className="mt-2 mb-1 text-warning">Online Table Reservation</h3>
                <CardText>Ensure a seamless dining experience by reserving your table online.</CardText>
              </div>
            </Col>
            <Col className="mb-4 mb-md-0" md='3' xs='12'>
              <div className="w-75 mx-auto">
                <img src={Assets.byob} alt={"family_dining"} width={80} />
                <h3 className="mt-2 mb-1 text-warning">BYOB (Bring Your Own Bottle)</h3>
                <CardText>Bring your favorite beverage and enjoy it with our delectable dishes.</CardText>
              </div>
            </Col>
          </Row>
        </div>
      </div>




      <FooterPage />


    </div>
  )
}

export default Services