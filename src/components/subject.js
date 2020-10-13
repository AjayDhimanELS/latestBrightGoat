import React from "react"
import { graphql, Link } from "gatsby"
import "../styles/index.css"
import Footer from "../layout/footer"
import Layout from './layout'
export default ({ data }) => { 
    let prev; 
    var list=[],hello,bookimages=[]; 
    const subject = data.mysqlSubjects;
    const files = data.allFile.edges;
    
    subject.books.forEach(sbook=>{
      bookimages.push(sbook.image)
    })

    for (var i=0;i<bookimages.length;i++)
    { 
      files.forEach(edge=>{
        if(edge.node.name === bookimages[i])
        {
          hello = edge.node.publicURL 
        }
      })
    }
    subject.books.forEach((sbook,i)=>{
      
      if(sbook.name!==prev){
        list.push(
        <div className="col-lg-6 theDiv">
          <Link key={i} to={"/app/"+subject.name+"/"+sbook.book_id} style={{color:"black", textDecoration: "none"}}>
            <div className="row w-100 theData">
              <div className="col-3">
                <img className="" src={hello} width="100px" alt="Card cap"/>
              </div>
              <div className="col-9">
                <div className="">
                  <h5>{sbook.name}</h5>
                  <p>Author: {sbook.author}</p>
                  <p>ISBN: {sbook.isbn}</p><br/>
                  <p className="viewP">View all our solutions for this book &gt;&gt;</p>
                </div>
              </div>
              
            </div>
          </Link> 
        </div>
        )
      }         
      prev = sbook.name;    
    })
    return (
      <>
      <Layout>
      <div className="container mt-5">
        <h2>Video TextBook Solutions</h2>
          <p className="breadcrumbs"><span><Link to="/">Home</Link></span> &gt; <span className="activeSpan">{subject.name}</span></p>
          <div className="theVideoDiv">  
              <h3>{subject.name}</h3>
              <div className="row w-100">
              {list}
              </div>
          </div>
        </div>
        </Layout>
        {/* <Footer/> */}
        </>
    )
    }

  
export const pageQuery = graphql`
query($theId: Int!){
   mysqlSubjects(subject_id: { eq: $theId }){
    name 
    subject_id
    books{
        name
        author
        image
        book_id
        isbn
      }
    }
    allFile{
      edges{
        node{
          name
          publicURL
        }
      }
    }
  }
`