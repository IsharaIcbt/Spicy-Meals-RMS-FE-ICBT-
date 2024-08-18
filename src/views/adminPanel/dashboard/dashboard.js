import React, { useContext } from "react";
import { Col, Row } from "reactstrap"
import CardCongratulations from "@src/views/adminPanel/dashboard/Cards/CardCongratulations"
import { kFormatter } from "@utils"
import SubscribersGained from "@src/views/adminPanel/dashboard/Cards/SubscribersGained";
import OrdersReceived from "@src/views/adminPanel/dashboard/Cards/OrdersReceived";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import StatsCard from "@src/views/adminPanel/dashboard/Cards/StatsCard";
import Earnings from "@src/views/adminPanel/dashboard/Cards/Earnings";

function Dashboard() {
  // ** Context
  const { colors } = useContext(ThemeColors)
  return (
    <div>
      <Row className='match-height mt-2'>
        <Col lg='6' sm='12'>
          <CardCongratulations />
        </Col>
        <Col lg='3' sm='6'>
          <SubscribersGained kFormatter={kFormatter} />
        </Col>
        <Col lg='3' sm='6'>
          <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} />
        </Col>
      </Row>

      <Row className='match-height mt-3'>
        {/* Stats Card */}
        <Col lg='8'  md='6' sm='12'>
          <StatsCard cols={{ md: '3', sm: '6', xs: '12' }} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <Earnings success={colors.success.main} />
        </Col>
      </Row>

    </div>
  )
}

export default Dashboard
