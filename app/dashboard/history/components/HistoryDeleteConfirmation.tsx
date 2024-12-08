interface HistoryDeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function HistoryDeleteConfirmation({ isOpen, onClose, onConfirm }: HistoryDeleteConfirmationProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4" onClick={handleBackdropClick}>
            <div className="w-full max-w-[400px] flex flex-col items-start p-4 sm:p-6 gap-4 sm:gap-6 rounded-2xl border border-[#DEE0E3] bg-white shadow-[0px_10px_16px_-3px_rgba(20,21,26,0.08),0px_3px_6px_-2px_rgba(20,21,26,0.05)]">
                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[#14151A] font-inter text-[16px] sm:text-[18px] font-medium leading-[24px] sm:leading-[26px] tracking-[-0.216px]">
                            Delete summarized text?
                        </h2>
                        <p className="text-[rgba(15,19,36,0.60)] font-inter text-[14px] sm:text-[16px] font-normal leading-[20px] sm:leading-[24px] tracking-[-0.16px]">
                            You will not be able to recover it.
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1 hover:bg-[rgba(10,15,41,0.04)] rounded-full"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L5 15M5 5L15 15" stroke="#6C7275" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                        onClick={onClose}
                        className="flex px-[10px] py-[6px] justify-center items-center gap-[2px] flex-[1_0_0] rounded-[10px] border border-[#DEE0E3] bg-white shadow-[0px_1px_2px_0px_rgba(20,21,26,0.05)] text-[#14151A] font-inter text-[14px] font-medium leading-[20px] tracking-[-0.07px] text-center hover:bg-[rgba(10,15,41,0.04)]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex px-[10px] py-[6px] justify-center items-center gap-[2px] flex-[1_0_0] rounded-[10px] border border-[#F04438] bg-[#F04438] shadow-[0px_1px_2px_0px_rgba(20,21,26,0.05)] text-white font-inter text-[14px] font-medium leading-[20px] tracking-[-0.07px] text-center hover:bg-[#E63E32]"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}