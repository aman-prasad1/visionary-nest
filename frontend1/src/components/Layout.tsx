import Navbar from './Navbar';
import Chatbot from './Chatbot';
import ChatbotHub from './ChatbotHub';
import React, { useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isChatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <div className="bg-cyber-bg min-h-screen relative">
      <Navbar />
      <main>{children}</main>
      <ChatbotHub toggleChat={toggleChat} />
      {isChatOpen && <Chatbot toggleChat={toggleChat} />}
      {/* Footer will go here */}
    </div>
  );
};

export default Layout;
