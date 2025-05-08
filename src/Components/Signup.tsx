import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF, FaTwitter, FaUser } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlinePhone } from 'react-icons/hi';
import Header from '../Small/Header';
import Footer from '../Small/Footer';
import Easy from '../assets/Easy.png'

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    form: ''
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s-]{10,15}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (!nameRegex.test(value)) error = 'Name should be 2-50 letters';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!emailRegex.test(value)) error = 'Invalid email format';
        break;
      case 'phone':
        if (value && !phoneRegex.test(value)) error = 'Invalid phone format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 8) error = 'Password must be at least 8 characters';
        else if (!passwordRegex.test(value)) error = 'Password must contain uppercase, lowercase, number, and special character';
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = 'Passwords do not match';
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
    const isNameValid = nameRegex.test(formData.name);
    const isEmailValid = emailRegex.test(formData.email);
    const isPhoneValid = !formData.phone || phoneRegex.test(formData.phone);
    const isPasswordValid = passwordRegex.test(formData.password);
    const isConfirmPasswordValid = formData.password === formData.confirmPassword;
    
    setIsFormValid(
      isNameValid && 
      isEmailValid && 
      isPhoneValid && 
      isPasswordValid && 
      isConfirmPasswordValid
    );
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword),
      form: ''
    };
    
    setErrors(newErrors);
    
    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors || !isFormValid) {
      setErrors(prev => ({ ...prev, form: 'Please fix all errors before submitting' }));
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('https://www.shopeasy.com/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          // phone: formData.phone || undefined,
          password: formData.password
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }
      
      const data = await response.json();
      console.log('Signup successful:', data);
      // Handle successful signup (redirect, show success message, etc.)
      
    } catch (error) {
      console.error('Signup error:', error);
      setErrors(prev => ({ ...prev, form: error instanceof Error ? error.message : 'An unexpected error occurred' }));
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
            <div className="absolute inset-0  bg-cover bg-center mix-blend-overlay opacity-20 bg-no-repeat"
            style={{backgroundImage: `url(${Easy})`}}></div>
            <div className="relative h-full flex flex-col justify-center p-12 text-white">
              <h2 className="text-4xl font-bold mb-4">Join ShopEasy!</h2>
              <p className="text-xl mb-8">Create your account to unlock personalized shopping benefits.</p>
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

          {/* Right Column - Signup Form */}
          <div className="bg-white flex items-center justify-center p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                <p className="text-gray-600">Get started with your free account</p>
              </div>

              {errors.form && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {errors.form}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={(e) => {
                        const error = validateField('name', e.target.value);
                        setErrors(prev => ({ ...prev, name: error }));
                      }}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiOutlinePhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={(e) => {
                        const error = validateField('phone', e.target.value);
                        setErrors(prev => ({ ...prev, phone: error }));
                      }}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]`}
                      placeholder="+1 (___) ___-____"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
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
                      type={showPassword.password ? 'text' : 'password'}
                      required
                      minLength={8}
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
                      onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                    >
                      {showPassword.password ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum 8 characters with uppercase, lowercase, number, and special character
                  </p>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={(e) => {
                        const error = validateField('confirmPassword', e.target.value);
                        setErrors(prev => ({ ...prev, confirmPassword: error }));
                      }}
                      className={`block w-full pl-10 pr-10 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                    >
                      {showPassword.confirmPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-[#634bc1] focus:ring-[#634bc1] border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-[#634bc1] hover:underline">Terms of Service</a> and <a href="#" className="text-[#634bc1] hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <div className="pt-2">
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
                        Creating account...
                      </span>
                    ) : (
                      'Create Account'
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
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
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
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-[#634bc1] hover:text-[#5239ad]">
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default Signup;