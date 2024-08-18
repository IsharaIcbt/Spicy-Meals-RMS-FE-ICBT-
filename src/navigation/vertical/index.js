
import {
  Grid,
  Users,
  UserCheck,
  Home,
  CheckSquare,
  ShoppingBag,
  Mail,
  DollarSign,
  Clipboard,
  Server, User, MessageSquare
} from "react-feather"

export const allRoutes = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Grid size={25} />,
    navLink: "/dashboard",
    roles: ["ADMIN", "STAFF"]
  },
  {
    id: "users",
    title: "Manage Users",
    icon: <Users size={25} />,
    navLink: "/adminPanel/manageUser",
    roles: ["ADMIN"]
  },
  {
    id: "customers",
    title: "Customers",
    icon: <UserCheck size={25} />,
    navLink: "/adminPanel/customers",
    roles: ["ADMIN"]
  },
  {
    id: "restaurant",
    title: "Restaurants",
    icon: <Home size={25} />,
    navLink: "/adminPanel/manageRestaurant",
    roles: ["ADMIN"]
  },
  {
    id: "facility",
    title: "Facilities",
    icon: <CheckSquare size={25} />,
    navLink: "/adminPanel/manageFacility",
    roles: ["ADMIN"]
  },
  {
    id: "meals",
    title: "Manage Meals",
    icon: <ShoppingBag size={25} />,
    navLink: "/adminPanel/manageMeals",
    roles: ["ADMIN"]
  },
  {
    id: "queries",
    title: "Manage Queries",
    icon: <Mail size={25} />,
    navLink: "/adminPanel/queries",
    roles: ["ADMIN", "STAFF"]
  },
  {
    id: "payments",
    title: "Manage Payments",
    icon: <DollarSign size={25} />,
    navLink: "/adminPanel/payments",
    roles: ["ADMIN", "STAFF"]
  },
  {
    id: "reports",
    title: "Manage Reports",
    icon: <Clipboard size={25} />,
    navLink: "/adminPanel/reports",
    roles: ["ADMIN"]
  },

  {
    id: "my_profile",
    title: "My Profile",
    icon: <User size={25} />,
    navLink: "/my-profile",
    roles: ["CUSTOMER"]
  },
  {
    id: "my_order",
    title: "My Orders",
    icon: <Clipboard size={25} />,
    navLink: "/my-orders",
    roles: ["CUSTOMER"]
  },
  {
    id: "my_reservation",
    title: "My Reservations",
    icon: <Server size={25} />,
    navLink: "/reservations",
    roles: ["CUSTOMER"]
  },
  {
    id: "my_queries",
    title: "My Queries",
    icon: <MessageSquare size={25} />,
    navLink: "/my-queries",
    roles: ["CUSTOMER"]
  }
]
