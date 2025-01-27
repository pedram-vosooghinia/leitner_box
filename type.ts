export interface Box {
  id: number;
  name: string;
  parts: number;
  cardCount: number;
}


export interface CardType {
  id: number;
  question: string;
  answer: string;
  box_id: number;
  part: number; 
}

export interface AddCardFormProps {
  question: string;
  answer: string;
}

export interface User {
  username: string;
  email: string;
  family: string;
  user_role: string;
  password?: string,
}
export interface Box {
  id: number;
  box_number: number;
  total_parts: number;
  card_count: string;
}