'use client';

import Image from "next/image";
import clipboardIcon from "@/public/images/icons/clipboard.svg";
import keyboardIcon from "@/public/images/icons/keyboard.svg";

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  inputMode: boolean;
  setInputMode: (mode: boolean) => void;
}

export default function TextInput({ text, setText, inputMode, setInputMode }: TextInputProps) {
  return (
    <>
      {inputMode ? (
        <div className="bg-white px-5 py-[10px]">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-[120px] overflow-y-auto text-textbase resize-none focus:outline-none animate-fadeIn"
          />
        </div>
      ) : (
        <div className="bg-white flex flex-row justify-center items-center gap-5 py-[26px]">
          <button 
            className="flex flex-col justify-center items-center gap-2 border border-action-normal rounded-[10px] py-[18px] px-[30px] hover:bg-gray-50 transition-all duration-300 hover:scale-105 animate-fadeIn" 
            onClick={() => setInputMode(true)}
          >
            <div className="animate-pulseScale">
              <Image src={keyboardIcon} alt="Keyboard" width={24} height={25} />
            </div>
            <p className="text-[#131615] font-inter text-[12px] font-medium leading-[194.7%] text-center">Enter Text</p>
          </button>

          <button 
            className="flex flex-col justify-center items-center gap-2 border border-action-normal rounded-[10px] py-[18px] px-[30px] hover:bg-gray-50 transition-all duration-300 hover:scale-105 animate-fadeIn" 
            style={{ animationDelay: '0.1s' }}
            onClick={() => {
              navigator.clipboard.readText().then(text => {
                setText(text);
                setInputMode(true);
              });
            }}
          >
            <div className="animate-pulseScale">
              <Image src={clipboardIcon} alt="Clipboard" width={24} height={25} />
            </div>
            <p className="text-[#131615] font-inter text-[12px] font-medium leading-[194.7%] text-center">Paste Text</p>
          </button>
        </div>
      )}
    </>
  );
} 