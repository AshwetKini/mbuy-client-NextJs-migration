import React from 'react';
import Styles from './MainSide.module.css';
// import img from '../../assests/material.png';

const MainSide = ({image}) => {
  return (
    <div>
        <img src={image} alt="" width="300" />
    </div>
  )
}

export default MainSide