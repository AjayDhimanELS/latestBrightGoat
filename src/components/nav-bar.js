import React from "react"
import { Link, navigate, useStaticQuery,graphql } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"

export const NavBar = () => {
  let greetingMessage = ""
  if (isLoggedIn()) {
    greetingMessage = ``
  } else {
    greetingMessage = ""
  }

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          subtitle
        }
      }
    }
  `)
  console.log(data.site);
  return (
      <nav>
         <h1>{data.site.siteMetadata.title}</h1>
        <Link to="/">Home</Link>
        {` `}
        <Link to="/app/profile">Profile</Link>
        {` `}
        {isLoggedIn() ? (
          <Link
            to="/"
            onClick={event => {
              event.preventDefault()
              logout(() => navigate(`/app/login`))
            }}
          >
            Logout
          </Link>
        ) : null}
      </nav>
    )
}