import Image from "next/image";
import CalendarIcon from '@/public/images/icons/calendar.svg';
import BarsIcon from '@/public/images/icons/bars.svg';
import TIcon from '@/public/images/icons/t.svg';

interface HistoryItemMetadataProps {
    date: string;
    wordCount: number;
    characterCount: number;
}

export default function HistoryItemMetadata({ date, wordCount, characterCount }: HistoryItemMetadataProps) {
    return (
        <div className="flex items-center gap-[6px] mt-4 flex-row flex-wrap">
            <div className="flex justify-center items-center gap-1 px-[6px] py-[4px] rounded-[8px] bg-[#E9EAEC] text-[rgba(15,19,36,0.60)] text-center font-inter text-[14px] font-medium leading-[20px] tracking-[-0.07px]">
                <Image src={CalendarIcon} alt="Calendar" width={16} height={16} />
                <p>{date}</p>
            </div>

            <div className="flex justify-center items-center gap-1 px-[6px] py-[4px] rounded-[8px] bg-[#E9EAEC] text-[rgba(15,19,36,0.60)] text-center font-inter text-[14px] font-medium leading-[20px] tracking-[-0.07px]">
                <Image src={BarsIcon} alt="Word count" width={16} height={16} />
                <p>{wordCount} words</p>
            </div>

            <div className="flex justify-center items-center gap-1 px-[6px] py-[4px] rounded-[8px] bg-[#E9EAEC] text-[rgba(15,19,36,0.60)] text-center font-inter text-[14px] font-medium leading-[20px] tracking-[-0.07px]">
                <Image src={TIcon} alt="Character count" width={16} height={16} />
                <p>{characterCount} Characters</p>
            </div>
        </div>
    );
} 