import React from 'react'

const Password = ({password, onDelete}) => {
    const formattedDate = new Date(password.created_at).toLocaleDateString('en-US')
    
    return (
        <div className='flex flex-col items-start justify-start h-fit w-4/5 bg-gray-200 bg-gray-300 rounded-3xl p-5 m-0 mb-4'>
            <p className='text-lg font-bold'>Credential: {password.title}</p>
            <p className='text-lg'>Password: {password.password}</p>
            <p className='text-lg pb-1'>Created: {formattedDate}</p>
            <button onClick={() => onDelete(password.id)} className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-300'>Delete</button>
        </div>
    )
}

export default Password