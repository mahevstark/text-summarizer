import Image from 'next/image';
import plusIcon from '@/public/images/icons/plus.svg';

export default function NewTextButton() {
  return (
    <div className="px-4">
      <button className="flex w-full justify-center items-center gap-[2px] px-[10px] py-[6px] rounded-nav bg-white shadow-button text-textbase text-center font-inter text-nav mb-6">
        <Image 
          src={plusIcon} 
          alt="Plus"
          width={20}
          height={20}
        />
        Summarize Text
      </button>
    </div>
  );
} 