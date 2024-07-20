import { InputDivTypes } from "../types/types"

const InputDiv = ({label,type,placeholder,setData,value,required=true}:InputDivTypes) => {
  return (
    <div>
              <label className="block mb-1 text-white">{label}</label>
              <input
                type={type}
                required={required}
                value={value|| ''}
                onChange={(e: any)=>setData(e.target.value)}
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                placeholder={placeholder}
              />
    </div> 
  )
}

export default InputDiv