// ** React Imports
import { Link, useLocation } from "react-router-dom"
import { Fragment, useEffect, useState } from "react"

// ** Third Party Components
import classnames from "classnames"
import * as Icon from "react-feather"
import { MessageSquare } from "react-feather"

// ** Custom Components
import Sidebar from "../BlogSidebar"
import Avatar from "@components/avatar"
import Breadcrumbs from "@components/breadcrumbs"

// ** Reactstrap Imports
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row
} from "reactstrap"

// ** Styles
import "@styles/base/pages/page-blog.scss"
import { getAllPlaces, searchPlaceByTypeText } from "@src/services/place"
import moment from "moment"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import { badgeColorsArr } from "@src/utility/text_details"

const BlogList = () => {
  // ** States
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')

  /** Fetch All Places in Backend proceed */
  const fetchAllPlaces = async () => {
    try {
      const response = await getAllPlaces()
      if (response.status === 200) {
        setData(response.data.data || []) // Ensure response.data.data is an array
      } else {
        console.error("Error fetching places:", response.message)
      }
    } catch (error) {
      console.error("An error occurred:", error)
    } finally {
      setLoading(false)
    }
  }
  const handleSearch = async (searchText) => {
    try {
      if (searchText.trim() === '') {
        await fetchAllPlaces()
      } else {
        const response = await searchPlaceByTypeText(searchText)
        if (response.data) {
          setData(response.data.data || [])
        }
      }
    } catch (error) {
      console.error("Error searching places:", error)
    }
  }
  const onTextChange = async (event) => {
    setText(event.target.value)
  }

  useEffect(() => {
    handleSearch(text)
  }, [text])


  const renderRenderList = () => {
    return data.map(item => {
      const renderTags = () => {
        return item.tags.map((tag, index) => {
          return (
            <a key={index} href="/" onClick={e => e.preventDefault()}>
              <Badge
                className={classnames({
                  "me-50": index !== item.tags.length - 1
                })}
                color={badgeColorsArr[tag]}
                pill
              >
                {tag}
              </Badge>
            </a>
          )
        })
      }

      return (
        <Col key={item.id} md="4">
          <Card>
            <Link to={`/pages/blog/detail/${item.id}`}>
              <CardImg className="img-fluid" src={item.img} alt={item.title} top />
            </Link>
            <CardBody>
              <CardTitle tag="h3">
                <Link className="blog-title-truncate text-body-heading" to={`/pages/blog/detail/${item.id}`}>
                  {item.title}
                </Link>
              </CardTitle>
              <div className="d-flex">
                <Avatar className="me-50" img={item.user_image} imgHeight="25" imgWidth="25" />
                <div>
                  <small className="text-muted fw-bold me-25">by</small>
                  <small className={"fw-bold"}>
                    <a className="text-body" href="/" onClick={e => e.preventDefault()}>
                      {item.user_full_name}
                    </a>
                  </small>
                  <span className="text-dark ms-50 me-25">|</span>
                  <small className="text-secondary fw-bold">{moment(item.posted_date).format("lll")}</small>
                </div>
              </div>
              <div className="my-1 py-25">{renderTags()}</div>
              <CardText className="blog-content-truncate">{item.content.split(" ").slice(0, 10).join(" ")}...</CardText>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <Link to={`/pages/blog/detail/${item.id}`}>
                  <MessageSquare size={15} className="text-body me-50" />
                  <span className="text-body fw-bold">{item.comments.length} Comments</span>
                </Link>
                <Link className="fw-bold" to={`/pages/blog/detail/${item.id}`}>
                  Read More
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }

  return (
    <>
      {loading === true ? (
        <SpinnerComponent />
      ) : (
        <Fragment>
          <Breadcrumbs title="Place List" data={[{ title: "Places" }]} />
          <div className="blog-wrapper">
            <div className="content-detached content-right">
              <InputGroup className="input-group-merge" style={{ width: "250px" }}>
                <Input
                  placeholder="Search here"
                  type="text"
                  value={text}
                  name="searchText"
                  onChange={onTextChange}

                />
                <InputGroupText>
                  <Icon.Search size={14} />
                </InputGroupText>
              </InputGroup>
              <div className="content-body">
                {data !== null ? (
                  <div className="blog-list-wrapper">
                    <Row>{renderRenderList()}</Row>
                    {data.length === 0 ? (
                      <h4 className="text-center mt-5">Not found data for your search 🤔.</h4>
                    ) : (
                      <Row>
                        <Col sm="12">
                          <Pagination className="d-flex justify-content-center mt-2">
                            <PaginationItem className="prev-item">
                              <PaginationLink href="#" onClick={e => e.preventDefault()}></PaginationLink>
                            </PaginationItem>
                            <PaginationItem active>
                              <PaginationLink href="#" onClick={e => e.preventDefault()}>
                                1
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#" onClick={e => e.preventDefault()}>
                                2
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#" onClick={e => e.preventDefault()}>
                                3
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#" onClick={e => e.preventDefault()}>
                                4
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="next-item">
                              <PaginationLink href="#" onClick={e => e.preventDefault()}></PaginationLink>
                            </PaginationItem>
                          </Pagination>
                        </Col>
                      </Row>
                    )
                    }
                  </div>
                ) : null}

              </div>
              <h4></h4>
            </div>
            <Sidebar />
          </div>
        </Fragment>
      )}
    </>
  )
}

export default BlogList
