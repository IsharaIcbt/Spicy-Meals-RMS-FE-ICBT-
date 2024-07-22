import React from "react"
import { Assets } from "@src/assets/images"
import FooterPage from "@src/views/home/footer/footer"
import { Col, Row } from "reactstrap";

function Services() {
  const coverImageStyles = {
    background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${Assets.services})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "50vh"
  }

  return (
    <div className={"category_page"}>

      <div className="container-fluid main_sec" style={coverImageStyles}></div>

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

      <FooterPage />


    </div>
  )
}

export default Services