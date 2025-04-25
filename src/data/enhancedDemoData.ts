import { ChartData } from '../types/visualization';

// Types for enhanced demo questions
export interface EnhancedDemoQuestion {
  question: string;
  answer: string;
  visualization?: {
    type: 'line' | 'bar' | 'pie' | 'scatter' | 'area';
    data: ChartData;
    title: string;
    description: string;
  };
  followUpQuestions?: string[];
}

// Portfolio-related questions with visualizations
export const enhancedPortfolioQuestions: EnhancedDemoQuestion[] = [
  {
    question: "How does this portfolio perform during market downturns?",
    answer: "This portfolio is designed to be resilient during market downturns. Based on historical data, during the 2008 financial crisis, a similar portfolio would have experienced a maximum drawdown of approximately 25%, compared to the S&P 500's 50% drawdown. The portfolio's diversified nature helps mitigate risk while maintaining growth potential.",
    visualization: {
      type: 'line',
      data: {
        labels: ['2007', '2008', '2009', '2010', '2011'],
        datasets: [
          {
            label: 'Your Portfolio',
            data: [100, 75, 85, 95, 105],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          },
          {
            label: 'S&P 500',
            data: [100, 50, 65, 80, 85],
            borderColor: 'rgb(156, 163, 175)',
            backgroundColor: 'rgba(156, 163, 175, 0.1)',
          }
        ]
      },
      title: 'Portfolio Performance During 2008 Crisis',
      description: 'Comparison of portfolio performance vs S&P 500 during the 2008 financial crisis'
    },
    followUpQuestions: [
      "What's the worst-case scenario for this portfolio?",
      "How quickly does it typically recover from downturns?",
      "Should I adjust my allocation during market downturns?"
    ]
  },
  {
    question: "What's the historical performance of this asset allocation?",
    answer: "This asset allocation has shown consistent performance over the past 20 years. On average, it has returned 7.2% annually, with a standard deviation of 12%. The portfolio has outperformed inflation by an average of 4.5% per year, making it suitable for long-term growth.",
    visualization: {
      type: 'area',
      data: {
        labels: ['2000', '2005', '2010', '2015', '2020', '2023'],
        datasets: [
          {
            label: 'Portfolio Value',
            data: [100000, 150000, 180000, 250000, 350000, 420000],
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
          }
        ]
      },
      title: 'Historical Portfolio Growth',
      description: 'Growth of $100,000 investment over 23 years'
    }
  },
  {
    question: "How does inflation impact this portfolio?",
    answer: "This portfolio is designed to be inflation-resistant through a combination of stocks, real estate, and inflation-protected securities. Historically, it has maintained purchasing power even during periods of high inflation. For example, during the 1970s high inflation period, a similar portfolio would have grown by 8% annually while inflation averaged 7%.",
    visualization: {
      type: 'line',
      data: {
        labels: ['1970', '1975', '1980', '1985'],
        datasets: [
          {
            label: 'Portfolio Growth',
            data: [100, 140, 190, 280],
            borderColor: 'rgb(16, 185, 129)',
          },
          {
            label: 'Inflation',
            data: [100, 150, 200, 250],
            borderColor: 'rgb(239, 68, 68)',
          }
        ]
      },
      title: 'Portfolio Performance vs Inflation',
      description: 'Comparison of portfolio growth and inflation during high inflation period'
    }
  },
  {
    question: "What's the current asset allocation breakdown?",
    answer: "Your portfolio is strategically allocated across different asset classes to balance risk and return. The current allocation is 60% stocks (40% domestic, 20% international), 30% bonds (20% government, 10% corporate), and 10% alternative investments (5% real estate, 5% commodities). This mix provides diversification while targeting long-term growth.",
    visualization: {
      type: 'pie',
      data: {
        labels: ['Domestic Stocks', 'International Stocks', 'Government Bonds', 'Corporate Bonds', 'Real Estate', 'Commodities'],
        datasets: [
          {
            data: [40, 20, 20, 10, 5, 5],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(20, 184, 166, 0.8)'
            ]
          }
        ]
      },
      title: 'Current Portfolio Allocation',
      description: 'Breakdown of your investment portfolio by asset class'
    }
  }
];

