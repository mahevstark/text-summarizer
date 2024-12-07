"use client";
import Sidebar from "@/app/dashboard/components/sidebar";
import FilterHeader from "@/app/shared-components/FilterHeader";
import Header from "@/app/shared-components/Header";
import { useState } from "react";
import HistoryItem from "./components/HistoryItem";
import Pagination from "./components/Pagination";

export default function HistoryPage() {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [data, setData] = useState<any[]>([
        {
            menuOpen: false,
            text: "Naruto Uzumaki became the greatest shinobi of his time through unparalleled power, relentless determination, and his ability to unite and inspire others. Mastering Kurama's chakra and the Sage of Six Paths' power, he achieved near-godlike abilities, defeating formidable foes like Kaguya Ōtsutsuki. His leadership united the shinobi nations, ending generations of conflict. Despite personal struggles, Naruto turned his pain into strength, becoming a beacon of hope and proving that hard work and perseverance could overcome any obstacle.",
            date: "December 10, 2024 • 3:20 PM",
            wordCount: 77,
            characterCount: 538
        },
        {
            menuOpen: false,
            text: "Sample text 2",
            date: "December 10, 2024 • 3:21 PM",
            wordCount: 50,
            characterCount: 300
        },
        {
            menuOpen: false,
            text: "Sample text 3",
            date: "December 10, 2024 • 3:22 PM",
            wordCount: 60,
            characterCount: 400
        },
        {
            menuOpen: false,
            text: "Sample text 4",
            date: "December 10, 2024 • 3:23 PM",
            wordCount: 45,
            characterCount: 250
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

                    <div className="mt-4 gap-[10px] flex flex-col">
                        {data.map((item, index) => (
                            <HistoryItem
                                key={index}
                                text={item.text}
                                date={item.date}
                                wordCount={item.wordCount}
                                characterCount={item.characterCount}
                                isMenuOpen={item.menuOpen}
                                onMenuToggle={() => handleMenuOpen(index)}
                                onCopy={() => console.log('Copy', index)}
                                onEdit={() => console.log('Edit', index)}
                                onDelete={() => console.log('Delete', index)}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={selectedPage}
                        totalItems={100}
                        itemsPerPage={5}
                        onPageChange={setSelectedPage}
                    />
                </div>
            </div>
        </main>
    );
}
