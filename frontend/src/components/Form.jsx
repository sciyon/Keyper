import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

const Form = ({ route, method }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, { username, password })
            if(method === 'login'){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            }else{
                navigate('/login')
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }
    const name = method === 'register' ? 'Register' : 'Login'

    return <form onSubmit={handleSubmit} className='flex flex-col items-center justify-start h-screen py-32 flex flex-col gap-4'>
        <h1 className='text-4xl font-bold'>{name}</h1>
        <input 
            type="text" 
            placeholder='Username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className='border-2 border-gray-300 rounded-md p-2'
        />
        <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='border-2 border-gray-300 rounded-md p-2'
        />
        <button 
            type='submit' 
            className='bg-blue-500 text-white py-2 px-4 rounded-md'>
            {name}
        </button>
    </form>
}

export default Form