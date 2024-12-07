"use client";
import Sidebar from "@/app/dashboard/components/sidebar";
import FilterHeader from "./components/FilterHeader";
import { useEffect, useState, useCallback } from "react";
import HistoryItem from "./components/HistoryItem";
import Pagination from "./components/Pagination";
import Header from "../components/Header";
import { getSummaries } from "./actions/get-summary";
import { NotificationTypes, useNotificationStore } from "@/app/store/notificationStore";
import { deleteSummary } from "./actions/delete-summary";
import Link from "next/link";
import { format } from "date-fns";
import { useSummaryStore } from './store/summary-store'
import { useRouter } from "next/navigation";

export default function HistoryPage() {
    const router = useRouter()
    const { 
        selectedDate, setSelectedDate,
        searchQuery, setSearchQuery,
        selectedPage, setSelectedPage,
        summaries, total, isLoading,
        setSummaries, setIsLoading,
        setEditingSummary, removeSummary
    } = useSummaryStore()
    
    const showNotification = useNotificationStore(state => state.showNotification)
    const [menuIndex, setMenuIndex] = useState<number>(-1)

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true)
            const result = await getSummaries({ 
                page: selectedPage, 
                search: searchQuery, 
                period: selectedDate 
            })
            
            if(result.error.title !== "") {
                showNotification(NotificationTypes.error, result.error.title, result.error.message)
            } else {
                // await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to ensure state updates
                setSummaries(result)
            }
        } finally {
            // setIsLoading(false)
        }
    }, [selectedPage, searchQuery, selectedDate, showNotification, setIsLoading, setSummaries])

    useEffect(() => {
        if(isLoading) {
            setIsLoading(false)
        }
    }, [summaries])
    // Debounce search query changes
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 500); // Wait 500ms after last keystroke before fetching

        return () => clearTimeout(timer);
    }, [searchQuery, fetchData]);

    // Handle other filter changes immediately
    useEffect(() => {
        if (!searchQuery) { // Don't double fetch when searchQuery changes
            fetchData();
        }
    }, [selectedPage, selectedDate, fetchData]);

    const onDelete = async (id: number, index: number) => {
        setMenuIndex(-1)
        removeSummary(index)
        const result = await deleteSummary(id)
        if(result.success) {
            showNotification(NotificationTypes.success, 'Summary deleted')
        } else {
            showNotification(NotificationTypes.error, result.error.title, result.error.message)
            // Refresh data to restore the deleted item if deletion failed
            fetchData()
        }
    }

    const handleEdit = (summary: typeof summaries[0]) => {
        setEditingSummary({
            id: summary.id,
            userText: summary.userText,
            summary: summary.summary
        })
        // Navigate to summarizer page
        router.push('/dashboard')
    }

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center py-10">
                    <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            );
        }

        if (summaries.length === 0) {
            if (searchQuery) {
                return (
                    <div className="flex flex-col items-center justify-center py-20">
                        <h3 className="text-xl font-semibold text-gray-700">No results found</h3>
                        <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
                    </div>
                );
            }

            return (
                <div className="flex flex-col items-center justify-center py-20">
                    <h3 className="text-xl font-semibold text-gray-700">No summaries yet</h3>
                    <p className="mt-2 text-gray-500">Create your first summary to get started</p>
                    <Link 
                        href="/dashboard" 
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Create Summary
                    </Link>
                </div>
            );
        }

        return summaries.map((item, index) => (
            <HistoryItem
                key={index}
                text={item.userText}
                date={format(new Date(item.createdAt), 'MMMM d, yyyy • h:mm a')}
                wordCount={item.wordCount}
                characterCount={item.characterCount}
                isMenuOpen={menuIndex === index}
                onMenuToggle={() => setMenuIndex(index)}
                onCopy={() => {
                    setMenuIndex(-1)
                    navigator.clipboard.writeText(item.userText)
                    showNotification(NotificationTypes.success, 'Copied to clipboard')
                }}
                onEdit={() => handleEdit(item)}
                onDelete={() => onDelete(item.id, index)}
            />
        ))
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
                        {renderContent()}
                    </div>

                    {summaries.length > 0 && (
                        <Pagination
                            currentPage={selectedPage}
                            totalItems={total || 0}
                            itemsPerPage={5}
                            onPageChange={(page:number) => {
                                console.log("page changed", page);
                                setSelectedPage(page);
                            }}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
