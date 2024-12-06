"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import TextControls from "./components/TextControls";
import SummaryDisplay from "./components/SummaryDisplay";
import SummaryControls from "./components/SummaryControls";
import { useNotificationStore, NotificationType } from "@/app/store/notificationStore";
export default function DashboardPage() {
  const [text, setText] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState("");
  const showNotification = useNotificationStore(state => state.showNotification);
  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(text.length);
  }, [text]);

  const handleReset = () => {
    setText("");
    setInputMode(false);
  };

  const handleSummarize = () => {
    setSummarizing(true);
    // TODO: Add summarize function
    setTimeout(() => {
      setSummarizing(false);
      setSummary("This is a summary of the text");
    }, 3000);
  };

  const copyDisabled = summarizing || summary === "";

  return (
    <main className="w-full max-w-[1460px] mx-auto px-4">
      <div className="min-h-screen py-8 flex flex-row">
        <Sidebar />
        
        <div className="flex flex-col py-10 px-[42px] bg-white rounded-r-ud-radius w-full">
          <Header />

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
              onReset={handleReset}
              onSummarize={handleSummarize}
            />
          </div>

          <SummaryDisplay summary={summary} />

          <SummaryControls 
            wordCount={wordCount}
            charCount={charCount}
            copyDisabled={copyDisabled}
            summary={summary}
            showNotification={(type: NotificationType, title:string, msg?: string) => showNotification(type, title, msg)}
          />
        </div>
      </div>
    </main>
  );
}
