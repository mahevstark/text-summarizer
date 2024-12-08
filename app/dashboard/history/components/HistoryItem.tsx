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
    onMenuToggle,
    onCopy,
    onEdit,
    onDelete,
    index
}: HistoryItemProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Check if click target is a child of menuRef
            const isClickInsideMenu = menuRef.current?.contains(event.target as Node);
            // If click is outside menu and menu is open, close it
            if (!isClickInsideMenu && isMenuOpen) {
                onMenuToggle();
            }
        }

        // Only add listener if menu is open
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, onMenuToggle]);

    return (
        <div className="flex p-5 items-start gap-[11px] self-stretch rounded-2xl border border-[#DEE0E3] bg-white w-full">
            <div className="flex flex-row items-start justify-between w-full">
                <div className="flex flex-col flex-1 mr-4">
                    <span className="overflow-hidden text-[#14151A] text-ellipsis  font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px] w-full h-[42px]">
                        {text}
                    </span>
                    <HistoryItemMetadata
                        date={date}
                        wordCount={wordCount}
                        characterCount={characterCount}
                    />
                </div>
                <div ref={menuRef}>
                    <HistoryItemMenu
                        isOpen={isMenuOpen}
                        onToggle={onMenuToggle}
                        onCopy={onCopy || (() => {})}
                        onEdit={onEdit || (() => {})}
                        onDelete={() => {
                            if (onDelete) {
                                onDelete(index);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}