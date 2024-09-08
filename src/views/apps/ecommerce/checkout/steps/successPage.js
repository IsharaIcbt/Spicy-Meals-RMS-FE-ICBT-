import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { sendBackOrderId } from "@src/services/reservation"
import toast from "react-hot-toast"
import SpinnerComponent from "@components/spinner/Fallback-spinner"
import { MY_ORDERS_PATH } from "@src/router/routes/route-constant"

function SuccessPage() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      sendBackOrderId(id)
        .then((response) => {
          if (response.success) {
            toast.success("Your order has been successfully placed!")
            setLoading(false) // Stop loading once order is placed
          } else {
            toast.error(response.message || "Failed to place the order")
            setLoading(false)
          }
        })
        .catch((error) => {
          console.error("API Request Error:", error.message)
          toast.error("Failed to place the order. Please try again.")
          setLoading(false)
        })
    }
  }, [id])

  const pageStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    flexDirection: "column",
    textAlign: "center"
  }

  const gifStyles = {
    width: "300px",
    height: "auto",
    marginBottom: "20px"
  }

  const messageStyles = {
    fontSize: "24px",
    color: "#28a745",
    marginBottom: "20px"
  }

  const buttonStyles = {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  }

  const buttonHoverStyles = {
    backgroundColor: "#218838"
  }

  return (
    <div style={pageStyles}>
      {loading ? (
        <SpinnerComponent />
      ) : (
        <div style={pageStyles}>
          <img
            src="https://gogoacarrentals.com/wp-content/uploads/2019/02/tick.gif" // Example success GIF
            alt="Success"
            style={gifStyles}
          />
          <h1 style={messageStyles}>Order Successfully Placed!</h1>
          <button
            style={buttonStyles}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
            onClick={() => navigate(MY_ORDERS_PATH)}
          >
            View My Orders
          </button>
        </div>
      )}
    </div>
  )
}

export default SuccessPage
