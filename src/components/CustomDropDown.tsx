import { useState } from "react";

const CustomDropdown = ({ value, onChange, options }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: any) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none flex justify-between items-center"
      >
        {value==='true' ? "True" : "False"}
        <span className="ml-2">&#9662;</span> {/* Dropdown arrow */}
      </button>
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-gray-700 border border-gray-600 mt-1 rounded shadow-lg">
          {options.map((option: any) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="p-2 text-white cursor-pointer hover:bg-gray-600"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
