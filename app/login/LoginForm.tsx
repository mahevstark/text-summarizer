"use client";

import Image from "next/image";
import logo from "@/public/images/logo-60px.svg";
import eyeOpen from "@/public/images/icons/eye-open.svg";
import eyeClose from "@/public/images/icons/eye-closed.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/auth";
import { useNotificationStore, NotificationTypes } from "../store/notificationStore";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    password: false,
    email: false
  });
  const showNotification = useNotificationStore(state => state.showNotification);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login({ email, password });
      
      if ('error' in result) {
        showNotification(NotificationTypes.error, 'Error', result.error.message);
        setError({
          password: result.error.field === "password",
          email: result.error.field === "email"
        });
      } else {
        showNotification(NotificationTypes.success, 'success', 'You will be redirected shortly');
        // Redirect after successful login
        // see why this animation is not included in build
        setTimeout(() => {
          router.replace("/dashboard");
        }, 1500);
      }
    } catch {

      showNotification(NotificationTypes.error, 'Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg max-w-login-container w-[calc(100%-2rem)] mx-4 p-4 xs:p-6 sm:p-10 flex flex-col items-center border border-bordercolor animate-fadeIn">
      <Image
        src={logo}
        alt="UD - Logo" 
        width={60}
        height={60}
        className="w-[40px] h-[40px] xs:w-[50px] xs:h-[50px] sm:w-[76px] sm:h-[76px]"
      />
      <h2 className="text-base xs:text-lg sm:text-xl font-medium text-textbase font-inter tracking-heading mt-2 text-center">Log in to Undetectable AI</h2>
      <p className="text-xs xs:text-sm sm:text-base text-textsecondary font-inter mt-2 tracking-subheading leading-4 xs:leading-5 sm:leading-6 text-center px-2">Enter your username and password to continue</p>
      
      <form onSubmit={handleSubmit} className="w-full space-y-2 xs:space-y-3 sm:space-y-4 mt-3 xs:mt-4 sm:mt-6">
        <div>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error.email) {
                setError({...error, email: false});
              }
            }}
            className={`w-full px-2 sm:px-3 py-[6px] xs:py-2 sm:py-input-padding font-inter text-[12px] xs:text-[13px] sm:text-[14px] font-normal text-textbase border ${error.email ? 'border-error-ring animate-shake' : 'border-border-action-normal'} rounded-xl focus:outline-none focus:ring-2 focus:ring-textbase focus:ring-opacity-50 focus:border-textbase transition-all duration-300 leading-[16px] xs:leading-[18px] sm:leading-[20px] tracking-[-0.07px] hover:border-textbase`}
            required
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error.password) {
                setError({...error, password: false});
              }
            }}
            className={`w-full px-2 sm:px-3 py-[6px] xs:py-2 sm:py-input-padding font-inter text-[12px] xs:text-[13px] sm:text-[14px] font-normal text-textbase border ${error.password ? 'border-error-ring animate-shake' : 'border-border-action-normal'} rounded-xl focus:outline-none focus:ring-2 focus:ring-textbase focus:ring-opacity-50 focus:border-textbase transition-all duration-300 leading-[16px] xs:leading-[18px] sm:leading-[20px] tracking-[-0.07px] hover:border-textbase`}
            required
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
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-button-primary text-white py-[6px] xs:py-2 sm:py-input-padding rounded-xl shadow-button hover:bg-button-primary-hover transition-all duration-300 hover:shadow-lg transform hover:-translate-y-[1px] text-center font-inter text-[11px] xs:text-xs sm:text-sm font-medium leading-4 xs:leading-5 tracking-[-0.07px] ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
}
