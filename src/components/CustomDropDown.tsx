import { useState } from "react";

const CustomDropdown = ({ value, onChange, options,height }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: any) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none flex justify-between items-center"
      >
        {options.find((option: any) => option.value === value)?.label || value}
        <span className="ml-2">&#9662;</span> {/* Dropdown arrow */}
      </button>
      {isOpen && (
        <ul className={`absolute top-full overflow-auto ${height} h-min left-0 w-full bg-gray-700 border border-gray-600 mt-1 rounded shadow-lg`}>
          {options.map((option: any) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
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
