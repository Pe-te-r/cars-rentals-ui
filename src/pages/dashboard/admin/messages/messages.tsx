// import { useEffect, useState } from "react";
// import { useFetchAllSupportQuery, useUpdateSupportMutation } from "../../../../features/messageSlice";
// import { useToast } from "../../../../context/smallToast";

// const Messages = () => {
//     const { data, isSuccess, refetch, isLoading } = useFetchAllSupportQuery({ detailed: true }, { pollingInterval: 4000 });
//     const [updateMessage, { data: updateData, isError: errorUpdate, isSuccess: updateSuccess }] = useUpdateSupportMutation();
//     const { addToast } = useToast();
//     const [messages, setMessages] = useState<any>([]);

//     useEffect(() => {
//         if (data && isSuccess) {
//             setMessages(data.results);
//         }
//     }, [data, isSuccess]);

//     const handleConfirmUpdate = (message: any) => {
//         const updateInfo = {
//             status: 'approved',
//             subject: message.subject,
//             description: message.description,
//             user_id: message.user_id,
//         };
//         const id = message.id;
//         updateMessage({ id, ...updateInfo });
//     }

//     useEffect(() => {
//         if (updateSuccess && updateData.results === 'success') {
//             addToast('Message updated successfully', 'success');
//             refetch();
//         } else if (errorUpdate) {
//             addToast('Failed to update Message', 'error');
//         }
//     }, [updateSuccess, updateData, errorUpdate]);

//     return (
//         <div className="bg-gray-800 p-6 min-h-screen">
//             {isLoading ? (
//                 <span className="loading loading-spinner loading-xs fixed top-1/2 left-1/2"></span>
//             ) : messages.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {messages.map((message: any, index: number) => (
//                         <div key={index} className="bg-gray-700 p-4 rounded shadow-md text-white relative">
//                             <div className="absolute top-2 right-2 text-xs text-gray-400">{message.status}</div>
//                             <h3 className="text-lg font-semibold">{message.subject}</h3>
//                             <p className="mt-2">{message.description}</p>
//                             <div className="mt-4 text-sm">
//                                 <p><strong>Email:</strong> {message.user.email}</p>
//                                 <p><strong>Name:</strong> {message.user.name}</p>
//                             </div>
//                             {
//                                 message.status === 'pending' &&
//                                 <button 
//                                     className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" 
//                                     onClick={() => handleConfirmUpdate(message)}>
//                                     Dismiss
//                                 </button>
//                             }
//                             <button 
//                                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" 
//                                 onClick={() => handleConfirmUpdate(message)}>
//                                 Confirm
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-center text-white">No messages found</p>
//             )}
//         </div>
//     );
// };

// export default Messages;


import { useEffect, useState } from "react";
import { useFetchAllSupportQuery, useUpdateSupportMutation } from "../../../../features/messageSlice";
import { useToast } from "../../../../context/smallToast";

const Messages = () => {
    const { data, isSuccess, refetch, isLoading } = useFetchAllSupportQuery({ detailed: true }, { pollingInterval: 5000 });
    const [updateMessage, { data: updateData, isError: errorUpdate, isSuccess: updateSuccess }] = useUpdateSupportMutation();
    const { addToast } = useToast();
    const [messages, setMessages] = useState<any>([]);
    const [loadingButtonIndex, setLoadingButtonIndex] = useState<number | null>(null);

    useEffect(() => {
        if (data && isSuccess) {
            setMessages(data.results);
        }
    }, [data, isSuccess]);

    const handleUpdate = (message: any, status: string, index: number) => {
        setLoadingButtonIndex(index);
        const updateInfo = {
            status,
            subject: message.subject,
            description: message.description,
            user_id: message.user_id,
        };
        const id = message.id;
        updateMessage({ id, ...updateInfo });
    }

    useEffect(() => {
        if (updateSuccess && updateData.results === 'success') {
            addToast('Message updated successfully', 'success');
            refetch();
        } else if (errorUpdate) {
            addToast('Failed to update message', 'error');
        }
        setLoadingButtonIndex(null); // Reset loading button index after the update is done
    }, [updateSuccess, updateData, errorUpdate]);

    return (
        <div className="bg-gray-800 p-6 min-h-screen">
            {isLoading ? (
                <span className="loading loading-spinner loading-xs fixed top-1/2 left-1/2"></span>
            ) : messages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {messages.map((message: any, index: number) => (
                        <div key={index} className="bg-gray-700 p-4 rounded shadow-md text-white relative">
                            <div className="absolute top-2 right-2 text-xs text-gray-400">{message.status}</div>
                            <h3 className="text-lg font-semibold">{message.subject}</h3>
                            <p className="mt-2">{message.description}</p>
                            <div className="mt-4 text-sm">
                                <p><strong>Email:</strong> {message.user.email}</p>
                                <p><strong>Name:</strong> {message.user.name}</p>
                            </div>
                            <div className="mt-4 space-x-2">
                                <button 
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" 
                                    onClick={() => handleUpdate(message, 'approved', index)}
                                    disabled={loadingButtonIndex !== null}
                                >
                                    {loadingButtonIndex === index ? <span className="loading loading-spinner loading-xs"></span> : 'Confirm'}
                                </button>
                                <button 
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" 
                                    onClick={() => handleUpdate(message, 'rejected', index)}
                                    disabled={loadingButtonIndex !== null}
                                >
                                    {loadingButtonIndex === index ? <span className="loading loading-spinner loading-xs"></span> : 'Dismiss'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-white">No messages found</p>
            )}
        </div>
    );
};

export default Messages;
