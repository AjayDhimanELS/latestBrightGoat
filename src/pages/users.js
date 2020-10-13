import React from 'react'
import "../styles/index.css"
import Layout from "../components/layout"
//import { redirectTo } from '@reach/router'
import {navigate, Link} from 'gatsby'

class User extends React.Component {
    constructor() {
      super();
      this.state = { user: {},message:'' };
      this.onSubmit = this.handleSubmit.bind(this);
    }
   
    handleSubmit(e) {
      e.preventDefault();
      var self = this;
      if(self.refs.username.value.trim()!=="" && self.refs.password.value.trim() !=="")
      {
          // console.log("data: ", {
        //   name: self.refs.username.value,
        //   password: self.refs.password.value
        // });
        fetch('/api/users', { 
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: self.refs.username.value.trim(),
              password: self.refs.password.value.trim()
              
            }),
          })
          .then(function(response) {
            return response.json()
          }).then(function(body) {
            // console.log(body);
          });
          navigate(`/app/login`)
      }
      else 
      this.setState({ message: 'Can\'t give you empty username ' })
    }
    render() {
      return (
        <>
        <Layout>
          <div className="container w-100 mt-5">
            <div class="row justify-content-center">
                <div class="card" className="px-5 py-5" style={{borderRadius : '8px',boxShadow : '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <h2 className="mb-4">Register</h2>
                  <form className="form-group" onSubmit={this.onSubmit}>
                  <div class="form-row row w-100 justify-content-center">
                      <div class="col-lg-5 ">
                          <label class="mr-2 col-form-label-sm w-100">Email ID :&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      </div>
                      <div class="col-lg-6">
                          <input type="email" id="email" class="form-control form-control-sm w-100" ref="username" name="email" required/>
                      </div>
                    </div>
                    
                    <div class="form-row row w-100 justify-content-center">
                      <div class="col-lg-5 ">
                          <label for="password" class="mr-2 col-form-label-sm w-100">Password :&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      </div>
                      <div class="col-lg-6">
                          <input type="password" id="password"  class="form-control form-control-sm w-100" ref="password" name="password" required/>
                      </div>
                    </div>
                    
                    <div class="col-lg-12 d-flex justify-content-center mt-4 mb-1">
                        <button type="submit"  class="TheBTN btn btn-md btn-info" >Submit</button>
                    </div>
{/* 

                    <input type="text" className="form-control" placeholder="Enter your Email"  required/>&nbsp;&nbsp;&nbsp;
                    <input type="password" className="form-control" placeholder="Enter a Password"  required/>
                    &nbsp;&nbsp;&nbsp;<input className="btn btn-info" type="submit" /> */}
                  </form>
                  <p style={{color: "red"}}>{this.state.message}</p>
                  <br/><br/>

                  <div class="col-lg-12 d-flex justify-content-center mt-4 mb-1">
                    <h6>Already a member? Please Login :</h6>
                  </div>
                  
                  <div class="col-lg-12 d-flex justify-content-center mt-4 mb-1">
                    <button className="btn btn-info" style={{width : "80%"}}><Link to="/app/login"><p style={{color:"white"}}>Login</p></Link></button>
                  </div>
                </div>
            </div>
          </div>
        </Layout>
        {/* <Footer/> */}
        </>
      );
    }
  }
  export default User