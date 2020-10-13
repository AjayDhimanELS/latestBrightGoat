import React from "react"
import { Link, graphql, useStaticQuery, navigate } from "gatsby"
import "../styles/index.css"
import { isLoggedIn, logout } from "../services/auth"


const Header = () => {
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

  return (
    <>
    <nav className="navbar navbar-expand-lg w-100" style={{background: "#1f2227"}}>
    <Link className="navbar-brand" to="/">
          <h1 className="ml-3" style={{color: "#9daaaa"}}>{data.site.siteMetadata.title}</h1><p className="ml-3" style={{color: "#9daaaa"}}>{data.site.siteMetadata.subtitle}</p>
    </Link>
        <ul className="theSiteNavbar navbar-nav ml-auto">
          <li key="1" className="nav-item">
            <Link className="nav-link" to="/about"><p>About Us</p></Link>
          </li>
          <li key="2" className="nav-item">
            <Link className="nav-link" to="#"><p>Contact Us</p></Link>
          </li>
          {isLoggedIn() ? (
          <li key="3" className="nav-item">
            <Link
              className="nav-link"
              to="/"
              onClick={event => {
                event.preventDefault()
                logout(() => navigate(`/app/login`))
              }}
            ><p>
              Logout</p>
            </Link></li>
            ) : (
              <>
            <li key="4" className="nav-item">
              <Link className="nav-link" to="/app/login"><p>Login</p></Link>
            </li>
            <li key="5" className="nav-item">
              <Link className="nav-link" to="/users"><p>Sign-Up</p></Link>
            </li>
            </>
            )}
        </ul>
      </nav>
     </>
     )
}
export default Header
