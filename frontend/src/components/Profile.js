import React from 'react';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='profile'>
      <ul>
        <li className='profile-item'>
          <h3 className='profile-heading'>Name: {user.name}</h3>
        </li>
        <li className='profile-item'>
          <h3 className='profile-heading'>Email: {user.email}</h3>
        </li>
        <br />
        <li className='profile-item'>
          <h3 className='profile-heading'>ID: {user._id}</h3>
          <br /> 
          <h3 className='profile-heading' style={{color:"blue"}}>Current Balance: {user.money}$</h3>
        </li>
      </ul>
    </div>
  );
}
