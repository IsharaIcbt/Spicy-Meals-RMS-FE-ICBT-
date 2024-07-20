import React, { useEffect, useState } from "react"
import Breadcrumbs from "@components/breadcrumbs"
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap"
import Select from "react-select"
import { selectThemeColors } from "@utils"
// ** Styles
import "@styles/react/libs/editor/editor.scss"
import "@styles/base/plugins/forms/form-quill-editor.scss"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/base/pages/page-blog.scss"
import { Assets } from "@src/assets/images"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import { categoriesSingle } from "@src/utility/text_details"
import { validatePlaceDetails } from "@src/utility/validation"
import { USER_LOGIN_DETAILS } from "@src/router/RouteConstant"
import toast from "react-hot-toast"
import { addNewPlace } from "@src/services/place"
import { PLACES_PATH } from "@src/router/routes/route-constant"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import { useNavigate } from "react-router-dom"

const AddNewPlace = () => {
  // ** States
  const navigate = useNavigate()
  const
    [blogCategories, setBlogCategories] = useState([]),
    [featuredImg, setFeaturedImg] = useState(Assets.emptyImg)

  const [loggedUser, setLoggedUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch the logged-in user details from local storage
    const storedUserDetails = localStorage.getItem(USER_LOGIN_DETAILS)
    const user = storedUserDetails ? JSON.parse(storedUserDetails) : null
    setLoggedUser(user)

  }, [])


  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    user_id: "",
    user_full_name: "",
    rating_score: 0.0,
    img: null
  })

  console.log("form data ========> ", form)

  useEffect(() => {
    const tagsString = blogCategories.map(category => category.value).join(",")
    setForm((prevForm) => ({
      ...prevForm,
      user_id: loggedUser?.user_id || "",
      tags: tagsString
    }))
  }, [loggedUser, blogCategories])


  const onChangeImg = (e) => {
    const reader = new FileReader()
    const files = e.target.files
    if (files.length > 0) {
      reader.onload = function() {
        setFeaturedImg(reader.result)
      }
      reader.readAsDataURL(files[0])
      setForm((prev) => ({
        ...prev,
        img: files[0] // Set the file in the form state
      }))
    }
  }

  const onTextChange = async (event) => {
    await setForm(prev => ({
        ...prev,
        [event.target.name]: event.target.value
      })
    )
  }

  const createNewPlace = form => {
    return {
      title: form.title ?? null,
      content: form.content ?? null,
      tags: form.tags ?? null,
      user_id: form.user_id ?? null,
      user_full_name: form.user_full_name ?? null,
      rating_score: form.rating_score ?? null,
      img: form.img ?? null
    }
  }

  const apiHandler = () => {
    if (validatePlaceDetails(form)) {
      setLoading(true)

      addNewPlace(createNewPlace(form))
        .then((response) => {
          if (response.data) {
            toast.success(response.message)
            clearFields()
            navigate(PLACES_PATH)
          } else {
            toast.error(response.message)
          }
        })
        .catch((error) => {
          console.error("API Request Error:", error.message)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const clearFields = () => {
    setForm((prevForm) => ({
      ...prevForm,
      title: "",
      content: "",
      tags: "",
      user_id: "",
      user_full_name: "",
      rating_score: 0.0,
      img: null
    }))
    setBlogCategories([])
    setFeaturedImg(Assets.emptyImg)
  }
  return (
    <>
      {
        loading === true ? (
        <SpinnerComponent />
      ) : (
        <div className="blog-edit-wrapper">
          <Breadcrumbs title="Add New Place" data={[{ title: "Add New Place" }]} />
          <Row className={""}>
            <Col sm="12">
              <Card className={'vh-75'}>
                <CardBody>
                  <Form className="mt-2" onSubmit={e => e.preventDefault()}>
                    <Row>

                      <Col md="4" className="mb-2">
                        <Label className="form-label" for="blog-edit-title">
                          User Full Name
                        </Label>
                        <Input
                          id="blog-edit-title"
                          value={form.user_full_name}
                          name="user_full_name"
                          onChange={onTextChange} />
                      </Col>

                      <Col md="4" className="mb-2">
                        <Label className="form-label" for="blog-edit-title">
                          Place Name
                        </Label>
                        <Input
                          id="blog-edit-title"
                          value={form.title}
                          name="title"
                          onChange={onTextChange}
                        />
                      </Col>

                      <Col md="4" className="mb-2">
                        <Label className="form-label" for="blog-edit-category">
                          Select Categories
                        </Label>
                        <Select
                          id="blog-edit-category"
                          isClearable={false}
                          theme={selectThemeColors}
                          value={blogCategories}
                          isMulti
                          name="colors"
                          options={categoriesSingle}
                          className="react-select"
                          classNamePrefix="select"
                          onChange={data => setBlogCategories(data)}
                        />
                      </Col>

                      <Col sm="12" className="mb-2 ">

                        <Row className={'mt-2'}>
                          <Col md={6}>
                            <Label className="form-label">Content</Label>
                            <Input
                              className={'border-secondary'}
                              type="textarea"
                              rows="10"
                              placeholder="Please Type your content ..."
                              name="content"
                              value={form.content}
                              onChange={onTextChange}/>
                          </Col>
                          <Col md={6}>
                            <h5 className="">Place Image</h5>
                            <div className="d-flex flex-column flex-md-row border-secondary rounded p-1">
                              <img
                                className="rounded me-2 mb-1 mb-md-0"
                                src={featuredImg}
                                alt="user img"
                                width="250"
                                height="218"
                              />
                              <div>
                                <small className="text-danger">Required image resolution 800x400, image size 10mb.</small>
                                <br />
                                <br />
                                <div className="d-inline-block">
                                  <div className="mb-0">
                                    <Input
                                      type="file"
                                      id="exampleCustomFileBrowser"
                                      name="customFile"
                                      onChange={onChangeImg}
                                      accept=".jpg, .png, .gif"
                                    />
                                  </div>
                                </div>
                              </div>
                              </div>
                          </Col>
                        </Row>
                      </Col>

                      <Col className="mt-50  text-center mt-2 mb-3">
                        <Button
                          color="primary"
                          className="me-1"
                          onClick={apiHandler}
                        >
                          Save Changes
                        </Button>
                        <Button
                          color="secondary"
                          outline
                          onClick={clearFields}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default AddNewPlace
