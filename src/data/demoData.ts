import { RetirementData } from '../types';

// Sample user profiles for demo purposes
export const sampleUserProfiles = [
  {
    name: 'John Smith',
    age: 35,
    retirementAge: 65,
    currentSavings: 150000,
    annualIncome: 90000,
    riskTolerance: 'Medium' as const,
    desiredLifestyle: 'I want to travel a few months each year and maintain my current standard of living. I\'d like to have a small vacation home somewhere warm.'
  },
  {
    name: 'Sarah Johnson',
    age: 42,
    retirementAge: 67,
    currentSavings: 320000,
    annualIncome: 125000,
    riskTolerance: 'High' as const,
    desiredLifestyle: 'I plan to downsize my home but want to travel extensively. I\'d like to spend time with grandchildren and pursue my passion for photography.'
  },
  {
    name: 'Michael Rodriguez',
    age: 29,
    retirementAge: 60,
    currentSavings: 85000,
    annualIncome: 75000,
    riskTolerance: 'High' as const,
    desiredLifestyle: 'I want to retire early and pursue entrepreneurial projects. I\'m willing to live frugally now for financial independence later.'
  },
  {
    name: 'Emily Chang',
    age: 52,
    retirementAge: 69,
    currentSavings: 650000,
    annualIncome: 180000,
    riskTolerance: 'Low' as const,
    desiredLifestyle: 'I\'m looking for a secure retirement with predictable income. Healthcare costs are a priority, and I\'d like to leave inheritance for my children.'
  },
  {
    name: 'Robert Wilson',
    age: 60,
    retirementAge: 67,
    currentSavings: 950000,
    annualIncome: 140000,
    riskTolerance: 'Medium' as const,
    desiredLifestyle: 'I\'m approaching retirement and want to ensure my savings last through my lifetime. I plan to travel moderately and enjoy hobbies.'
  }
];

// Prewritten questions for customer questionnaire
export const questionnaireResponses = {
  age: [
    '35',
    '42',
    '29',
    '52',
    '60'
  ],
  retirementAge: [
    '65',
    '67',
    '60',
    '69',
    '67'
  ],
  currentSavings: [
    '150000',
    '320000',
    '85000',
    '650000',
    '950000'
  ],
  annualIncome: [
    '90000',
    '125000',
    '75000',
    '180000',
    '140000'
  ],
  riskTolerance: [
    'I\'d say medium, I can handle some ups and downs',
    'High, I want maximum growth and can tolerate volatility',
    'High. I have time to recover from market downturns',
    'Low. I\'m getting closer to retirement and want stability',
    'Medium - I\'m cautious but want decent returns'
  ],
  desiredLifestyle: [
    'I want to travel a few months each year and maintain my current standard of living. I\'d like to have a small vacation home somewhere warm.',
    'I plan to downsize my home but want to travel extensively. I\'d like to spend time with grandchildren and pursue my passion for photography.',
    'I want to retire early and pursue entrepreneurial projects. I\'m willing to live frugally now for financial independence later.',
    'I\'m looking for a secure retirement with predictable income. Healthcare costs are a priority, and I\'d like to leave inheritance for my children.',
    'I\'m approaching retirement and want to ensure my savings last through my lifetime. I plan to travel moderately and enjoy hobbies.'
  ]
};

// Common questions for portfolio exploration
export const portfolioQuestions = [
  'How does this portfolio perform during market downturns?',
  'What\'s the historical performance of this asset allocation?',
  'How does inflation impact this portfolio?',
  'Can I increase my stock allocation?',
  'What if I need to withdraw more than 4%?',
  'How much should I be saving each month?',
  'When can I retire with this plan?',
  'How does this compare to a target date fund?',
  'What happens if I delay retirement by 2 years?',
  'What tax advantages should I consider?'
];

// Advisor customization requests
export const advisorRequests = [
  'Increase stock allocation by 10% and reduce bonds accordingly',
  'Add more international exposure to diversify against US market',
  'Make this portfolio more conservative for a client nearing retirement',
  'Adjust for higher inflation expectations by adding more REITs and TIPS',
  'Optimize for tax efficiency with municipal bonds',
  'Add more dividend-focused investments for income',
  'Reduce small cap exposure and focus on large established companies',
  'Increase bond duration for higher yield',
  'Create a more ESG-focused portfolio',
  'Add some alternative investments for diversification'
];

// Sample advisor responses to customization requests
export const advisorResponses = [
  'I\'ve increased the stock allocation by 10% and reduced bonds accordingly. This increases the expected return but also the volatility of the portfolio.',
  'I\'ve added more international exposure to reduce correlation with US markets. This should provide better diversification benefits during market stress.',
  'I\'ve made this portfolio more conservative by reducing equity exposure and increasing bonds and cash. This should reduce volatility as the client approaches retirement.',
  'I\'ve adjusted the portfolio for higher inflation expectations by adding REIT exposure and inflation-protected securities. These asset classes have historically provided better inflation protection.',
  'I\'ve optimized the portfolio for tax efficiency by allocating to municipal bonds in taxable accounts and keeping high-turnover strategies in tax-advantaged accounts.',
  'I\'ve increased allocation to dividend-focused equities and REITs to enhance income generation while maintaining growth potential.',
  'I\'ve reduced small cap exposure and added more large established companies. This should reduce volatility while still providing good growth potential.',
  'I\'ve increased the bond duration component which should provide higher yield, though with more interest rate sensitivity.',
  'I\'ve shifted the portfolio to include more ESG-focused funds that align with environmental, social, and governance considerations while maintaining similar risk/return characteristics.',
  'I\'ve added a 5% allocation to alternative investments like commodities and absolute return strategies to improve diversification.'
];

