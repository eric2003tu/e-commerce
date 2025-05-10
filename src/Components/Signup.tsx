import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF, FaTwitter, FaUser } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineHome, HiOutlineMap, HiOutlineOfficeBuilding, HiOutlineGlobe } from 'react-icons/hi';
import Header from '../Small/Header';
import Footer from '../Small/Footer';
import Easy from '../assets/Easy.png';
import { Link, useNavigate } from 'react-router-dom';
import Otp from './Otp';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  form: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    form: ''
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [otp, setOtp] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Account info, 2: Address info

  // Validation regex patterns
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s-]{10,15}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  const zipcodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (!nameRegex.test(value)) return 'Name should be 2-50 letters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Invalid email format';
        break;
      case 'phone':
        if (value && !phoneRegex.test(value)) return 'Invalid phone format';
        break;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!passwordRegex.test(value)) return 'Must include uppercase, lowercase, number, and special character';
        break;
      case 'confirmPassword':
        if (value !== formData.password) return 'Passwords do not match';
        break;
      case 'address':
        if (!value.trim()) return 'Address is required';
        break;
      case 'street':
        if (!value.trim()) return 'Street is required';
        break;
      case 'city':
        if (!value.trim()) return 'City is required';
        break;
      case 'state':
        if (!value.trim()) return 'State is required';
        break;
      case 'zipcode':
        if (!value.trim()) return 'Zipcode is required';
        if (!zipcodeRegex.test(value)) return 'Invalid zipcode format';
        break;
      case 'country':
        if (!value.trim()) return 'Country is required';
        break;
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate the field being changed
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Validate entire form whenever formData changes
  useEffect(() => {
    const validateForm = () => {
      if (currentStep === 1) {
        // Validate account information step
        const isNameValid = nameRegex.test(formData.name);
        const isEmailValid = emailRegex.test(formData.email);
        const isPhoneValid = !formData.phone || phoneRegex.test(formData.phone);
        const isPasswordValid = passwordRegex.test(formData.password);
        const isConfirmPasswordValid = formData.password === formData.confirmPassword;
        
        return isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid;
      } else {
        // Validate address information step
        return (
          formData.address.trim() !== '' &&
          formData.street.trim() !== '' &&
          formData.city.trim() !== '' &&
          formData.state.trim() !== '' &&
          formData.zipcode.trim() !== '' &&
          formData.country.trim() !== ''
        );
      }
    };
    
    setIsFormValid(validateForm());
  }, [formData, currentStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields for the current step
    let newErrors: Partial<FormErrors> = {};
    const fieldsToValidate = currentStep === 1 
      ? ['name', 'email', 'phone', 'password', 'confirmPassword'] 
      : ['address', 'street', 'city', 'state', 'zipcode', 'country'];
    
    fieldsToValidate.forEach(field => {
      newErrors[field as keyof FormErrors] = validateField(
        field as keyof FormData, 
        formData[field as keyof FormData]
      );
    });
    
    setErrors(prev => ({ ...prev, ...newErrors, form: '' }));
    
    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors || !isFormValid) {
      setErrors(prev => ({ ...prev, form: 'Please fix all errors before continuing' }));
      return;
    }
    
    if (currentStep === 1) {
      // Move to address step
      setCurrentStep(2);
      window.scrollTo(0, 0);
      return;
    }
    
    // Final submission
    setIsLoading(true);
    
    try {
      const response = await fetch('https://e-commerce-back-xy6s.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          password: formData.password,
          address: {
            line1: formData.address,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postalCode: formData.zipcode,
            country: formData.country
          }
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }
      
      const data = await response.json();
      console.log('Signup successful:', data);
      setOtp(true); // Show OTP verification
      // Alternatively: navigate('/login');
      
    } catch (error) {
      console.error('Signup error:', error);
      setErrors(prev => ({ 
        ...prev, 
        form: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  if (otp) {
    return <Otp email={formData.email} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Column - Image */}
          <div className="hidden lg:block relative bg-gradient-to-br from-[#634bc1] to-[#ffdc89]">
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20 bg-no-repeat"
              style={{ backgroundImage: `url(${Easy})` }}
            ></div>
            <div className="relative h-full flex flex-col justify-center p-12 text-white">
              <h2 className="text-4xl font-bold mb-4">Join ShopEasy!</h2>
              <p className="text-xl mb-8">
                {currentStep === 1 
                  ? "Create your account to unlock personalized shopping benefits."
                  : "Almost there! Just add your address information."}
              </p>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentStep === 1 ? 'Create Account' : 'Add Your Address'}
                </h1>
                <p className="text-gray-600">
                  {currentStep === 1 ? 'Step 1 of 2: Account information' : 'Step 2 of 2: Delivery information'}
                </p>
              </div>

              {errors.form && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {errors.form}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {currentStep === 1 ? (
                  <>
                    {/* Account Information Step */}
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
                        Phone Number (Optional)
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
                  </>
                ) : (
                  <>
                    {/* Address Information Step */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiOutlineLocationMarker className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          required
                          value={formData.address}
                          onChange={handleChange}
                          onBlur={(e) => {
                            const error = validateField('address', e.target.value);
                            setErrors(prev => ({ ...prev, address: error }));
                          }}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]`}
                          placeholder="123 Main St"
                        />
                      </div>
                      {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    </div>

                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                        Street
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiOutlineHome className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="street"
                          name="street"
                          type="text"
                          required
                          value={formData.street}
                          onChange={handleChange}
                          onBlur={(e) => {
                            const error = validateField('street', e.target.value);
                            setErrors(prev => ({ ...prev, street: error }));
                          }}
                          className={`block w-full pl-10 pr-3 py-3 border ${errors.street ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]`}
                          placeholder="Apt, suite, etc. (optional)"
                        />
                      </div>
                      {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineMap className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="city"
                            name="city"
                            type="text"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            onBlur={(e) => {
                              const error = validateField('city', e.target.value);
                              setErrors(prev => ({ ...prev, city: error }));
                            }}
                            className={`block w-full pl-10 pr-3 py-3 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]`}
                            placeholder="New York"
                          />
                        </div>
                        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineOfficeBuilding className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="state"
                            name="state"
                            type="text"
                            required
                            value={formData.state}
                            onChange={handleChange}
                            onBlur={(e) => {
                              const error = validateField('state', e.target.value);
                              setErrors(prev => ({ ...prev, state: error }));
                            }}
                            className={`block w-full pl-10 pr-3 py-3 border ${errors.state ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]`}
                            placeholder="NY"
                          />
                        </div>
                        {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineLocationMarker className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="zipcode"
                            name="zipcode"
                            type="text"
                            required
                            value={formData.zipcode}
                            onChange={handleChange}
                            onBlur={(e) => {
                              const error = validateField('zipcode', e.target.value);
                              setErrors(prev => ({ ...prev, zipcode: error }));
                            }}
                            className={`block w-full pl-10 pr-3 py-3 border ${errors.zipcode ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]`}
                            placeholder="10001"
                          />
                        </div>
                        {errors.zipcode && <p className="mt-1 text-sm text-red-600">{errors.zipcode}</p>}
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineGlobe className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="country"
                            name="country"
                            type="text"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            onBlur={(e) => {
                              const error = validateField('country', e.target.value);
                              setErrors(prev => ({ ...prev, country: error }));
                            }}
                            className={`block w-full pl-10 pr-3 py-3 border ${errors.country ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634bc1] focus:border-[#634bc1]`}
                            placeholder="United States"
                          />
                        </div>
                        {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 1 && (
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-[#634bc1] focus:ring-[#634bc1] border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the <a href="#" className="text-[#634bc1] hover:underline">Terms</a> and <a href="#" className="text-[#634bc1] hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                )}

                <div className="pt-2 flex gap-3">
                  {currentStep === 2 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-1/3 flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#634bc1] transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className={`${currentStep === 2 ? 'w-2/3' : 'w-full'} flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#634bc1] hover:bg-[#5239ad] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#634bc1] transition-colors ${isLoading || !isFormValid ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {currentStep === 1 ? 'Continue' : 'Sign Up'}
                      </span>
                    ) : (
                      currentStep === 1 ? 'Continue' : 'Sign Up'
                    )}
                  </button>
                </div>
              </form>

              {currentStep === 1 && (
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
                    <button 
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#634bc1]"
                    >
                      <FaGoogle className="h-5 w-5 text-[#DB4437]" />
                    </button>
                    <button 
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#634bc1]"
                    >
                      <FaFacebookF className="h-5 w-5 text-[#4267B2]" />
                    </button>
                    <button 
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#634bc1]"
                    >
                      <FaTwitter className="h-5 w-5 text-[#1DA1F2]" />
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  {currentStep === 1 ? (
                    <>
                      Already have an account?{' '}
                      <Link to="/login" className="font-medium text-[#634bc1] hover:text-[#5239ad]">
                        Log in
                      </Link>
                    </>
                  ) : (
                    <>
                      <button 
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="font-medium text-[#634bc1] hover:text-[#5239ad]"
                      >
                        Back to account information
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;