"use client";

import { useSummarizerStore } from './store/summarizer-store';
import { summarize } from './actions/summarize';
import TextControls from './components/TextControls';
import SummaryControls from './components/SummaryControls';
import { NotificationType, useNotificationStore } from '../store/notificationStore';
import Sidebar from './components/sidebar';
import Header from './components/Header';
import TextInput from './components/TextInput';
import SummaryDisplay from './components/SummaryDisplay';
import { useEffect, useCallback } from 'react';
import { useSummaryStore } from './history/store/summary-store';
import { getSummaries } from './history/actions/get-summary';

export default function Dashboard() {
  const { 
    text, setText,
    summary, setSummary,
    wordCount, charCount,
    summaryWordCount, summaryCharCount,
    inputMode, setInputMode,
    summarizing, setSummarizing,
    setError,
    reset 
  } = useSummarizerStore();

  const { 
    editingSummary, setEditingSummary,
    selectedDate, searchQuery, selectedPage,
    isHistoriesLoaded, setSummaries, summaries,
    setIsLoading, total, setHistoriesLoaded
  } = useSummaryStore();

  const showNotification = useNotificationStore(state => state.showNotification);

  // Load histories when dashboard mounts
  const fetchHistories = useCallback(async () => {
    setIsLoading(true);
    const result = await getSummaries({
      page: selectedPage,
      search: searchQuery,
      period: selectedDate
    });

    if (result.error.title !== "") {
      setIsLoading(false);
      showNotification('error', result.error.title, result.error.message);
    } else {
      setSummaries(result);
    }
  }, [selectedPage, searchQuery, selectedDate]);

  useEffect(() => {
    if(!isHistoriesLoaded){
      fetchHistories();
    }
  }, []);

  useEffect(() => {
    if(editingSummary) {
      setText(editingSummary.userText)
      setSummary(editingSummary.summary)
      setInputMode(true)
    }
  }, [editingSummary, setInputMode, setSummary, setText]);

  const handleSummarize = async () => {
    if (!text.trim() || summarizing) return;
    
    setSummarizing(true);
    setError(null);
    
    const result = await summarize(text, editingSummary);
    
    if ('error' in result) {
      setError(result.error);
      showNotification('error', result.error.title, result.error.message);
    } else {
      setSummary(result.summary);
      showNotification('success', 'Summary generated successfully');
      
      // Update the history list
      if (editingSummary) {
        // If editing, update the existing summary in the list
        const updatedSummaries = summaries.map(s => 
          s.id === editingSummary.id 
            ? result.savedSummary 
            : s
        );
        setSummaries({
          summaries: updatedSummaries,
          total,
          hasMore: false,
          error: { title: '', message: '' }
        });
      } else if (selectedDate === 'Today') {
        // If it's a new summary and we're viewing today's summaries,
        // add it to the beginning of the list
        setSummaries({
          summaries: [result.savedSummary, ...summaries].slice(0, 5),
          total: total + 1,
          hasMore: total + 1 > 5,
          error: { title: '', message: '' }
        });
      } else {
        // If we're not viewing today's summaries, mark data as stale
        // so it will be refetched when user visits the history page
        setHistoriesLoaded(false);
      }
    }
    
    setSummarizing(false);
  };

  const copyDisabled = summarizing || summary === "";

  return (
    <main className="w-full max-w-[1460px] mx-auto px-0 sm:px-4">
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        
        <div className="flex flex-col py-5 md:py-10 px-4 md:px-[42px] bg-white rounded-none md:rounded-r-ud-radius w-full animate-fadeIn">
          <Header
            title="Text Summarizer"
            description="Summarize and manage texts with ease"
          />

          <div className="mt-5 bg-box-bg rounded-ud-radius py-4 border border-box-bg animate-slideInRight">
            <TextInput 
              text={text}
              setText={setText}
              inputMode={inputMode}
              setInputMode={setInputMode}
            />
            
            <TextControls 
              wordCount={wordCount}
              charCount={charCount}
              inputMode={inputMode}
              summarizing={summarizing}
              text={text}
              onReset={()=>{
                reset()
                setEditingSummary(null)
              }}
              onSummarize={handleSummarize}
            />
          </div>

          <div className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
            <SummaryDisplay summary={summary} />
          </div>

          <div className="animate-slideInRight" style={{ animationDelay: '0.3s' }}>
            <SummaryControls 
              wordCount={summaryWordCount}
              charCount={summaryCharCount}
              copyDisabled={copyDisabled}
              summary={summary}
              showNotification={(type: NotificationType, title:string, msg?: string) => showNotification(type, title, msg)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}