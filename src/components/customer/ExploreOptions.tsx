import React from 'react';
import { useAppContext } from '../../context/AppContext';
import PortfolioCard from './PortfolioCard';
import QuickQuestions from '../common/QuickQuestions';

const ExploreOptions: React.FC = () => {
  const { portfolios, retirementData } = useAppContext();

  if (portfolios.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-yellow-50 p-6 rounded-lg max-w-lg">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">No portfolios generated yet</h3>
          <p className="text-yellow-700">
            Please complete the questionnaire in the "Plan Your Retirement" tab first to generate your personalized portfolio options.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <QuickQuestions standalone={true} />
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Retirement Portfolio Options</h2>
          <p className="text-gray-600">
            Based on your inputs, we've created three personalized portfolio options for your retirement planning. 
            Each option balances risk and return differently to suit your preferences.
          </p>
          {retirementData && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Your Retirement Profile</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current Age</p>
                  <p className="font-medium">{retirementData.age}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Retirement Age</p>
                  <p className="font-medium">{retirementData.retirementAge}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Savings</p>
                  <p className="font-medium">${retirementData.currentSavings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Income</p>
                  <p className="font-medium">${retirementData.annualIncome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Risk Tolerance</p>
                  <p className="font-medium">{retirementData.riskTolerance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Years to Retirement</p>
                  <p className="font-medium">{retirementData.retirementAge - retirementData.age}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.type} portfolio={portfolio} />
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Disclaimer</h3>
          <p className="text-sm text-gray-600">
            This is an AI-generated recommendation based on the information you provided. 
            Actual investment results may vary. Past performance is not indicative of future results. 
            Please consult with a qualified financial advisor before making investment decisions.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <a href="https://www.lyzr.ai/responsible-ai" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Learn more about Lyzr's Responsible AI
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreOptions;