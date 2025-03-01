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
