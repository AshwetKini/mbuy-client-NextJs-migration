import React from 'react';
import Styles from './DropDown.module.css';

const DropDown = ({options, selected}) => {
  return (
    <select className={`${Styles.dropdown} border`} onChange={(e) => selected(e.target.value)}>
		{
			options.map((option, index) => {
				return <option key={index} value={option.value}>{option.displayValue}</option>
			})
		}
	</select>
  )
}

export default DropDown