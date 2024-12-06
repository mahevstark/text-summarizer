"use client";

import Image from "next/image";
import logo from "@/public/images/logo-60px.svg";
import eyeOpen from "@/public/images/icons/eye-open.svg";
import eyeClose from "@/public/images/icons/eye-closed.svg";
import redWarning from "@/public/images/icons/red-warning.svg";
import cross from "@/public/images/icons/cross.svg";
import check from "@/public/images/icons/check.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    title: "",
    message: "",
    password: false,
    email: false
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login({ email, password });
      
      if ('error' in result) {
        setError({
          isError: true,
          title: result.error.title || "Authentication Error",
          message: result.error.message,
          password: result.error.field === "password",
          email: result.error.field === "email"
        });
      } else {
        setSuccess(true);
        // Redirect after successful login
        setTimeout(() => {
          router.push("/dashboard"); // or wherever you want to redirect
        }, 1500);
      }
    } catch (err) {
      setError({
        isError: true,
        title: "Login Failed",
        message: "An unexpected error occurred. Please try again.",
        password: false,
        email: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg max-w-login-container p-10 flex flex-col items-center border border-bordercolor">
        {success && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 flex w-notification-width p-4 items-start gap-3 rounded-xl border border-success-border bg-success-bg shadow-notification">
            <Image
              src={check}
              alt="Success"
              width={20}
              height={20}
              style={{
                marginTop: "2px"
              }}
            />
            <div className="flex flex-col relative">
              <span className="text-textbase font-inter text-base font-medium leading-6 tracking-title">Login Successful</span>
              <span className="text-textsecondary font-inter text-sm font-normal leading-5 tracking-notification mt-1">You will be redirected shortly</span>
            </div>
          </div>
        )}

        {error.isError && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex w-notification-width p-4 items-start gap-3 rounded-xl border border-error-border bg-error-bg shadow-notification">
          <Image
            src={redWarning}
            alt="Warning"
            width={20}
            height={20}
            style={{
              marginTop: "2px"
            }}
          />
          <div className="flex flex-col relative flex-1">
            <span className="text-textbase font-inter text-base font-medium leading-6 tracking-title">{error.title}</span>
            <span className="text-textsecondary font-inter text-sm font-normal leading-5 tracking-notification mt-1">{error.message}</span>
          </div>
          <Image
            src={cross}
            alt="Close"
            width={20}
            height={20}
            className="cursor-pointer hover:opacity-80 transition-opacity ml-auto"
            onClick={() => setError({
              isError: false,
              title: "",
              message: "",
              password: false,
              email: false
            })}
          />
        </div>
      )}
      <Image
        src={logo}
        alt="UD - Logo" 
        width={76}
        height={76}
      />
      <h2 className="text-xl font-medium text-textbase font-inter tracking-heading mt-2">Log in to Undetectable AI</h2>
      <p className="text-base text-textsecondary font-inter mt-2 tracking-subheading leading-6">Enter your username and password to continue</p>
      
      

      <form onSubmit={handleSubmit} className="w-full space-y-4 mt-6">
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
            className={`w-full px-3 py-input-padding font-inter text-[14px] font-normal text-textbase border ${error.email ? 'border-error-ring' : 'border-border-action-normal'} rounded-xl focus:outline-none focus:ring-2 focus:ring-textbase leading-[20px] tracking-[-0.07px]`}
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
            className={`w-full px-3 py-input-padding font-inter text-[14px] font-normal text-textbase border ${error.password ? 'border-error-ring' : 'border-border-action-normal'} rounded-xl focus:outline-none focus:ring-2 focus:ring-textbase leading-[20px] tracking-[-0.07px]`}
            required
          />
          <Image
            src={showPassword ? eyeClose : eyeOpen}
            alt="Show password"
            width={20}
            height={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-button-primary text-white py-input-padding rounded-xl shadow-button hover:bg-button-primary-hover transition-colors text-center font-inter text-sm font-medium leading-5 tracking-[-0.07px] ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
}
