import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

interface CyberpunkChatbotProps {
  toggleChat: () => void;
}

const CyberpunkChatbot: React.FC<CyberpunkChatbotProps> = ({ toggleChat }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "NEURAL_LINK_ESTABLISHED... Welcome to ResumeForge AI. I'm your career optimization assistant. Upload your resume or tell me about your skills, and I'll help you find the perfect job matches.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 15;
      const y = (clientY / innerHeight - 0.5) * 10;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "ANALYZING_PROFILE... I can see you're interested in tech roles. Let me scan the job market for matches...",
        "SKILL_MATRIX_PROCESSED... Your technical stack shows strong potential. I've identified 127 matching positions.",
        "OPTIMIZATION_COMPLETE... Based on your experience, I recommend focusing on Frontend Developer and Full-Stack roles.",
        "NEURAL_SCAN_RESULTS... Your profile matches 89% with top-tier companies. Let me enhance your resume keywords.",
        "CAREER_PATH_CALCULATED... I suggest highlighting your React and TypeScript skills for maximum ATS compatibility."
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      sendMessage(`RESUME_UPLOADED: ${file.name} - Analyzing document structure and extracting key qualifications...`);
    }
  };

  const quickActions = [
    "Analyze my resume",
    "Find job matches",
    "Improve my skills",
    "ATS optimization",
    "Salary insights",
    "Interview prep"
  ];

  return (
    <div className="fixed inset-0 bg-black text-white z-50 overflow-hidden font-mono">
      <button onClick={toggleChat} className="absolute top-4 right-4 text-3xl text-red-500 hover:text-red-400 transition-colors z-30">
        &times;
      </button>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse"></div>
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
        </div>
      ))}

      {/* Header */}
      <div className="relative z-20 border-b border-cyan-400/30 bg-black/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Bot Avatar */}
            <div 
              className="relative transition-transform duration-200 ease-out"
              style={{
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) rotateY(${mousePosition.x * 0.2}deg)`
              }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-0.5 animate-pulse">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
                  {/* Bot Face */}
                  <svg width="24" height="24" viewBox="0 0 24 24" className="text-cyan-400">
                    <circle cx="8" cy="10" r="1.5" fill="currentColor" className="animate-pulse"/>
                    <circle cx="16" cy="10" r="1.5" fill="currentColor" className="animate-pulse"/>
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
                    <path d="M21 9V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V9C3 10.1 3.9 11 5 11V17C5 18.1 5.9 19 7 19H9C9 20.1 9.9 21 11 21H13C14.1 21 15 20.1 15 19H17C18.1 19 19 18.1 19 17V11C20.1 11 21 10.1 21 9Z" fill="currentColor" opacity="0.3"/>
                  </svg>
                  
                  {/* Scanning Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-scan-horizontal"></div>
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
            </div>

            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ResumeForge AI
              </h1>
              <p className="text-xs text-gray-400">Career Optimization Assistant</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="text-green-400">● ONLINE</div>
            <div className="text-cyan-400">AI_CORE: ACTIVE</div>
            <div className="text-blue-400">NEURAL_SYNC: 100%</div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="border border-cyan-400/30 rounded-lg bg-black/40 backdrop-blur-sm p-4">
              <h3 className="text-sm font-bold text-cyan-400 mb-4 uppercase tracking-wide">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(action)}
                    className="w-full text-left px-3 py-2 rounded border border-blue-400/20 text-sm text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-400/50 transition-all duration-300"
                  >
                    &gt; {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Section */}
            <div className="border border-purple-400/30 rounded-lg bg-black/40 backdrop-blur-sm p-4">
              <h3 className="text-sm font-bold text-purple-400 mb-4 uppercase tracking-wide">Upload Resume</h3>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-3 border-2 border-dashed border-purple-400/50 rounded-lg text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 text-sm"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>📁</span>
                  <span>Upload File</span>
                </div>
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col border border-cyan-400/30 rounded-lg bg-black/40 backdrop-blur-sm overflow-hidden">
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50' 
                      : 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50'
                  } rounded-lg p-4 space-y-2`}>
                    
                    {message.sender === 'bot' && (
                      <div className="flex items-center space-x-2 text-xs text-cyan-400">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span>ResumeForge AI</span>
                        <span className="text-gray-500">
                          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    )}
                    
                    <p className={`text-sm leading-relaxed ${
                      message.sender === 'user' ? 'text-cyan-100' : 'text-gray-200'
                    }`}>
                      {message.text}
                    </p>
                    
                    {message.sender === 'user' && (
                      <div className="flex justify-end text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-xs text-cyan-400">AI is analyzing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-cyan-400/30 p-4">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                    placeholder="Type your message or ask about career optimization..."
                    className="w-full bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/70 focus:bg-gray-900/70 transition-all duration-300"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                    ENTER
                  </div>
                </div>
                
                <button
                  onClick={() => sendMessage(inputMessage)}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes scan-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-scan-horizontal {
          animation: scan-horizontal 2s linear infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.5);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.5);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.8);
        }
      `}</style>
    </div>
  );
};

export default CyberpunkChatbot;