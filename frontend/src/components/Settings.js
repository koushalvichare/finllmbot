import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, User, Shield, Cpu, Save, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      marketUpdates: true,
      portfolioChanges: false,
      aiRecommendations: true
    },
    ai: {
      analysisFrequency: 'real-time',
      confidenceThreshold: 80,
      riskTolerance: 'moderate',
      autoTrading: false
    },
    display: {
      theme: 'light',
      language: 'english',
      currency: 'USD',
      timeZone: 'UTC-5'
    },
    privacy: {
      dataSharing: false,
      analyticsTracking: true,
      personalizedAds: false
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const saveSettings = () => {
    // Simulate API call
    toast.success('Settings saved successfully!');
  };

  const resetSettings = () => {
    // Reset to default values
    toast.success('Settings reset to defaults!');
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
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          </div>
          <p className="text-gray-600">Customize your AI financial advisor experience</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Settings */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">AI Configuration</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analysis Frequency
                </label>
                <select
                  value={settings.ai.analysisFrequency}
                  onChange={(e) => handleSettingChange('ai', 'analysisFrequency', e.target.value)}
                  className="input-field"
                >
                  <option value="real-time">Real-time</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confidence Threshold: {settings.ai.confidenceThreshold}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={settings.ai.confidenceThreshold}
                  onChange={(e) => handleSettingChange('ai', 'confidenceThreshold', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Tolerance
                </label>
                <select
                  value={settings.ai.riskTolerance}
                  onChange={(e) => handleSettingChange('ai', 'riskTolerance', e.target.value)}
                  className="input-field"
                >
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-700">Auto Trading</span>
                  <p className="text-sm text-gray-500">Allow AI to execute trades automatically</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.ai.autoTrading}
                    onChange={(e) => handleSettingChange('ai', 'autoTrading', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Display Settings */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Display Preferences</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select
                  value={settings.display.theme}
                  onChange={(e) => handleSettingChange('display', 'theme', e.target.value)}
                  className="input-field"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={settings.display.language}
                  onChange={(e) => handleSettingChange('display', 'language', e.target.value)}
                  className="input-field"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={settings.display.currency}
                  onChange={(e) => handleSettingChange('display', 'currency', e.target.value)}
                  className="input-field"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                <select
                  value={settings.display.timeZone}
                  onChange={(e) => handleSettingChange('display', 'timeZone', e.target.value)}
                  className="input-field"
                >
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC-6">Central Time (UTC-6)</option>
                  <option value="UTC-7">Mountain Time (UTC-7)</option>
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Privacy & Security</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <p className="text-sm text-gray-500">
                      {key === 'dataSharing' && 'Share anonymized data to improve AI models'}
                      {key === 'analyticsTracking' && 'Track usage for performance optimization'}
                      {key === 'personalizedAds' && 'Show personalized financial product recommendations'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex justify-end space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button
              onClick={resetSettings}
              className="btn-secondary flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset to Defaults</span>
            </button>
            <button
              onClick={saveSettings}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
