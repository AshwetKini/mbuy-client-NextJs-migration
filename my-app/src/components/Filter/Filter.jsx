import React, { useState, useEffect } from 'react';
import Styles from './Filter.module.css';
import { FaFilter } from 'react-icons/fa';
import Button from '../UI/Button';

const Filter = (props) => {
  const [mergedTags, setMergedTags] = useState(null);
  // const [props.selectedTags, props.setSelectedTags] = useState({});

  useEffect(() => {
    const mergeTags = () => {
      const tempMergedTags = {};
      for (const product of props.products) {
        for (const tag of product.tags) {
          console.log(tag);
          const { variant, value } = tag;
          if (!tempMergedTags[variant]) {
            tempMergedTags[variant] = [];
          }
          tempMergedTags[variant].push(value);
        }
      }
      const cleanedObj = {};

      for (const key in tempMergedTags) {
        if (Object.hasOwnProperty.call(tempMergedTags, key)) {
          const array = tempMergedTags[key];
          const uniqueArray = [...new Set(array)];
          cleanedObj[key] = uniqueArray;
        }
      }
      setMergedTags(cleanedObj);
    };

    mergeTags();
  }, [props.products]);

  const handleCheckboxChange = (heading, item) => {
    props.setSelectedTags((prevSelectedTags) => ({
      ...prevSelectedTags,
      [heading]: {
        ...(prevSelectedTags[heading] || {}),
        [item]: !prevSelectedTags[heading]?.[item]
      }
    }));
  };

  const handleApplyFilter = () => {
    const selectedValues = [];
    for (const heading in props.selectedTags) {
      for (const item in props.selectedTags[heading]) {
        if (props.selectedTags[heading][item]) {
          selectedValues.push(item);
        }
      }
    }
    props.filter(selectedValues);
  };

  return (
    <div className={Styles.sideDiv}>
      <div>
        <h1 className={`text-lg font-semibold border-b border-black-100`}>
          <FaFilter className={`inline-block mr-2`} />
          Filter
        </h1>
      </div>
      <div>
        {mergedTags
          ? Object.keys(mergedTags).map((heading) => {
            return (
              <div key={heading}>
                <h2 className={`text-md font-semibold`}>{heading}</h2>
                <div className={`flex flex-col`}>
                  {mergedTags[heading].map((item) => (
                    <div key={item}>
                      <input
                        type="checkbox"
                        id={item}
                        checked={props.selectedTags[heading] && props.selectedTags[heading]?.[item] || false}
                        onChange={() => handleCheckboxChange(heading, item)}
                        className={`mx-2`}
                      />
                      <label htmlFor={item}>{item}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
          : ''}
        <Button
          className={`w-full`}
          value="Apply Filter"
          onClick={handleApplyFilter}
        />
      </div>
    </div>
  );
};

export default Filter;
