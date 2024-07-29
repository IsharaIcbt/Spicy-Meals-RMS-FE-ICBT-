import React from "react"
import { fullDetailsOfSelectMenuCategory } from "@src/utility/text_details"
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "reactstrap"
import { ArrowRightCircle } from "react-feather"
import { useNavigate } from "react-router-dom"
import { MENU_DETAILS_PATH } from "@src/router/routes/route-constant"
import Breadcrumbs from "@components/breadcrumbs"

const Menus = () => {
  const navigate = useNavigate()
  const handleButtonClick = (id) => {
    navigate(`${MENU_DETAILS_PATH}/${id}`)
  }
  const cardImgStyles = {
    width: "100%",
    height: "450px", // Adjust the height as needed
    objectFit: "cover" // Ensures the image covers the entire area without distorting
  }
  return (
    <div>
      <Breadcrumbs  class title='All Menus' data={[{ title: 'Menus' }]} />
      <Row className="match-height mb-2 pe-3 ps-3">
        {fullDetailsOfSelectMenuCategory.map((menu, index) => (
          <Col md="4" xs="12" key={index} className={'p-2'}>
            <Card md={4} className="mb-3">
              <CardImg top style={cardImgStyles} src={menu.image} alt={`Card ${index + 1}`} />
              <CardBody>
                <CardTitle tag="h3" className={'text-center fs-3'}>{menu.title}</CardTitle>
                <CardText>{menu.description}</CardText>
                <div  className={'text-center'}>
                  <Button  color="relief-warning" onClick={() => handleButtonClick(menu.id)}>
                    <span className="fs-5">Find Out More</span> <ArrowRightCircle className="ms-2" size={20} />
                  </Button>
                </div>

              </CardBody>
            </Card>
            </Col >
            ))}
      </Row>
    </div>
  )
}

export default Menus
