import React, { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate}  from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('token'));
    if(result){
      Navigate('/')
    }
  })

  const handlLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
     
    })
    result = await result.json();
    console.log(result);
    if(result.auth){
      localStorage.setItem("user", JSON.stringify(result.user))
      localStorage.setItem("token", JSON.stringify(result.auth))
      Navigate('/')
    }
    else{
      alert("result not found")
    }
  }
  return (
    <div className='login'>
      <h1 className='inputBox'>Login</h1>
      <input className='inputBox' type="text" placeholder='Enter Your Email' value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input className='inputBox' type="password" placeholder='Enter Your Password' value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button className='signUp-btn' type='button' onClick={() => handlLogin()}>Login</button>
    </div>
  )
}

export default Login;