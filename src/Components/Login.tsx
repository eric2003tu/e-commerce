import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import Header from '../Small/Header';
import Footer from '../Small/Footer';
import Otp from './Otp';
import { Link, useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: ''
  })
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [otp,setOtp] = useState<boolean>(false)

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!emailRegex.test(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 8) error = 'Password must be at least 8 characters';
        else if (!passwordRegex.test(value)) error = 'Invalid password format';
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate the field being changed
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Validate entire form whenever formData changes
  useEffect(() => {
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = formData.password.length >= 8;
    
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      form: ''
    };
    
    setErrors(newErrors);
    
    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors || !isFormValid) {
      setErrors(prev => ({ ...prev, form: 'Please fix all errors before submitting' }));
      return;
    }
    const isLocal = window.location.hostname === 'localhost';
const api = isLocal
  ? 'http://localhost:5000/api/v1/users/login'
  : 'https://e-commerce-back-xy6s.onrender.com/api/v1/users/login';
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${api}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      
      const data = await response.json();
      console.log('Login successful:', data);
      localStorage.setItem('user',JSON.stringify(data))
      setSuccessMessage('Logged in successfully');
      setTimeout(()=>{
        navigate('/user')
        setSuccessMessage('');
      },5000)
      //setOtp(true)
      // Handle successful login (redirect, store token, etc.)
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({ 
        ...prev, 
        form: error instanceof Error ? error.message : 'Invalid email or password' 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header/>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Column - Image */}
          <div className="hidden lg:block relative bg-gradient-to-br from-[#634bc1] to-[#ffdc89]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
            <div className="relative h-full flex flex-col justify-center p-12 text-white">
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-xl mb-8">Login to access your personalized shopping experience.</p>
              <div className="flex space-x-4">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all">
                  <FaGoogle className="text-lg" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all">
                  <FaFacebookF className="text-lg" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all">
                  <FaTwitter className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="bg-white flex items-center justify-center p-8 sm:p-12 lg:p-16">
          {  otp ? <Otp/>
          :
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Login to ShopEasy</h1>
                <p className="text-gray-600">Enter your details to access your account</p>
              </div>

                <div className={`mb-4 p-3 ${!successMessage ? 'bg-red-50 text-red-700': 'text-blue-500'} rounded-lg text-md`}>
                  {!successMessage ? errors.form : successMessage }
                </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiOutlineMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={(e) => {
                        const error = validateField('email', e.target.value);
                        setErrors(prev => ({ ...prev, email: error }));
                      }}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={(e) => {
                        const error = validateField('password', e.target.value);
                        setErrors(prev => ({ ...prev, password: error }));
                      }}
                      className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#634bc1] focus:ring-[#634bc1] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-[#634bc1] hover:text-[#5239ad]">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#634bc1] hover:bg-[#5239ad] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#634bc1] transition-colors ${isLoading || !isFormValid ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#634bc1]">
                    <FaGoogle className="h-5 w-5 text-[#DB4437]" />
                  </button>
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#634bc1]">
                    <FaFacebookF className="h-5 w-5 text-[#4267B2]" />
                  </button>
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#634bc1]">
                    <FaTwitter className="h-5 w-5 text-[#1DA1F2]" />
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-medium text-[#634bc1] hover:text-[#5239ad]">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
}</div>
            </div>
          </main>
      <Footer/>
    </div>
  );
};

export default Login;