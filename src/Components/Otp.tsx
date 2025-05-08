import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Otp: React.FC = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetch('https://www.shopeasy.com/user/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                otp: otp.join('') // Combine the OTP digits into a single string
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) navigate('/')
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const handleOtpChange = (index: number, value: string) => {
        if (/^\d*$/.test(value) && value.length <= 1) { // Only allow single digits
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)
            
            // Auto focus to next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`)
                if (nextInput) nextInput.focus()
            }
        }
    }

    return (
        <div className='mt-5 grid grid-cols-1 justify-self-center justify-items-start text-start shadow-lg  w-fit p-6 rounded-lg'>
            <form className='grid grid-cols-1 gap-4' onSubmit={handleSubmit}>
                <h1 className='text-[#634bc1] text-3xl font-bold'>Verify your Email Address</h1>
                <div className='w-fit flex gap-2'>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type='text'
                            name='otp'
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className='w-12 h-12 p-3 text-center text-gray-700 border rounded'
                            maxLength={1}
                            pattern='\d*'
                        />
                    ))}
                </div>
                <button type='submit' className='bg-[#634bc1] text-white py-2 px-4 rounded hover:bg-[#5340a8]'>
                    Verify
                </button>
                <p>OTP not received? <button type='button' className='text-[#634bc1] font-bold'>Resend OTP</button></p>
            </form>
        </div>
    )
}

export default Otp