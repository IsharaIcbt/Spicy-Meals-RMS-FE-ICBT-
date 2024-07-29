import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fullDetailsOfSelectCategory } from "@src/utility/text_details";
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import "./category.scss"
import { Row } from "reactstrap"
import FooterPage from "@src/views/home/footer/footer"

const Category = () => {
  const { categoryTitle } = useParams()

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const category = fullDetailsOfSelectCategory.find((category) => category.id === categoryTitle)
    setSelectedCategory(category)
    setIsLoading(false)
    window.scrollTo(0, 0)
  }, [categoryTitle])

  const coverImageStyles = {
    background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${selectedCategory?.image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "50vh"
  }

  return (
    <>
      {isLoading ? (
        <SpinnerComponent />
      ) : selectedCategory ? (
        <div className={"category_page"}>
          <div className="container-fluid main_sec" style={coverImageStyles}></div>

          <div className={"mb-3 mt-2 main_title"}>
            <h1>{`${selectedCategory?.title}`}</h1>
            <p className={"text-center description fw-bold fs-4"}>{selectedCategory?.description}</p>
          </div>

          <Row className={"container-fluid"}>

          </Row>

          <FooterPage />


        </div>
      ) : (
        <p>Category not found</p>
      )}
    </>
  )
}

export default Category
