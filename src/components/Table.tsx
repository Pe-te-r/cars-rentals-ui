import React, { useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

interface TableProps {
  headers: string[];
  data: { [key: string]: any }[];
  onEdit?: any;
  onDelete?: any;
  onSuccessDelete?: boolean;
  onDeleteLoading?: boolean;
}

const DynamicTable: React.FC<TableProps> = ({ headers, data, onEdit, onDelete, onDeleteLoading }) => {
  const [deletingRowId, setDeletingRowId] = useState<string | null>(null);

  const handleDeleteClick = async (id: string) => {
    setDeletingRowId(id);
    if (onDelete) {
      await onDelete(id);
    }
    setDeletingRowId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className='bg-gray-700'>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2">{header}</th>
            ))}
            {(onEdit || onDelete) && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-gray-800 hover">
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
                      <MdModeEdit size={21} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="ml-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 focus:outline-none"
                      onClick={() => handleDeleteClick(row.id)}
                    >
                      {deletingRowId === row.id && onDeleteLoading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <RiDeleteBin5Line size={21} />
                      )}
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
