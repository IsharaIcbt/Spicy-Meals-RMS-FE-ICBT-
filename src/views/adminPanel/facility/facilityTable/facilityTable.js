// ** React Imports
import { Fragment, useEffect, useState } from "react"

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, Badge, CardTitle, Input, Label, Row, Col } from 'reactstrap'
import moment from "moment/moment"
import { getAllFacilities } from "@src/services/facility"


export const availability = {
  ACTIVE: { title: 'Active', color: 'light-success' },
  INACTIVE: { title: 'Inactive', color: 'light-danger' }
}


const FacilityTable = ({onEdit}) => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])

  const { t } = useTranslation()

  const columns = [
    {
      name: 'Id',
      sortable: true,
      minWidth: '150px',
      selector: row => row.id,
      omit:true
    },
    {
      name: 'RestaurantId',
      sortable: true,
      minWidth: '190px',
      selector: row => row.restaurantId,
      omit:true
    },
    {
      name: 'Facility Name',
      sortable: true,
      minWidth: '200px',
      selector: row => row.name
    },
    {
      name: 'Frequency',
      sortable: true,
      minWidth: '120px',
      selector: row => row.frequency
    },
    {
      name: 'Start',
      sortable: true,
      minWidth: '70px',
      selector: row => row.start
    },
    {
      name: 'Close',
      sortable: true,
      minWidth: '70px',
      selector: row => row.close
    },
    {
      name: 'Max Counts',
      sortable: true,
      minWidth: '130px',
      selector: row => row.maxParticipantCount
    },
    {
      name: 'Price',
      sortable: true,
      minWidth: '80px',
      selector: row => row.price
    },
    {
      name: 'Discount',
      sortable: true,
      minWidth: '110px',
      selector: row => row.discount
    },
    {
      name: 'Facility Type',
      sortable: true,
      minWidth: '140px',
      selector: row => row.facilityType
    },
    {
      name: 'Available',
      sortable: true,
      minWidth: '120px',
      selector: row => row.availability,
      cell: row => {
        return (
          <Badge color={availability[row.availability].color} pill>
            {availability[row.availability].title}
          </Badge>
        )
      }
    },
    {
      name: 'Actions',
      allowOverflow: true,
      minWidth: '80px',
      cell: row => (
        <div className='d-flex'>
          <Edit
            className={'text-info'}
            size={18} onClick={() => onEdit(row.id)} />
        </div>
      )
    }
  ]

  // ** Expandable table component
  const ExpandableTable = ({ data }) => {
    return (
      <div className='expandable-content p-2'>
        <Row>
          <Col md={2}>
            <div className="d-flex">
              <div className="me-25">
                <img className="rounded me-50 border-2 border-warning" src={data.imgURL} alt="Generic placeholder image" height="120" width="180" />
              </div>
            </div>
          </Col>
          <Col md={5} className={'mt-1'}>
            <p>
              <span className="fw-bold">Restaurant Name :</span> {data.restaurantName}
            </p>
            <p>
              <span className="fw-bold">Week Days :</span> {data.weekDays}
            </p>
            <p className="">
              <span
                className="fw-bold"> Created Date :</span> {moment(data.createdDate).format("YYYY MMMM Do - h:mm: a")}
            </p>
          </Col>
          <Col md={5} className={"mt-1"}>
            <p>
              <span className="fw-bold">Reserved Date :</span> {moment(data.reservedDate).format('YYYY MMMM Do - h:mm: a')}
            </p>
            <p className="">
              <span className="fw-bold">Description :</span> {data.description}
            </p>
          </Col>
        </Row>
      </div>
    )
  }

  useEffect(() => {
    fetchAllFacilities()
  }, [])

  const fetchAllFacilities = () => {
    getAllFacilities().then(async response => {
      const data = response.data.map((item, index) => ({
        ...item,
        uniqueKey: `${item.id}-${index}`
      }))
      await setData(data)
    })
  }

  // ** Function to handle pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Function to handle filter
// ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value.toLowerCase()
    setSearchValue(value)

    if (value.length) {
      const updatedData = data.filter(item => {
        const nameMatch = item.name && item.name.toLowerCase().includes(value)
        const priceMatch = item.price && item.price.toString().toLowerCase().includes(value)
        const restaurantNameMatch = item.restaurantName && item.restaurantName.toLowerCase().includes(value)

        return nameMatch || priceMatch || restaurantNameMatch
      })
      setFilteredData(updatedData)
    } else {
      setFilteredData(data)
    }
  }

  // ** Pagination Previous Component
  const Previous = () => {
    return (
      <Fragment>
        <span className='align-middle d-none d-md-inline-block'>{t('Prev')}</span>
      </Fragment>
    )
  }

  // ** Pagination Next Component
  const Next = () => {
    return (
      <Fragment>
        <span className='align-middle d-none d-md-inline-block'>{t('Next')}</span>
      </Fragment>
    )
  }

  // ** Custom Pagination Component
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={<Previous size={10} />}
      nextLabel={<Next size={10} />}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={Math.ceil((searchValue.length ? filteredData.length : data.length) / 7)}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={'active'}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName={'pagination react-paginate pagination-sm justify-content-end pe-1 mt-1'}
    />
  )

  return (
    <Card>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>Manage Facilities</CardTitle>
      </CardHeader>
      <Row className='justify-content-start mx-0'>
        <Col className='d-flex align-items-center justify-content-end mt-1' md='4' sm='12'>
          <Label className='me-1' for='search-input-1'>
            {t('Search')}
          </Label>
          <Input
            className='dataTable-filter mb-50'
            type='text'
            bsSize='sm'
            id='search-input-1'
            value={searchValue}
            onChange={handleFilter}
          />
        </Col>
      </Row>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          pagination
          selectableRowsNoSelectAll
          expandableRows
          columns={columns}
          className='react-dataTable'
          paginationPerPage={7}
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          expandableRowsComponent={ExpandableTable}
          data={searchValue.length ? filteredData : data}
          keyField="uniqueKey"
        />
      </div>
    </Card>
  )
}

export default FacilityTable
