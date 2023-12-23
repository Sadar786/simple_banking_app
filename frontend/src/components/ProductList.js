import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
export default function ProductList() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getproducts();
  }, [])
  const getproducts = async () => {
    let result = await fetch('http://localhost:5000/product',
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
    result = await result.json();
    setProducts(result)
  }

  const deleteCustomer = async (id) => {
    console.log(id);
    let response = await fetch(`http://localhost:5000/delProduct/${id}`, {
      method: "Delete",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      }
    );

    if (response.ok) {
      try {
        getproducts();
        let result = await response.json();
        console.log(result);
      } catch (error) {
        // Handle the case where the response is not valid JSON
        console.error("Invalid JSON response:", error);
      }
    } else {
      // Handle non-successful responses (e.g., error handling)
      console.error("Request failed with status:", response.status);
    }
  }

  const searchHandle = async (event) => {
    let key = event.target.value
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`,
      {
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      }
      );
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getproducts();
    }

  };

  return (
    <div className="product">
      <div className='product_list'>
        <h3 style={{ paddingTop: '30px' }}>List Of Accounts</h3>
        <input className='search_bar' type='text' placeholder='Search Account' onChange={searchHandle} />
        <ul >
          <li>S:NO</li>
          <li>Name</li>
          <li>Balance</li>
           <li>Send Money</li>
        </ul>

        {
          products.length > 0 ? products.map((item, index) =>
            <ul key={item._id} className='item-box'>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>${item.price}</li>
              <li>
                <Link to={"/updates/" + item._id}>Select</Link></li>
            </ul>
          ) : <h1>Account Not Found!</h1>
        }
      </div>
    </div>
  )
}
