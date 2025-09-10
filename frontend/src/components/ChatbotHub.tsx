import React from 'react';

interface ChatbotHubProps {
  toggleChat: () => void;
}

const ChatbotHub: React.FC<ChatbotHubProps> = ({ toggleChat }) => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={toggleChat}
        className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <img src="/botlogo.jpg" alt="Chatbot" className="w-full h-full rounded-full object-cover" />
      </button>
    </div>
  );
};

export default ChatbotHub;
