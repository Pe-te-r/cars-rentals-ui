import InputDiv from "./InputDiv"


interface DynamicFormTypes{
    handleCancelClick: () => void;
    handleSaveClick: () => void;
    shareFunctions: any;
}

const DynamicForm = ({handleCancelClick,handleSaveClick, shareFunctions}: DynamicFormTypes) => {
    return (
        <div className="fixed inset-0  bg-gray-900 bg-opacity-85 flex items-center justify-center">
          <div className="bg-gray-900 w-1/2 rounded-lg p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form>
              {
                shareFunctions.map((item: any, index: number) => (
                  <InputDiv key={index} label={item.text} placeholder="" type="text" value={item.value} setData={item.changeValue}/>
                ))
              }              
              <div className="flex mt-3 justify-end">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={handleCancelClick}
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
