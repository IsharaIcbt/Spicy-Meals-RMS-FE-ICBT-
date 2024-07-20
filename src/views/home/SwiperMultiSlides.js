// ** Third Party Components
import { Swiper, SwiperSlide } from "swiper/react"

// ** Reactstrap Imports
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap"
import { ArrowRightCircle } from "react-feather"
import { useNavigate } from "react-router-dom"
import { CATEGORY_PATH } from "@src/router/routes/route-constant"
import { categories } from "@src/utility/text_details"

const params = {
  slidesPerView: 4,
  spaceBetween: 20,
  centeredSlides: false,
  slideToClickedSlide: true,
  pagination: {
    clickable: true
  }
}

const SwiperMultiSlides = () => {
  const navigate = useNavigate()
  const handleButtonClick = (id) => {
    navigate(`${CATEGORY_PATH}/${id.toLowerCase()}`)
  }

  return (
    <div className={""}>
      <Swiper {...params}>
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Card>
              <CardImg top className="img-fluid" src={category.image} alt={`Card ${index + 1}`} />
              <CardBody>
                <CardTitle tag="h4">{category.title}</CardTitle>
                <CardText>{category.description}</CardText>
                <Button color="relief-info" onClick={() => handleButtonClick(category.id)}>
                  <span className="fs-5">Find Out More</span> <ArrowRightCircle className="ms-2" size={20} />
                </Button>
              </CardBody>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperMultiSlides
