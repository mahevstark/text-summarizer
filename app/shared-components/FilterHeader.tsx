
'use client'

import { useState } from 'react'
import Image from 'next/image'
import CalendarIcon from '@/public/images/icons/calendar.svg'
import DownArrowIcon from '@/public/images/icons/down-arrow.svg'
import SearchIcon from '@/public/images/icons/search.svg'

interface FilterHeaderProps {
    selectedDate: string
    setSelectedDate: (date: string) => void
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export default function FilterHeader({ selectedDate, setSelectedDate, searchQuery, setSearchQuery }: FilterHeaderProps) {
    const [dateSelectionOpen, setDateSelectionOpen] = useState(false)

    return (
        <div className="flex flex-row justify-between items-center mt-5">
            <div className="flex flex-row relative flex-[0.5]">
                <button
                    onClick={() => setDateSelectionOpen(!dateSelectionOpen)}
                    className="
                        flex justify-center items-center gap-[6px]
                        px-[10px] py-[6px] rounded-[10px] font-inter text-[14px] font-medium leading-[20px] tracking-[-0.07px] text-center
                        border border-[#DEE0E3] bg-white text-[#14151A] shadow-[0px_1px_2px_0px_rgba(20,21,26,0.05)]
                    ">
                    <Image src={CalendarIcon} alt="Bars" width={16} height={16} />
                    {selectedDate ? selectedDate : "Last 7 days"}
                    <Image src={DownArrowIcon} alt="Down Arrow" width={16} height={16} />
                </button>

                {
                    dateSelectionOpen && (
                        <div className="absolute top-10 left-0 w-[200px] bg-white rounded-lg shadow-lg">
                            {[
                                "Today",
                                "Yesterday",
                                "Last 7 Days",
                                "Last 14 Days",
                                "Last 30 Days",
                                "30-60 Days ago",
                                "> 60 Days ago"
                            ].map((option, index, array) => (
                                <div
                                    onClick={() => {
                                        setSelectedDate(option)
                                        setDateSelectionOpen(false)
                                    }}
                                    key={option} className={`
                                        flex px-[15px] py-[11px] items-center gap-[10px] self-stretch
                                        ${index === 0 ? 'rounded-t-[7.5px]' : ''} 
                                        ${index === array.length - 1 ? 'rounded-b-[7.5px]' : ''}
                                        border-x-[0.75px] border-b-[0.75px]
                                        ${index === 0 ? 'border-t-[0.75px]' : ''}
                                        border-[#DBDBDB] bg-white
                                        text-[#131615] font-public-sans text-base font-normal leading-[24px]
                                        cursor-pointer hover:bg-gray-50
                                    `}>
                                    {option}
                                </div>
                            ))}
                        </div>
                    )
                }


            </div>

            <div className="flex flex-row items-center gap-[10px]">
                <div className="
                        flex px-[8px] py-[6px] items-center gap-0 flex-[1_0_0]
                        rounded-[10px] border border-[#DEE0E3] bg-white
                    ">
                    <Image
                        src={SearchIcon}
                        alt="Search"
                        width={16}
                        height={16}
                    />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="Search..."
                        className="
                                ml-[6px]
                                w-[400px]
                                font-inter text-[14px] leading-[20px]
                                placeholder:text-[#0F1324]/60
                                focus:outline-none
                                bg-transparent
                            "
                    />
                </div>
            </div>
        </div>
    )
}
