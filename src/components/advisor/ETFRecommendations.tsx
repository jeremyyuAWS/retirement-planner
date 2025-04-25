import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { TrendingUp, AlertTriangle, Search, ExternalLink, Send, MessageSquare } from 'lucide-react';
import QuickQuestionsModal from '../QuickQuestionsModal';

interface ETF {
  ticker: string;
  name: string;
  type: 'stocks' | 'bonds' | 'reits' | 'international' | 'alternatives' | 'cash';
  expenseRatio: number;
  category: string;
  risk: 'Low' | 'Medium' | 'High';
  url: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const ETFRecommendations: React.FC = () => {
  const { portfolios } = useAppContext();
  const [activePortfolio, setActivePortfolio] = useState(portfolios.length > 0 ? portfolios[0] : null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (portfolios.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-yellow-50 p-6 rounded-lg max-w-lg">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">No portfolios generated yet</h3>
          <p className="text-yellow-700">
            Please complete the client questionnaire first to generate portfolio options.
          </p>
        </div>
      </div>
    );
  }

  // Sample ETF database
  const etfDatabase: ETF[] = [
    // Stocks
    { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', type: 'stocks', expenseRatio: 0.03, category: 'Total Market', risk: 'Medium', url: 'https://investor.vanguard.com/investment-products/etfs/profile/vti' },
    { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', type: 'stocks', expenseRatio: 0.09, category: 'Large Cap', risk: 'Medium', url: 'https://www.ssga.com/us/en/institutional/etfs/funds/spdr-sp-500-etf-trust-spy' },
    { ticker: 'QQQ', name: 'Invesco QQQ Trust', type: 'stocks', expenseRatio: 0.20, category: 'Technology', risk: 'High', url: 'https://www.invesco.com/us/financial-products/etfs/product-detail?audienceType=Investor&ticker=QQQ' },
    { ticker: 'VUG', name: 'Vanguard Growth ETF', type: 'stocks', expenseRatio: 0.04, category: 'Growth', risk: 'High', url: 'https://investor.vanguard.com/investment-products/etfs/profile/vug' },
    { ticker: 'VTV', name: 'Vanguard Value ETF', type: 'stocks', expenseRatio: 0.04, category: 'Value', risk: 'Medium', url: 'https://investor.vanguard.com/investment-products/etfs/profile/vtv' },
    { ticker: 'VB', name: 'Vanguard Small-Cap ETF', type: 'stocks', expenseRatio: 0.05, category: 'Small Cap', risk: 'High', url: 'https://investor.vanguard.com/investment-products/etfs/profile/vb' },
    
    // Bonds
    { ticker: 'BND', name: 'Vanguard Total Bond Market ETF', type: 'bonds', expenseRatio: 0.03, category: 'Total Bond', risk: 'Low', url: 'https://investor.vanguard.com/investment-products/etfs/profile/bnd' },
    { ticker: 'AGG', name: 'iShares Core U.S. Aggregate Bond ETF', type: 'bonds', expenseRatio: 0.03, category: 'Total Bond', risk: 'Low', url: 'https://www.ishares.com/us/products/239458/ishares-core-total-us-bond-market-etf' },
    { ticker: 'GOVT', name: 'iShares U.S. Treasury Bond ETF', type: 'bonds', expenseRatio: 0.05, category: 'Government', risk: 'Low', url: 'https://www.ishares.com/us/products/239456/ishares-us-treasury-bond-etf' },
    { ticker: 'LQD', name: 'iShares iBoxx $ Investment Grade Corporate Bond ETF', type: 'bonds', expenseRatio: 0.14, category: 'Corporate', risk: 'Medium', url: 'https://www.ishares.com/us/products/239566/ishares-iboxx-investment-grade-corporate-bond-etf' },
    { ticker: 'VCSH', name: 'Vanguard Short-Term Corporate Bond ETF', type: 'bonds', expenseRatio: 0.04, category: 'Short-Term', risk: 'Low', url: 'https://investor.vanguard.com/investment-products/etfs/profile/vcsh' },
    { ticker: 'VTIP', name: 'Vanguard Short-Term Inflation-Protected Securities ETF', type: 'bonds', expenseRatio: 0.04, category: 'Inflation-Protected', risk: 'Low', url: 'https://investor.vanguard.com/investment-products/etfs/profile/vtip' },
    
    // REITs
    { ticker: 'VNQ', name: 'Vanguard Real Estate ETF', type: 'reits', expenseRatio: 0.12, category: 'Real Estate', risk: 'Medium', url: 'https://investor.vanguard.com/investment-products/etfs/profile/vnq' },
    { ticker: 'IYR', name: 'iShares U.S. Real Estate ETF', type: 'reits', expenseRatio: 0.41, category: 'Real Estate', risk: 'Medium', url: 'https://www.ishares.com/us/products/239520/ishares-us-real-estate-etf' },
    { ticker: 'SCHH', name: 'Schwab U.S. REIT ETF', type: 'reits', expenseRatio: 0.07, category: 'Real Estate', risk: 'Medium', url: 'https://www.schwabfunds.com/products/schh' },
    
    // International
    { ticker: 'VXUS', name: 'Vanguard Total International Stock ETF', type: 'international', expenseRatio: 0.07, category: 'International', risk: 'Medium', url: 'https://investor.vanguard.com/investment-products/etfs/profile/vxus' },
    { ticker: 'EFA', name: 'iShares MSCI EAFE ETF', type: 'international', expenseRatio: 0.32, category: 'Developed Markets', risk: 'Medium', url: 'https://www.ishares.com/us/products/239623/ishares-msci-eafe-etf' },
    { ticker: 'VWO', name: 'Vanguard FTSE Emerging Markets ETF', type: 'international', expenseRatio: 0.08, category: 'Emerging Markets', risk: 'High', url: 'https://investor.vanguard.com/investment-products/etfs/profile/vwo' },
    { ticker: 'IXUS', name: 'iShares Core MSCI Total International Stock ETF', type: 'international', expenseRatio: 0.07, category: 'International', risk: 'Medium', url: 'https://www.ishares.com/us/products/244048/ishares-core-msci-total-international-stock-etf' },
    
    // Alternatives
    { ticker: 'GLD', name: 'SPDR Gold Shares', type: 'alternatives', expenseRatio: 0.40, category: 'Commodities', risk: 'High', url: 'https://www.spdrgoldshares.com/' },
    { ticker: 'PDBC', name: 'Invesco Optimum Yield Diversified Commodity Strategy ETF', type: 'alternatives', expenseRatio: 0.59, category: 'Commodities', risk: 'High', url: 'https://www.invesco.com/us/financial-products/etfs/product-detail?audienceType=Investor&ticker=PDBC' },
    { ticker: 'USRT', name: 'iShares Core U.S. REIT ETF', type: 'alternatives', expenseRatio: 0.08, category: 'Real Estate', risk: 'Medium', url: 'https://www.ishares.com/us/products/275474/ishares-core-us-reit-etf' },
    
    // Cash equivalents
    { ticker: 'SHV', name: 'iShares Short Treasury Bond ETF', type: 'cash', expenseRatio: 0.15, category: 'Short-Term Treasury', risk: 'Low', url: 'https://www.ishares.com/us/products/239466/ishares-short-treasury-bond-etf' },
    { ticker: 'BIL', name: 'SPDR Bloomberg 1-3 Month T-Bill ETF', type: 'cash', expenseRatio: 0.14, category: 'Cash Equivalent', risk: 'Low', url: 'https://www.ssga.com/us/en/institutional/etfs/funds/spdr-bloomberg-1-3-month-t-bill-etf-bil' },
    { ticker: 'GBIL', name: 'Goldman Sachs Access Treasury 0-1 Year ETF', type: 'cash', expenseRatio: 0.12, category: 'Cash Equivalent', risk: 'Low', url: 'https://www.gsam.com/content/gsam/us/en/advisors/products/etf-fund-finder/goldman-sachs-access-treasury-0-1-year-etf.html' },
  ];
  
  // Filter ETFs based on search and selected type
  const filteredETFs = etfDatabase.filter(etf => {
    const matchesSearch = searchTerm === '' || 
      etf.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || 
      etf.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === null || etf.type === selectedType;
    
    return matchesSearch && matchesType;
  });
  
  // Group filtered ETFs by type for recommendations
  const groupedETFs: Record<string, ETF[]> = {};
  filteredETFs.forEach(etf => {
    if (!groupedETFs[etf.type]) {
      groupedETFs[etf.type] = [];
    }
    groupedETFs[etf.type].push(etf);
  });
  
  // Get recommended ETFs based on the active portfolio's allocation
  const getRecommendedETFs = () => {
    if (!activePortfolio) return [];
    
    const recommendations: ETF[] = [];
    
    // For each asset class, recommend ETFs based on allocation percentage
    Object.entries(activePortfolio.allocation).forEach(([assetClass, percentage]) => {
      if (percentage > 0 && groupedETFs[assetClass]) {
        // Get number of ETFs to recommend based on allocation percentage
        const count = Math.max(1, Math.floor(percentage / 20)); // 1 ETF per 20% allocation
        
        // Get ETFs for this asset class, sorted by expense ratio
        const assetClassETFs = groupedETFs[assetClass].sort((a, b) => a.expenseRatio - b.expenseRatio);
        
        // Add the top N ETFs
        recommendations.push(...assetClassETFs.slice(0, count));
      }
    });
    
    return recommendations;
  };
  
  const recommendedETFs = getRecommendedETFs();
  
  const quickQuestions = [
    "What are the top ETF recommendations for this customer?",
    "What is the expense ratio for these ETFs?",
    "How do these ETFs compare to their benchmarks?",
    "What is the historical performance of these ETFs?",
    "What are the key holdings in these ETFs?"
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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">ETF Recommendations</h2>
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
    </div>
  );
};

export default ETFRecommendations;