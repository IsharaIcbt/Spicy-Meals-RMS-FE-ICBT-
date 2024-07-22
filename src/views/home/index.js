// ** Styles
import "@styles/react/libs/charts/apex-charts.scss"
import { Assets } from "@src/assets/images"
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap"
import "./home.scss"
import SwiperMultiSlides from "@src/views/home/SwiperMultiSlides"
import { useRTL } from "@hooks/useRTL"
import "@styles/react/libs/swiper/swiper.scss"
import FooterPage from "@src/views/home/footer/footer"
import Select from "react-select"

import { useNavigate } from "react-router-dom"
import { PLACES_PATH_FILTER } from "@src/router/routes/route-constant"
import { validatePlaceSearchDetails } from "@src/utility/validation"
import { searchPlaceByTag_Min_Max } from "@src/services/place"
import { useState } from "react"
import Gallery from "@src/views/home/gallery/Gallery"
import SwiperAutoplay from "@src/views/home/SwiperAutoplay"

// ** Styles
import SwiperCore, { Autoplay } from 'swiper'
SwiperCore.use([Autoplay])
const Home = () => {

  const [isRtl] = useRTL()
  const navigate = useNavigate()
  const divStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${Assets.banner})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "85vh", // Set the height as per your design
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }

  const [form, setForm] = useState({
    tag: "", minscore: "", maxscore: ""
  })


  const categoriesSingle = [
{ value: "Adventure", label: "Adventure" }, {
    value: "WildLife",
    label: "WildLife"
  }, { value: "WaterSport", label: "WaterSport" }, { value: "Nature", label: "Nature" }, {
    value: "Camping",
    label: "Camping"
  }, { value: "Ancient", label: "Ancient" }, { value: "Festive", label: "Festive" }
]

  const handleCategoryChange = (selectedTagType) => {
    setForm((prev) => ({
      ...prev, tag: selectedTagType.value
    }))
  }

  console.log("form print =====================> ", form)

  const createPlaceForSearch = form => {
    return {
      tag: form.tag ?? null, minscore: form.minscore ?? null, maxscore: form.maxscore ?? null
    }
  }
  const apiHandlerForSearch = () => {
    if (validatePlaceSearchDetails(form)) {

      searchPlaceByTag_Min_Max(createPlaceForSearch(form))
        .then((response) => {
          if (response.data) {
            navigate(PLACES_PATH_FILTER, {
              state: { searchData: response.data.data } // Pass search results as state
            })
          }
        })
        .catch((error) => {
          console.error("API Request Error:", error.message)
        })
    }
  }

  return (<div className="home_page">

      {/* HOME BANNER PAGE  */}
      <div className="container-fluid " style={divStyle}>
        <Row className={"pt-5"}>
          <h1 className={"text-center text-white fw-bold"} style={{ fontSize: "4rem", fontWeight: "600" }}>Spicy
            Meals</h1>
          <h2 className={"text-center text-white"}> Let's Enjoy Favorite Restaurant Experience. </h2>
        </Row>
        <Card className="custom-card">
          <h2 className={"text-center form_head mt-1"}>Search Destination</h2>
          <CardBody>
            <Form className="form" onSubmit={e => e.preventDefault()}>
              <Row>
                <Col sm="12" className="mb-2">
                  <Label className="form-label" for="input-name">
                    Input Category
                  </Label>
                  <Select
                    id={`categoryTag`}
                    className="react-select"
                    classNamePrefix="select"
                    value={categoriesSingle.find(item => item.value === form.tag)}
                    isClearable={false}
                    options={categoriesSingle}
                    onChange={handleCategoryChange}
                  />
                </Col>

                <Col className="d-grid" sm="12">
                  <Button
                    className="btn_sch"
                    color="warning"
                    onClick={apiHandlerForSearch}
                  >
                    Search</Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>

      {/* INTRODUCTION PAGE  */}
      <div className={"container-fluid bg-white"} style={{ height: "100vh" }}>
        <Row className={" pt-5 pb-2 introduction_page"}>
          <Col md={5} sm={12} lg={5} className={"m-0 p-0"}>

            <h2 className={"text-start"}><span className="script">Welcome To Spicy Meals!</span><br />
              Who are we?</h2>
            <img src={Assets.logo_about} alt={"travel logo"} style={{ width: "24vw" }} />
          </Col>
          <Col md={7} sm={12} lg={7} className={"mt-1"}>
            <div className={"paragraph-wrap  "}>

              <h3 className={""} style={{ color: "#DD673F", fontWeight: 700 }}>Discover the Spicy Foods Experience, A
                Culinary Journey</h3><br />

              Welcome to Spicy Foods – Where Every Meal is a Celebration! At Spicy Meals, we go beyond merely serving
              food we craft experiences that linger in your memory. Our commitment is to be more than just a restaurant
              – we
              want to be a destination where joy, warmth, and deliciousness come together.
              Founded with the vision of becoming the largest restaurant chain in Sri Lanka, Spicy Meals is the
              brainchild of a team dedicated to redefining the dining experience.<br /><br />

              <h3 className={""} style={{ color: "#DD673F", fontWeight: 700 }}>Our Culinary Offering: A Symphony of
                Flavors</h3><br />
              Dive into a world of culinary excellence with our diverse menu featuring Western,
              Chinese, Indian, Italian, Sri Lankan, and Street Food delights. Each dish is a testament to our
              commitment to serving fresh, delicious, and mouthwatering varieties of quality foods, prepared
              with meticulous attention to high industry standards and hygiene.<br /><br />

              <h3 className={""} style={{ color: "#DD673F", fontWeight: 700 }}>Your Destination for Joyful Memories</h3>
              <br />
              Beyond the tantalizing tastes and aromas, Spicy Meals is a place where memories are made.
              Our team is not just here to serve; we're here to create moments of joy that extend beyond
              the dining table. Every visit to Spicy Meals is an opportunity to escape the ordinary
              and immerse yourself in a culinary experience like no other.

            </div>
          </Col>
        </Row>
      </div>

      {/* MAIN CATEGORY PAGE  */}
      <div className={" main_category"}>
        <h1 className={"p-4 text-center main_sub_header"}>Explore Our main Facilities</h1>
        <SwiperMultiSlides isRtl={isRtl} />
      </div>

      {/* TRAVEL THINGS PAGE  */}
      <div className={"container-fluid about_sriLanka bg-white "}>
        <Row>
          <h1 className={"pt-4 pb-4 text-center main_sub_header"}>What is Special Offers ?</h1>
          <Col md={5} className={""}>

            <h3 style={{color: "#DD673F", fontWeight: 700 , fontSize:'26px'}}className={"text-start pb-2 pt-1"}>
              <span className="script">Indulge in Our Latest Offers and Flavors!</span></h3><br />

            <p style={{fontSize:'15px'}}>At Spicy Meals, we are dedicated to providing a dynamic and exciting dining experience with our
              ever-changing menu. To keep your dining experience fresh and full of surprises, we update our meal
              offerings weekly. Each week, our chefs curate a selection of new and seasonal dishes to ensure that
              there is always something new and delicious to try.

              <br /><br />
              From innovative appetizers to delectable main courses, our weekly offers feature a diverse range of
              flavors and ingredients, reflecting the best of what’s in season. Whether you’re a regular guest or
              visiting us for the first time, our rotating menu ensures that every visit offers a unique culinary
              adventure.
              <br /><br />
              <span className={"fw-bold"}>Don’t miss out on our weekly specials each meal is crafted to deliver exceptional taste and quality,
                making every visit to Spicy Meals a delightful experience.</span></p>
          </Col>
          <Col md={7}>
            <Col sm="12">
              <SwiperAutoplay isRtl={isRtl} />
            </Col>
          </Col>
        </Row>
      </div>

      {/* Gallery */}

      <div className={"container-fluid  bg-white "}>
        <Row>
          <h1 className={"pt-4 pb-4 text-center main_sub_header"}>Experience Culinary Elegance</h1>
        </Row>
        <Row>
          <Gallery />
        </Row>
      </div>


      {/* MAP LOCATION PAGE  */}
      <div className={"container-fluid map_page bg-white mt-5 pt-5"}>
        <Row>
          <Col md={7} className={"map_heading d-flex justify-content-center align-items-start"}>
            <div>
              <Row>
                <Col>
                  <h2 className={"map_page_title text-center"}>Our Main Branches in our Restaurant Chain</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className={"mt-2  map_desc "}>
                    Explore our main branches and the excellent facilities we offer at each location. Whether you are
                    looking for fine dining, comfortable accommodation, or event hosting, we have you covered. Discover
                    the best
                    of our services at each branch and make your visit memorable. Our branches are strategically located
                    across the country to ensure you have convenient access to our top-notch services.
                    <br />
                    <br />
                    Each branch is equipped with state-of-the-art facilities, professional staff, and a welcoming
                    atmosphere that guarantees a
                    remarkable experience. Come and enjoy the culinary delights, relax in our luxurious accommodations,
                    and let us
                    help you host your special events with elegance and style. Join us at any of our branches and
                    experience
                    the excellence we are renowned for.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={5}>
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1H1ADd1djKllgjsCH1zUtYLqyS8JTDK4&ehbc=2E312F&z=7"
              width="100%"
              height="550px">
            </iframe>
          </Col>
        </Row>
      </div>


      {/* FOOTER AND CONTACT PAGE  */}
      <FooterPage />


    </div>)
}

export default Home
