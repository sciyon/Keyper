import { useEffect, useState } from 'react'
import api from "../api"
import Password from '../components/Password'

const Home = () => {
    const [passwords, setPasswords] = useState([])
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        getPassword()
    }, [])

    const getPassword = () => {
        api
            .get('/api/password/')
            .then((res) => res.data)
            .then((data)=> {setPasswords(data); console.log(data)})
            .catch((err) => alert(err))
    }
    
    const deletePassword = (id) => {
        api
            .delete(`/api/password/delete/${id}/`)
            .then((res) => {
                if(res.status === 204){
                    alert('Credentials deleted successfully')
                }else{
                    alert('Failed to delete credentials')
                }
            })
            .catch((err) => alert(err))
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post('/api/password/', {password: password, title: title})
            .then((res) => {
                if(res.status === 201){
                    alert('Credentials created successfully')
                }
            })  
            .catch((err) => alert(err))
            getPassword()
    }

    return (
        <div className='flex flex-row items-center justify-start h-screen py-32 flex flex-col gap-4'>
            <div className="w-1/2 h-full flex items-start justify-start flex-col ml-24">
                <h2 className='text-2xl font-bold'>Credentials</h2>
                {passwords.map
                    ((password) => 
                        <Password 
                            password={password} 
                            onDelete={deletePassword}
                            key={password.id}
                        />
                    )
                }
            </div>
            <div className="flex flex-col items-start justify-start h-full w-1/2 bg-gray-100">
                <h2 className='text-2xl font-bold'>Create Credentials</h2>
                <form onSubmit={createNote} className='flex flex-col items-start justify-start h-full w-full bg-gray-200'>
                    <label htmlFor="title" className='mb-2 mt-8'>Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-300 rounded-md p-2 mb-4'
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className='border-2 border-gray-300 rounded-md p-2 mb-4'
                    />
                    <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700'>Create</button>
                </form>
            </div>
        </div>
    )
}

export default Home