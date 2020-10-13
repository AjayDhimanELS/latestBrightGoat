import React from "react"
import { Link, graphql } from "gatsby"
import Footer from '../layout/footer'

import Layout from "../components/layout"

const Home =(props)=> {
  const subjects = props.data.allMysqlSubjects.edges;

  return (
    <>
    <Layout>
      <div className="container mt-5">
        <h2>Video TextBook Solutions</h2>
        <p>Home</p>
      </div>
        <br/><br/>
      <div className="container-fluid">
          <div className="row w-100">
          {subjects.map((subject,i) =>
            <div className="col-lg-3 d-flex justify-content-center text-center align-center">
              <Link  key={i} to={'/app/' + subject.node.name} style={{color:"black", textDecoration: "none"}}>
                  <div className="subjectsDiv"><h4>{subject.node.name}</h4></div>
              </Link>
            </div>
          )}
          <div className="col-lg-3 d-flex justify-content-center text-center align-center">
              <Link to="#" style={{color:"black", textDecoration: "none"}}>
                  <div className="subjectsDiv"><h4>History</h4></div>
              </Link>
            </div>
        </div>
      </div>
     </Layout>
    {/* <Footer/> */}
     </>
  )
}
export default Home

export const pageQuery = graphql`
query{
	allMysqlSubjects{
	  edges{
		node{
		  name 
		  books{
			  name
		  }
		 }
	  }
	 }
  } 
`