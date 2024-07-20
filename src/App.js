import React, { Suspense, useEffect } from "react";

// ** Router Import
import Router from "./router/Router"
import { useDispatch } from "react-redux"
import { routePathHandler } from "@store/routePath";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Dispatch the initial path when the app starts
    dispatch(routePathHandler(window?.location?.pathname))
  }, [dispatch])

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  )
}

export default App
