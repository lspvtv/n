export interface Person {
  id: string;
  name: string;
  birthDate: string;
  relationship: string;
  interests: string[];
  personalityTraits: string[];
  communicationStyle: 'formal' | 'casual' | 'funny' | 'poetic';
  userId: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  communicationStyle: 'formal' | 'casual' | 'funny' | 'poetic';
  credits: number;
  createdAt: string;
}