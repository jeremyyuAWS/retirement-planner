import React, { useState } from 'react';
import { Portfolio } from '../../types';
import { useAppContext } from '../../context/AppContext';
import PortfolioDonutChart from '../visualizations/PortfolioDonutChart';
import { TrendingUp, BarChartBig, AlertCircle, ArrowRight } from 'lucide-react';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => {
  const { setSelectedPortfolio, setActiveTab } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewReport = () => {
    setSelectedPortfolio(portfolio);
    setActiveTab('report');
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${
        isExpanded ? 'transform scale-[1.02]' : ''
      }`}
      style={{ borderTop: `4px solid ${portfolio.colorScheme.primary}` }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{portfolio.type} Plan</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskBadgeColor(portfolio.riskLevel)}`}>
            {portfolio.riskLevel} Risk
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gray-100">
              <TrendingUp className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Projected at Retirement</p>
              <p className="text-lg font-bold text-gray-900">
                ${Math.round(portfolio.projectedFund).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gray-100">
              <BarChartBig className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Annual Withdrawal</p>
              <p className="text-lg font-bold text-gray-900">
                ${Math.round(portfolio.annualWithdrawal).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-center">
            <PortfolioDonutChart 
              allocation={portfolio.allocation}
              colorPrimary={portfolio.colorScheme.primary}
              colorSecondary={portfolio.colorScheme.secondary}
              colorAccent={portfolio.colorScheme.accent}
            />
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Portfolio Allocation</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm">
                <span className="text-gray-500">Stocks:</span> {portfolio.allocation.stocks}%
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Bonds:</span> {portfolio.allocation.bonds}%
              </div>
              <div className="text-sm">
                <span className="text-gray-500">REITs:</span> {portfolio.allocation.reits}%
              </div>
              <div className="text-sm">
                <span className="text-gray-500">International:</span> {portfolio.allocation.international}%
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Alternatives:</span> {portfolio.allocation.alternatives}%
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Cash:</span> {portfolio.allocation.cash}%
              </div>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-1">Portfolio Strategy</h4>
              <p className="text-sm text-gray-600">{portfolio.description}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-1">Growth Potential</h4>
              <p className="text-sm text-gray-600">
                This portfolio is designed for an average annual return of {(portfolio.cagr * 100).toFixed(1)}% over the long term.
              </p>
            </div>

            <div className="flex items-center gap-1 text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
              <AlertCircle className="h-4 w-4" />
              <span>Past performance is not indicative of future results</span>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <ArrowRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-2">
        <button 
          onClick={() => setActiveTab('compare')}
          className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Compare Options
        </button>
        <button 
          onClick={handleViewReport}
          className="flex-1 px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View Full Report
        </button>
      </div>
    </div>
  );
};

export default PortfolioCard;