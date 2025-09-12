import React from 'react';
import Styles from './UserDetailsSideTable.module.css';
import { Link } from 'react-router-dom'

const UserDetailsSideTable = () => {
  return (
    <>
      <div className={`${Styles.ProductSideDiv}`}>
        <h1>User Profile</h1>
        <h2 ><Link to="/profile">User Details</Link></h2>
        <h2 ><Link to='/manageaddress'>Manage Addresses</Link></h2>
        <h2 ><Link to='/orders'>Orders Status</Link></h2>
        {/* <h2 ><Link to='/orderhistory'>Order History</Link></h2>         */}
      </div>
    </>
  )
}

export default UserDetailsSideTable