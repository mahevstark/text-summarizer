'use client'

import { useNotificationStore } from '../store/notificationStore'
import { useEffect } from 'react'
import Image from 'next/image'
import check from '@/public/images/icons/check.svg'
import redWarning from '@/public/images/icons/red-warning.svg'
import cross from '@/public/images/icons/cross.svg'

export default function Notification() {
  const { message, type, isVisible, hideNotification, title } = useNotificationStore()

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideNotification()
      }, 3000)
      return () => clearTimeout(timer)
    }
    return () => {}
  }, [isVisible, hideNotification])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-notification-width">
      {type === 'success' ? (
        <div className="flex p-4 items-start gap-3 rounded-xl border border-success-border bg-success-bg shadow-notification">
          <Image
            src={check}
            alt="Success"
            width={20}
            height={20}
            className="mt-0.5 w-[20px] h-[20px]"
          />
          <div className="flex flex-col relative">
            <span className="text-textbase font-inter text-base font-medium leading-6 tracking-title">{title}</span>
            {message!="" && <span className="text-textsecondary font-inter text-sm font-normal leading-5 tracking-notification mt-1">{message}</span>}
          </div>
        </div>
      ) : (
        <div className="flex p-4 items-start gap-3 rounded-xl border border-error-border bg-error-bg shadow-notification">
          <Image
            src={redWarning}
            alt="Warning" 
            width={20}
            height={20}
            className="mt-0.5 w-[20px] h-[20px]"
          />
          <div className="flex flex-col relative flex-1">
            <span className="text-textbase font-inter text-base font-medium leading-6 tracking-title">{title}</span>
            {message!="" && <span className="text-textsecondary font-inter text-sm font-normal leading-5 tracking-notification mt-1">{message}</span>}
          </div>
          <Image
            src={cross}
            alt="Close"
            width={20}
            height={20}
            className="cursor-pointer hover:opacity-80 transition-opacity ml-auto w-[20px] h-[20px]"
            onClick={hideNotification}
          />
        </div>
      )}
    </div>
  )
}