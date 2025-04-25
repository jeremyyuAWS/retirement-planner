import React from 'react';
import { X } from 'lucide-react';

interface QuickQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (question: string) => void;
  questions: string[];
}

const QuickQuestionsModal: React.FC<QuickQuestionsModalProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
  questions
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Quick Questions</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {questions.map((question, index) => (
            <button
              key={index}
              onClick={() => {
                onSelectQuestion(question);
                onClose();
              }}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickQuestionsModal; 