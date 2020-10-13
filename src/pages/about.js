import React from 'react'
import "../styles/index.css"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
const About =(props)=> {
    var data=props.data.allFile.edges
    var images=[];
    for(var i=0;i<data.length;i++){
        if(data[i].node.name==="pt" || data[i].node.name==="rin" || data[i].node.name==="3rd" )              
        {
            images.push([data[i].node.name,data[i].node.publicURL])
        }
    }
        return(
            <>
            <Layout>    
                <div className="container-fluid mt-5">
                    <h2 align="center">ABOUT-US</h2>
                </div>
                <div className="container-fluid mt-2 justify-content-center" style={{ padding:"20px 50px"}}>
                    <p align="center" style={{fontSize: "20px"}}>Founded in 2013, BrightGoat is a leading brand in educational content development across all STEM and Business subjects. It is the result of our meticulous preparation, hard work, and years of experience delivering quality content to students globally.</p>
                    
                    {/* {console.log(images)} */}
                    <div className="mt-5" style={{background:"white",padding:"50px"}}>
                    <h4 align="center" className="mt-5">Our Inspiring Team</h4>
                    <img className="mt-5" src={images[0][1]} alt={images[0][0]} width="200px" style={{display:"block", marginLeft:"auto", marginRight:"auto"}}/>
                    {/* { console.log(images[1][1])  } */}
                    <br/><h4 align="center" style={{fontWeight:"bold"}}>Praveen Tyagi</h4>
                    <p align="center" style={{fontWeight:"bold"}}>Founder</p>
                    <p className="mt-4 mb-5" style={{fontSize: "20px"}}>Praveen Tyagi began his career in education in 2001, teaching courses on wireless applications at UC Berkeley (California) and IIT-D (New Delhi). Soon after he started Quest Tutorials, which he grew into a network of 10 test prep centers before it was acquired by Meritnation, India’s largest online K-12 learning platform. In the early days of Quest Tutorials, Praveen taught just about every subject himself. He developed his own lecture notes and assignments, eventually becoming an expert in instruction design.

                        In 2012, Praveen founded BrightGoat Systems, a leading provider of educational content for K-12 and University students. He firmly believes in hiring teachers, not just subject matter experts, to develop every content discipline. He is proud to be a trusted partner to over a dozen top educational publishers and ed-tech companies in the world.

                        Praveen has a Bachelor’s degree from IIT Roorkee and a Master’s degree from the University of Alabama. Before following his true calling in education, he was a software engineer at Silicon Valley firms Oracle and Brience.</p>
                    

                    <img className="mt-5" src={images[2][1]} alt={images[2][0]} width="200px" style={{display:"block", marginLeft:"auto", marginRight:"auto"}}/>
                    {/* { console.log(images[1][1])  } */}
                    <br/><h4 align="center" style={{fontWeight:"bold"}}>Rinki</h4>
                    <p align="center" style={{fontWeight:"bold"}}>Chief Operations Officer</p>
                    <p className="mt-4" style={{fontSize: "20px"}}>Rinki has had a inspirational run with the corporate sector over the last 2 decades, with stints at biggies such as GAP, Expeditors and Ikea. Having handled big operations teams at each of these for providing logistics support made her transition into the role of Chief Operations Office at BrightGoat a natural progression. She has created and conducted online training for her team members and also provided content support to ensure the modules developed help the companies in the long run. Her training skills help run all tutoring projects at BrightGoat.

                        In 2012, she founded BrightGoat Systems along with Praveen and took to ensuring smooth operations of all projects from day 1. Her project management skills were put to gruelling tests in the initial days whenever weekly deadlines approached and her team needed her support to sail through.

                        Rinki has a bachelors from Delhi University and a masters from Apeejay School of Marketing.</p>
                        </div>
                    <div className="row w-100 mt-5">
                        <div className="col-lg-6">
                            <p style={{fontSize: "20px"}}> All content developed at BrightGoat is driven by Student Outcomes. Our 300+ subject matter experts have past teaching experience, which they draw upon to create content that inspires learning.
                                Our methodology has demonstrated results: 86% of students have reported an increase in their SAT, ACT or GMAT scores.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            {
                             <img src={images[1][1]} alt="3rdImage" width="600px"/>   
                            }
                        </div>
                    </div>
                </div>
            </Layout>
            
            </>
            ) 
        }
export default About

export const pageQuery = graphql`
query{
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