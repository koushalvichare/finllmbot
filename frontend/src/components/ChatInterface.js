import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, TrendingUp, DollarSign, BarChart3, Brain } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI Financial Advisor. I can help you with investment analysis, market insights, risk assessment, and financial planning. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/analyze-financial-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputMessage,
          analysis_type: "general",
          max_length: 200
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.generated_text,
        timestamp: new Date(),
        model: data.model_used,
        confidence: data.confidence_score,
        processingTime: data.processing_time
      };

      setMessages(prev => [...prev, botMessage]);
      toast.success(`Analysis complete! (${data.model_used})`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to get AI response. Please check if the API is running.');
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'm sorry, I'm having trouble connecting to the AI service. Please make sure the backend API is running on port 8000.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickPrompts = [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      text: "Analyze current market trends",
      prompt: "What are the current market trends and how might they affect my investment portfolio?"
    },
    {
      icon: <DollarSign className="w-4 h-4" />,
      text: "Investment recommendations",
      prompt: "Can you provide some investment recommendations for a moderate risk portfolio?"
    },
    {
      icon: <BarChart3 className="w-4 h-4" />,
      text: "Risk assessment",
      prompt: "Help me assess the risk of investing in technology stocks this quarter."
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <motion.div 
        className="bg-white shadow-lg border-b border-gray-200 p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient">Fintech AI Advisor</h1>
            <p className="text-gray-600">Powered by Advanced LLM Technology</p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`p-4 rounded-2xl ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-auto' 
                  : 'bg-white shadow-lg border border-gray-100'
              }`}>
                {message.type === 'bot' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600">AI Financial Advisor</span>
                    {message.model && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {message.model}
                      </span>
                    )}
                    {message.confidence && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {Math.round(message.confidence * 100)}% confidence
                      </span>
                    )}
                  </div>
                )}
                <p className={`${message.type === 'user' ? 'text-white' : 'text-gray-800'} leading-relaxed`}>
                  {message.content}
                </p>
                <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white shadow-lg border border-gray-100 p-4 rounded-2xl">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">AI Financial Advisor</span>
              </div>
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="text-gray-500 text-sm mt-2">Analyzing your request...</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Prompts */}
      <motion.div 
        className="px-6 py-4 bg-white border-t border-gray-200"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-sm text-gray-600 mb-3">Quick prompts:</p>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, index) => (
            <motion.button
              key={index}
              className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 border border-gray-200 hover:border-blue-300 px-3 py-2 rounded-lg text-sm transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setInputMessage(prompt.prompt)}
            >
              {prompt.icon}
              <span>{prompt.text}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Input */}
      <motion.div 
        className="p-6 bg-white border-t border-gray-200"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex space-x-4">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about investments, market analysis, financial planning..."
              className="input-field resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
          <motion.button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="btn-primary flex items-center space-x-2 h-fit disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatInterface;
