'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import logo from "@/public/images/logo-60px.svg"
import eyeOpen from "@/public/images/icons/eye-open.svg"
import eyeClose from "@/public/images/icons/eye-closed.svg"
import { signup } from '../actions/auth'
import { useNotificationStore, NotificationTypes } from "../store/notificationStore"

export default function SignupForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
  })
  const showNotification = useNotificationStore(state => state.showNotification)

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (error[field as keyof typeof error]) {
      setError(prev => ({ ...prev, [field]: false }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await signup(formData)
      
      if ('error' in result) {
        showNotification(NotificationTypes.error, 'Error', result.error.message)
        setError(prev => ({
          ...prev,
          [result.error.field || '']: true
        }))
      } else {
        showNotification(NotificationTypes.success, 'Success', 'Account created successfully! You will be redirected shortly')
        setTimeout(() => {
          router.replace('/dashboard')
        }, 1500)
      }
    } catch {
      showNotification(NotificationTypes.error, 'Error', 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getInputClassName = (fieldName: keyof typeof error) => `
    w-full px-2 sm:px-3 py-[6px] xs:py-2 sm:py-input-padding 
    font-inter text-[12px] xs:text-[13px] sm:text-[14px] 
    font-normal text-textbase 
    border ${error[fieldName] ? 'border-error-ring animate-shake' : 'border-border-action-normal'} 
    rounded-xl focus:outline-none focus:ring-2 
    focus:ring-textbase focus:ring-opacity-50 
    focus:border-textbase transition-all duration-300 
    leading-[16px] xs:leading-[18px] sm:leading-[20px] 
    tracking-[-0.07px] hover:border-textbase
  `

  return (
    <div className="bg-white rounded-lg max-w-login-container w-[calc(100%-2rem)] mx-4 p-4 xs:p-6 sm:p-10 flex flex-col items-center border border-bordercolor animate-fadeIn">
      <Image
        src={logo}
        alt="UD - Logo" 
        width={60}
        height={60}
        className="w-[40px] h-[40px] xs:w-[50px] xs:h-[50px] sm:w-[76px] sm:h-[76px]"
      />
      <h2 className="text-base xs:text-lg sm:text-xl font-medium text-textbase font-inter tracking-heading mt-2 text-center">Create your account</h2>
      <p className="text-xs xs:text-sm sm:text-base text-textsecondary font-inter mt-2 tracking-subheading leading-4 xs:leading-5 sm:leading-6 text-center ">Fill in your details to get started</p>

      <form onSubmit={handleSubmit} className="w-full space-y-2 xs:space-y-3 sm:space-y-4 mt-3 xs:mt-4 sm:mt-6">
        <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            className={getInputClassName('firstName')}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            className={getInputClassName('lastName')}
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange('email')}
          className={getInputClassName('email')}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange('password')}
            className={getInputClassName('password')}
          />
          <Image
            src={showPassword ? eyeClose : eyeOpen}
            alt="Show password"
            width={18}
            height={18}
            className="absolute right-2 xs:right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-110 w-4 h-4 xs:w-[18px] xs:h-[18px]"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            className={getInputClassName('confirmPassword')}
          />
          <Image
            src={showConfirmPassword ? eyeClose : eyeOpen}
            alt="Show confirm password"
            width={18}
            height={18}
            className="absolute right-2 xs:right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-110 w-4 h-4 xs:w-[18px] xs:h-[18px]"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-button-primary text-white py-[6px] xs:py-2 sm:py-input-padding rounded-xl shadow-button hover:bg-button-primary-hover transition-all duration-300 hover:shadow-lg transform hover:-translate-y-[1px] text-center font-inter text-[11px] xs:text-xs sm:text-sm font-medium leading-4 xs:leading-5 tracking-[-0.07px] ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="text-center text-[11px] xs:text-xs sm:text-sm text-textsecondary font-inter mt-2">
          Already have an account?{' '}
          <a href="/login" className="text-button-primary hover:text-button-primary-hover transition-all duration-300">
            Log in
          </a>
        </p>
      </form>
    </div>
  )
} 