import React from "react"
import { Link } from "gatsby"
import "../styles/index.css"

const Footer = () => {
  return (
        <footer className="mt-2">
            <div className="row w-100" style={{padding:"20px 20px 20px 40px"}}>
                <div className="col-lg-10">
                    <Link to="/"><h3 style={{color:"#aaa"}}>BrightGoat</h3></Link>
                </div>
                <div className="col-lg-1">
                   <Link to="/about"><p className="footerli" style={{color:"#aaa"}}>About Us</p></Link>
                </div>
                <div className="col-lg-1">
                    <Link to="#"><p className="footerli" style={{color:"#aaa"}}>Contact Us</p></Link>
                </div>
            </div>
        </footer>
     )
}
export default Footer
