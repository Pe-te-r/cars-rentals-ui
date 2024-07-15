import React from 'react';

interface TableProps {
  headers: string[];
  data: { [key: string]: any }[];
  onEdit?: any;
  onDelete?: any;
  onSave?: (row: { [key: string]: any }) => void;
  onCancel?: () => void;
}

const DynamicTable: React.FC<TableProps> = ({ headers, data, onEdit, onDelete}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-yellow-50 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-700 text-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2">{header}</th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-gray-800 border-b border-gray-200">
              {headers.map((header, index) => (
                <td key={index} className="px-4 py-2 text-gray-300 font-bold">{row[header]}</td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-2">
                  {onEdit && (
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none"
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="ml-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 focus:outline-none"
                      onClick={() => onDelete(row.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
