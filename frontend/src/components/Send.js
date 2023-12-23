import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, parsePath } from 'react-router-dom';

const SendMoney = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const params = useParams();
  const Navigate = useNavigate();
  const [newAmount, setNewAmount] = useState(0);
  const user = localStorage.getItem('user');

   useEffect(() => {
    const getAccountDetail = async () => {
      try {
        let result = await fetch(`http://localhost:5000/products/${params._id}`, {
          headers: {
            'Content-Type': 'application/json',
             authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
          },
        });
        if (result.ok) {
          result = await result.json();
          setName(result.name);
          console.log(name)
           setPrice(result.price);
           console.log(price)
           console.log("11111")
         } else {
          console.error("Failed to fetch:", result.status, result.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    getAccountDetail();
  }, [params._id]);

  const calculatePrice = async () => {
    let userData = await JSON.parse(user);
    let moneySend = await parseFloat(userData.money);
   
    // Subtract the entered price from userData.money
    userData.money = await moneySend - newAmount;
  
    // Add the entered price to the present newAmount
    let updatedNewAmount = await parseFloat(newAmount) + parseFloat(price);
  
    // Update the state with the new values
    await setPrice(updatedNewAmount);
  
    // Update localStorage with modified userData
    await localStorage.setItem('user', JSON.stringify(userData));
  };
  
  
  const handleUpdateAccount = async () => {
    calculatePrice();

    let response = await fetch(`http://localhost:5000/product/${params._id}`, {
      method: "POST",
      body: JSON.stringify({   }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      Navigate('/');
    } else {
      console.error("Failed to update product:", response.status, response.statusText);

    }
  
  };

  return (
    <div>
      <h1 className='inputBox'>Sending Money</h1>
      <h2 className='inputBox'>{name}</h2>
      <h2 className='inputBox'>{price}</h2>
      <input
        type="text"
        placeholder='Enter Price to send'
         className='inputBox'
          onChange={(e) => { setNewAmount(e.target.value) }}
      />
      <button className='signUp-btn' onClick={() => handleUpdateAccount()}>Pay Now</button>
    </div>
  );
};

export default SendMoney;
