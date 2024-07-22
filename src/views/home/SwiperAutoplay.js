// ** Third Party Components
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { Assets } from "@src/assets/images"


const params = {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    clickable: true
  },
  navigation: false
}
const cardImgStyles = {
  width: "100%",
  height: "400px", // Adjust the height as needed
  objectFit: "cover" // Ensures the image covers the entire area without distorting
}

const SwiperAutoplay = ({ isRtl }) => {
  return (
    <Card style={{height:'50vh'}}>
      <CardBody>
        <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
          <SwiperSlide>
            <img style={cardImgStyles} src={Assets.delivery_takeout} alt='swiper 1' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img style={cardImgStyles} src={Assets.parking_facilities} alt='swiper 2' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img style={cardImgStyles} src={Assets.entertainment} alt='swiper 3' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img style={cardImgStyles} src={Assets.delivery_takeout} alt='swiper 4' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img style={cardImgStyles} src={Assets.open_kitchen} alt='swiper 5' className='img-fluid' />
          </SwiperSlide>
          <SwiperSlide>
            <img style={cardImgStyles} src={Assets.wifi_internet} alt='swiper 6' className='img-fluid' />
          </SwiperSlide>
        </Swiper>
      </CardBody>
    </Card>
  )
}

export default SwiperAutoplay
