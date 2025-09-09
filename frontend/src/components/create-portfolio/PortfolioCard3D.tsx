
import React from 'react';
import { motion } from 'framer-motion';

const PortfolioCard3D = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <motion.div
        className="w-80 h-96 bg-gray-800 rounded-2xl shadow-2xl"
        initial={{ rotateY: 180, scale: 0.5, opacity: 0 }}
        animate={{ rotateY: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'circOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex flex-col items-center justify-center p-6">
          <h2 className="text-2xl font-bold text-white">Portfolio Created!</h2>
          <p className="text-white text-center mt-4">Your portfolio is now live. You can share it with the world!</p>
        </div>
        <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl" style={{ transform: 'rotateY(180deg)' }}>
          {/* This is the back of the card, you can put a logo or something here */}
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioCard3D;
