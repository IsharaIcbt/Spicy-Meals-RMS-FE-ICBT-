// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Table Columns

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Badge } from "reactstrap";
import { getAllCustomers } from "@src/services/userManage";
import moment from "moment";

export const status = {
  ACTIVE: { title: 'Active', color: 'light-success' },
  INACTIVE: { title: 'Inactive', color: 'light-danger' }
}
const CustomersTable = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  // ** Hooks
  const { t } = useTranslation()

   const multiLingColumns = [
    {
      name: 'Id',
      sortable: true,
      minWidth: '100px',
      selector: row => row.id,
      omit:true
    },
    {
      name: 'Name',
      sortable: true,
      minWidth: '150px',
      selector: row => row.name
    },
    {
      name: 'Email',
      sortable: true,
      minWidth: '200px',
      selector: row => row.email
    },
    {
      name: 'Nic',
      sortable: true,
      minWidth: '80px',
      selector: row => row.nic
    },
    {
      name: 'Phone Number',
      sortable: true,
      minWidth: '80px',
      selector: row => row.phoneNumber
    },
    {
      name: 'Address',
      sortable: true,
      minWidth: '200px',
      selector: row => row.homeAddress
    },
    {
      name: 'Created Date',
      sortable: true,
      minWidth: '200px',
      selector: row => moment(row.createdDate).format('YYYY MMMM Do - h:mm: a')
    },

    {
      name: 'Status',
      sortable: true,
      minWidth: '80px',
      selector: row => row.userStatus,
      cell: row => {
        return (
          <Badge color={status[row.userStatus].color} pill>
            {status[row.userStatus].title}
          </Badge>
        )
      }
    }
  ]

  useEffect(() => {
    fetchAllCustomers()
  }, [])

  const fetchAllCustomers = () => {
    getAllCustomers().then(async response => {
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
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      ACTIVE: { title: 'Active', color: 'light-success' },
      INACTIVE: { title: 'Inactive', color: 'light-danger' }
    }

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.password.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.nic.toLowerCase().startsWith(value.toLowerCase()) ||
          item.phoneNumber.toLowerCase().startsWith(value.toLowerCase()) ||
          item.homeAddress.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status]?.title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.password.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.nic.toLowerCase().includes(value.toLowerCase()) ||
          item.phoneNumber.toLowerCase().includes(value.toLowerCase()) ||
          item.homeAddress.toLowerCase().includes(value.toLowerCase()) ||
          item.userRole.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status]?.title.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
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
      previousLabel={<Previous size={15} />}
      nextLabel={<Next size={15} />}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1}
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
    <Card style={{ marginTop:'4rem'}} className={'p-1'}>
      <CardHeader className='border-bottom '>
        <CardTitle tag='h4'>Customers</CardTitle>
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
          columns={multiLingColumns}
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

export default CustomersTable
