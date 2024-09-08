import React from "react";
import { useNavigate } from "react-router-dom";
import { MY_PROFILE_PATH } from "@src/router/routes/route-constant";

function ErrorPage() {
  const navigate = useNavigate();

  const pageStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    flexDirection: "column",
    textAlign: "center"
  };

  const gifStyles = {
    width: "300px",
    height: "auto",
    marginBottom: "20px"
  };

  const messageStyles = {
    fontSize: "24px",
    color: "#dc3545",
    marginBottom: "20px"
  };

  const buttonStyles = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  };

  const buttonHoverStyles = {
    backgroundColor: "#0056b3"
  };

  return (
    <div style={pageStyles}>
      <img
        src="https://cdn.dribbble.com/users/2469324/screenshots/6538803/comp_3.gif" // Example error GIF
        alt="Error"
        style={gifStyles}
      />
      <h1 style={messageStyles}>Oops! Something went wrong.</h1>
      <button
        style={buttonStyles}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
        onClick={() => navigate(MY_PROFILE_PATH)}  // Redirects to the home page
      >
        Go to Home
      </button>
    </div>
  );
}

export default ErrorPage;
