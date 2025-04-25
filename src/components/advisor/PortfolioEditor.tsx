import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Send, Bot, User, InfoIcon } from 'lucide-react';

interface PortfolioEditorProps {
  portfolioType: string;
}

const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ portfolioType }) => {
  const { advisorChats, addMessageToAdvisorChat } = useAppContext();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatThread = advisorChats[portfolioType];
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatThread?.messages]);
  
  // Initialize chat with a welcome message if empty
  useEffect(() => {
    if (chatThread && chatThread.messages.length === 0) {
      addMessageToAdvisorChat(portfolioType, {
        sender: 'agent',
        content: `Welcome to the ${portfolioType} Portfolio Editor. You can modify this portfolio by telling me what changes you'd like to make. For example, you can say "Increase stock allocation to 60%" or "Add more international exposure."`,
        agentType: 'editor'
      });
    }
  }, [portfolioType, chatThread, addMessageToAdvisorChat]);
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    addMessageToAdvisorChat(portfolioType, {
      sender: 'user',
      content: input,
    });
    
    setInput('');
  };
  
  if (!chatThread) {
    return <div>Loading chat...</div>;
  }
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <h3 className="font-medium text-lg text-gray-900">{portfolioType} Portfolio Editor</h3>
        <p className="text-sm text-gray-500">
          Make modifications to this portfolio by chatting with the AI assistant.
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatThread.messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2.5 ${
              message.sender === 'user' ? 'justify-end' : ''
            }`}
          >
            {message.sender === 'agent' && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <Bot className="w-4 h-4 text-indigo-600" />
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
                    ? 'bg-indigo-600 text-white rounded-tr-none'
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
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type portfolio modifications..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition-colors"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-3 flex items-start text-xs text-gray-500">
          <InfoIcon className="h-4 w-4 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
          <p>
            Example commands: "Reduce stock allocation by 10%", "Add more REITs", "Make this portfolio more conservative", "Increase international exposure"
          </p>
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Reset Changes
          </button>
          <button className="px-3 py-1 text-sm border border-transparent rounded-md shadow-sm font-medium text-white bg-green-600 hover:bg-green-700">
            Publish for Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioEditor;