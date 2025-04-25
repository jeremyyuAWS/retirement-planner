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
  enhancedPortfolioQuestions,
  enhancedTaxQuestions,
  enhancedSocialSecurityQuestions,
  enhancedContributionQuestions,
  enhancedDelayQuestions,
  enhancedExploreQuestions,
  enhancedCompareQuestions,
  enhancedReportQuestions,
  enhancedAdvisorQuestions,
  EnhancedDemoQuestion
} from '../../data/enhancedDemoData';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

interface QuickQuestionsProps {
  standalone?: boolean;
  mode?: 'customer' | 'advisor';
}

interface ChatMessage {
  sender: 'user' | 'agent';
  content: string;
  timestamp: Date;
  visualization?: {
    type: 'line' | 'bar' | 'pie' | 'scatter' | 'area';
    data: any;
    title: string;
    description: string;
  };
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ standalone = true, mode = 'customer' }) => {
  const { addMessageToQuestionnaire } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const [activeCategory, setActiveCategory] = useState<
    'portfolio' | 'tax' | 'social' | 'contribution' | 'delay' | 'explore' | 'compare' | 'report' | 'insights' | 'customize' | 'etf'
  >('portfolio');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleQuestionClick = (question: EnhancedDemoQuestion) => {
    // Set active question
    setSelectedQuestion(question.question);
    
    // Reset chat history and add the user question
    setChatHistory([
      {
        sender: 'user',
        content: question.question,
        timestamp: new Date()
      }
    ]);
    
    // Also add to main chat if we're not in standalone mode
    if (!standalone) {
      addMessageToQuestionnaire({
        sender: 'user',
        content: question.question,
      });
    }
    
    // Simulate AI typing response
    setIsTyping(true);
    
    // Generate response with visualization
    setTimeout(() => {
      setChatHistory((prev: ChatMessage[]) => [...prev, {
        sender: 'agent',
        content: question.answer,
        timestamp: new Date(),
        visualization: question.visualization
      }]);
      
      // Also add to main chat if we're not in standalone mode
      if (!standalone) {
        addMessageToQuestionnaire({
          sender: 'agent',
          content: question.answer,
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
    setChatHistory((prev: ChatMessage[]) => [...prev, {
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
      
      setChatHistory((prev: ChatMessage[]) => [...prev, {
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
        return enhancedPortfolioQuestions;
      case 'contribution':
        return enhancedContributionQuestions;
      case 'social':
        return enhancedSocialSecurityQuestions;
      case 'tax':
        return enhancedTaxQuestions;
      case 'delay':
        return enhancedDelayQuestions;
      case 'explore':
        return enhancedExploreQuestions;
      case 'compare':
        return enhancedCompareQuestions;
      case 'report':
        return enhancedReportQuestions;
      case 'insights':
        return enhancedAdvisorQuestions.filter(q => q.question.includes("insights"));
      case 'customize':
        return enhancedAdvisorQuestions.filter(q => q.question.includes("customize"));
      case 'etf':
        return enhancedAdvisorQuestions.filter(q => q.question.includes("ETF"));
      default:
        return enhancedPortfolioQuestions;
    }
  };
  
  const questions = getQuestions();

  const renderVisualization = (visualization: ChatMessage['visualization']) => {
    if (!visualization) return null;

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: visualization.title,
        },
      },
    };

    switch (visualization.type) {
      case 'line':
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <LineChart className="h-4 w-4 text-blue-500 mr-1.5" /> 
              {visualization.title}
            </h5>
            <p className="text-xs text-gray-500 mb-3">{visualization.description}</p>
            <div className="h-64">
              <Chart type="line" data={visualization.data} options={options} />
            </div>
          </div>
        );
      case 'bar':
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <BarChart className="h-4 w-4 text-blue-500 mr-1.5" /> 
              {visualization.title}
            </h5>
            <p className="text-xs text-gray-500 mb-3">{visualization.description}</p>
            <div className="h-64">
              <Chart type="bar" data={visualization.data} options={options} />
            </div>
          </div>
        );
      case 'pie':
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <PieChart className="h-4 w-4 text-blue-500 mr-1.5" /> 
              {visualization.title}
            </h5>
            <p className="text-xs text-gray-500 mb-3">{visualization.description}</p>
            <div className="h-64">
              <Chart type="pie" data={visualization.data} options={options} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${standalone ? 'fixed bottom-4 right-4 z-50' : ''}`}>
      <div className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
        standalone ? 'w-96' : 'w-full'
      } ${isExpanded ? 'h-[80vh]' : 'h-auto'}`}>
        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            <h3 className="font-medium">Quick Questions</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:text-blue-100"
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>

        {isExpanded ? (
          <div className="flex flex-col h-full">
            <div className="flex space-x-2 p-3 bg-gray-50 border-b border-gray-200 overflow-x-auto">
              {mode === 'customer' ? (
                <>
                  <button
                    className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                      activeCategory === 'portfolio' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory('portfolio')}
                  >
                    Portfolio
                  </button>
                  <button
                    className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                      activeCategory === 'explore' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory('explore')}
                  >
                    Explore
                  </button>
                  <button
                    className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                      activeCategory === 'compare' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory('compare')}
                  >
                    Compare
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
                  <button
                    className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                      activeCategory === 'report' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory('report')}
                  >
                    Report
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                      activeCategory === 'insights' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory('insights')}
                  >
                    Insights
                  </button>
                  <button
                    className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                      activeCategory === 'customize' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory('customize')}
                  >
                    Customize
                  </button>
                  <button
                    className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
                      activeCategory === 'etf' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory('etf')}
                  >
                    ETFs
                  </button>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3">
              {questions.map((question, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer flex items-start ${
                    selectedQuestion === question.question 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() => handleQuestionClick(question)}
                >
                  <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{question.question}</span>
                </div>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 border-t border-gray-200">
              {chatHistory.map((message, index) => (
                <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-flex items-start max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`rounded-full p-2 ${
                      message.sender === 'user' ? 'bg-blue-100 ml-2' : 'bg-gray-100 mr-2'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Bot className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      {message.visualization && renderVisualization(message.visualization)}
                    </div>
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <Bot className="h-4 w-4" />
                  <span className="text-sm">AI is typing...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <p className="text-sm text-gray-600">
              Click to expand and see common retirement planning questions with visualizations.
            </p>
          </div>
        )}
        
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
    </div>
  );
};

export default QuickQuestions;