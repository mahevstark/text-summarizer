'use client';

import Image from "next/image";
import resetIcon from "@/public/images/icons/reset.svg";
import loadingIcon from "@/public/images/icons/loading.svg";

interface TextControlsProps {
  wordCount: number;
  charCount: number;
  inputMode: boolean;
  summarizing: boolean;
  text: string;
  onReset: () => void;
  onSummarize: () => void;
}

export default function TextControls({ 
  wordCount, 
  charCount, 
  inputMode, 
  summarizing, 
  text,
  onReset,
  onSummarize 
}: TextControlsProps) {
  return (
    <div className="bg-box-bg px-5 flex flex-col xs:flex-row justify-between items-center gap-4 xs:gap-0 pt-4">
      <div className="flex flex-row justify-center items-center gap-3">
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="text-textbase3 font-inter text-[14px] font-normal leading-[26px]">Words</span>
          <span className="text-white font-inter text-[14px] font-medium leading-[26px]">{wordCount}</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="text-textbase3 font-inter text-[14px] font-normal leading-[26px]">Characters</span>
          <span className="text-white font-inter text-[14px] font-medium leading-[26px]">{charCount}</span>
        </div>
      </div>

      <div className="flex flex-row justify-center sm:justify-end items-center gap-4">
        {inputMode && !summarizing && (
          <button
            onClick={onReset}
            className="flex justify-center items-center gap-[6px] px-[10px] py-[6px] rounded-[10px] border border-white text-white text-center font-inter text-[14px] font-medium leading-[20px] tracking-[-0.07px]"
          >
            <Image src={resetIcon} alt="Reset" width={16} height={16} />
            Reset
          </button>
        )}
        <button 
          onClick={onSummarize}
          disabled={summarizing}
          className={`flex justify-center items-center gap-[2px] px-[10px] py-[6px] rounded-[10px] ${
            summarizing 
              ? 'bg-[rgba(255,255,255,0.08)] text-white'
              : text 
                ? 'bg-white text-[#14151A] border-white' 
                : 'border-[rgba(255,255,255,0.14)] bg-[#14151A] text-[rgba(255,255,255,0.32)]'
          }`}
        >
          {summarizing && (
            <Image 
              src={loadingIcon} 
              alt="Loading" 
              width={16} 
              height={16}
              className="animate-spin mr-1"
            />
          )}
          Summarize My Text
        </button>
      </div>
    </div>
  );
} 