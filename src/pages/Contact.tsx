import { useEffect, useState } from "react";
import InputDiv from "../components/InputDiv";
import { useDetails } from "../context/LocalStorageContext";
import { useCreateSupportMutation } from "../features/messageSlice";
import { useAuth } from "../context/authContext";

const ContactPage = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) => {
  const {user} =useDetails()
  const {setResponseToast} =useAuth()
  const [sendData,{data,isLoading,isSuccess}]=useCreateSupportMutation()
  const [response,setResponse]= useState('')
  const [message, setMessage] = useState({
    user_id:user?.id,
    subject: '',
    description: ''
  });

  const handleChange = (field: keyof typeof message, value: any) => {
    setMessage(prevMessage => ({ ...prevMessage, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendData(message)
  };
  useEffect(()=>{
    if(isSuccess){
      if(data['results'].trim()=='success'){
        setResponseToast({ message: `Support sent successfully!`, type:'success' });
        closeModal();
      }
    }
  },[data,isSuccess]);

  if (!isOpen) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-center text-3xl font-extrabold text-white">Contact Us</h2>
              <p className="mt-2 text-center text-sm text-gray-400">
                We'd love to hear from you! Please fill out the form below to get in touch.
              </p>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <InputDiv
                    type="text"
                    value={message.subject}
                    setData={(value: string) => handleChange('subject', value)}
                    label="Subject"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={message.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    {!isLoading?
                      'Submit':!isSuccess&& <span className="loading loading-spinner loading-sm"></span>
                      }
                  </button>
                </div>
              </form>
              <div className="text-center text-sm text-gray-400 mt-4">
                <p>Alternatively, you can reach us at:</p>
                <p className="mt-1 text-yellow-500">phantom8526@duck.com</p>
                <p className="mt-1 text-yellow-500">+254 (07)48-200-233</p>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-800 text-right">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactPage;
