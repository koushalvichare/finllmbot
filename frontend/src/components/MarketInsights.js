import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Globe, Zap, Brain } from 'lucide-react';

const MarketInsights = () => {
  const [insights] = useState([
    {
      id: 1,
      title: "AI & Technology Sector Surge",
      description: "Artificial Intelligence stocks showing strong momentum with 15% average growth this quarter.",
      sentiment: "bullish",
      confidence: 92,
      impact: "high",
      category: "Technology",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Federal Reserve Interest Rate Decision",
      description: "Upcoming Fed meeting could impact bond yields and growth stocks significantly.",
      sentiment: "neutral",
      confidence: 78,
      impact: "high",
      category: "Economic Policy",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      title: "Cryptocurrency Market Volatility",
      description: "Bitcoin and major altcoins experiencing increased volatility due to regulatory concerns.",
      sentiment: "bearish",
      confidence: 85,
      impact: "medium",
      category: "Cryptocurrency",
      timestamp: "6 hours ago"
    },
    {
      id: 4,
      title: "Green Energy Investment Boom",
      description: "Renewable energy sector attracting record investments with strong government backing.",
      sentiment: "bullish",
      confidence: 88,
      impact: "medium",
      category: "Energy",
      timestamp: "8 hours ago"
    }
  ]);

  const [marketMetrics] = useState([
    { name: "S&P 500", value: "4,485.20", change: "+1.2%", trend: "up" },
    { name: "NASDAQ", value: "13,962.84", change: "+2.1%", trend: "up" },
    { name: "DOW", value: "34,721.12", change: "+0.8%", trend: "up" },
    { name: "VIX", value: "18.45", change: "-5.2%", trend: "down" }
  ]);

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'bearish':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'bullish':
        return 'from-green-500 to-emerald-500';
      case 'bearish':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-yellow-500 to-orange-500';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="p-6 gradient-bg min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Globe className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Market Insights</h1>
          </div>
          <p className="text-gray-600">AI-powered market analysis and real-time insights</p>
        </div>

        {/* Market Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {marketMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className="card p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{metric.name}</h3>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>
              <p className="text-xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className={`text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI Insights */}
        <motion.div
          className="card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">AI Market Analysis</h2>
          </div>
          
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`bg-gradient-to-r ${getSentimentColor(insight.sentiment)} p-2 rounded-lg`}>
                    {getSentimentIcon(insight.sentiment)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{insight.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                          {insight.impact} impact
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {insight.category}
                      </span>
                      <span className="text-xs text-gray-500">{insight.timestamp}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Predictions */}
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">AI Predictions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg mb-3">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Next Week</h3>
                <p className="text-2xl font-bold text-green-600">+2.5%</p>
                <p className="text-sm text-gray-600">Market Growth</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-lg mb-3">
                <AlertTriangle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Next Month</h3>
                <p className="text-2xl font-bold text-blue-600">Volatile</p>
                <p className="text-sm text-gray-600">Market Condition</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-100 to-violet-100 p-6 rounded-lg mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Next Quarter</h3>
                <p className="text-2xl font-bold text-purple-600">+8.2%</p>
                <p className="text-sm text-gray-600">Expected Return</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MarketInsights;
