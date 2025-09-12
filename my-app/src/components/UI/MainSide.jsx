import React from 'react';
import Styles from './MainSide.module.css';
import Image from 'next/image';
// import img from '../../assests/material.png';

const MainSide = ({image}) => {
  return (
    <div>
        <Image src={image} alt=""width={300} height={500} />
    </div>
  )
}

export default MainSide