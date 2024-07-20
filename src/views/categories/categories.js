import React from "react"
import { categories } from "@src/utility/text_details"
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "reactstrap"
import { ArrowRightCircle } from "react-feather"
import { useNavigate } from "react-router-dom"
import { CATEGORY_PATH } from "@src/router/routes/route-constant"
import Breadcrumbs from "@components/breadcrumbs";

const Categories = () => {
  const navigate = useNavigate()
  const handleButtonClick = (id) => {
    navigate(`${CATEGORY_PATH}/${id.toLowerCase()}`)
  }

  return (
    <div>
      <Breadcrumbs title='All Categories' data={[{ title: 'Categories' }]} />
      <Row className="match-height mb-2">
        {categories.map((category, index) => (
          <Col md="3" xs="12" key={index}>
            <Card md={4} className="mb-3">
              <CardImg top className="img-fluid" src={category.image} alt={`Card ${index + 1}`} />
              <CardBody>
                <CardTitle tag="h4">{category.title}</CardTitle>
                <CardText>{category.description}</CardText>
                <Button color="relief-info" onClick={() => handleButtonClick(category.id)}>
                  <span className="fs-5">Find Out More</span> <ArrowRightCircle className="ms-2" size={20} />
                </Button>
              </CardBody>
            </Card>
            </Col >
            ))}
      </Row>
    </div>
  )
}

export default Categories
