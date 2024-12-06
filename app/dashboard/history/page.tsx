"use client";;
import Sidebar from "@/app/dashboard/components/sidebar";
import FilterHeader from "@/app/shared-components/FilterHeader";
import Header from "@/app/shared-components/Header";
import BarsIcon from '@/public/images/icons/bars.svg';
import TIcon from '@/public/images/icons/t.svg';
import CalendarIcon from '@/public/images/icons/calendar.svg';
import ThreeIcon from '@/public/images/icons/dots.png';
import Image from "next/image";
import BackArrow from '@/public/images/icons/arrow-left.svg';
import NextArrow from '@/public/images/icons/arrow-right.svg';
import CopyIcon from '@/public/images/icons/copy-grey.svg';
import DeleteIcon from '@/public/images/icons/trash.svg';
import EditIcon from '@/public/images/icons/pencil.svg';

import { useState } from "react";
export default function HistoryPage() {

    const [selectedDate, setSelectedDate] = useState<string>("");
    const [dateSelectionOpen, setDateSelectionOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [data, setData] = useState<any[]>([
        {
            menuOpen: false,
        },
        {
            menuOpen: false,
        },
        {
            menuOpen: false,
        },
        {
            menuOpen: false,
        },
    ]);

    const handleMenuOpen = (index: number) => {
        setData(prev => prev.map((item, i) => ({
            ...item,
            menuOpen: i === index ? !item.menuOpen : false
        })));
    }
    


    return (
        <main className="w-full max-w-[1460px] mx-auto px-4">
            <div className="min-h-screen py-8 flex flex-row">
                <Sidebar />

                <div className="flex flex-col py-10 px-[42px] bg-white rounded-r-ud-radius w-full">
                    <Header
                        title="History"
                        description="View previously summarized texts"
                    />

                    <FilterHeader
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

                    <div className=" mt-4 gap-[10px] flex flex-col" >

                        {data.map((item, index) => (
                            <div key={index} className="flex p-5 items-start gap-[11px] self-stretch rounded-2xl border border-[#DEE0E3] bg-white w-full">
                                <div className="flex flex-row items-start justify-between w-full">
                                    <div className="flex flex-col">
                                        <span className="overflow-hidden text-[#14151A] text-ellipsis  font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px] w-full h-[42px]">
                                            Naruto Uzumaki became the greatest shinobi of his time through unparalleled power, relentless determination, and his ability to unite and inspire others. Mastering Kurama's chakra and the Sage of Six Paths' power, he achieved near-godlike abilities, defeating formidable foes like Kaguya Ōtsutsuki. His leadership united the shinobi nations, ending generations of conflict. Despite personal struggles, Naruto turned his pain into strength, becoming a beacon of hope and proving that hard work and perseverance could overcome any obstacle.
                                        </span>
                                        <div className="flex items-center gap-[6px] mt-4">
                                            <div className="
                                                flex justify-center items-center gap-1 px-[6px] py-[4px]
                                                rounded-[8px] bg-[#E9EAEC]
                                                text-[rgba(15,19,36,0.60)] text-center
                                                font-inter text-[14px] font-medium leading-[20px] tracking-[-0.07px]
                                            ">
                                                <Image src={CalendarIcon} alt="Calendar" width={16} height={16} />
                                                <p>December 10, 2024 • 3:20 PM</p>
                                            </div>

                                            <div className="
                                                flex justify-center items-center gap-1 px-[6px] py-[4px]
                                                rounded-[8px] bg-[#E9EAEC]
                                                text-[rgba(15,19,36,0.60)] text-center
                                                font-inter text-[14px] font-medium leading-[20px] tracking-[-0.07px]
                                            ">
                                                <Image src={BarsIcon} alt="Calendar" width={16} height={16} />
                                                <p>77 words</p>
                                            </div>

                                            <div className="
                                                flex justify-center items-center gap-1 px-[6px] py-[4px]
                                                rounded-[8px] bg-[#E9EAEC]
                                                text-[rgba(15,19,36,0.60)] text-center
                                                font-inter text-[14px] font-medium leading-[20px] tracking-[-0.07px]
                                            ">
                                                <Image src={TIcon} alt="Calendar" width={16} height={16} />
                                                <p>538 Characters</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end relative">
                                        <button
                                            onClick={() => handleMenuOpen(index)}
                                            className="flex p-2 justify-center items-center gap-[2px] rounded-[10px] border border-[#DEE0E3] bg-white shadow-[0px_1px_2px_0px_rgba(20,21,26,0.05)]">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.33333 6.66666C2.6 6.66666 2 7.26666 2 7.99999C2 8.73332 2.6 9.33332 3.33333 9.33332C4.06667 9.33332 4.66667 8.73332 4.66667 7.99999C4.66667 7.26666 4.06667 6.66666 3.33333 6.66666ZM12.6667 6.66666C11.9333 6.66666 11.3333 7.26666 11.3333 7.99999C11.3333 8.73332 11.9333 9.33332 12.6667 9.33332C13.4 9.33332 14 8.73332 14 7.99999C14 7.26666 13.4 6.66666 12.6667 6.66666ZM8 6.66666C7.26667 6.66666 6.66667 7.26666 6.66667 7.99999C6.66667 8.73332 7.26667 9.33332 8 9.33332C8.73333 9.33332 9.33333 8.73332 9.33333 7.99999C9.33333 7.26666 8.73333 6.66666 8 6.66666Z" fill="#0F1324" fill-opacity="0.6" />
                                            </svg>

                                        </button>

                                        {item.menuOpen && (
                                            <div className="absolute top-0 right-0 flex w-[175px] flex-col items-start p-[4px_0px] gap-[0px] rounded-[12px] border border-[#DEE0E3] bg-white shadow-[0px_10px_16px_-3px_rgba(20,21,26,0.08),0px_3px_6px_-2px_rgba(20,21,26,0.05)]">
                                                <button className="w-full flex px-3 py-[6px]  items-center gap-[8px] bg-[rgba(255,255,255,0)] hover:bg-[rgba(10,15,41,0.04)]">
                                                    <Image
                                                        src={CopyIcon}
                                                        alt="Delete"
                                                        width={20}
                                                        height={20}
                                                    />
                                                    <span className="text-[var(--text-base-primary,#14151A)] text-center font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px] ">
                                                        Copy to Clipboard
                                                    </span>
                                                </button>
                                                <button className="w-full flex  px-3 py-[6px]  items-center gap-[8px] bg-[rgba(255,255,255,0)] hover:bg-[rgba(10,15,41,0.04)]">
                                                    <Image
                                                        src={EditIcon}
                                                        alt="Delete"
                                                        width={20}
                                                        height={20}
                                                    />
                                                    <span className="text-[var(--text-base-primary,#14151A)] text-center font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px]">
                                                        Edit
                                                    </span>
                                                </button>
                                                <button className="w-full flex px-3 py-[6px]  items-center gap-[8px] bg-[rgba(255,255,255,0)] hover:bg-[rgba(10,15,41,0.04)]">
                                                    <Image
                                                        src={DeleteIcon}
                                                        alt="Delete"
                                                        width={20}
                                                        height={20}
                                                    />
                                                    <span className="text-[var(--text-base-primary,#14151A)] text-center font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px]">
                                                        Delete
                                                    </span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="flex flex-row justify-between items-center mt-[18px]">
                        <p className="text-[rgba(15,19,36,0.60)] text-center font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px]">
                            Showing 1-5 of 100
                        </p>

                        <div className="flex flex-row justify-end items-center gap-[10px]">
                            <button className="flex p-[10px] justify-center items-center gap-[4px] rounded-[12px] bg-[rgba(255,255,255,0)] hover:bg-[rgba(10,15,41,0.04)]">
                                <Image
                                    src={BackArrow}
                                    alt="Back"
                                    width={20}
                                    height={20}
                                />
                            </button>


                            {[
                                {
                                    title: "1",
                                    isActive: true
                                },
                                {
                                    title: "2",
                                    isActive: false
                                },
                                {
                                    title: "3",
                                    isActive: false
                                },
                            ].map((item, index) => (
                                <p key={index} className={`
                                    flex w-[40px] h-[40px] p-[10px] justify-center items-center gap-[4px] 
                                    rounded-[12px] cursor-pointer
                                    ${item.isActive 
                                        ? "bg-[rgba(10,15,41,0.04)] text-[#14151A]" 
                                        : "bg-white text-[rgba(15,19,36,0.60)] hover:bg-[rgba(10,15,41,0.04)]"
                                    }
                                    text-center font-inter text-[16px] font-medium leading-[24px] tracking-[-0.16px]
                                `}>
                                    {item.title}
                                </p>
                            ))}

                            <button className="flex p-[10px] justify-center items-center gap-[4px] rounded-[12px] bg-[rgba(255,255,255,0)] hover:bg-[rgba(10,15,41,0.04)]">
                                <Image
                                    src={NextArrow}
                                    alt="Next"
                                    width={20}
                                    height={20}
                                />
                            </button>

                        </div>
                    </div>







                </div>
            </div>
        </main>
    );
}
