import bcrypt from 'bcryptjs'
export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

export const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
  

export const handleLogin = ({ username, password },user) => {
  // console.log("In handleLogin");
  user.some(u=>{
    console.log(u.name);
    if (username === u.name){
      bcrypt.compare(password,u.password, function(err, res) {
        // res === true
        if(res)
        { 
          console.log("matched for : "+u.name);
          setUser({
          username: u.name,
          name: u.name,
          });
          return true;    
        }
      });   
    }  
  });
  return false;
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
} 


