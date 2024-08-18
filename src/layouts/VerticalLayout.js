// src/layouts/VerticalLayout.js

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Layout from "@layouts/VerticalLayout";
import { allRoutes } from "@src/navigation/vertical";

const VerticalLayout = (props) => {
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("USER_OBJECT"));
    const userRole = user?.userRole;

    if (userRole) {
      const routes = allRoutes.filter(route => route.roles.includes(userRole));
      setFilteredRoutes(routes);
    }
  }, []);

  return (
    <Layout menuData={filteredRoutes} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
