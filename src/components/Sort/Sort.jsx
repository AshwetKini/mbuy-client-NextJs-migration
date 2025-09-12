import React, { useState } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import Styles from './Sort.module.css';
import Button from '../UI/Button';

const Sort = (props) => {
  const [sortOption, setSortOption] = useState(props.sortType);

  const handleCheckboxChange = (option) => {
    setSortOption(option);
    props.sort(option);
  };

  return (
    <>
      <div className="mt-0 md:mt-2">
        <h1 className={`text-lg font-semibold border-b border-black-100`}>
          <BiSortAlt2 className={`inline-block mr-2`} />
          Sort
        </h1>
      </div>
      <div className="flex flex-col">
        <div>
          <input
            type="radio"
            id="low"
            name="sortOption"
            value="low"
            checked={sortOption === 'low'}
            onChange={() => handleCheckboxChange('low')}
            // onChange={() => setSortOption('low')}
            className={`mx-2 ${Styles.radio_btn}`}
          />
          <label htmlFor="low">Low to High Price</label>
        </div>
        <div>
          <input
            type="radio"
            id="high"
            name="sortOption"
            value="high"
            checked={sortOption === 'high'}
            onChange={() => handleCheckboxChange('high')}
            // onChange={() => setSortOption('high')}
            className={`mx-2 ${Styles.radio_btn}`}
          />
          <label htmlFor="high">High to Low Price</label>
        </div>
        {/* <Button
          className={`w-full`}
          value="Apply Sorting"
          // onClick={handleApplyFilter}
          onClick={() => props.sort(sortOption)}
        /> */}
      </div>
    </>
  );
};

export default Sort;
