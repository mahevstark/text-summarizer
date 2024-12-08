'use client';

import Image from "next/image";
import pageIcon from "@/public/images/icons/page.svg";

interface SummaryDisplayProps {
  summary: string;
}

export default function SummaryDisplay({ summary }: SummaryDisplayProps) {
  return (
    <div className="flex mt-5 flex-col gap-[10px] flex-shrink-0 rounded-[10px] border border-[rgba(10,15,41,0.08)] bg-[#F7F7F8] shadow-button min-h-[280px] xs:min-h-[442px]">
      {summary ? (
        <p className="text-black font-public-sans text-base font-normal leading-6 p-5 w-full animate-fadeIn">
          {summary}
        </p>
      ) : (
        <div className="flex flex-col justify-center items-center gap-[10px] p-5 min-h-[280px] xs:min-h-[442px]">
          <div className="flex flex-col justify-center items-center gap-[10px]">
            <div className="animate-floatUp">
              <Image src={pageIcon} alt="Page" width={61} height={60} />
            </div>
            <span className="text-[rgba(15,19,36,0.60)] font-inter text-[18px] font-normal leading-[20px] tracking-[-0.09px] text-center animate-fadeIn">
              Your summarized text will appear here
            </span>
          </div>
        </div>
      )}
    </div>
  );
} 