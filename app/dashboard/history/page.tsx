"use client";
import Sidebar from "@/app/dashboard/components/sidebar";
import FilterHeader from "./components/FilterHeader";
import { useState } from "react";
import HistoryItem from "./components/HistoryItem";
import Pagination from "./components/Pagination";
import Header from "../components/Header";

export default function HistoryPage() {
    const [selectedDate, setSelectedDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPage, setSelectedPage] = useState(1);

    // Dummy data for demonstration
    const [data, setData] = useState([
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            date: "2024-01-15",
            wordCount: 19,
            characterCount: 123,
            menuOpen: false
        },
        {
            text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            date: "2024-01-14",
            wordCount: 19,
            characterCount: 108,
            menuOpen: false
        },
        {
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            date: "2024-01-13",
            wordCount: 19,
            characterCount: 107,
            menuOpen: false
        },
        {
            text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            date: "2024-01-12",
            wordCount: 19,
            characterCount: 110,
            menuOpen: false
        },
        {
            text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
            date: "2024-01-11",
            wordCount: 15,
            characterCount: 98,
            menuOpen: false
        }
    ]);

    const handleMenuOpen = (index: number) => {
        setData(prev => prev.map((item, i) => ({
            ...item,
            menuOpen: i === index ? !item.menuOpen : false
        })));
    }

    return (
        <main className="w-full max-w-[1460px] mx-auto px-0 sm:px-4">
            <div className="min-h-screen flex flex-col md:flex-row">
                <Sidebar />

                <div className="flex flex-col py-5 md:py-10 px-4 md:px-[42px] bg-white rounded-none md:rounded-r-ud-radius w-full">
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
