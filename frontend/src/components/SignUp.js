import React, { useState, useEffect } from 'react'
 import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [money, setMoney] = useState(0);
  const Navigate = useNavigate();
   const auth = localStorage.getItem('user')
   const [emailPresentMsg, setEmailPresentMsg] = useState('')
  useEffect(()=>{
    if(auth){
      Navigate('/')
    }
  })

  const collectData = async () => {
    try {
      let result = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password , money }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      result = await result.json();
      console.log(result);
      if (result.auth) { // Check for 'auth' in the response
        localStorage.setItem("user", JSON.stringify(result.result)); // Store 'result' instead of 'result.user'
        localStorage.setItem("token", JSON.stringify(result.auth));
        Navigate('/');
      } else {
        alert("Registration failed"); // Handle the case when registration fails
      }
    } catch (error) {
      setEmailPresentMsg('Email is used! login OR try by another Email')
      console.error("An error occurred:", error);
    }
  }
  
  

  return (
    <div className='signUp'>
      <h1 className='inputBox'>Register</h1>
      <h3 className='addMore'>{emailPresentMsg}</h3>
      <input className='inputBox' type='text' placeholder='Enter Name' value={name} required
        onChange={(e) => setName(e.target.value)}></input>

      <input className='inputBox' type='text' placeholder='Enter Email' value={email} required
        onChange={(e) => setEmail(e.target.value)}></input>

      <input className='inputBox' type='password' placeholder='Enter Password' value={password} required
        onChange={(e) => setPassword(e.target.value)}></input>

      <input className='inputBox' type='Number' placeholder='Enter your money (Optional)' value={money} 
        onChange={(e) => setMoney(e.target.value)}></input>
      <button type='button' className='signUp-btn' onClick={()=>collectData()} >Sign Up</button>
    </div>
  )
}

export default SignUp;