// Demo questions for tax implications calculator
export const taxQuestions = [
  'How does Roth vs. Traditional IRA affect my taxes?',
  'Will I pay more taxes in retirement?',
  'How much can I save on taxes with retirement accounts?',
  'Should I convert some of my Traditional to Roth?',
  'How does the SECURE Act affect my retirement taxes?'
];

// Demo questions for Social Security estimator
export const socialSecurityQuestions = [
  'When should I claim Social Security?',
  'How much does waiting until 70 increase my benefit?',
  'How are my Social Security benefits calculated?',
  'Will Social Security be there for me?',
  'Are Social Security benefits taxable?'
];

// Helper functions to simulate advisors tailoring portfolios
export function simulatePortfolioAdjustment(
  portfolio: RetirementData, 
  adjustmentType: string
): RetirementData {
  // Create a deep copy to avoid modifying original
  const adjustedPortfolio = JSON.parse(JSON.stringify(portfolio));
  
  switch (adjustmentType) {
    case 'conservative':
      adjustedPortfolio.riskTolerance = 'Low';
      break;
    case 'aggressive':
      adjustedPortfolio.riskTolerance = 'High';
      break;
    case 'earlier':
      adjustedPortfolio.retirementAge = Math.max(55, adjustedPortfolio.retirementAge - 5);
      break;
    case 'later':
      adjustedPortfolio.retirementAge = Math.min(75, adjustedPortfolio.retirementAge + 5);
      break;
    case 'more-savings':
      adjustedPortfolio.currentSavings = Math.round(adjustedPortfolio.currentSavings * 1.5);
      break;
    case 'higher-income':
      adjustedPortfolio.annualIncome = Math.round(adjustedPortfolio.annualIncome * 1.2);
      break;
    default:
      // No changes
      break;
  }
  
  return adjustedPortfolio;
}

// Common follow-up questions for retirement planning
export const commonFollowUpQuestions = [
  {
    question: "How much will healthcare cost in retirement?",
    answer: "Healthcare costs in retirement can vary widely, but studies suggest a 65-year-old couple might need around $300,000 set aside specifically for healthcare expenses throughout retirement, not including long-term care. Medicare will cover some costs, but there are premiums, copays, and services not covered."
  },
  {
    question: "How does inflation affect my retirement plan?",
    answer: "Inflation erodes purchasing power over time. A 3% annual inflation rate means $100 today will only buy $74 worth of goods in 10 years. Your retirement portfolio needs to grow faster than inflation to maintain your lifestyle. This is why we include inflation-hedging assets like stocks and REITs in your portfolio."
  },
  {
    question: "What happens if the market crashes right before I retire?",
    answer: "A market crash near retirement can significantly impact your portfolio. This 'sequence of returns risk' is why we recommend gradually reducing risk as you approach retirement and maintaining a cash buffer of 1-2 years of expenses. This allows you to avoid selling investments at depressed prices during market downturns."
  },
  {
    question: "Should I pay off my mortgage before retiring?",
    answer: "It depends on your specific situation. Paying off a mortgage provides peace of mind and reduces monthly expenses. However, if your mortgage interest rate is lower than what your investments can earn, it might make mathematical sense to keep the mortgage. Consider your comfort with debt, tax situation, and overall financial plan."
  },
  {
    question: "How much can I withdraw without running out of money?",
    answer: "The traditional guideline is the 4% rule, which suggests withdrawing 4% of your portfolio in the first year of retirement, then adjusting that amount for inflation each year. This approach has historically provided a high probability of your money lasting 30+ years. However, your personal withdrawal rate should be tailored to your unique situation."
  },
  {
    question: "What's the best age to start taking Social Security?",
    answer: "You can start claiming Social Security as early as 62, but benefits increase about 8% for each year you delay until age 70. The optimal claiming age depends on your health, longevity expectations, financial needs, and marital status. For married couples, coordinating claiming strategies becomes even more important."
  },
  {
    question: "How does Medicare work with my retirement plan?",
    answer: "Medicare eligibility begins at age 65, regardless of when you retire. It has multiple parts: Part A (hospital coverage, usually premium-free), Part B (medical services, with premiums), Part D (prescription drugs, with premiums), and optional Medigap policies. If you retire before 65, you'll need to secure alternative health insurance until Medicare eligibility."
  },
  {
    question: "How do I factor in long-term care costs?",
    answer: "Long-term care is a significant retirement risk. Options include: long-term care insurance, hybrid life/LTC policies, self-funding through additional savings, or relying on family care. The average nursing home costs over $100,000 annually, so having a strategy is essential. We typically recommend starting to consider these options in your 50s."
  }
];

// Prewritten questions for monthly contribution calculator
export const contributionQuestions = [
  'How much do I need to save each month to reach $1 million?',
  'If I increase my contributions by $200 monthly, how much more will I have at retirement?',
  'How does increasing my contribution rate impact my retirement?',
  'Should I max out my 401(k) or pay down debt?',
  'What\'s the impact of starting to save 5 years earlier?'
];

// Questions about ETF recommendations
export const etfQuestions = [
  'What ETFs are best for a conservative portfolio?',
  'How do I implement the recommended asset allocation?',
  'Which ETFs have the lowest fees?',
  'What\'s the difference between VTI and SPY?',
  'Should I use bond ETFs or individual bonds?'
];

// Demo questions for cost of delay calculator
export const delayQuestions = [
  'What if I delay retirement by 3 years?',
  'How much more monthly income will I have by working longer?',
  'What\'s the financial impact of early retirement?',
  'How do part-time work options affect my retirement plan?',
  'Can delaying retirement help me if I\'m behind on savings?'
];