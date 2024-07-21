// import  { useState } from 'react';
// import { useDeleteUserMutation, useFetchAllUsersQuery, useUpdateUserMutation } from '../../../../features/login_slice';
// import DynamicTable from '../../../../components/Table';
// import { User } from '../../../../types/types';
// import DynamicForm from '../../../../components/DynamicForm';

// const UsersTableContainer = () => {

//   const {data,isLoading,error ,refetch,isError } = useFetchAllUsersQuery(undefined, {
//     pollingInterval: 8000, 
//   });

//   const [updateUser] = useUpdateUserMutation();
//   const [deleteUser] = useDeleteUserMutation();

//   const [editableRowId, setEditableRowId] = useState<number>(-1);
//   const [editName, setEditedName] = useState('');
//   const [editRole, setEditRole] = useState('');
//   const [editEmail, setEditEmail] = useState('');
//   const [editContact, setEditContact] = useState('');

//   const handleEditClick = (user: User) => {
//     setEditableRowId(Number(user.id));
//     setEditedName(user.name);
//     setEditRole(user.role);
//     setEditEmail(user.email);
//     setEditContact(user.contact_phone);
//   };

//   const handleDeleteClick = async (id: string) => {
//     await deleteUser({ id });
//     refetch(); 
//   };
//   // console.log(error[''])

//   const handleCancelClick = () => {
//     setEditableRowId(-1);
//     };
    
//   const handleSaveClick = async () => {
//     const info = {
//       id: editableRowId.toString(),
//       name: editName,
//       role: editRole,
//       email: editEmail,
//       contact_phone: editContact,
//       };
//       await updateUser(info);
//       setEditableRowId(-1);
//     refetch(); // Fetch the latest data after update
//   };

//   const headers = ["name", "email", "contact_phone", "role"];
//   const dataRows = data || [];
  
//   const shareUpdateFunctionality =[
//     {
//       text: 'Name',
//       value: editName,
//       changeValue: setEditEmail
//     },
//     {
//       text: 'Email',
//       value: editEmail,
//       changeValue: setEditEmail
//     },
//     {
//       text: 'Contact Phone',
//       value: editContact,
//       changeValue: setEditContact
//     },
//     {
//       text: 'Role',
//       value: editRole,
//       changeValue: setEditRole
//     }
//   ]
//   const errorMessage: any = error
//   // console.log(dataRows)
//   return (
//     <>
//       {isLoading? (
//             <div className='bg-gray-800'>
//               <span><span className="loading fixed top-1/2 left-1/2 loading-ring loading-lg"></span></span>             
//               </div>) : isError? <h3>{errorMessage['data']}</h3> :
//           !Array.isArray(dataRows) ?  <h2>{dataRows['error']}</h2> :
//           <>
//         <div className='mb-3'> 
//           <button className='btn bg-green-800 hover:bg-green-900'> Add User</button>
//         </div>
//       <DynamicTable 
//         headers={headers} 
//         data={dataRows} 
//         onEdit={handleEditClick} 
//         onDelete={handleDeleteClick} 
//         />
//         </>
//         }
//       {editableRowId > 0 && (
//         <DynamicForm heading='Edit user' handleCancelClick={handleCancelClick} handleSaveClick={handleSaveClick} shareFunctions={shareUpdateFunctionality}/>
//       )}
//     </>
//   );
// };

// export default UsersTableContainer;

import { useEffect, useState } from 'react';
import { useDeleteUserMutation, useFetchAllUsersQuery, useUpdateUserMutation } from '../../../../features/login_slice';
import DynamicTable from '../../../../components/Table';
import { User } from '../../../../types/types';
import DynamicForm from '../../../../components/DynamicForm';
import AddUserModal from './AddUser';
import { MdPersonAddAlt } from "react-icons/md";
import SmallToast from '../../../../components/SmallToast';
import { useToast } from '../../../../context/smallToast';


const UsersTableContainer = () => {
  const { data, isLoading, error, refetch, isError } = useFetchAllUsersQuery(undefined, {
    pollingInterval: 8000,
  });

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser,{data:deleteData,isLoading:deleteLoading,isSuccess:successDelete}] = useDeleteUserMutation();
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const { addToast } = useToast();

  const [editableRowId, setEditableRowId] = useState<number>(-1);
  const [editName, setEditedName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editContact, setEditContact] = useState('');

  const handleEditClick = (user: User) => {
    setEditableRowId(Number(user.id));
    setEditedName(user.name);
    setEditRole(user.role);
    setEditEmail(user.email);
    setEditContact(user.contact_phone);
  };

  const handleDeleteClick = async (id: string) => {
    await deleteUser({ id });
   
    refetch();

  };
  useEffect(()=>{
    console.log(deleteData)
    if(successDelete && deleteData.message=='deleted'){ 

      addToast('successful delete!','success'); 
    }
  },[successDelete,deleteData])

  const handleCancelClick = () => {
    setEditableRowId(-1);
  };
  
  const handleSaveClick = async () => {
    const info = {
      id: editableRowId.toString(),
      name: editName,
      role: editRole,
      email: editEmail,
      contact_phone: editContact,
    };
    await updateUser(info);
    setEditableRowId(-1);
    refetch();
  };

  const headers = ["name", "email", "contact_phone", "role"];
  const dataRows = data || [];

  const shareUpdateFunctionality = [
    {
      text: 'Name',
      value: editName,
      changeValue: setEditEmail,
    },
    {
      text: 'Email',
      value: editEmail,
      changeValue: setEditEmail,
    },
    {
      text: 'Contact Phone',
      value: editContact,
      changeValue: setEditContact,
    },
    {
      text: 'Role',
      value: editRole,
      changeValue: setEditRole,
    },
  ];

  const errorMessage: any = error;

  return (
    <>
      {isLoading ? (
        <div className='bg-gray-800'>
          <span><span className="loading fixed top-1/2 left-1/2 loading-ring loading-lg"></span></span>
        </div>
      ) : isError ? <h3>{errorMessage['data']}</h3> :
        !Array.isArray(dataRows) ? <h2>{dataRows['error']}</h2> :
          <>
            <div className='mb-3'>
              <button className='btn bg-green-800 hover:bg-green-900' onClick={() => setAddUserModalOpen(true)}> <MdPersonAddAlt color='grey' size={30}/></button>
            </div>
            <DynamicTable
              headers={headers}
              data={dataRows}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onSuccessDelete={successDelete}
              onDeleteLoading={deleteLoading}
            />
          </>
      }
      {editableRowId > 0 && (
        <DynamicForm heading='Edit user' handleCancelClick={handleCancelClick} handleSaveClick={handleSaveClick} shareFunctions={shareUpdateFunctionality} />
      )}
      <AddUserModal isOpen={isAddUserModalOpen} refetch={refetch} onClose={() => setAddUserModalOpen(false)} />
    </>
  );
};

export default UsersTableContainer;
