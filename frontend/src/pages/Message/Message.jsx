import React, {useState} from 'react';
import { FiSearch, FiHome, FiMessageSquare, FiBell, FiUser, FiSend } from 'react-icons/fi'
//import "./Message.css"; // Import the CSS file


const Message = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Message here', time: '2:00pm', isUser: true },
        { id: 2, text: 'Message here', time: '2:05pm', isUser: true },
        { id: 3, text: 'Message here', time: '2:10pm', isUser: false },
        { id: 4, text: 'Message here', time: '2:15pm', isUser: false },
    ]);
    const [newMessage, setNewMessage] = useState('')
    
    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!newMessage.trim()) return
        
        setMessages([...messages, {
          id: messages.length + 1,
          text: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: true
        }])
        setNewMessage('')
    };
    
    return (
        <div className="min-h-screen bg-gray-100">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="gameSphere_logo.png" alt="GameSphere" className="h-8 w-8" />
                <span className="font-bold text-xl">GameSphere</span>
              </div>
              
              <div className="flex-1 max-w-xl mx-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search here............"
                    className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
                  />
                  <FiSearch className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
                </div>
              </div>
    
              <nav className="flex items-center gap-6">
                <FiHome className="h-6 w-6 text-gray-600" />
                <FiMessageSquare className="h-6 w-6 text-purple-600" />
                <FiBell className="h-6 w-6 text-gray-600" />
                <FiUser className="h-6 w-6 text-gray-600" />
              </nav>
            </div>
          </header>
    
          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-[300px,1fr] gap-6">
            {/* Sidebar */}
            <div className="bg-white rounded-lg p-6 h-[calc(100vh-8rem)]">
              <div className="flex flex-col items-center gap-4">
                <div className="h-24 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                  <FiMessageSquare className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold">Message BOX</h2>
              </div>
            </div>
    
            {/* Chat Area */}
            <div className="bg-white rounded-lg flex flex-col h-[calc(100vh-8rem)]">
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className="flex items-end gap-2 max-w-[80%]">
                        {message.isUser && (
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0" />
                        )}
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.isUser
                              ? 'bg-white border'
                              : 'bg-gray-200'
                          }`}
                        >
                          <p>{message.text}</p>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        {!message.isUser && (
                          <div className="h-8 w-8 rounded-full bg-blue-600 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    
              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Message"
                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FiSend className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
    );
};

export default Message;