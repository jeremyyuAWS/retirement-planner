import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb,
  ExternalLink,
  User,
  Bot,
  Send,
  BarChart,
  ArrowRight,
  TrendingUp,
  DollarSign,
  AlertCircle,
  PieChart,
  Clock,
  LineChart
} from 'lucide-react';
import { 
  portfolioQuestions, 
  commonFollowUpQuestions,
  contributionQuestions,
  socialSecurityQuestions,
  taxQuestions,
  delayQuestions 
} from '../../data/demoData';

interface QuickQuestionsProps {
  standalone?: boolean;
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ standalone = true }) => {
  const { addMessageToQuestionnaire, mode, activeTab, retirementData, portfolios } = useAppContext();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('common');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<{sender: 'user' | 'agent', content: string, timestamp: Date}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);
  
  const handleQuestionClick = (question: string) => {
    // Set active question
    setSelectedQuestion(question);
    
    // Reset chat history and add the user question
    setChatHistory([
      {
        sender: 'user',
        content: question,
        timestamp: new Date()
      }
    ]);
    
    // Also add to main chat if we're not in standalone mode
    if (!standalone) {
      addMessageToQuestionnaire({
        sender: 'user',
        content: question,
      });
    }
    
    // Simulate AI typing response
    setIsTyping(true);
    
    // Find if we have a prepared answer
    const matchedQuestion = commonFollowUpQuestions.find(q => 
      q.question === question
    );
    
    // Generate response based on question type
    setTimeout(() => {
      let responseContent = '';
      
      if (matchedQuestion) {
        responseContent = matchedQuestion.answer;
      } else if (question.includes('market') || question.includes('downturn')) {
        responseContent = `Market downturns are a natural part of investing. With the ${retirementData?.riskTolerance || 'balanced'} portfolio, historical data suggests you could expect a maximum drawdown of about ${retirementData?.riskTolerance === 'High' ? '30-40%' : retirementData?.riskTolerance === 'Low' ? '10-20%' : '20-30%'} during significant market corrections. The portfolio is designed to recover over time, and having a diverse asset allocation helps mitigate some of this risk.`;
      } else if (question.includes('inflation')) {
        responseContent = "Inflation is one of retirement planning's biggest challenges. Your portfolio includes assets like stocks and REITs that have historically outpaced inflation. We also recommend considering Treasury Inflation-Protected Securities (TIPS) in the bond portion. Remember that the 4% withdrawal rule already factors in typical inflation rates of 2-3%, but unusual inflation spikes might require adjusting your withdrawal strategy.";
      } else if (question.includes('withdraw') || question.includes('4%')) {
        responseContent = "The 4% rule suggests withdrawing 4% of your portfolio in the first year of retirement, then adjusting that amount for inflation each year. This approach has a high probability of sustaining a 30-year retirement. However, it's not guaranteed, especially in prolonged market downturns. Being flexible with withdrawals—taking less during market downturns and potentially more in strong markets—can improve your portfolio's longevity.";
      } else if (question.includes('tax')) {
        responseContent = "Tax considerations are crucial for retirement planning. Consider these strategies: 1) Maximize tax-deferred accounts like 401(k)s and IRAs, 2) Use Roth accounts for tax-free growth if you expect higher tax rates in retirement, 3) Plan for Required Minimum Distributions (RMDs), 4) Consider tax-loss harvesting to offset gains, and 5) Understand the tax implications of different withdrawal strategies in retirement.";
      } else if (question.includes('Social Security')) {
        responseContent = "Social Security claiming strategy can significantly impact your retirement income. For each year you delay claiming beyond full retirement age (67 for most people), benefits increase by about 8% until age 70. Claiming early at 62 results in permanently reduced benefits. For married couples, coordinating claims can maximize lifetime benefits. Your optimal strategy depends on factors like life expectancy, other income sources, and retirement goals.";
      } else {
        responseContent = "That's a great question about retirement planning. Based on your profile and retirement goals, I'd recommend exploring the portfolio projections in detail. Each portfolio option has different risk-return characteristics, and the right choice depends on your time horizon, risk tolerance, and income needs during retirement.";
      }
      
      setChatHistory(prev => [...prev, {
        sender: 'agent',
        content: responseContent,
        timestamp: new Date()
      }]);
      
      // Also add to main chat if we're not in standalone mode
      if (!standalone) {
        addMessageToQuestionnaire({
          sender: 'agent',
          content: responseContent,
          agentType: 'questionnaire'
        });
      }
      
      setIsTyping(false);
      
      // Always expand the component when selecting a question
      setIsExpanded(true);
    }, 1500);
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, {
      sender: 'user',
      content: input,
      timestamp: new Date()
    }]);
    
    // Also add to main chat if we're not in standalone mode
    if (!standalone) {
      addMessageToQuestionnaire({
        sender: 'user',
        content: input,
      });
    }
    
    // Clear input
    setInput('');
    
    // Simulate AI typing response
    setIsTyping(true);
    
    // Generate follow-up response
    setTimeout(() => {
      const followUpResponse = "Thank you for your question. In a full implementation, our AI would provide a detailed, personalized response based on your specific financial situation. For this demo, we're showing simulated responses to common retirement planning questions. Feel free to try one of the suggested questions to see more detailed responses with data visualization.";
      
      setChatHistory(prev => [...prev, {
        sender: 'agent',
        content: followUpResponse,
        timestamp: new Date()
      }]);
      
      // Also add to main chat if we're not in standalone mode
      if (!standalone) {
        addMessageToQuestionnaire({
          sender: 'agent',
          content: followUpResponse,
          agentType: 'questionnaire'
        });
      }
      
      setIsTyping(false);
    }, 2000);
  };
  
  // Select questions based on active category
  const getQuestions = () => {
    switch (activeCategory) {
      case 'portfolio':
        return portfolioQuestions.slice(0, 5);
      case 'contribution':
        return contributionQuestions;
      case 'social':
        return socialSecurityQuestions;
      case 'tax':
        return taxQuestions;
      case 'delay':
        return delayQuestions;
      case 'common':
      default:
        return commonFollowUpQuestions.map(q => q.question).slice(0, 5);
    }
  };
  
  const questions = getQuestions();

  const renderVisualization = (question: string) => {
    if (question.includes('market') || question.includes('downturn') || question.includes('performance')) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <LineChart className="h-4 w-4 text-blue-500 mr-1.5" /> 
            Historical Market Performance
          </h5>
          <div className="h-32 bg-white rounded-lg p-2 mb-2">
            <div className="h-full flex items-end space-x-1">
              <div style={{height: "40%"}} className="bg-red-500 w-8" title="2008: -38%"></div>
              <div style={{height: "75%"}} className="bg-green-500 w-8" title="2009: +26%"></div>
              <div style={{height: "50%"}} className="bg-green-500 w-8" title="2010: +15%"></div>
              <div style={{height: "40%"}} className="bg-green-500 w-8" title="2011: +2%"></div>
              <div style={{height: "60%"}} className="bg-green-500 w-8" title="2012: +16%"></div>
              <div style={{height: "80%"}} className="bg-green-500 w-8" title="2013: +32%"></div>
              <div style={{height: "55%"}} className="bg-green-500 w-8" title="2014: +13%"></div>
              <div style={{height: "45%"}} className="bg-green-500 w-8" title="2015: +1%"></div>
              <div style={{height: "52%"}} className="bg-green-500 w-8" title="2016: +11%"></div>
              <div style={{height: "65%"}} className="bg-green-500 w-8" title="2017: +21%"></div>
              <div style={{height: "30%"}} className="bg-red-500 w-8" title="2018: -4%"></div>
              <div style={{height: "70%"}} className="bg-green-500 w-8" title="2019: +31%"></div>
              <div style={{height: "60%"}} className="bg-green-500 w-8" title="2020: +18%"></div>
            </div>
          </div>
          <p className="text-xs text-gray-500">Simulated S&P 500 yearly returns for a balanced portfolio during market cycles</p>
        </div>
      );
    } else if (question.includes('inflation')) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <TrendingUp className="h-4 w-4 text-blue-500 mr-1.5" />
            Inflation Impact on Purchasing Power
          </h5>
          <div className="h-32 bg-white rounded-lg p-2 mb-2">
            <div className="h-full flex items-end space-x-4 justify-center">
              <div className="flex flex-col items-center">
                <div className="h-24 bg-blue-500 w-16 rounded-t"></div>
                <p className="text-xs mt-1">Today</p>
                <p className="text-xs font-bold">$100</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-20 bg-blue-400 w-16 rounded-t"></div>
                <p className="text-xs mt-1">10 Years</p>
                <p className="text-xs font-bold">$74</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 bg-blue-300 w-16 rounded-t"></div>
                <p className="text-xs mt-1">20 Years</p>
                <p className="text-xs font-bold">$54</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 bg-blue-200 w-16 rounded-t"></div>
                <p className="text-xs mt-1">30 Years</p>
                <p className="text-xs font-bold">$40</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500">Purchasing power of $100 over time with 3% annual inflation</p>
        </div>
      );
    } else if (question.includes('Social Security')) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Clock className="h-4 w-4 text-blue-500 mr-1.5" />
            Social Security Claiming Age Impact
          </h5>
          <div className="space-y-2 mb-2">
            <div className="flex items-center">
              <span className="w-20 text-xs text-gray-500">Age 62:</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="w-16 text-right text-xs font-medium">-30%</span>
            </div>
            <div className="flex items-center">
              <span className="w-20 text-xs text-gray-500">Age 67:</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <span className="w-16 text-right text-xs font-medium">100%</span>
            </div>
            <div className="flex items-center">
              <span className="w-20 text-xs text-gray-500">Age 70:</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: '124%' }}></div>
              </div>
              <span className="w-16 text-right text-xs font-medium">+24%</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">Monthly benefit amounts based on claiming age (Full Retirement Age = 67)</p>
        </div>
      );
    } else if (question.includes('4%') || question.includes('withdraw')) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <DollarSign className="h-4 w-4 text-blue-500 mr-1.5" />
            4% Withdrawal Rule: $1M Portfolio
          </h5>
          <div className="flex items-center justify-between mb-3 px-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs font-medium">Initial</p>
              <p className="text-xs font-bold text-blue-600">$1,000,000</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-1">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs font-medium">Year 1</p>
              <p className="text-xs font-bold text-green-600">$40,000</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-1">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs font-medium">Year 2</p>
              <p className="text-xs font-bold text-green-600">$41,200</p>
              <p className="text-xs text-gray-500">+3% inflation</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">The 4% rule suggests a first-year withdrawal of 4% of your portfolio, with subsequent withdrawals adjusted for inflation.</p>
        </div>
      );
    } else if (question.includes('tax')) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <DollarSign className="h-4 w-4 text-blue-500 mr-1.5" />
            Traditional vs. Roth Tax Impact
          </h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h6 className="text-xs font-medium text-blue-700 mb-1">Traditional IRA/401(k)</h6>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Contributions:</span>
                  <span className="text-xs font-medium">Pre-tax</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Growth:</span>
                  <span className="text-xs font-medium">Tax-deferred</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Withdrawals:</span>
                  <span className="text-xs font-medium">Taxed</span>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h6 className="text-xs font-medium text-green-700 mb-1">Roth IRA/401(k)</h6>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Contributions:</span>
                  <span className="text-xs font-medium">After-tax</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Growth:</span>
                  <span className="text-xs font-medium">Tax-free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Withdrawals:</span>
                  <span className="text-xs font-medium">Tax-free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (question.includes('savings') || question.includes('contribution')) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <TrendingUp className="h-4 w-4 text-blue-500 mr-1.5" />
            Impact of Monthly Contributions
          </h5>
          <div className="bg-white p-3 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-1/3 pr-2">
                <div className="text-center">
                  <div className="inline-block h-20 w-4 bg-blue-200"></div>
                  <div className="inline-block h-28 w-4 bg-blue-300"></div>
                  <div className="inline-block h-40 w-4 bg-blue-400"></div>
                  <div className="inline-block h-56 w-4 bg-blue-500"></div>
                </div>
                <p className="text-xs text-center mt-1">$200/mo</p>
              </div>
              <div className="w-1/3 px-2">
                <div className="text-center">
                  <div className="inline-block h-20 w-4 bg-green-200"></div>
                  <div className="inline-block h-32 w-4 bg-green-300"></div>
                  <div className="inline-block h-48 w-4 bg-green-400"></div>
                  <div className="inline-block h-72 w-4 bg-green-500"></div>
                </div>
                <p className="text-xs text-center mt-1">$500/mo</p>
              </div>
              <div className="w-1/3 pl-2">
                <div className="text-center">
                  <div className="inline-block h-20 w-4 bg-purple-200"></div>
                  <div className="inline-block h-36 w-4 bg-purple-300"></div>
                  <div className="inline-block h-56 w-4 bg-purple-400"></div>
                  <div className="inline-block h-96 w-4 bg-purple-500"></div>
                </div>
                <p className="text-xs text-center mt-1">$1,000/mo</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-2">
              <span>10 Years</span>
              <span>20 Years</span>
              <span>30 Years</span>
              <span>40 Years</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Growth comparison of different monthly contribution amounts over time at 7% annual return</p>
        </div>
      );
    }
    
    // Default visualization if no specific one matches
    return portfolios.length > 0 ? (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <PieChart className="h-4 w-4 text-blue-500 mr-1.5" />
          Portfolio Comparison
        </h5>
        <div className="flex justify-between items-end h-40 bg-white rounded-lg p-3 mb-2">
          {portfolios.map((portfolio, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-16 rounded-t-lg" 
                style={{
                  height: `${Math.round(portfolio.projectedFund / 20000)}px`,
                  backgroundColor: portfolio.colorScheme.primary,
                  maxHeight: "120px"
                }}
              ></div>
              <p className="text-xs font-medium mt-1">{portfolio.type}</p>
              <p className="text-xs">${Math.round(portfolio.projectedFund / 1000)}k</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500">Projected retirement fund amounts for each portfolio strategy</p>
      </div>
    ) : null;
  };

  // Early return for advisor mode or report tab
  if (mode === 'advisor' || activeTab === 'report') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div 
        className="flex items-center justify-between px-4 py-3 bg-blue-50 cursor-pointer border-b border-gray-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
          <span className="font-medium text-blue-700">Common Questions</span>
        </div>
        <button className="text-blue-500 hover:text-blue-700">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>
      
      {isExpanded && (
        <div>
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-500">
              Click on any question to see an immediate answer with AI-generated visualizations:
            </p>
          </div>
          
          <div className="p-2 border-b border-gray-200 flex overflow-x-auto space-x-1">
            <button
              className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                activeCategory === 'common' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('common')}
            >
              General
            </button>
            <button
              className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                activeCategory === 'portfolio' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('portfolio')}
            >
              Portfolios
            </button>
            <button
              className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                activeCategory === 'contribution' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('contribution')}
            >
              Savings
            </button>
            <button
              className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                activeCategory === 'social' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('social')}
            >
              Social Security
            </button>
            <button
              className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                activeCategory === 'tax' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('tax')}
            >
              Taxes
            </button>
            <button
              className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                activeCategory === 'delay' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('delay')}
            >
              Timing
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3">
            {questions.map((question, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg cursor-pointer flex items-start ${
                  selectedQuestion === question 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
                onClick={() => handleQuestionClick(question)}
              >
                <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">{question}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedQuestion && standalone && (
        <div className="border-t border-gray-200 p-4">
          <div className="mb-3">
            <h3 className="text-lg font-medium text-gray-900 mb-2">AI Response</h3>
            <div className="text-sm text-gray-500 flex items-center">
              <Bot className="h-4 w-4 mr-1 text-blue-500" />
              <span>Powered by Lyzr AI</span>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${
                    message.sender === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {message.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`flex flex-col max-w-[80%] leading-1.5 ${
                      message.sender === 'user'
                        ? 'items-end'
                        : 'items-start'
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="px-4 py-2 bg-gray-100 rounded-lg rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef}></div>
            </div>
            
            {/* Render visualization based on the question */}
            {chatHistory.length > 1 && chatHistory[0].sender === 'user' && renderVisualization(chatHistory[0].content)}
            
            {selectedQuestion.includes('market') && chatHistory.length > 1 && (
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <h5 className="text-sm font-medium text-blue-700 mb-2">Portfolio Strategy Recommendation</h5>
                <div className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Consider a <strong>bucket strategy</strong> for retirement: Keep 1-2 years of expenses in cash, 3-7 years in conservative investments, and the remainder in growth assets. This approach helps you avoid selling investments during market downturns.
                  </p>
                </div>
              </div>
            )}

            {selectedQuestion.includes('4%') && chatHistory.length > 1 && (
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h5 className="text-sm font-medium text-blue-700 mb-1">Alternative Withdrawal Methods</h5>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5 mt-2">
                      <li>The <strong>Variable Percentage Withdrawal (VPW)</strong> method adjusts withdrawals based on portfolio performance and remaining time horizon</li>
                      <li>The <strong>Guardrails Approach</strong> sets ceiling and floor withdrawal rates that adjust based on portfolio performance</li>
                      <li>The <strong>RMD Method</strong> bases withdrawals on IRS Required Minimum Distribution tables</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {selectedQuestion.includes('inflation') && chatHistory.length > 1 && (
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h5 className="text-sm font-medium text-blue-700 mb-1">Inflation-Fighting Investment Strategies</h5>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5 mt-2">
                      <li>Consider <strong>Treasury Inflation-Protected Securities (TIPS)</strong> which adjust principal with inflation</li>
                      <li>Add <strong>REITs</strong> to your portfolio as real estate tends to appreciate with inflation</li>
                      <li>Include <strong>commodities</strong> as a small allocation to hedge against unexpected inflation shocks</li>
                      <li>Focus on companies with <strong>pricing power</strong> that can pass inflation costs to consumers</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask a follow-up question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between mt-4 pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">Simulated answers for demo purposes</span>
            <a 
              href="https://www.lyzr.ai/responsible-ai" 
              className="text-xs text-blue-600 hover:underline flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by Lyzr AI
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickQuestions;