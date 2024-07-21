import React from "react"
import { Assets } from "@src/assets/images"
import FooterPage from "@src/views/home/footer/footer"

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

      <div className={"mb-3 mt-2 main_title"}>

      </div> <div className={"mb-3 mt-2 main_title"}>

      </div> <div className={"mb-3 mt-2 main_title"}>

      </div> <div className={"mb-3 mt-2 main_title"}>

      </div>

      <FooterPage />


    </div>
  )
}

export default Services