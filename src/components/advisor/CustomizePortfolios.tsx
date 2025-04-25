import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import PortfolioDonutChart from '../visualizations/PortfolioDonutChart';
import PortfolioPerformanceChart from '../visualizations/PortfolioPerformanceChart';
import RiskMetricsChart from '../visualizations/RiskMetricsChart';
import PortfolioEditor from './PortfolioEditor';
import { Send, MessageSquare, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import QuickQuestionsModal from '../QuickQuestionsModal';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const CustomizePortfolios: React.FC = () => {
  const { portfolios } = useAppContext();
  const [activeTab, setActiveTab] = useState('Aggressive');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickQuestions = [
    "What is the recommended asset allocation for this portfolio?",
    "How does this portfolio align with the customer's risk tolerance?",
    "What are the expected returns for this portfolio?",
    "What are the key holdings in this portfolio?",
    "How does this portfolio compare to the benchmark?"
  ];

  const handleUserInput = (userInput: string) => {
    if (!userInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput,
      timestamp: Date.now()
    };

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'I understand your request. Let me help you with that.',
      timestamp: Date.now() + 1
    };

    setMessages(prev => [...prev, userMessage, aiMessage]);
    setInput('');
  };

  if (portfolios.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-yellow-50 p-6 rounded-lg max-w-lg">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">No portfolios generated yet</h3>
          <p className="text-yellow-700">
            Please complete the client questionnaire in the "Customer Insights" tab first to generate portfolio options.
          </p>
        </div>
      </div>
    );
  }

  const activePortfolio = portfolios.find(p => p.type === activeTab);

  if (!activePortfolio) {
    return null;
  }

  // Sample performance data
  const performanceData = [
    { year: 2018, value: 100000 },
    { year: 2019, value: 115000 },
    { year: 2020, value: 125000 },
    { year: 2021, value: 140000 },
    { year: 2022, value: 150000 },
    { year: 2023, value: 165000 }
  ];

  // Sample risk metrics
  const riskMetrics = {
    volatility: 0.15,
    sharpeRatio: 1.2,
    maxDrawdown: 0.25,
    beta: 1.1
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Customize Portfolios</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-[80%]`}
          >
            <div className="text-sm">{message.content}</div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleUserInput(input)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleUserInput(input)}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <QuickQuestionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectQuestion={handleUserInput}
        questions={quickQuestions}
      />

      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {portfolios.map((portfolio) => (
            <button
              key={portfolio.type}
              className={`py-2 px-4 text-sm font-medium mr-2 focus:outline-none ${
                activeTab === portfolio.type
                  ? `border-b-2 text-${portfolio.type === 'Aggressive' ? 'red' : portfolio.type === 'Balanced' ? 'blue' : 'green'}-600 border-${portfolio.type === 'Aggressive' ? 'red' : portfolio.type === 'Balanced' ? 'blue' : 'green'}-600`
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(portfolio.type)}
            >
              {portfolio.type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-medium text-lg text-gray-900 mb-4">{activePortfolio.type} Portfolio</h3>
            
            <div className="flex justify-center mb-4">
              <PortfolioDonutChart 
                allocation={activePortfolio.allocation}
                colorPrimary={activePortfolio.colorScheme.primary}
                colorSecondary={activePortfolio.colorScheme.secondary}
                colorAccent={activePortfolio.colorScheme.accent}
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Projected Outcomes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Projected Fund:</span>
                    <span className="font-medium">${Math.round(activePortfolio.projectedFund).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Annual Withdrawal:</span>
                    <span className="font-medium">${Math.round(activePortfolio.annualWithdrawal).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">CAGR:</span>
                    <span className="font-medium">{(activePortfolio.cagr * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Risk Level:</span>
                    <span className="font-medium">{activePortfolio.riskLevel}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Current Allocation</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Stocks:</span>
                    <span className="font-medium">{activePortfolio.allocation.stocks}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Bonds:</span>
                    <span className="font-medium">{activePortfolio.allocation.bonds}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">REITs:</span>
                    <span className="font-medium">{activePortfolio.allocation.reits}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">International:</span>
                    <span className="font-medium">{activePortfolio.allocation.international}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Alternatives:</span>
                    <span className="font-medium">{activePortfolio.allocation.alternatives}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Cash:</span>
                    <span className="font-medium">{activePortfolio.allocation.cash}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-medium text-lg text-gray-900 mb-4">Risk Metrics</h3>
            <div className="flex justify-center mb-4">
              <RiskMetricsChart 
                metrics={riskMetrics}
                color={activePortfolio.colorScheme.primary}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                <span>Volatility: {riskMetrics.volatility.toFixed(2)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                <span>Sharpe Ratio: {riskMetrics.sharpeRatio.toFixed(2)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Info className="w-4 h-4 mr-2 text-blue-500" />
                <span>Max Drawdown: {(riskMetrics.maxDrawdown * 100).toFixed(1)}%</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Info className="w-4 h-4 mr-2 text-blue-500" />
                <span>Beta: {riskMetrics.beta.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-medium text-lg text-gray-900 mb-4">Historical Performance</h3>
            <div className="flex justify-center mb-4">
              <PortfolioPerformanceChart 
                data={performanceData}
                color={activePortfolio.colorScheme.primary}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">1-Year Return</div>
                <div className="text-lg font-medium text-green-600">+12.5%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">3-Year Return</div>
                <div className="text-lg font-medium text-green-600">+8.2%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">5-Year Return</div>
                <div className="text-lg font-medium text-green-600">+9.8%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">10-Year Return</div>
                <div className="text-lg font-medium text-green-600">+7.5%</div>
              </div>
            </div>
          </div>

          <PortfolioEditor portfolioType={activePortfolio.type} />
        </div>
      </div>
    </div>
  );
};

export default CustomizePortfolios;