import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy } from "lucide-react";
import {toast} from 'react-toastify'

const CopyRoomCodeModal = ({ isOpen, onClose, roomCode }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode);
    toast.success('Code Copied Sucessfully!')
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-150  flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black dark:bg-gray-900 rounded-4xl shadow-xl w-full max-w-sm p-6 text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            {/* Close Button */}
            <button
              onClick={()=>onClose(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-200 dark:text-white">
              Room Code
            </h2>

            <div className="flex items-center justify-between bg-gray-900 dark:bg-gray-800 rounded-2xl px-4 py-3 mb-4">
              <span className="font-mono text-lg text-gray-300 dark:text-gray-200">
                {roomCode}
              </span>
              <button
                onClick={handleCopy}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                <Copy size={18} />
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-primary text-white py-2 rounded-2xl hover:bg-primary/90 cursor-pointer transition"
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CopyRoomCodeModal;
