import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import QuickQuestionsModal from '../QuickQuestionsModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickQuestions = [
    "What are the key financial goals for this customer?",
    "What is the customer's risk tolerance?",
    "What is the customer's current investment portfolio?",
    "What are the customer's retirement plans?",
    "What is the customer's current income and expenses?"
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
        <h2 className="text-xl font-bold">Customer Insights</h2>
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

export default CustomerInsights;