import { create } from 'zustand'

interface SummarizerState {
    // Input state
    text: string
    wordCount: number
    charCount: number
    inputMode: boolean
    
    // Summary state
    summary: string
    summaryWordCount: number
    summaryCharCount: number
    
    // Loading state
    summarizing: boolean
    error: { title: string; message: string } | null

    // Actions
    setText: (text: string) => void
    setSummary: (summary: string) => void
    setInputMode: (mode: boolean) => void
    setSummarizing: (loading: boolean) => void
    setError: (error: { title: string; message: string } | null) => void
    reset: () => void
}

export const useSummarizerStore = create<SummarizerState>((set) => ({
    // Initial state
    text: '',
    wordCount: 0,
    charCount: 0,
    inputMode: false,
    summary: '',
    summaryWordCount: 0,
    summaryCharCount: 0,
    summarizing: false,
    error: null,

    // Actions
    setText: (text) => set({ 
        text,
        wordCount: text.trim() ? text.trim().split(/\s+/).length : 0,
        charCount: text.length
    }),
    setSummary: (summary) => set({ 
        summary,
        summaryWordCount: summary.trim() ? summary.trim().split(/\s+/).length : 0,
        summaryCharCount: summary.length,
    }),
    setInputMode: (mode) => set({ inputMode: mode }),
    setSummarizing: (loading) => set({ summarizing: loading }),
    setError: (error) => set({ error }),
    reset: () => set({ 
        text: '',
        wordCount: 0,
        charCount: 0,
        inputMode: false,
        summary: '',
        summaryWordCount: 0,
        summaryCharCount: 0,
        summarizing: false,
        error: null
    })
}))
