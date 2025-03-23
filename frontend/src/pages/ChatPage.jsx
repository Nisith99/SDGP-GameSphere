import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { Send, UserPlus, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ChatPage = () => {
    const { data: authUser, isLoading: authLoading } = useQuery({ queryKey: ["authUser"] });
    const queryClient = useQueryClient();

    const [selectedChat, setSelectedChat] = useState(null);
    const [messageContent, setMessageContent] = useState("");
    const [isChatHistoryVisible, setIsChatHistoryVisible] = useState(true);
    const messagesEndRef = useRef(null);

    const { data: chats, isLoading: chatsLoading } = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            const res = await axiosInstance.get("/chats");
            return res.data;
        },
        enabled: !!authUser,
        onSuccess: (data) => {
            if (selectedChat) {
                const updatedChat = data.find(
                    (chat) => chat?.user?._id?.toString() === selectedChat?.user?._id?.toString()
                );
                if (updatedChat) setSelectedChat(updatedChat);
            }
        },
    });

    const { data: connections } = useQuery({
        queryKey: ["connections"],
        queryFn: async () => {
            const res = await axiosInstance.get("/connections");
            return res.data;
        },
        enabled: !!authUser,
    });

    const { data: suggestedUsers } = useQuery({
        queryKey: ["suggestedUsersForChat"],
        queryFn: async () => {
            const res = await axiosInstance.get("/users/suggestions");
            return res.data.suggestedUsers;
        },
        enabled: !!authUser,
    });

    const { mutate: sendMessage, isPending: isSending } = useMutation({
        mutationFn: (data) => axiosInstance.post("/chats/send", data),
        onSuccess: (response) => {
            if (selectedChat) {
                const newMessage = {
                    _id: response.data._id || Date.now().toString(),
                    sender: authUser?._id,
                    content: messageContent,
                    createdAt: new Date().toISOString(),
                };
                setSelectedChat((prev) => ({
                    ...prev,
                    messages: [...(prev?.messages || []), newMessage],
                }));
            }
            queryClient.invalidateQueries(["chats"]);
            setMessageContent("");
            toast.success("Message sent!");
        },
        onError: (error) => {
            toast.error("Failed to send message: " + (error.message || "Unknown error"));
        },
    });

    const handleSendMessage = () => {
        if (!messageContent.trim() || !selectedChat || isSending) return;
        sendMessage({
            recipientId: selectedChat?.user?._id,
            content: messageContent,
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedChat?.messages]);

    const handleStartChat = (user) => {
        const existingChat = chats?.find((chat) =>
            chat?.user?._id?.toString() === user?._id?.toString()
        );
        setSelectedChat(existingChat || { user, messages: [] });
        setIsChatHistoryVisible(false); // Hide chat history on mobile when selecting a chat
    };

    const renderChatHistory = () => {
        if (chatsLoading || authLoading) return <p className="text-[#302F4D]/80">Loading chats...</p>;

        const chatUserIds = chats?.map((chat) => chat?.user?._id?.toString()) || [];
        const filteredConnections = connections?.filter(
            (connection) => !chatUserIds.includes(connection?._id?.toString())
        );

        const chatList = chats && chats.length > 0 ? (
            <div>
                <h3 className="text-sm font-semibold text-[#302F4D] mb-2">Recent Chats</h3>
                <ul className="space-y-2">
                    {chats.map((chat) => (
                        <li
                            key={chat?._id}
                            className="p-3 bg-[#F0D3F7]/50 rounded-lg cursor-pointer hover:bg-[#B98EA7]/30"
                            onClick={() => handleStartChat(chat?.user)}
                        >
                            <div className="flex items-center">
                                <img
                                    src={chat?.user?.profilePicture || "/avatar.png"}
                                    alt={chat?.user?.name || "User"}
                                    className="w-10 h-10 rounded-full mr-3 border border-[#A57982]/50"
                                />
                                <div>
                                    <p className="font-semibold text-[#120D31]">{chat?.user?.name || "Unknown User"}</p>
                                    <p className="text-xs text-[#302F4D]/60 truncate">
                                        {chat?.messages?.length > 0
                                            ? chat.messages[chat.messages.length - 1]?.content || "No messages yet"
                                            : "No messages yet"}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ) : null;

        return (
            <div className="h-full overflow-y-auto">
                {chatList || (
                    <div className="text-center py-4">
                        <UserPlus size={48} className="mx-auto text-[#A57982] mb-4" />
                        <p className="text-lg font-semibold text-[#120D31]">No chats yet</p>
                        <p className="text-[#302F4D]/60 mt-2">Start a chat with someone!</p>
                    </div>
                )}
                {filteredConnections && filteredConnections.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-sm font-semibold text-[#302F4D] mb-2">Your Connections</h3>
                        <div className="max-h-40 overflow-y-auto">
                            {filteredConnections.map((connection) => (
                                <div
                                    key={connection?._id}
                                    className="flex items-center p-2 hover:bg-[#B98EA7]/20 rounded cursor-pointer"
                                    onClick={() => handleStartChat(connection)}
                                >
                                    <img
                                        src={connection?.profilePicture || "/avatar.png"}
                                        alt={connection?.name || "User"}
                                        className="w-10 h-10 rounded-full mr-3 border border-[#A57982]/50"
                                    />
                                    <div>
                                        <p className="font-semibold text-[#120D31]">{connection?.name || "Unknown User"}</p>
                                        <p className="text-xs text-[#302F4D]/60">@{connection?.username || "unknown"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {suggestedUsers && suggestedUsers.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-sm font-semibold text-[#302F4D] mb-2">Suggested Players</h3>
                        <div className="max-h-40 overflow-y-auto">
                            {suggestedUsers.slice(0, 3).map((user) => (
                                <div
                                    key={user?._id}
                                    className="flex items-center p-2 hover:bg-[#B98EA7]/20 rounded cursor-pointer"
                                    onClick={() => handleStartChat(user)}
                                >
                                    <img
                                        src={user?.profilePicture || "/avatar.png"}
                                        alt={user?.name || "User"}
                                        className="w-10 h-10 rounded-full mr-3 border border-[#A57982]/50"
                                    />
                                    <div>
                                        <p className="font-semibold text-[#120D31]">{user?.name || "Unknown User"}</p>
                                        <p className="text-xs text-[#302F4D]/60">@{user?.username || "unknown"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderChatWindow = () => {
        if (!selectedChat) return null;

        return (
            <div className="flex-1 flex flex-col h-full">
                <div className="p-4 bg-[#F0D3F7]/50 border-b border-[#302F4D]/20 flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            className="lg:hidden mr-2 text-[#A57982]"
                            onClick={() => setIsChatHistoryVisible(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <img
                            src={selectedChat?.user?.profilePicture || "/avatar.png"}
                            alt={selectedChat?.user?.name || "User"}
                            className="w-10 h-10 rounded-full mr-3 border border-[#A57982]/50"
                        />
                        <div>
                            <p className="font-semibold text-[#120D31]">{selectedChat?.user?.name || "Unknown User"}</p>
                            <p className="text-xs text-[#302F4D]/60">@{selectedChat?.user?.username || "unknown"}</p>
                        </div>
                    </div>
                </div>
                <div
                    className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#302F4D]/40 scrollbar-track-transparent hover:scrollbar-thumb-[#302F4D]/60"
                    style={{
                        scrollbarWidth: "thin", // Firefox
                        scrollbarColor: "#302F4D/40 transparent", // Firefox default
                    }}
                >
                    <style jsx>{`
                        .scrollbar-thin:not(:hover)::-webkit-scrollbar {
                            width: 0px;
                        }
                        .scrollbar-thin::-webkit-scrollbar {
                            width: 6px;
                        }
                        .scrollbar-thin::-webkit-scrollbar-thumb {
                            border-radius: 9999px;
                        }
                    `}</style>
                    {selectedChat?.messages?.length > 0 ? (
                        selectedChat.messages.map((msg) => (
                            <div
                                key={msg?._id}
                                className={`mb-2 flex ${msg?.sender?.toString() === authUser?._id?.toString() ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] sm:max-w-xs p-3 rounded-lg ${msg?.sender?.toString() === authUser?._id?.toString()
                                        ? "bg-[#B98EA7] text-[#120D31]"
                                        : "bg-[#302F4D]/10 text-[#120D31]"
                                        }`}
                                >
                                    <p>{msg?.content || "Message unavailable"}</p>
                                    <p className="text-xs mt-1 opacity-75">
                                        {msg?.createdAt
                                            ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                            : "Unknown time"}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#302F4D]/60 text-center">No messages yet. Say hi!</p>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-2 sm:p-4 border-t border-[#302F4D]/20 flex items-center">
                    <input
                        type="text"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border border-[#302F4D]/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#A57982] text-[#120D31] text-sm sm:text-base"
                        disabled={isSending}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-2 bg-[#B98EA7] text-[#120D31] rounded-r-lg hover:bg-[#A57982] hover:text-white disabled:bg-[#302F4D]/40"
                        disabled={isSending}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        );
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#F0D3F7] to-[#B98EA7] flex items-center justify-center">
                <p className="text-[#302F4D]/80">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F0D3F7] to-[#B98EA7] flex flex-col">
            <div className="container mx-auto pt-4 sm:pt-8 pb-4 px-2 sm:px-4 flex-1">
                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="lg:col-span-1">
                        <Sidebar user={authUser} />
                    </div>
                    <div className="lg:col-span-3 flex flex-col">
                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-[#302F4D]/20 flex flex-col h-[calc(100vh-8rem)] sm:h-[31.625rem]">
                            <div className={`flex flex-col lg:flex-row h-full ${selectedChat && !isChatHistoryVisible ? "hidden lg:flex" : "flex"}`}>
                                <div className={`w-full lg:w-1/3 border-r border-[#302F4D]/20 pr-0 lg:pr-4 ${selectedChat ? "lg:block" : "block"}`}>
                                    {renderChatHistory()}
                                </div>
                                <div className={`w-full lg:w-2/3 pl-0 lg:pl-4 ${selectedChat ? "block" : "hidden lg:block"}`}>
                                    {renderChatWindow() || (
                                        <div className="flex-1 flex items-center justify-center text-[#302F4D]/60">
                                            <p>Select a chat to start messaging</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="mt-2 pb-4 sm:pb-6">
                <div className="max-w-md mx-auto px-2 sm:px-4 text-center text-xs text-[#302F4D]/60">
                    <div className="mt-3 space-x-4">
                        <a href="#" className="hover:text-[#120D31]">Help Center</a>
                        <a href="#" className="hover:text-[#120D31]">Privacy & Terms</a>
                        <a href="#" className="hover:text-[#120D31]">Accessibility</a>
                    </div>
                    <p className="mt-4">
                        GameSphere © {new Date().getFullYear()} | The Ultimate Sports Gaming Platform
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ChatPage;