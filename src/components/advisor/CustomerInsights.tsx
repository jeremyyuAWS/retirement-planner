import React, { useState } from 'react';
import { Send, MessageSquare, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import QuickQuestionsModal from '../QuickQuestionsModal';
import ProjectedValueChart from '../visualizations/ProjectedValueChart';
import AssetAllocationChart from '../visualizations/AssetAllocationChart';
import RiskMetricsChart from '../visualizations/RiskMetricsChart';
import HistoricalPerformanceChart from '../visualizations/HistoricalPerformanceChart';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface CustomerInsightsProps {
  customerId: string;
}

const CustomerInsights: React.FC<CustomerInsightsProps> = ({ customerId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const quickQuestions = [
    'What is my current asset allocation?',
    'How has my portfolio performed this year?',
    'What is my risk level?',
    'What are my projected returns?',
    'How can I reduce my portfolio risk?',
    'What is my current withdrawal rate?',
  ];

  // Sample data for visualizations
  const projectedValueData = [
    { year: 2023, value: 500000 },
    { year: 2024, value: 550000 },
    { year: 2025, value: 605000 },
    { year: 2026, value: 665500 },
    { year: 2027, value: 732050 },
  ];

  const assetAllocationData = [
    { category: 'Stocks', value: 60, color: '#3b82f6' },
    { category: 'Bonds', value: 30, color: '#10b981' },
    { category: 'Cash', value: 10, color: '#f59e0b' },
  ];

  const riskMetricsData = [
    { name: 'Volatility', value: 12.5, benchmark: 15.0, color: '#3b82f6' },
    { name: 'Sharpe Ratio', value: 1.2, benchmark: 1.0, color: '#10b981' },
    { name: 'Max Drawdown', value: -18.5, benchmark: -20.0, color: '#f59e0b' },
    { name: 'Beta', value: 0.9, benchmark: 1.0, color: '#8b5cf6' },
  ];

  const historicalPerformanceData = [
    { date: 'Jan', value: 500000 },
    { date: 'Feb', value: 520000 },
    { date: 'Mar', value: 510000 },
    { date: 'Apr', value: 530000 },
    { date: 'May', value: 540000 },
    { date: 'Jun', value: 550000 },
  ];

  const sendMessage = (content: string) => {
    if (isSending || !content.trim()) return;
    
    setIsSending(true);
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');
    setIsSending(false);
  };

  const handleSendMessage = () => {
    sendMessage(input);
  };

  const handleQuickQuestionSelect = (question: string) => {
    setShowQuickQuestions(false);
    sendMessage(question);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <AssetAllocationChart data={assetAllocationData} />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Fund Value</p>
                <p className="text-2xl font-semibold">$550,000</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Annual Withdrawal</p>
                <p className="text-2xl font-semibold">$22,000</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">CAGR</p>
                <p className="text-2xl font-semibold">7.2%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Risk Level</p>
                <p className="text-2xl font-semibold">Moderate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Metrics Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Risk Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <RiskMetricsChart data={riskMetricsData} />
          </div>
          <div className="space-y-4">
            {riskMetricsData.map((metric) => (
              <div key={metric.name} className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {metric.name === 'Volatility' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                  {metric.name === 'Sharpe Ratio' && <TrendingUp className="w-4 h-4 text-green-500" />}
                  {metric.name === 'Max Drawdown' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  {metric.name === 'Beta' && <Info className="w-4 h-4 text-blue-500" />}
                </div>
                <div>
                  <p className="font-medium">{metric.name}</p>
                  <p className="text-sm text-gray-500">
                    {metric.value} (Benchmark: {metric.benchmark})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Performance Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Historical Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <HistoricalPerformanceChart data={historicalPerformanceData} color="#3b82f6" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">1-Year Return</p>
              <p className="text-2xl font-semibold">12.5%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">3-Year Return</p>
              <p className="text-2xl font-semibold">8.2%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">5-Year Return</p>
              <p className="text-2xl font-semibold">9.8%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">10-Year Return</p>
              <p className="text-2xl font-semibold">7.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Portfolio Editor</h2>
          <button
            onClick={() => setShowQuickQuestions(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about portfolio changes..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSending}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isSending || !input.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <QuickQuestionsModal
        isOpen={showQuickQuestions}
        onClose={() => setShowQuickQuestions(false)}
        onSelectQuestion={handleQuickQuestionSelect}
        questions={quickQuestions}
      />
    </div>
  );
};

export default CustomerInsights;