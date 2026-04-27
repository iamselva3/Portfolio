import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { getChatSession } from "../../utils/gemini";

const USER = "user";
const ASSISTANT = "assistant";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // Initialize chat session once
  useEffect(() => {
    if (!chatRef.current) {
      try {
        chatRef.current = getChatSession();
      } catch (e) {
        console.error(e);
      }
    }
  }, []);


  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: USER, text: userMessage }]);
    setInput("");
    setLoading(true);
    try {
      const result = await chatRef.current.sendMessage(userMessage);
      const responseText = result?.response?.text() || "";
      setMessages((prev) => [...prev, { role: ASSISTANT, text: responseText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: ASSISTANT, text: "Sorry, I couldn’t process that. Please try again later." },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition"
          aria-label="Open AI assistant"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="flex flex-col w-80 max-h-[500px] bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Selva’s AI Assistant</h3>
            <button onClick={() => setOpen(false)} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
              <X size={20} />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === USER ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs rounded-lg p-2 text-sm ${msg.role === USER ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-xs rounded-lg p-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 animate-pulse">
                  ...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-2 flex items-center bg-white/30 dark:bg-gray-800/30">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 mr-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2 text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
