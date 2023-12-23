import React, { useState } from 'react'
const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [catagory, setCatagory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);
  const [showAddMsg, setShowAddMsg] = useState('------------------------------')

  const handleAddProduct = async () => {
    if (!name || !price || !catagory || !company) {
      setError(true)
      return false;
    }
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let response = await fetch("http://localhost:5000/add_product", {
      method: "POST",
      body: JSON.stringify({ name, price, catagory, userId, company }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      setShowAddMsg('Product added, add more?')
      setName('');
      setPrice('');
      setCatagory('');
      setCompany('');

    }

  };



  return (
    <div className='Addproduct'>
      <h1 className='add'>Add Product</h1>
      <h3 className='addMore'>{showAddMsg}</h3>
      <input type="text" placeholder='Enter Prodeuct name' className='inputBox' value={name}
        onChange={(e) => { setName(e.target.value) }} />
      {error && !name && <span className='errorForInput'>Enter vilid Product Name</span>}
      <input type="text" placeholder='Enter Product Price' className='inputBox' value={price}
        onChange={(e) => { setPrice(e.target.value) }} />
      {error && !price && <span className='errorForInput'>Enter vilid Product Price</span>}
      <input type="text" placeholder='Enter Product Catagory' className='inputBox' value={catagory}
        onChange={(e) => { setCatagory(e.target.value) }} />
      {error && !catagory && <span className='errorForInput'>Enter vilid Product Catagory</span>}
      <input type="text" placeholder='Enter Product Company' className='inputBox' value={company}
        onChange={(e) => { setCompany(e.target.value) }} />
      {error && !company && <span className='errorForInput'>Enter vilid Product Company</span>}
      <button className='signUp-btn' onClick={() => handleAddProduct()} >Add Product</button>
    </div>
  )
}
export default AddProduct