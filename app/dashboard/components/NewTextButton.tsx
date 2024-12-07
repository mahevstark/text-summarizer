import Image from 'next/image';
import plusIcon from '@/public/images/icons/plus.svg';
import { useSummaryStore } from '../history/store/summary-store';
import { useSummarizerStore } from '../store/summarizer-store';
import { useRouter } from 'next/navigation';

export default function NewTextButton() {
  const { setEditingSummary } = useSummaryStore();
  const { reset } = useSummarizerStore();
  const router = useRouter();

  return (
    <div className="px-4">
      <button
      onClick={() => {
        setEditingSummary(null)
        reset()
        router.push('/dashboard')
      }}
      className="flex w-full justify-center items-center gap-[2px] px-[10px] py-[6px] rounded-nav bg-white shadow-button text-textbase text-center font-inter text-nav mb-6">
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