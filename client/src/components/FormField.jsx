import React from 'react'

const FormField = ({ LabelName, type, name, placeholder, value, handleChange,
  isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name} className='block text-sm font-medium text-white'>
          {LabelName}
        </label>
        {isSurpriseMe && (
          <button type='button' onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#0a3945] text-white py-2
          px-3 rounded-[5px] hover:bg-[#296f82] transition ">
            Random prompt
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
        
      />
    </div>
  )
}

export default FormField