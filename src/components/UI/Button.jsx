import React from 'react';
import Styles from './Button.module.css';

const Button = (props) => {
  return (
    <button
      className={`${Styles.primary_btn} pt-3 pb-3 pl-6 pr-6 mt-5 ${props.className}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Button;