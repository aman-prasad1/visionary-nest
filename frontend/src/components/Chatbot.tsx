import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Briefcase, Users, Trophy } from 'lucide-react';
import { apiClient } from '../lib/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'suggestion' | 'normal';
  data?: any;
}

interface RecruiterSuggestion {
  id: string;
  name: string;
  company: string;
  position: string;
  linkedin: string;
  matchScore: number;
  reason: string;
}

interface JobSuggestion {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  matchScore: number;
  reason: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your career assistant. I can help you find the right recruiters and job opportunities based on your portfolio. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'bot', type?: 'suggestion' | 'normal', data?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type,
      data
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage(userMessage, 'user');

    setIsTyping(true);

    try {
      // Call the backend API for suggestions
      const response = await fetch('/api/chat/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.success) {
        const { recruiters, jobs } = data.data;

        // Add bot response with suggestions
        addMessage("Based on your portfolio, here are some tailored suggestions:", 'bot', 'suggestion', {
          recruiters: recruiters || [],
          jobs: jobs || []
        });
      } else {
        addMessage("I couldn't fetch suggestions right now. Please try again later.", 'bot');
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      addMessage("Sorry, I'm having trouble connecting. Please try again.", 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        drag
        dragConstraints={{
          left: 10,
          right: window.innerWidth - 80,
          top: 10,
          bottom: window.innerHeight - 80,
        }}
        dragMomentum={false}
        initial={{ scale: 0, x: 0, y: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 cursor-grab"
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{
              left: 10,
              right: window.innerWidth - 384 - 10, // w-96 is 384px
              top: 10,
              bottom: window.innerHeight - 500 - 10, // h-[500px]
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95, x: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-40 flex flex-col"
          >
            {/* Header */}
            <motion.div
              onPointerDown={(event) => dragControls.start(event)}
              className="flex items-center justify-between p-4 border-b border-white/10 cursor-grab"
              whileTap={{ cursor: 'grabbing' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center border-2 border-purple-400/50 shadow-lg">
                  <Bot size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    VisionaryNest Assistant
                  </h3>
                  <p className="text-gray-400 text-sm">Your AI portfolio guide</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-gray-200'
                      }`}
                    >
                      {message.type === 'suggestion' && message.data ? (
                        <div className="space-y-4">
                          <p className="text-sm">{message.text}</p>

                          {/* Recruiter Suggestions */}
                          {message.data.recruiters && message.data.recruiters.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Users size={16} className="text-blue-400" />
                                <span className="text-sm font-semibold text-blue-400">Recommended Recruiters</span>
                              </div>
                              <div className="space-y-2">
                                {message.data.recruiters.map((recruiter: RecruiterSuggestion) => (
                                  <motion.div
                                    key={recruiter.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white/5 rounded-lg p-3 border border-white/5"
                                  >
                                    <div className="flex justify-between items-start mb-1">
                                      <h4 className="text-sm font-semibold text-white">{recruiter.name}</h4>
                                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                                        {recruiter.matchScore}% match
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-2">{recruiter.position} at {recruiter.company}</p>
                                    <p className="text-xs text-gray-300">{recruiter.reason}</p>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Job Suggestions */}
                          {message.data.jobs && message.data.jobs.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Briefcase size={16} className="text-green-400" />
                                <span className="text-sm font-semibold text-green-400">Job Opportunities</span>
                              </div>
                              <div className="space-y-2">
                                {message.data.jobs.map((job: JobSuggestion) => (
                                  <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white/5 rounded-lg p-3 border border-white/5"
                                  >
                                    <div className="flex justify-between items-start mb-1">
                                      <h4 className="text-sm font-semibold text-white">{job.title}</h4>
                                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                                        {job.matchScore}% match
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-2">{job.company} • {job.location}</p>
                                    <p className="text-xs text-gray-300">{job.reason}</p>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm">{message.text}</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about recruiters, jobs, or career advice..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;