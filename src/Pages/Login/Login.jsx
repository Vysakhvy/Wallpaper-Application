import React, { useState } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')

    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter username and password')
      return
    }

    try {
      // Get the registered users from the JSON backend
      const response = await fetch('https://https://wallpaper-application.onrender.com/users')

      if (!response.ok) {
        throw new Error('Could not connect to the backend')
      }

      const users = await response.json()

      // Allow the user to login with either username or email
      const loginUser = users.find(
        (user) =>
          (user.username.toLowerCase() === username.trim().toLowerCase() ||
            user.email.toLowerCase() === username.trim().toLowerCase()) &&
          user.password === password
      )

      if (!loginUser) {
        setError('Invalid username/email or password')
        return
      }

      // Save the complete user, including the JSON Server id.
      localStorage.setItem('user', JSON.stringify({
        id: loginUser.id,
        username: loginUser.username,
        email: loginUser.email
      }))
      navigate('/gallery')
    } catch {
      setError('Backend is not running. Start JSON Server first.')
    }
  }

  return (
    <div style={{backgroundColor:'black', minHeight:'100vh'}}  className='overflow-hidden' >
      <div>
        <div className="row">
         <div className="col text-center">
  <img 
    src="https://img.magnific.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?semt=ais_hybrid&w=740&q=80" 

    style={{ width: '100%',height: '100%' }} 
  />
</div>

          <div style={{marginTop:'150px'}} className="col ">
            <h2 style={{fontSize:'2.5rem',fontWeight:'bold',textAlign:'center',marginTop:'50px'}}>Welcome </h2>
            <h4 style={{textAlign:'center',marginTop:'10px'}}>To your account</h4>

            <div style={{width:'100%',maxWidth:'400px',marginLeft:'auto',marginRight:'auto'}}>
              <MDBInput
                label="UserName"
                id="form1"
                type="text"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <MDBInput
                label="Password"
                id="form1"
                type="password"
                autoComplete="new-password"
                name="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-danger text-center mt-3">{error}</p>}

            <div className="d-flex justify-content-center " style={{marginTop:'20px'}}>
              <button className='btn btn-info' onClick={handleLogin}> Login</button>
            </div>

            <div className="d-flex justify-content-center ">New to here?  <Link to='/register' className='ms-1'>Register Now</Link> </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
