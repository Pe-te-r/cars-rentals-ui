import InputDiv from "./InputDiv"


interface DynamicFormTypes{
    handleCancelClick: () => void;
    handleSaveClick: () => void;
    shareFunctions: any;
    heading: string;
    updateLoading: any
}

const DynamicForm = ({heading,handleCancelClick,handleSaveClick, shareFunctions,updateLoading}: DynamicFormTypes) => {
  
  // }
  return (
        <div className="fixed inset-0  bg-gray-900 bg-opacity-85 flex items-center justify-center">
          <div className="form-modal bg-gray-900 w-1/2 rounded-lg p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{heading}</h2>
            <form>
              {
                shareFunctions.map((item: any, index: number) => (
                  <InputDiv key={index} label={item.text} placeholder="" type="text" value={item.value} setData={(value:string)=>item.changeValue(value)}/>
                ))
              }              
              <div className="flex mt-3 justify-end">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleSaveClick}
                >
                  {updateLoading? <span className="loading loading-spinner loading-xs"></span>
                  :'Save'}
                </button>
                <button
                  type="button"
                  className={`ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ${updateLoading ? 'bg-gray-800 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'}`}
                  onClick={handleCancelClick}
                  disabled={updateLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
    )
}

export default DynamicForm
