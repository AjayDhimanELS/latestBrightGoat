import React, { Children } from "react"

import Header from "../layout/header"

const Layout = ({children}) => (
  <>
    <Header/>
    {children}
  </>
)

export default Layout

