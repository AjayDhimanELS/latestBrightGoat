import React from "react"
import {  StaticQuery,navigate, graphql, Link } from "gatsby"
import { handleLogin, isLoggedIn, setUser } from "../services/auth"
import bcrypt from 'bcryptjs'
import { useEffect } from 'react'
import Footer from "../layout/footer";
// import fetch from 'express'

export class Login extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      tried: false,
      message: "",
      thedb: [],
      // username: ``,
      // password: ``,
      loggedIn: false
    }
    // this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // window.tried = false;
	}
  
  componentDidMount(){
    fetch('/api/app/login',{ 
      method: 'GET'})
      .then(response => response.json())
      .then(result => 
        {
          this.setState({ thedb: result })
          // console.log("This is the data : "+result)
        });
  }

  // handleUpdate = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value.trim(),
  //   })
  // }

  handleSubmit(event){
    event.preventDefault();
    const self = this;
    // console.log("getting the request with : ",this.state.username,this.state.password);
    // console.log("getting the request with : ",self.refs.username.value.trim(),self.refs.password.value.trim());

    // var bol = handleLogin(this.state,this.state.thedb)
    
      // console.log("1st ",this.state.tried);
      // window.tried = true;
      this.state.thedb.some(u=>{
      
        if (self.refs.username.value.trim() === u.name){  
          // if (this.state.username === u.name){  
      //   bcrypt.compare(this.state.password,u.password, function(err, res) {
        bcrypt.compare(self.refs.password.value.trim(),u.password, function(err, res) {
          if(res)
          { 
            setUser({
            username: u.name,
            name: u.name,
            });
            // console.log("got it for "+u.name);
            navigate('/')
            self.setState({ loggedIn: true, message : "" });  
            //component refreshes here
            // console.log("user logged in")
            return true;
          }
        });   
      }  
    });
  this.setState({tried: true,message : "Please enter the correct credentials!" })
}

  render() {
    //   console.log("This is tried : ",this.state.tried);
    // console.log("This is loggedIn : ",this.state.loggedIn);
    // console.log("This is the check : ",(this.state.tried && this.state.loggedIn));
    // console.log("window.tried : " , window.tried ? "true" : "false");
    // console.log("message",this.state.message);
    var message = "";
    // if(window.tried && this.state.loggedIn)
    // // if(this.state.tried && this.state.loggedIn)
    // {
    //   console.log("It is already tried and you are loggedin as well so no message");
    // }
    // else if(window.tried)
    // // else if(this.state.tried)
    // {
    //   console.log("tried and not logged in");
    //   message = "There is something wrong with the credentials you just entered! Please try again.";
    // }
    
    return (      
      <>
      <div className="container mt-5">
      { !isLoggedIn() ? (
        <>
          {/* {this.setState({ message: 'Please enter the correct credentials!' })} */}
          <div class="col-lg-12 d-flex justify-content-center mt-4 mb-1">
            <p style={{color:"red"}}>
              {message}
            </p>
          </div>
          <div class="row justify-content-center">
                <div class="card" className="px-5 py-5" style={{borderRadius : '8px',boxShadow : '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <h2 className="mb-4">Log-In</h2>
                <form className="form-group" method="post" onSubmit={this.handleSubmit}>
                  <div class="form-row row w-100 justify-content-center">
                      <div class="col-lg-5 ">
                          <label class="mr-2 col-form-label-sm w-100">Email ID :&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      </div>
                      <div class="col-lg-6">
                          {/* <input type="email" id="email" onChange={this.handleUpdate} class="form-control form-control-sm w-100" name="username" required/> */}
                          <input type="email" id="email" class="form-control form-control-sm w-100" ref="username" required/>
                      </div>
                    </div>
                    
                    <div class="form-row row w-100 justify-content-center">
                      <div class="col-lg-5 ">
                          <label for="password" class="mr-2 col-form-label-sm w-100">Password :&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      </div>
                      <div class="col-lg-6">
                          {/* <input type="password" id="password" onChange={this.handleUpdate}  class="form-control form-control-sm w-100" name="password" required/> */}
                          <input type="password" id="password" class="form-control form-control-sm w-100" ref="password" required/>
                      </div>
                    </div>
                    
                    <div class="col-lg-12 d-flex justify-content-center mt-4 mb-1">
                        <button type="submit"  class="TheBTN btn btn-md btn-info" >Submit</button>
                    </div>
                  </form>
                  <br/><br/>

                  <div class="col-lg-12 d-flex justify-content-center mt-4 mb-1">
                    <h6>Don't have an ID yet? Register with us : </h6>
                  </div>
                  
                  <div class="col-lg-12 d-flex justify-content-center mt-4 mb-1">
                    <button className="btn btn-info" style={{width : "80%"}}><Link to="/users"><p style={{color:"white"}}>Register</p></Link></button>
                  </div>
                    </div>

              </div>
         
          </>
        ) 
        :
        (
        <>
          {/* {navigate('/')} */}
          <h4>Already logged in. Please go back to the <Link to="/" style={{color: "lightblue !important", textDecoration : "underline !important"}}>Home</Link></h4>
        </>
        )
      } 
        </div>
      
        {/* <Footer/> */}
      </>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allMysqlUsers{
          edges{
            node{
              name
              password
            }
          }
        }
      }
    `}
    render={(data) => (
      <Login site={data.allMysqlUsers}/>
    )}
  />
)