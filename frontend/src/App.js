import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import MarketInsights from './components/MarketInsights';
import SettingsPage from './components/Settings';
import { Toaster } from 'react-hot-toast';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <ChatInterface />;
      case 'analytics':
        return <Dashboard />; // For now, using dashboard as analytics
      case 'market':
        return <MarketInsights />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <Toaster position="top-right" />
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-screen overflow-y-auto"
        >
          {renderContent()}
        </motion.div>
      </Layout>
    </div>
  );
}

export default App;
