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
  }
]; 