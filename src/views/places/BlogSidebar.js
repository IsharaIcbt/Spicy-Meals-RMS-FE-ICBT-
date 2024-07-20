// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'

// ** Third Party Components

import classnames from 'classnames'
import * as Icon from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { InputGroup, Input, InputGroupText } from 'reactstrap'
import { BlogData } from "@src/utility/blog-data";

const BlogSidebar = () => {
  // ** States
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(BlogData.blogSidebar)
  }, [])

  const CategoryColorsArr = {
    Adventure: 'light-info',
    WildLife: 'light-danger',
    WaterSport: 'light-primary',
    Nature: 'light-success',
    Camping: 'light-danger',
    Ancient: 'light-warning',
    Festive: 'light-secondary'
  }

  const renderRecentPosts = () => {
    return data.recentPosts.map((post, index) => {
      return (
        <div
          key={index}
          className={classnames('d-flex', {
            'mb-2': index !== data.recentPosts.length - 1
          })}
        >
          <Link className='me-2' to={`/pages/blog/detail/${post.id}`}>
            <img className='rounded' src={post.img} alt={post.title} width='100' height='70' />
          </Link>
          <div>
            <h6 className='blog-recent-post-title'>
              <Link className='text-body-heading' to={`/pages/blog/detail/${post.id}`}>
                {post.title}
              </Link>
            </h6>
            <div className='text-muted mb-0'>{post.createdTime}</div>
          </div>
        </div>
      )
    })
  }

  const renderCategories = () => {
    return data.categories.map((item, index) => {
      const IconTag = Icon[item.icon]

      return (
        <div
          key={index}
          className={classnames('d-flex justify-content-start align-items-center', {
            'mb-75': index !== data.categories.length - 1
          })}
        >
          <a className='me-75' href='/' onClick={e => e.preventDefault()}>
            <Avatar className='rounded'  color={CategoryColorsArr[item.category]} icon={<IconTag size={20} />} />
          </a>
          <a href='/' onClick={e => e.preventDefault()}>
            <div className='blog-category-title text-body fs-5'>{item.category}</div>
          </a>
        </div>
      )
    })
  }

  return (
    <div className='sidebar-detached sidebar-right'>
      <div className='sidebar'>
        <div className='blog-sidebar right-sidebar my-2 my-lg-0'>
          <div className='right-sidebar-content'>
            {data !== null ? (
              <Fragment>
                <div className='blog-recent-posts mt-4'>
                  <h6 className='section-label'>Recent Posts</h6>
                  <div className='mt-75'>{renderRecentPosts()}</div>
                </div>
                <div className='blog-categories mt-3'>
                  <h6 className='section-label'>Categories</h6>
                  <div className='mt-1'>{renderCategories()}</div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
