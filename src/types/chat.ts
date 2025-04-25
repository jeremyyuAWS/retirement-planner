export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  metadata?: {
    visualization?: {
      type: string;
      data: any;
      title?: string;
      description?: string;
    };
  };
}
