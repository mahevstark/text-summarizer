import { useEffect, useRef } from 'react';
import HistoryItemMetadata from './HistoryItemMetadata';
import HistoryItemMenu from './HistoryItemMenu';

interface HistoryItemProps {
    text: string;
    date: string;
    wordCount: number;
    characterCount: number;
    isMenuOpen: boolean;
    index: number;
    onMenuToggle: () => void;
    onCopy?: () => void;
    onEdit?: () => void;
    onDelete?: (index: number) => void;
}

export default function HistoryItem({
    text,
    date,
    wordCount,
    characterCount,
    isMenuOpen,
    index,
    onMenuToggle,
    onCopy,
    onEdit,
    onDelete
}: HistoryItemProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onMenuToggle();
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, onMenuToggle]);

    return (
        <div className="flex p-5 items-start gap-[11px] self-stretch rounded-2xl border border-[#DEE0E3] bg-white w-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-row items-start justify-between w-full">
                <div className="flex flex-col flex-1 mr-4">
                    <span className="overflow-hidden text-[#14151A] text-ellipsis font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px] w-full h-[42px] hover:text-purple-accent transition-colors duration-300">
                        {text}
                    </span>
                    <HistoryItemMetadata
                        date={date}
                        wordCount={wordCount}
                        characterCount={characterCount}
                    />
                </div>
                <div ref={menuRef} className="transition-transform duration-300 hover:scale-105">
                    <HistoryItemMenu
                        isOpen={isMenuOpen}
                        onToggle={onMenuToggle}
                        onCopy={onCopy || (() => {})}
                        onEdit={onEdit || (() => {})}
                        onDelete={() => {
                            if(onDelete) onDelete(index)
                        }}
                    />
                </div>
                
            </div>
            
        </div>
    );
}