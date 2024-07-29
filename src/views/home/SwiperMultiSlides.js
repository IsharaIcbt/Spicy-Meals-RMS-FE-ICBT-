// ** Third Party Components
import { Swiper, SwiperSlide } from "swiper/react"

// ** Reactstrap Imports
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap"
import { ArrowRightCircle } from "react-feather"
import { useNavigate } from "react-router-dom"
import { CATEGORY_PATH } from "@src/router/routes/route-constant"
import { fullDetailsOfSelectCategory } from "@src/utility/text_details";

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
    navigate(`${CATEGORY_PATH}/${id}`)
  }
  const cardImgStyles = {
    width: "100%",
    height: "300px", // Adjust the height as needed
    objectFit: "cover" // Ensures the image covers the entire area without distorting
  }
  return (
    <div className={""}>
      <Swiper {...params}>
        {fullDetailsOfSelectCategory.map((category, index) => (
          <SwiperSlide key={index}>
            <Card>
              <CardImg top className="img-fluid" style={cardImgStyles} src={category.image} alt={`Card ${index + 1}`} />
              <CardBody>
                <CardTitle className={'text-dark fw-bold'}>  {category.title}</CardTitle>
                <CardText>{category.shortDescription}</CardText>
                <Button color="relief-warning" onClick={() => handleButtonClick(category.id)}>
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
