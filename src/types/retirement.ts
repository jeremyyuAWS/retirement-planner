export interface RetirementData {
  age: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualIncome: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  desiredLifestyle: string;
  socialSecurityStartAge?: number;
  expectedInflation?: number;
  expectedReturns?: {
    conservative: number;
    moderate: number;
    aggressive: number;
  };
  taxBracket?: number;
  hasEmployerMatch?: boolean;
  employerMatchPercent?: number;
  employerMatchLimit?: number;
} 