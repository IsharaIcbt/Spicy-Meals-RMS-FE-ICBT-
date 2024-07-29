import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fullDetailsOfSelectMenuCategory } from "@src/utility/text_details";
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import "./menu.scss"
import { Row } from "reactstrap"
import FooterPage from "@src/views/home/footer/footer"

const MenuDetails = () => {
  const { menuId } = useParams()

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const menu = fullDetailsOfSelectMenuCategory.find((menu) => menu.id === menuId)
    setSelectedCategory(menu)
    setIsLoading(false)
    window.scrollTo(0, 0)
  }, [menuId])


  return (
    <>
      {isLoading ? (
        <SpinnerComponent />
      ) : selectedCategory ? (
        <div className={"category_page bg-white"}>
          <div className={"mb-3  main_title"}>
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

export default MenuDetails
