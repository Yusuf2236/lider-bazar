'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaTimes, FaUserAlt, FaRobot, FaTelegramPlane } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ChatModal.module.css';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'agent';
    time: string;
}

export default function ChatModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { t } = useLanguage();
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'Assalomu alaykum! Sobiq Lider Bazar yordamchisiman. Sizga qanday yordam bera olaman?', sender: 'agent', time: '12:00' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newUserMessage]);
        setInputValue('');

        // Simulate response
        setTimeout(() => {
            const agentResponse: Message = {
                id: Date.now() + 1,
                text: 'Xabaringiz qabul qilindi. Tez orada operatorimiz siz bilan bog\'lanadi. Shoshilinch masalada Telegram orqali yozishingiz mumkin.',
                sender: 'agent',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, agentResponse]);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={`${styles.modal} glass`} onClick={e => e.stopPropagation()}>
                <header className={styles.header}>
                    <div className={styles.agentInfo}>
                        <div className={styles.avatar}>
                            <FaRobot />
                            <span className={styles.statusDot}></span>
                        </div>
                        <div>
                            <h3>Lider Support</h3>
                            <p>Online</p>
                        </div>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <FaTimes />
                    </button>
                </header>

                <div className={styles.messages}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`${styles.messageWrapper} ${styles[msg.sender]}`}>
                            <div className={styles.message}>
                                <p>{msg.text}</p>
                                <span className={styles.time}>{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.footer}>
                    <div className={styles.quickLinks}>
                        <a href="https://t.me/yusuf_dev" target="_blank" rel="noopener noreferrer" className={styles.tgLink}>
                            <FaTelegramPlane /> Telegram orqali bog'lanish
                        </a>
                    </div>
                    <div className={styles.inputArea}>
                        <input
                            type="text"
                            placeholder="Xabarni yozing..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className={styles.sendBtn} onClick={handleSend}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
