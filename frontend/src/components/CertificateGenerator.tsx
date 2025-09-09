import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Award, Star, Trophy, Sparkles, Calendar, User } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CertificateData {
  id: string;
  title: string;
  description: string;
  achievement: string;
  date: string;
  recipientName: string;
  issuer: string;
}

interface CertificateGeneratorProps {
  certificateData: CertificateData;
  onClose?: () => void;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  certificateData,
  onClose
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: 'transparent',
        scale: 2,
        useCORS: true,
      } as any);

      const link = document.createElement('a');
      link.download = `certificate-${certificateData.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Award className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Achievement Certificate</h2>
              <p className="text-gray-400 text-sm">Congratulations on your accomplishment!</p>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadCertificate}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              <Download size={16} />
              {isGenerating ? 'Generating...' : 'Download'}
            </motion.button>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Certificate Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div
            ref={certificateRef}
            className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-white/10 rounded-xl p-8 relative overflow-hidden"
            style={{ minHeight: '600px' }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-purple-500 rounded-full"></div>
              <div className="absolute top-20 right-20 w-16 h-16 border-2 border-pink-500 rounded-full"></div>
              <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-yellow-500 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-18 h-18 border-2 border-blue-500 rounded-full"></div>
            </div>

            {/* Certificate Header */}
            <div className="text-center mb-8 relative z-10">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="text-white" size={32} />
                </div>
              </motion.div>

              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-white mb-2"
              >
                Certificate of Achievement
              </motion.h1>

              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
              ></motion.div>
            </div>

            {/* Certificate Body */}
            <div className="text-center mb-8 relative z-10">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 text-lg mb-6"
              >
                This is to certify that
              </motion.p>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-2xl md:text-3xl font-bold text-white mb-4"
              >
                {certificateData.recipientName}
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto leading-relaxed"
              >
                has successfully achieved
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6 mb-6"
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {certificateData.title}
                </h3>
                <p className="text-purple-200 text-lg">
                  {certificateData.achievement}
                </p>
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed"
              >
                {certificateData.description}
              </motion.p>
            </div>

            {/* Certificate Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="text-center md:text-left"
              >
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Calendar size={16} />
                  <span className="text-sm">Date of Achievement</span>
                </div>
                <p className="text-white font-semibold">
                  {new Date(certificateData.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-center md:text-right"
              >
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <User size={16} />
                  <span className="text-sm">Issued by</span>
                </div>
                <p className="text-white font-semibold">{certificateData.issuer}</p>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              className="absolute top-4 right-4"
            >
              <Sparkles className="text-yellow-500" size={24} />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
              className="absolute bottom-4 left-4"
            >
              <Star className="text-purple-500" size={20} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateGenerator;