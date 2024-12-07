import { create } from 'zustand'
import { FilterPeriod, Summaries } from '../actions/get-summary'

export type EditingSummary = {
    id: number
    userText: string
    summary: string
}

interface SummaryState {
    // Data
    summaries: Summaries['summaries']
    total: number
    hasMore: boolean
    
    // Filters and pagination
    selectedDate: FilterPeriod
    searchQuery: string
    selectedPage: number
    isLoading: boolean

    // Edit mode
    editingSummary: EditingSummary | null

    // Actions
    setSelectedDate: (date: FilterPeriod) => void
    setSearchQuery: (query: string) => void
    setSelectedPage: (page: number) => void
    setSummaries: (data: Summaries) => void
    setIsLoading: (loading: boolean) => void
    setEditingSummary: (summary: { id: number, userText: string, summary: string } | null) => void
    removeSummary: (index: number) => void
}

export const useSummaryStore = create<SummaryState>((set) => ({
    // Initial state
    summaries: [],
    total: 0,
    hasMore: false,
    selectedDate: 'Today',
    searchQuery: '',
    selectedPage: 1,
    isLoading: false,
    editingSummary: null,

    // Actions
    setSelectedDate: (date) => set({ selectedDate: date, selectedPage: 1 }),
    setSearchQuery: (query) => set({ searchQuery: query, selectedPage: 1 }),
    setSelectedPage: (page) => set({ selectedPage: page }),
    setSummaries: (data) => set({ 
        summaries: data.summaries,
        total: data.total,
        hasMore: data.hasMore
    }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setEditingSummary: (summary) => set({ editingSummary: summary }),
    removeSummary: (index) => set((state) => ({
        summaries: state.summaries.filter((_, i) => i !== index),
        total: state.total - 1
    }))
}))
