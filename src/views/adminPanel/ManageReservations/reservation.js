import React, { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import { Card, CardHeader, CardTitle, Input, Badge, Modal, ModalHeader, ModalBody, Button, Row, Col } from "reactstrap"
import moment from "moment"
import {
  getAllReservationsForStaff,
  getSpecificQueries,
  submitQueryForReservation,
  updateOperationStatusForReservation
} from "@src/services/reservation";
import './reservation.scss'
import { Assets } from "@src/assets/images"
import { getStatusBadgeColor, isUserLoggedIn } from "@utils"
import toast from "react-hot-toast";
import SpinnerComponent from "@components/spinner/Fallback-spinner";

const Reservation = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [selectedReservationId, setSelectedReservationId] = useState(null)
  const [queries, setQueries] = useState([])
  const [replyMessage, setReplyMessage] = useState("")
  const [userData, setUserData] = useState(null)

  const [approvalModal, setApprovalModal] = useState(false) // Modal for approval/decline
  const [approvalStatus, setApprovalStatus] = useState("") // Track approve/decline status
  const [approvalNote, setApprovalNote] = useState("") // Track note input for approval/decline

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("USER_OBJECT"))) // that place get userId and user Role
    }
  }, [])

  const columns = [
    {
      name: "R-Id",
      selector: row => row.reservation.id,
      sortable: true,
      minWidth: "80px"
    },
    {
      name: "Table Type",
      selector: row => row.reservation.tableReservationType,
      sortable: true,
      minWidth: "170px"
    },
    {
      name: "Max Count",
      selector: row => row.reservation.max_count,
      sortable: true,
      minWidth: "125px"
    },
    {
      name: "Reserved Date",
      selector: row => row.reservation.reservedDate,
      sortable: true,
      minWidth: "200px",
      cell: row => moment(row.reservation.reservedDate).format("YYYY-MM-DD  h:mm a")
    },
    {
      name: "Operation Status",
      selector: row => row.reservation.status,
      sortable: true,
      minWidth: "160px",
      cell: row => (
        <Badge color={getStatusBadgeColor(row.reservation.operationalStatus)} className="badge-glow">
          {row.reservation.operationalStatus}
        </Badge>
      )
    },
    {
      name: "Created Date",
      selector: row => row.reservation.createdDate,
      sortable: true,
      minWidth: "210px",
      cell: row => moment(row.reservation.createdDate).format("YYYY-MM-DD  h:mm a")
    },
    {
      name: "Actions",
      allowOverflow: true,
      minWidth: "350px",
      cell: row => (
        <div>
          <Button color="warning" size="sm" onClick={() => handleRespond(row.reservation.id)}>Respond</Button>
          <Button color="success" size="sm" onClick={() => handleApprove(row.reservation.id)} className="ms-1">Approve</Button>
          <Button color="danger" size="sm" onClick={() => handleDeclined(row.reservation.id)} className="ms-1">Declined</Button>
        </div>
      )
    }
  ]

  const ExpandableTable = ({ data }) => (
    <div className="expandable-content p-2">
      <Row>
        <Col md={6}>
          <p><strong>Reserved Date: </strong>{moment(data.reservation.reservedDate).format("YYYY MMMM Do - h:mm a")}</p>
          <p><strong>Max Count: </strong>{data.reservation.max_count}</p>
        </Col>
        <Col md={6}>
          <p><strong>Customer Note: </strong>
            <Badge color={data.reservation.status === "ACTIVE" ? "light-success" : "light-danger"} pill>
              {data.reservation.status}
            </Badge>
          </p>
          <p><strong>Customer Note:</strong>{data.reservation.customerNote}</p>
        </Col>
      </Row>
    </div>
  )

  const fetchAllReservations = () => {
    getAllReservationsForStaff().then(response => {
      const data = response.data.map((item, index) => ({
        ...item,
        uniqueKey: `${item.reservation.id}-${index}`
      }))
      setData(data)
      setFilteredData(data)
    })
  }
  useEffect(() => {
    fetchAllReservations()
  }, [])

  const handleRespond = id => {
    setSelectedReservationId(id)
    fetchQueries(id)
    toggleModal()
  }

  const handleApprove = id => {
    setSelectedReservationId(id)
    setApprovalStatus('APPROVED') // Set status to 'APPROVED'
    setApprovalModal(true) // Open approval modal
  }

  const handleDeclined = id => {
    setSelectedReservationId(id)
    setApprovalStatus('DECLINED') // Set status to 'DECLINED'
    setApprovalModal(true) // Open approval modal
  }

  const fetchQueries = async id => {
    try {
      const response = await getSpecificQueries(id)
      setQueries(response.data || [])
    } catch (error) {
      console.error("Error fetching queries:", error)
      setQueries([])
    }
  }

  const handleReplySubmit = () => {
    if (!replyMessage.trim()) return

    const userDetails = {
      tableReservationId: selectedReservationId,
      userRole: userData.userRole,
      queryType: 'TABLE',
      message: replyMessage,
      userId: userData.id
    }

    submitQueryForReservation(userDetails)
      .then(response => {
        if (response.success) {
          fetchQueries(selectedReservationId)
          setReplyMessage("")
        } else {
          console.error("Error submitting reply:", response.message)
        }
      })
      .catch(error => {
        console.error("Error submitting reply:", error)
      })
  }

  const toggleModal = () => {
    setModal(!modal)
  }


  const handleApprovalSubmit = () => {
    setLoading(true) // Show loader

    const userDetails = {
      type: 'TABLE',
      tableStatus: approvalStatus, // APPROVED or DECLINED
      note: approvalNote, // Note from modal input
      userId: userData.id,
      userRole: userData.userRole,
      orderId: selectedReservationId // Selected reservation id
    }

    updateOperationStatusForReservation(userDetails)
      .then(response => {
        setLoading(false) // Hide loader
        if (response.success) {
          setApprovalModal(false) // Close approval modal
          fetchAllReservations() // Refresh reservations list
          setApprovalNote("")// Clear note field
          toast.success(`Reservation ${approvalStatus.toLowerCase()} successfully!`);
        } else {
          toast.error(`Error: ${response.message}`); // Show error toast
        }
      })
      .catch(error => {
        setLoading(false); // Hide loader
        console.error("Error updating status:", error)
      })
  }

  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  const handleFilter = e => {
    const value = e.target.value.toLowerCase()
    setSearchValue(value)

    if (value.length) {
      const updatedData = data.filter(item => {
        const codeMatch = item.reservation.reservationCode && item.reservation.reservationCode.toLowerCase().includes(value)
        const statusMatch = item.reservation.status && item.reservation.status.toLowerCase().includes(value)
        const typeMatch = item.reservation.tableReservationType && item.reservation.tableReservationType.toLowerCase().includes(value)

        return codeMatch || statusMatch || typeMatch
      })
      setFilteredData(updatedData)
    } else {
      setFilteredData(data)
    }
  }

  const Previous = () => (
    <span className="align-middle d-none d-md-inline-block">Prev</span>
  )

  const Next = () => (
    <span className="align-middle d-none d-md-inline-block">Next</span>
  )

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={<Previous />}
      nextLabel={<Next />}
      forcePage={currentPage}
      onPageChange={handlePagination}
      pageCount={Math.ceil((searchValue.length ? filteredData.length : data.length) / 7)}
      breakLabel={"..."}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={"active"}
      pageClassName={"page-item"}
      nextLinkClassName={"page-link"}
      nextClassName={"page-item next"}
      previousClassName={"page-item prev"}
      previousLinkClassName={"page-link"}
      pageLinkClassName={"page-link"}
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName={"pagination react-paginate pagination-sm justify-content-end pe-1 mt-1"}
    />
  )

  return (
    <>
      {loading === true ? (
        <SpinnerComponent />
      ) : (
    <div className="reservation-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Manage Reservations</CardTitle>
          <Input className={'w-50'} type="text" placeholder="Search..." value={searchValue} onChange={handleFilter} />
        </CardHeader>
        <DataTable
          columns={columns}
          data={filteredData}
          expandableRows
          expandableRowsComponent={ExpandableTable}
          pagination
          paginationComponent={CustomPagination}
          noDataComponent="No data found"
          keyField="uniqueKey"
        />
      </Card>

      <Modal scrollable isOpen={modal} toggle={toggleModal} size="md">
        <ModalHeader toggle={toggleModal}>Respond to Queries</ModalHeader>
        <ModalBody>
          <div className="chat-container">
            {queries.length !== 0 ? (
              queries.map(query => {
              let avatar, name

              if (query.userRole === 'ADMIN' && query.admin) {
                avatar = query.admin.img || Assets.avater || "default-admin-img.png"
                name = query.admin.name || "Admin"
              } else if (query.userRole === 'STAFF' && query.staff) {
                avatar = query.staff.img || Assets.avater || "default-staff-img.png"
                name = query.staff.name || "Staff"
              } else if (query.userRole === 'CUSTOMER' && query.user) {
                avatar = query.user.img || Assets.avater || "default-customer-img.png"
                name = query.user.name || "Customer"
              } else {
                avatar = "default-avatar.png"
                name = "Unknown"
              }

              return (
                <div key={query.id} className={`chat-message ${query.userRole.toLowerCase()}`}>
                  <div className="message-info">
                    <img src={avatar} alt={`${name} Avatar`} className="avatar" />
                    <div className="message-details" style={{ minWidth: "180px" }}>
                      <div className="message-header">
                        <small color="info" className="message-role pe-2">{query.userRole} | <small
                          className="message-name text-end">{name.split(" ")[0]}</small>
                        </small>
                      </div>
                      <p className="message-text pb-1">{query.message}</p>
                      <small className=" text-dark text-end">{moment(query.createdDate).format("MMM D, YYYY h:mm A")}</small>
                    </div>
                  </div>
                </div>
              )
              })
            ) : (
              <div className={'text-center'}>Not found chat yet!</div>
            )}
          </div>
          <div className="reply-section p-1">
            <Input
              type="textarea"
              value={replyMessage}
              onChange={e => setReplyMessage(e.target.value)}
              placeholder="Type your reply..."
              className="reply-input"
            />
            <Button color="primary" onClick={handleReplySubmit} className="reply-button">Send</Button>
          </div>
        </ModalBody>
      </Modal>
        <Modal isOpen={approvalModal} toggle={() => setApprovalModal(false)}>
      <ModalHeader toggle={() => setApprovalModal(false)}>
        {approvalStatus === 'APPROVED' ? 'Approve Reservation' : 'Decline Reservation'}
      </ModalHeader>
      <ModalBody>
        <Input
          type="textarea"
          placeholder="Add a note (optional)"
          value={approvalNote}
          onChange={e => setApprovalNote(e.target.value)}
          rows="4"
        />
        <Button color="primary" className="mt-2" onClick={handleApprovalSubmit}>
          Submit
        </Button>
      </ModalBody>
    </Modal>
    </div>
      )}
    </>
  )
}

export default Reservation
