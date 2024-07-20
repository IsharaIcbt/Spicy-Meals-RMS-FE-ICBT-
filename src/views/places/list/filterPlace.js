import React, { useEffect, useState } from "react"
import { getAllPlaces } from "@src/services/place"
import { Badge, Card, CardBody, CardImg, CardText, CardTitle, Col } from "reactstrap"
import classnames from "classnames"
import { badgeColorsArr } from "@src/utility/text_details"
import { Link, useLocation } from "react-router-dom"
import Avatar from "@components/avatar"
import moment from "moment/moment"
import { MessageSquare } from "react-feather"

const SearchPlace = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.searchData) {
        setData(location.state.searchData)
        setLoading(false)
      } else {
        try {
          const response = await getAllPlaces()
          if (response.status === 200) {
            setData(response.data.data || [])
          } else {
            console.error("Error fetching places:", response.message)
          }
        } catch (error) {
          console.error("An error occurred while fetching places:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [location.state])

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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <h5 className={'d-flex justify-content-center align-items-center mt-5 pst-5'}>No search results found 😥</h5>
      ) : (
        <div className="row justify-content-center">
          {renderRenderList()}
        </div>
      )}
    </div>
  )
}

export default SearchPlace
