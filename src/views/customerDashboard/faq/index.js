// ** Reactstrap Imports
import { Fragment } from "react"

// ** Third Party Imports

// ** Demo Components
import FaqFilter from "./FaqFilter"
import FaqContact from "./FaqContact"


// ** Styles
import "@styles/base/pages/page-faq.scss"

const Faq = () => {

  return (
    <Fragment>
      <FaqFilter />
      <FaqContact />
    </Fragment>)
}

export default Faq
