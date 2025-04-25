import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Mode, User, RetirementData, Portfolio, ChatThread, Message } from '../types';
import { generatePortfolios } from '../data/mockData';
import { commonFollowUpQuestions, advisorResponses } from '../data/demoData';

interface AppContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  retirementData: RetirementData | null;
  setRetirementData: (data: RetirementData) => void;
  portfolios: Portfolio[];
  setPortfolios: (portfolios: Portfolio[]) => void;
  questionnaireChatThread: ChatThread;
  addMessageToQuestionnaire: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  showWelcomeModal: boolean;
  setShowWelcomeModal: (show: boolean) => void;
  resetQuestionnaire: () => void;
  selectedPortfolio: Portfolio | null;
  setSelectedPortfolio: (portfolio: Portfolio | null) => void;
  advisorChats: Record<string, ChatThread>;
  addMessageToAdvisorChat: (portfolioType: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
}

const defaultRetirementData: RetirementData = {
  age: 35,
  retirementAge: 65,
  currentSavings: 150000,
  annualIncome: 90000,
  riskTolerance: 'Medium',
  desiredLifestyle: ''
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>('customer');
  const [user] = useState<User>({ name: 'John Smith', sessionId: 'user-123456' });
  const [activeTab, setActiveTab] = useState('plan');
  const [retirementData, setRetirementData] = useState<RetirementData | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [questionnaireChatThread, setQuestionnaireChatThread] = useState<ChatThread>({
    id: 'questionnaire-thread',
    messages: [],
  });
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [advisorChats, setAdvisorChats] = useState<Record<string, ChatThread>>({
    'Aggressive': { id: 'advisor-aggressive', messages: [] },
    'Balanced': { id: 'advisor-balanced', messages: [] },
    'Safe': { id: 'advisor-safe', messages: [] },
  });

  const addMessageToQuestionnaire = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
    };
    
    setQuestionnaireChatThread(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    // If this is the last user message and we have all the data, generate portfolios
    if (message.sender === 'user' && retirementData?.desiredLifestyle) {
      setTimeout(() => {
        const generatedPortfolios = generatePortfolios(retirementData);
        setPortfolios(generatedPortfolios);
        
        const finalMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'agent',
          content: 'Based on your inputs, I\'ve created three retirement portfolio options for you. Please switch to the "Explore Options" tab to view them.',
          timestamp: new Date(),
          agentType: 'questionnaire',
        };
        
        setQuestionnaireChatThread(prev => ({
          ...prev,
          messages: [...prev.messages, finalMessage],
        }));
        
        setActiveTab('explore');
      }, 1500);
    } else if (message.sender === 'user') {
      // For demonstration purposes, add follow-up response to general questions
      setTimeout(() => {
        // Check if the message might be a question
        if (message.content.endsWith('?')) {
          // Find if we have a prepared answer
          const questionLower = message.content.toLowerCase();
          const matchedQuestion = commonFollowUpQuestions.find(q => 
            questionLower.includes(q.question.toLowerCase().replace('?', ''))
          );
          
          if (matchedQuestion) {
            const responseMessage = {
              id: `msg-${Date.now() + 1}`,
              sender: 'agent',
              content: matchedQuestion.answer,
              timestamp: new Date(),
              agentType: 'questionnaire',
            };
            
            setQuestionnaireChatThread(prev => ({
              ...prev,
              messages: [...prev.messages, responseMessage],
            }));
          } else {
            // Generic response for questions we don't have specific answers for
            const responseMessage = {
              id: `msg-${Date.now() + 1}`,
              sender: 'agent',
              content: "That's a great question about retirement planning. In a production environment, I would provide a detailed, personalized answer based on your specific situation and the latest financial research.",
              timestamp: new Date(),
              agentType: 'questionnaire',
            };
            
            setQuestionnaireChatThread(prev => ({
              ...prev,
              messages: [...prev.messages, responseMessage],
            }));
          }
        }
      }, 1000);
    }
  };

  const addMessageToAdvisorChat = (portfolioType: string, message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
    };
    
    setAdvisorChats(prev => ({
      ...prev,
      [portfolioType]: {
        ...prev[portfolioType],
        messages: [...prev[portfolioType].messages, newMessage],
      }
    }));

    // Simulate AI response for advisor
    if (message.sender === 'user') {
      setTimeout(() => {
        // Get a random predefined response or generate a contextual one
        let responseContent = advisorResponses[Math.floor(Math.random() * advisorResponses.length)];
        
        // Try to make the response more contextual based on user input
        const userInput = message.content.toLowerCase();
        
        if (userInput.includes('stock') || userInput.includes('equit')) {
          responseContent = `I've adjusted the stock allocation as requested. This changes the risk/return profile of the portfolio while maintaining diversification across asset classes.`;
        } else if (userInput.includes('bond')) {
          responseContent = `I've modified the bond allocation as requested. This affects the income and stability characteristics of the portfolio.`;
        } else if (userInput.includes('international') || userInput.includes('global')) {
          responseContent = `I've adjusted the international exposure as requested. This changes the portfolio's geographic diversification and currency exposure.`;
        } else if (userInput.includes('reit') || userInput.includes('real estate')) {
          responseContent = `I've modified the REIT allocation as requested. This affects the portfolio's exposure to real estate markets and potential inflation protection.`;
        } else if (userInput.includes('risk') || userInput.includes('conservative') || userInput.includes('aggressive')) {
          responseContent = `I've adjusted the overall risk profile of the portfolio as requested. This impacts the expected volatility and long-term returns.`;
        }
        
        const aiResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'agent',
          content: responseContent,
          timestamp: new Date(),
          agentType: 'editor',
        };
        
        setAdvisorChats(prev => ({
          ...prev,
          [portfolioType]: {
            ...prev[portfolioType],
            messages: [...prev[portfolioType].messages, aiResponse],
          }
        }));

        // Update portfolio allocation (simulated)
        setPortfolios(prev => 
          prev.map(p => 
            p.type === portfolioType 
              ? { 
                  ...p, 
                  allocation: { 
                    ...p.allocation,
                    stocks: Math.max(0, Math.min(100, p.allocation.stocks + (Math.random() * 10 - 5))),
                    bonds: Math.max(0, Math.min(100, p.allocation.bonds + (Math.random() * 10 - 5))),
                    reits: Math.max(0, Math.min(100, p.allocation.reits + (Math.random() * 5 - 2.5))),
                    international: Math.max(0, Math.min(100, p.allocation.international + (Math.random() * 5 - 2.5))),
                    alternatives: Math.max(0, Math.min(100, p.allocation.alternatives + (Math.random() * 5 - 2.5))),
                    cash: Math.max(0, Math.min(100, p.allocation.cash + (Math.random() * 5 - 2.5))),
                  }
                } 
              : p
          )
        );
      }, 1500);
    }
  };

  const resetQuestionnaire = () => {
    setQuestionnaireChatThread({
      id: 'questionnaire-thread',
      messages: [],
    });
    setRetirementData({...defaultRetirementData, desiredLifestyle: ''});
  };

  // This effect watches for changes to retirementData and generates portfolios
  React.useEffect(() => {
    if (retirementData && retirementData.desiredLifestyle) {
      const generatedPortfolios = generatePortfolios(retirementData);
      setPortfolios(generatedPortfolios);
    }
  }, [retirementData]);

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        user,
        activeTab,
        setActiveTab,
        retirementData,
        setRetirementData,
        portfolios,
        setPortfolios,
        questionnaireChatThread,
        addMessageToQuestionnaire,
        showWelcomeModal,
        setShowWelcomeModal,
        resetQuestionnaire,
        selectedPortfolio,
        setSelectedPortfolio,
        advisorChats,
        addMessageToAdvisorChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};