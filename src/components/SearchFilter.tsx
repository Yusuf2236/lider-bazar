import React, { useState } from 'react';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import styles from './SearchFilter.module.css';

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
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.inputGroup}>
                    <FaSearch className={styles.icon} />
                    <input
                        type="text"
                        placeholder={placeholder}
                        className={styles.input}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <button
                    className={styles.filterButton}
                    aria-label="Filter"
                >
                    <FaSlidersH />
                </button>
            </div>
        </div>
    );
}
