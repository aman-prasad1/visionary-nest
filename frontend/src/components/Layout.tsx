import Navbar from './Navbar';
import Chatbot from './Chatbot';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-cyber-bg min-h-screen relative">
      <Navbar />
      <main>{children}</main>
      <Chatbot />
      {/* Footer will go here */}
    </div>
  );
};

export default Layout;