// Tax-related questions with visualizations
export const enhancedTaxQuestions: EnhancedDemoQuestion[] = [
  {
    question: "How does Roth vs. Traditional IRA affect my taxes?",
    answer: "The choice between Roth and Traditional IRAs significantly impacts your tax situation. With a Traditional IRA, you get an immediate tax deduction but pay taxes on withdrawals. With a Roth IRA, you pay taxes now but get tax-free withdrawals in retirement. For someone in the 24% tax bracket, a $6,000 contribution to a Traditional IRA saves $1,440 in current taxes, while a Roth contribution requires paying that $1,440 now.",
    visualization: {
      type: 'bar',
      data: {
        labels: ['Traditional IRA', 'Roth IRA'],
        datasets: [
          {
            label: 'Tax Savings Now',
            data: [1440, 0],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
          },
          {
            label: 'Tax Savings in Retirement',
            data: [0, 1440],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
          }
        ]
      },
      title: 'Tax Impact of IRA Contributions',
      description: 'Comparison of tax savings between Traditional and Roth IRAs'
    }
  },
  {
    question: "What's the tax impact of different withdrawal strategies?",
    answer: "Your withdrawal strategy can significantly impact your tax burden in retirement. For example, withdrawing $50,000 annually from a Traditional IRA would result in about $4,500 in federal taxes, while a mix of 60% Traditional and 40% Roth withdrawals could reduce that to $2,700. Strategic withdrawals can help minimize your tax liability while maintaining your desired lifestyle.",
    visualization: {
      type: 'bar',
      data: {
        labels: ['Traditional Only', 'Mixed (60/40)', 'Roth Only'],
        datasets: [
          {
            label: 'Annual Tax Liability',
            data: [4500, 2700, 0],
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
          }
        ]
      },
      title: 'Tax Impact of Different Withdrawal Strategies',
      description: 'Annual tax liability for $50,000 withdrawals using different strategies'
    }
  },
  {
    question: "How do capital gains affect my taxes?",
    answer: "Capital gains are taxed differently based on your holding period and income level. For 2024, long-term capital gains (assets held over a year) are taxed at 0%, 15%, or 20% depending on your income. Short-term gains are taxed as ordinary income. For example, a $10,000 long-term gain could be tax-free if you're in the 0% bracket, or cost $1,500 if you're in the 15% bracket.",
    visualization: {
      type: 'bar',
      data: {
        labels: ['0% Bracket', '15% Bracket', '20% Bracket', 'Short-term'],
        datasets: [
          {
            label: 'Tax on $10,000 Gain',
            data: [0, 1500, 2000, 2400],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
          }
        ]
      },
      title: 'Capital Gains Tax Rates',
      description: 'Tax liability on $10,000 capital gain by tax bracket'
    }
  }
];

// Social Security questions with visualizations
export const enhancedSocialSecurityQuestions: EnhancedDemoQuestion[] = [
  {
    question: "When should I claim Social Security?",
    answer: "The optimal claiming age depends on your life expectancy and financial needs. Claiming at 62 reduces your benefit by 30%, while waiting until 70 increases it by 32% compared to your full retirement age benefit. For example, if your full retirement age benefit is $2,000/month, claiming at 62 would give you $1,400/month, while waiting until 70 would give you $2,640/month.",
    visualization: {
      type: 'line',
      data: {
        labels: ['62', '67', '70'],
        datasets: [
          {
            label: 'Monthly Benefit',
            data: [1400, 2000, 2640],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          }
        ]
      },
      title: 'Social Security Benefit by Claiming Age',
      description: 'Monthly benefit amounts based on claiming age'
    }
  },
  {
    question: "How does working affect my Social Security benefits?",
    answer: "If you claim Social Security before your full retirement age and continue working, your benefits may be reduced. For 2024, if you're under full retirement age, $1 is deducted from your benefits for every $2 you earn above $22,320. In the year you reach full retirement age, $1 is deducted for every $3 you earn above $59,520 until the month you reach full retirement age.",
    visualization: {
      type: 'bar',
      data: {
        labels: ['Earnings Below Limit', 'Earnings Above Limit'],
        datasets: [
          {
            label: 'Benefit Reduction',
            data: [0, 1000],
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
          }
        ]
      },
      title: 'Social Security Earnings Test Impact',
      description: 'Example of benefit reduction when working while claiming early'
    }
  },
  {
    question: "What's the impact of delaying Social Security?",
    answer: "Delaying Social Security can significantly increase your lifetime benefits. For each year you delay past your full retirement age, your benefit increases by 8% until age 70. For example, if your full retirement age benefit is $2,000/month, waiting until 70 would give you $2,640/month. Over a 20-year retirement, this could mean an additional $153,600 in benefits.",
    visualization: {
      type: 'line',
      data: {
        labels: ['62', '67', '70'],
        datasets: [
          {
            label: 'Total Benefits (20 years)',
            data: [336000, 480000, 633600],
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
          }
        ]
      },
      title: 'Lifetime Social Security Benefits',
      description: 'Total benefits received over 20 years based on claiming age'
    }
  }
];

