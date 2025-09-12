import React from 'react';
import styles from './Fullcontainer.module.css';

const Fullcontainer = (props) => {
  return (
    <div className={`${styles.fullconatiner} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Fullcontainer;
