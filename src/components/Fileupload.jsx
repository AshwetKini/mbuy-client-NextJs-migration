'use client'
import React from 'react';

// A reusable and validated file upload component
const FileUploadInput = ({
  id,
  label,
  onFileChange,
  fileName,
  error,
  required = false,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <label htmlFor={id} className="mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <label
        htmlFor={id}
        className={`flex h-full flex-col items-center justify-center rounded-md border-2 border-dashed px-4 py-5 text-center transition-colors duration-200 ease-in-out ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <svg
          className="mx-auto h-10 w-10 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="mt-2 text-sm font-medium text-primary hover:underline cursor-pointer">
          {fileName || 'Upload a file'}
        </span>
        <input
          id={id}
          name={id}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          className="sr-only"
          onChange={(e) => onFileChange(e.target.files ? e.target.files[0] : null)}
        />
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </label>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUploadInput;