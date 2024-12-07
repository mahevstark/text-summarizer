import Image from "next/image";
import CopyIcon from '@/public/images/icons/copy-grey.svg';
import DeleteIcon from '@/public/images/icons/trash.svg';
import EditIcon from '@/public/images/icons/pencil.svg';

interface HistoryItemMenuProps {
    isOpen: boolean;
    onToggle: () => void;
    onCopy?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function HistoryItemMenu({ isOpen, onToggle, onCopy, onEdit, onDelete }: HistoryItemMenuProps) {
    return (
        <div className="flex justify-end relative">
            <button
                onClick={onToggle}
                className="flex p-2 justify-center items-center gap-[2px] rounded-[10px] border border-[#DEE0E3] bg-white shadow-[0px_1px_2px_0px_rgba(20,21,26,0.05)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33333 6.66666C2.6 6.66666 2 7.26666 2 7.99999C2 8.73332 2.6 9.33332 3.33333 9.33332C4.06667 9.33332 4.66667 8.73332 4.66667 7.99999C4.66667 7.26666 4.06667 6.66666 3.33333 6.66666ZM12.6667 6.66666C11.9333 6.66666 11.3333 7.26666 11.3333 7.99999C11.3333 8.73332 11.9333 9.33332 12.6667 9.33332C13.4 9.33332 14 8.73332 14 7.99999C14 7.26666 13.4 6.66666 12.6667 6.66666ZM8 6.66666C7.26667 6.66666 6.66667 7.26666 6.66667 7.99999C6.66667 8.73332 7.26667 9.33332 8 9.33332C8.73333 9.33332 9.33333 8.73332 9.33333 7.99999C9.33333 7.26666 8.73333 6.66666 8 6.66666Z" fill="#0F1324" fillOpacity="0.6" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-0 right-0 flex w-[175px] flex-col items-start p-[4px_0px] gap-[0px] rounded-[12px] border border-[#DEE0E3] bg-white shadow-[0px_10px_16px_-3px_rgba(20,21,26,0.08),0px_3px_6px_-2px_rgba(20,21,26,0.05)]">
                    <button onClick={onCopy} className="w-full flex px-3 py-[6px] items-center gap-[8px] bg-[rgba(255,255,255,0)] hover:bg-[rgba(10,15,41,0.04)]">
                        <Image src={CopyIcon} alt="Copy" width={20} height={20} />
                        <span className="text-[var(--text-base-primary,#14151A)] text-center font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px]">
                            Copy to Clipboard
                        </span>
                    </button>
                    <button onClick={onEdit} className="w-full flex px-3 py-[6px] items-center gap-[8px] bg-[rgba(255,255,255,0)] hover:bg-[rgba(10,15,41,0.04)]">
                        <Image src={EditIcon} alt="Edit" width={20} height={20} />
                        <span className="text-[var(--text-base-primary,#14151A)] text-center font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px]">
                            Edit
                        </span>
                    </button>
                    <button onClick={onDelete} className="w-full flex px-3 py-[6px] items-center gap-[8px] bg-[rgba(255,255,255,0)] hover:bg-[rgba(10,15,41,0.04)]">
                        <Image src={DeleteIcon} alt="Delete" width={20} height={20} />
                        <span className="text-[var(--text-base-primary,#14151A)] text-center font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px]">
                            Delete
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
} 