'use client';

import Image from "next/image";
import copyIcon from "@/public/images/icons/copy.svg";
import copyDisabledIcon from "@/public/images/icons/copyDisabled.svg";
import { NotificationType, NotificationTypes } from "@/app/store/notificationStore";

interface SummaryControlsProps {
  wordCount: number;
  charCount: number;
  copyDisabled: boolean;
  summary: string;
  showNotification: (type: NotificationType, title: string, msg?: string) => void;
}

export default function SummaryControls({ 
  wordCount, 
  charCount, 
  copyDisabled,
  summary,
  showNotification
}: SummaryControlsProps) {
  return (
    <div className="flex flex-col xs:flex-row justify-between items-center gap-4 xs:gap-0 mt-5">
      <div className="flex flex-row justify-center items-center gap-3">
        <div className="flex flex-row justify-center items-center gap-2">
          <span className={`font-inter text-[14px] font-normal leading-[26px] ${copyDisabled ? 'text-[#727374]' : 'text-textbase3'}`}>
            Words
          </span>
          <span className={`font-inter text-[14px] font-medium leading-[26px] ${copyDisabled ? 'text-[#727374]' : 'text-textbase'}`}>
            {wordCount}
          </span>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <span className={`font-inter text-[14px] font-normal leading-[26px] ${copyDisabled ? 'text-[#727374]' : 'text-textbase3'}`}>
            Characters
          </span>
          <span className={`font-inter text-[14px] font-medium leading-[26px] ${copyDisabled ? 'text-[#727374]' : 'text-textbase'}`}>
            {charCount}
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-center xs:justify-end items-center gap-4">
        <button 
          onClick={() => {
            navigator.clipboard.writeText(summary);
            showNotification(NotificationTypes.success, 'Copied to clipboard');
          }}
          disabled={copyDisabled}
          className={`flex justify-center items-center gap-[6px] px-[10px] py-[6px] rounded-[10px] font-inter text-[14px] font-medium leading-[20px] tracking-[-0.07px] text-center ${
            copyDisabled 
              ? 'border border-[#E9EAEC] bg-white text-[rgba(10,15,41,0.25)]'
              : 'bg-[rgba(10,15,41,0.08)] text-[#14151A]'
          }`}
        >
          <Image 
            src={copyDisabled ? copyDisabledIcon : copyIcon} 
            alt="Copy" 
            width={16} 
            height={16}
          />
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
} 