import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Otp from './Otp'

const Resend :React.FC= () => {

    const navigate = useNavigate()
     const [email,setEmail] = useState<string>('')
     const [received,setReceived] = useState<boolean>(false)

    const handleResend = (event: React.FormEvent)=>{
        event.preventDefault()
        fetch('https://www.shopeasy.com/user/resend',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body:JSON.stringify({
                email:email
            })
        })
        .then((Response)=>{
            return Response.json()
        })
        .then((data)=>{
            if (data.success) navigate('/')
        })
        .catch((error)=>{
            console.error(error)
        })

    }
  return (
    <>
    { received ? <Otp/>
    :
    <form onSubmit={handleResend} className='grid grid-cols-1 gap-2'>
      <h1 className='text-[#634bc1] text-3xl font-bold'>Resend Verification code</h1>
      <input type='email' name='email' value={email} onChange={(e)=>{
        setEmail(e.target.value.trim())
      }} className='p-2 text-gray-700 border rounded' placeholder='Enter your email'/>
      <button type='submit' className='bg-[#634bc1] text-white py-2 px-4 rounded hover:bg-[#5340a8]'>Resend</button>
      <p>OTP received? <button type='button' className='text-[#634bc1] font-bold cursor-pointer' onClick={()=>{
                    setReceived(true)
                }}>Back to OTP</button></p>
    </form>}
    </>
  )
}

export default Resend
