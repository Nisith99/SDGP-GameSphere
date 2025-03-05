import React, { useState } from 'react';
import { FiSearch, FiHome, FiMessageSquare, FiBell, FiUser, FiSend } from 'react-icons/fi';
import './Message.css';

const Message = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Message here', time: '2:00pm', isUser: true },
        { id: 2, text: 'Message here', time: '2:05pm', isUser: true },
        { id: 3, text: 'Message here', time: '2:10pm', isUser: false },
        { id: 4, text: 'Message here', time: '2:15pm', isUser: false },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setMessages([...messages, {
            id: messages.length + 1,
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isUser: true
        }]);
        setNewMessage('');
    };

    return (
        <div className="container">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <div className="logo-container">
                        <img src="gameSphere_logo.png" alt="GameSphere" className="logo" />
                        <span className="brand">GameSphere</span>
                    </div>

                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search here............"
                            className="search-input"
                        />
                        <FiSearch className="search-icon" />
                    </div>

                    <nav className="nav">
                        <FiHome className="nav-icon" />
                        <FiMessageSquare className="nav-icon active" />
                        <FiBell className="nav-icon" />
                        <FiUser className="nav-icon" />
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {/* Sidebar */}
                <div className="sidebar">
                    <div className="sidebar-content">
                        <div className="sidebar-icon-container">
                            <FiMessageSquare className="sidebar-icon" />
                        </div>
                        <h2 className="sidebar-title">Message BOX</h2>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="chat-area">
                    <div className="chat-messages">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`message-container ${message.isUser ? 'user' : 'other'}`}
                                >
                                    <div className="message-content">
                                        {message.isUser && (
                                            <div className="avatar" />
                                        )}
                                        <div
                                            className={`message-bubble ${message.isUser ? 'user' : 'other'}`}
                                        >
                                            <p className="message-text">{message.text}</p>
                                            <span className="message-time">{message.time}</span>
                                        </div>
                                        {!message.isUser && (
                                            <div className="avatar" style={{ backgroundColor: '#3b82f6' }} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="message-input-form">
                        <div className="message-input-container">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Message"
                                className="message-input"
                            />
                            <button
                                type="submit"
                                className="send-button"
                            >
                                <FiSend className="send-icon" />
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Message;