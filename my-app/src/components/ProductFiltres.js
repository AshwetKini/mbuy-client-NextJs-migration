import React from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

const ProductFilters = ({
  selectedCategories,
  selectedSubcategories,
  selectedTags,
  availableCategories,
  availableSubcategories,
  availableTagFilters,
  searchTerm,
  setSelectedCategories,
  setSelectedSubcategories,
  handleTagChange,
  clearAllFilters,
  isMobileFilterOpen,
  setIsMobileFilterOpen,
}) => {
  const renderFilterContent = (isMobile = false) => (
    <>
      {/* Tag Filters */}
      {searchTerm && Object.keys(availableTagFilters).length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-blue-950">Product Specification</h4>
          {Object.entries(availableTagFilters).map(([tagVariant, tagValues]) => (
            <div key={tagVariant} className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {tagVariant}
              </label>
              <select
                className="w-full p-2 border rounded text-sm"
                value={selectedTags[tagVariant] || ""}
                onChange={(e) => handleTagChange(tagVariant, e.target.value)}
              >
                <option value="all">All {tagVariant}</option>
                {tagValues.map(value => (
                  <option key={value} value={value} className="capitalize">
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Category Filters */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-blue-950">Categories ({availableCategories.length})</h4>
        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 bg-white">
          {availableCategories.length > 0 ? (
            availableCategories.map((category) => (
              <div key={category} className="flex flex-row items-center py-1">
                <input
                  type="checkbox"
                  id={`cat-${isMobile ? 'mobile-' : ''}${category}`}
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter((id) => id !== category));
                    }
                  }}
                  className="h-4 w-4"
                />
                <label htmlFor={`cat-${isMobile ? 'mobile-' : ''}${category}`} className="ml-2 text-sm">
                  {category}
                </label>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 py-1">No categories available</p>
          )}
        </div>
      </div>

      {/* Subcategory Filters */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-blue-950">Subcategories ({availableSubcategories.length})</h4>
        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 bg-white">
          {availableSubcategories.length > 0 ? (
            availableSubcategories.map((subcategory) => (
              <div key={subcategory} className="flex items-center flex-row py-1">
                <input
                  type="checkbox"
                  id={`subcat-${isMobile ? 'mobile-' : ''}${subcategory}`}
                  value={subcategory}
                  checked={selectedSubcategories.includes(subcategory)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSubcategories([...selectedSubcategories, subcategory]);
                    } else {
                      setSelectedSubcategories(selectedSubcategories.filter((id) => id !== subcategory));
                    }
                  }}
                  className="h-4 w-4"
                />
                <label htmlFor={`subcat-${isMobile ? 'mobile-' : ''}${subcategory}`} className="ml-2 text-sm">
                  {subcategory}
                </label>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 py-1">No subcategories available</p>
          )}
        </div>
      </div>

      {/* Clear Filters Button */}
      {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || 
        Object.keys(selectedTags).some(key => selectedTags[key])) && (
        <button 
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={() => {
            clearAllFilters();
            if (isMobile) setIsMobileFilterOpen(false);
          }}
        >
          Clear All Filters
        </button>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-full md:w-1/5 p-4 bg-gray-100 overflow-auto max-h-screen">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        {renderFilterContent(false)}
      </aside>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-[85%] bg-white p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            {renderFilterContent(true)}
            <button 
              className="w-full p-2 bg-blue-950 text-white rounded hover:bg-blue-800 transition-colors mt-4"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;