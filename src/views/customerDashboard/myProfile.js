import React, {useEffect, useState } from "react"
import { Col, Row } from "reactstrap"
import CardCongratulations from "@src/views/adminPanel/dashboard/Cards/CardCongratulations"
import { isUserLoggedIn } from "@utils"
import CardMeetup from "@src/views/adminPanel/dashboard/Cards/CardMeetup"
import ChoosePlanCard from "@src/views/adminPanel/dashboard/Cards/ChoosePlanCard";

function MyProfile() {


  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("USER_OBJECT")))
    }
  }, [])

  return (
    <div>

      <Row className=' mt-5'>
        <Col lg='6' sm='12'>
          <CardCongratulations userData={userData} />
          <div className='mt-1'>
            <ChoosePlanCard />
          </div>
        </Col>
        <Col lg='6' sm='12'>
          <CardMeetup />
        </Col>
      </Row>
    </div>
  )
}

export default MyProfile