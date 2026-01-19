
export interface AIResponse {
  text?: string;
  imageUrl?: string;
  error?: string;
}

export enum ToolType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VOICE = 'VOICE'
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
