import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, TrendingDown, DollarSign, BarChart3, Users, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Dashboard = () => {
  const [stats] = useState({
    totalPortfolio: 125000,
    dailyChange: 2.5,
    monthlyReturn: 8.3,
    activeInvestments: 12
  });

  const [marketData] = useState([
    { date: 'Jan', value: 100000, prediction: 102000 },
    { date: 'Feb', value: 105000, prediction: 108000 },
    { date: 'Mar', value: 103000, prediction: 107000 },
    { date: 'Apr', value: 108000, prediction: 112000 },
    { date: 'May', value: 115000, prediction: 118000 },
    { date: 'Jun', value: 125000, prediction: 128000 },
  ]);

  const [recentAnalyses] = useState([
    {
      id: 1,
      title: "Tech Sector Analysis",
      summary: "Strong growth potential in AI and cloud computing sectors",
      confidence: 85,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Risk Assessment - Crypto Portfolio",
      summary: "Moderate risk level with potential for high returns",
      confidence: 72,
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      title: "Market Outlook - Q2 2024",
      summary: "Bullish trend expected with some volatility",
      confidence: 78,
      timestamp: "1 day ago"
    }
  ]);

  const statCards = [
    {
      title: 'Total Portfolio',
      value: `$${stats.totalPortfolio.toLocaleString()}`,
      change: `+${stats.dailyChange}%`,
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      isPositive: true
    },
    {
      title: 'Monthly Return',
      value: `${stats.monthlyReturn}%`,
      change: '+2.1%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      isPositive: true
    },
    {
      title: 'Active Investments',
      value: stats.activeInvestments,
      change: '+3',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-purple-500 to-violet-500',
      isPositive: true
    },
    {
      title: 'AI Predictions',
      value: '94%',
      change: '+1.2%',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      isPositive: true
    }
  ];

  return (
    <div className="p-6 gradient-bg min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Matchbox Financial Dashboard</h1>
          <p className="text-gray-600">AI-powered insights and analytics for your portfolio</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg text-white`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Portfolio Performance */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Portfolio Performance</h2>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Last 6 months</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* AI Predictions */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">AI Predictions</h2>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-600">Next 6 months</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Current Value"
                />
                <Line 
                  type="monotone" 
                  dataKey="prediction" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="AI Prediction"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Analyses */}
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent AI Analyses</h2>
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <div className="space-y-4">
            {recentAnalyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{analysis.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{analysis.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{analysis.timestamp}</span>
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {analysis.confidence}% confidence
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
