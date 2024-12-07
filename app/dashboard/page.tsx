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
import { useEffect } from 'react';
import { useSummaryStore } from './history/store/summary-store';

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

  const { editingSummary, setEditingSummary } = useSummaryStore();

  useEffect(() => {
    if(editingSummary) {
      setText(editingSummary.userText)
      setSummary(editingSummary.summary)
      setInputMode(true)
    }
  }, [editingSummary])

  const showNotification = useNotificationStore(state => state.showNotification);

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
    }
    
    setSummarizing(false);
  };

  const copyDisabled = summarizing || summary === "";

  return (
    <main className="w-full max-w-[1460px] mx-auto px-0 sm:px-4">
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        
        <div className="flex flex-col py-5 md:py-10 px-4 md:px-[42px] bg-white rounded-none md:rounded-r-ud-radius w-full">
          <Header
            title="Text Summarizer"
            description="Summarize and manage texts with ease"
          />

          <div className="mt-5 bg-box-bg rounded-ud-radius py-4 border border-box-bg">
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

          <SummaryDisplay summary={summary} />

          <SummaryControls 
            wordCount={summaryWordCount}
            charCount={summaryCharCount}
            copyDisabled={copyDisabled}
            summary={summary}
            showNotification={(type: NotificationType, title:string, msg?: string) => showNotification(type, title, msg)}
          />
        </div>
      </div>
    </main>
  );
}