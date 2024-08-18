// ** React Imports
import { Fragment, useEffect, useState } from "react"

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, Badge, CardTitle, Input, Label, Row, Col } from 'reactstrap'
import { getAllRestaurants } from "@src/services/restaurants"
import moment from "moment/moment"


export const status = {
  ACTIVE: { title: 'Active', color: 'light-success' },
  INACTIVE: { title: 'Inactive', color: 'light-danger' }
}


const RestaurantTable = ({onEdit}) => {
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
      name: 'Name',
      sortable: true,
      minWidth: '190px',
      selector: row => row.name
    },
    {
      name: 'Email',
      sortable: true,
      minWidth: '220px',
      selector: row => row.email
    },
    {
      name: 'Phone',
      sortable: true,
      minWidth: '120px',
      selector: row => row.phone
    },
    {
      name: 'Address',
      sortable: true,
      minWidth: '110px',
      selector: row => row.address
    },
    {
      name: 'Branch Code',
      sortable: true,
      minWidth: '140px',
      selector: row => row.branchCode
    },
    {
      name: 'Created Date',
      sortable: true,
      minWidth: '195px',
      selector: row => moment(row.createdDate).format('YYYY MMMM Do - h:mm: a')
    },
    {
      name: 'Status',
      sortable: true,
      minWidth: '60px',
      selector: row => row.status,
      cell: row => {
        return (
          <Badge color={status[row.status].color} pill>
            {status[row.status].title}
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

  useEffect(() => {
    fetchAllRestaurants()
  }, [])

  const fetchAllRestaurants = () => {
    getAllRestaurants().then(async response => {
      const data = response.data.map((item, index) => ({
        ...item,
        uniqueKey: `${item.id}-${index}` // Combine `id` and `index` to generate a unique key
      }))
      await setData(data)
    })
  }

  // ** Function to handle pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value.toLowerCase()
    let updatedData = []
    setSearchValue(value)


    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          (item.name && item.name.toLowerCase().startsWith(value)) ||
          (item.email && item.email.toLowerCase().startsWith(value)) ||
          (item.phone && item.phone.toLowerCase().startsWith(value)) ||
          (item.address && item.address.toLowerCase().startsWith(value)) ||
          (item.branchCode && item.branchCode.toLowerCase().startsWith(value)) ||
          (status[item.status] && status[item.status].title.toLowerCase().startsWith(value))

        const includes =
          (item.name && item.name.toLowerCase().includes(value)) ||
          (item.email && item.email.toLowerCase().includes(value)) ||
          (item.phone && item.phone.toLowerCase().includes(value)) ||
          (item.address && item.address.toLowerCase().includes(value)) ||
          (item.branchCode && item.branchCode.toLowerCase().includes(value)) ||
          (status[item.status] && status[item.status].title.toLowerCase().includes(value))

        return startsWith || includes
      })
      setFilteredData(updatedData)
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
        <CardTitle tag='h4'>Restaurant Branches</CardTitle>
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
          columns={columns}
          className='react-dataTable'
          paginationPerPage={7}
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
          keyField="uniqueKey"
        />
      </div>
    </Card>
  )
}

export default RestaurantTable
