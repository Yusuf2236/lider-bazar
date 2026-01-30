'use client';

import React, { useState } from 'react';
import { FaSearch, FaSlidersH } from 'react-icons/fa';

interface SearchFilterProps {
    onSearch: (term: string) => void;
    placeholder?: string;
}

export default function SearchFilter({ onSearch, placeholder = "Qidirish..." }: SearchFilterProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <div className="sticky top-0 bg-white z-40 p-3 shadow-sm">
            <div className="flex gap-2">
                <div className="flex items-center flex-1 border rounded-lg px-3 bg-gray-50 focus-within:bg-white focus-within:border-orange-500 transition-colors">
                    <FaSearch className="text-gray-400" />
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="flex-1 p-2 bg-transparent outline-none text-sm"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <button
                    className="border rounded-lg px-4 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    aria-label="Filter"
                >
                    <FaSlidersH />
                </button>
            </div>
        </div>
    );
}
