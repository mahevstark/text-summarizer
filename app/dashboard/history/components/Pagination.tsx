import Image from "next/image";
import BackArrow from '@/public/images/icons/arrow-left.svg';
import NextArrow from '@/public/images/icons/arrow-right.svg';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const pages = Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1);

    return (
        <div className="flex flex-row justify-between items-center mt-[18px]">
            <p className="text-[rgba(15,19,36,0.60)] text-center font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px]">
                Showing {startItem}-{endItem} of {totalItems}
            </p>

            <div className="flex flex-row justify-end items-center gap-[10px]">
                <button 
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    className="flex p-[10px] justify-center items-center gap-[4px] rounded-[12px] bg-[rgba(255,255,255,0)] hover:bg-[rgba(10,15,41,0.04)]"
                    disabled={currentPage === 1}
                >
                    <Image src={BackArrow} alt="Back" width={20} height={20} />
                </button>

                {pages.map((page) => (
                    <p
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`
                            flex w-[40px] h-[40px] p-[10px] justify-center items-center gap-[4px] 
                            rounded-[12px] cursor-pointer
                            ${page === currentPage
                                ? "bg-[rgba(10,15,41,0.04)] text-[#14151A]"
                                : "bg-white text-[rgba(15,19,36,0.60)] hover:bg-[rgba(10,15,41,0.04)]"
                            }
                            text-center font-inter text-[16px] font-medium leading-[24px] tracking-[-0.16px]
                        `}
                    >
                        {page}
                    </p>
                ))}

                <button 
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    className="flex p-[10px] justify-center items-center gap-[4px] rounded-[12px] bg-[rgba(255,255,255,0)] hover:bg-[rgba(10,15,41,0.04)]"
                    disabled={currentPage === totalPages}
                >
                    <Image src={NextArrow} alt="Next" width={20} height={20} />
                </button>
            </div>
        </div>
    );
} 