// Contribution calculator questions with visualizations
export const enhancedContributionQuestions: EnhancedDemoQuestion[] = [
  {
    question: "How much do I need to save each month to reach $1 million?",
    answer: "The monthly savings needed to reach $1 million depends on your current age, expected return, and years until retirement. For example, a 30-year-old planning to retire at 65 with a 7% return would need to save $550 per month. Starting 5 years later at age 35 would require $800 per month to reach the same goal.",
    visualization: {
      type: 'bar',
      data: {
        labels: ['Starting at 30', 'Starting at 35', 'Starting at 40'],
        datasets: [
          {
            label: 'Monthly Contribution Needed',
            data: [550, 800, 1200],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
          }
        ]
      },
      title: 'Monthly Savings Required for $1 Million',
      description: 'Monthly contributions needed to reach $1 million by age 65'
    }
  },
  {
    question: "What's the impact of increasing my 401(k) contribution?",
    answer: "Increasing your 401(k) contribution can significantly boost your retirement savings. For example, increasing your contribution from 6% to 10% of a $75,000 salary would add $3,000 more per year to your retirement savings. Over 30 years with a 7% return, this could grow to an additional $283,000 in your retirement account.",
    visualization: {
      type: 'line',
      data: {
        labels: ['Year 0', 'Year 10', 'Year 20', 'Year 30'],
        datasets: [
          {
            label: '6% Contribution',
            data: [0, 75000, 200000, 400000],
            borderColor: 'rgb(156, 163, 175)',
          },
          {
            label: '10% Contribution',
            data: [0, 125000, 350000, 683000],
            borderColor: 'rgb(16, 185, 129)',
          }
        ]
      },
      title: 'Impact of Increased 401(k) Contributions',
      description: 'Growth of retirement savings with different contribution rates'
    }
  },
  {
    question: "How does employer matching affect my retirement savings?",
    answer: "Employer matching can significantly boost your retirement savings. For example, with a 50% match up to 6% of your salary, contributing 6% of a $75,000 salary ($4,500) would result in an additional $2,250 from your employer. Over 30 years with a 7% return, this match alone could grow to over $200,000.",
    visualization: {
      type: 'area',
      data: {
        labels: ['Year 0', 'Year 10', 'Year 20', 'Year 30'],
        datasets: [
          {
            label: 'Your Contributions',
            data: [0, 75000, 200000, 400000],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          },
          {
            label: 'Employer Match',
            data: [0, 37500, 100000, 200000],
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
          }
        ]
      },
      title: 'Impact of Employer Matching',
      description: 'Growth of retirement savings with and without employer matching'
    }
  }
];

// Cost of delay questions with visualizations
export const enhancedDelayQuestions: EnhancedDemoQuestion[] = [
  {
    question: "What if I delay retirement by 3 years?",
    answer: "Delaying retirement by 3 years can significantly improve your retirement outlook. For example, if you're currently planning to retire at 65 with $500,000 saved, working until 68 could increase your savings to $650,000 (assuming 7% returns and continued contributions). This also reduces the number of years you need to fund in retirement.",
    visualization: {
      type: 'line',
      data: {
        labels: ['65', '66', '67', '68'],
        datasets: [
          {
            label: 'Retirement Savings',
            data: [500000, 550000, 600000, 650000],
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
          }
        ]
      },
      title: 'Impact of Delaying Retirement',
      description: 'Growth of retirement savings by delaying retirement'
    }
  },
  {
    question: "What's the cost of delaying retirement savings?",
    answer: "Delaying retirement savings can significantly impact your final nest egg. For example, starting to save $500/month at age 25 instead of 35 could result in $1.2 million more at retirement (assuming 7% returns and retirement at 65). The power of compound interest makes early savings particularly valuable.",
    visualization: {
      type: 'line',
      data: {
        labels: ['25', '35', '45', '55', '65'],
        datasets: [
          {
            label: 'Starting at 25',
            data: [0, 100000, 300000, 700000, 1500000],
            borderColor: 'rgb(16, 185, 129)',
          },
          {
            label: 'Starting at 35',
            data: [0, 0, 100000, 300000, 700000],
            borderColor: 'rgb(239, 68, 68)',
          }
        ]
      },
      title: 'Cost of Delaying Savings',
      description: 'Growth of retirement savings based on when you start saving'
    }
  },
  {
    question: "How does delaying Social Security affect my retirement income?",
    answer: "Delaying Social Security can significantly increase your retirement income. For example, if your full retirement age benefit is $2,000/month, waiting until 70 would give you $2,640/month. Over a 20-year retirement, this could mean an additional $153,600 in benefits. This can be particularly valuable if you have other sources of income to bridge the gap.",
    visualization: {
      type: 'bar',
      data: {
        labels: ['Claim at 62', 'Claim at 67', 'Claim at 70'],
        datasets: [
          {
            label: 'Annual Income',
            data: [16800, 24000, 31680],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
          }
        ]
      },
      title: 'Annual Social Security Income',
      description: 'Annual Social Security income based on claiming age'
    }
  }
]; 