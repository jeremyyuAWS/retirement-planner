import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { AlertCircle, Calculator } from 'lucide-react';
import QuickQuestions from '../common/QuickQuestions';

const TaxImplicationsCalculator: React.FC = () => {
  const { retirementData, selectedPortfolio, portfolios } = useAppContext();
  const [currentTaxRate, setCurrentTaxRate] = useState<number>(25);
  const [retirementTaxRate, setRetirementTaxRate] = useState<number>(15);
  const [stateTaxRate, setStateTaxRate] = useState<number>(5);
  const [investmentType, setInvestmentType] = useState<'traditional' | 'roth'>('traditional');
  
  const activePortfolio = selectedPortfolio || (portfolios.length > 0 ? portfolios[0] : null);
  
  if (!activePortfolio || !retirementData) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">No portfolio selected</h3>
        <p className="text-yellow-700">
          Please select a portfolio first to calculate tax implications.
        </p>
      </div>
    );
  }

  // Calculate annual contribution (15% of income)
  const annualContribution = retirementData.annualIncome * 0.15;
  
  // Calculate tax savings during accumulation phase (for traditional)
  const currentTaxSavings = investmentType === 'traditional' 
    ? annualContribution * (currentTaxRate / 100)
    : 0;
  
  const yearsToRetirement = retirementData.retirementAge - retirementData.age;
  const totalContributions = annualContribution * yearsToRetirement;
  
  // Calculate tax on withdrawals during retirement
  const effectiveTaxRate = retirementTaxRate + stateTaxRate;
  const annualWithdrawal = activePortfolio.annualWithdrawal;
  
  const annualTaxInRetirement = investmentType === 'traditional'
    ? annualWithdrawal * (effectiveTaxRate / 100)
    : 0;
  
  // Calculate after-tax withdrawal amount
  const afterTaxAnnualWithdrawal = annualWithdrawal - annualTaxInRetirement;
  
  // Estimate lifetime tax impact (simplified)
  const lifetimeTaxSavingsTraditional = currentTaxSavings * yearsToRetirement;
  const lifetimeTaxPaymentsTraditional = annualTaxInRetirement * 30; // Assuming 30 years in retirement
  
  const netTaxEffect = investmentType === 'traditional'
    ? lifetimeTaxSavingsTraditional - lifetimeTaxPaymentsTraditional
    : -totalContributions * (currentTaxRate / 100);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="max-w-7xl mx-auto">
        <QuickQuestions standalone={true} />
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Calculator className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Tax Implications Calculator</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Investment Type</h4>
              <div className="flex space-x-4 mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="account-type"
                    value="traditional"
                    checked={investmentType === 'traditional'}
                    onChange={() => setInvestmentType('traditional')}
                  />
                  <span className="ml-2 text-sm text-gray-700">Traditional (Pre-tax)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="account-type"
                    value="roth"
                    checked={investmentType === 'roth'}
                    onChange={() => setInvestmentType('roth')}
                  />
                  <span className="ml-2 text-sm text-gray-700">Roth (After-tax)</span>
                </label>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Tax Rate (Federal)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="40"
                      step="1"
                      value={currentTaxRate}
                      onChange={(e) => setCurrentTaxRate(parseInt(e.target.value, 10))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 w-16 text-right">{currentTaxRate}%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Retirement Tax Rate (Federal)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="40"
                      step="1"
                      value={retirementTaxRate}
                      onChange={(e) => setRetirementTaxRate(parseInt(e.target.value, 10))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 w-16 text-right">{retirementTaxRate}%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State Tax Rate
                  </label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="12"
                      step="0.5"
                      value={stateTaxRate}
                      onChange={(e) => setStateTaxRate(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 w-16 text-right">{stateTaxRate}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Tax Impact Summary</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Annual Contribution:</span>
                  <span className="text-sm font-medium">{formatCurrency(annualContribution)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Annual Tax {investmentType === 'traditional' ? 'Savings' : 'Cost'}:</span>
                  <span className="text-sm font-medium">
                    {investmentType === 'traditional'
                      ? formatCurrency(currentTaxSavings)
                      : formatCurrency(annualContribution * (currentTaxRate / 100))}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Annual Withdrawal (Pre-tax):</span>
                  <span className="text-sm font-medium">{formatCurrency(annualWithdrawal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Annual Tax in Retirement:</span>
                  <span className="text-sm font-medium">{formatCurrency(annualTaxInRetirement)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">After-Tax Annual Withdrawal:</span>
                  <span className="text-sm font-medium">{formatCurrency(afterTaxAnnualWithdrawal)}</span>
                </div>
                
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Estimated Lifetime Tax Effect:</span>
                    <span 
                      className={`text-sm font-medium ${
                        netTaxEffect > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {formatCurrency(Math.abs(netTaxEffect))} 
                      {netTaxEffect > 0 ? ' Savings' : ' Cost'}
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-1">
                  Note: This is a simplified calculation based on current and projected tax rates.
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-700 mb-1">Tax Strategy Comparison</h4>
                <p className="text-blue-700 mb-2">
                  <strong>Traditional accounts</strong> (401k, Traditional IRA) provide tax deductions now, but withdrawals are taxed in retirement.
                  <strong> Roth accounts</strong> (Roth 401k, Roth IRA) are funded with after-tax dollars, but withdrawals are tax-free in retirement.
                </p>
                <p className="text-blue-700">
                  Generally, choose Traditional if you expect your retirement tax rate to be lower than your current rate,
                  and Roth if you expect your retirement tax rate to be higher.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxImplicationsCalculator;