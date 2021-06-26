import { UserType } from './user'

export type QuestionType = {
  content: string;
  author?: UserType;
  id?: string;
  likes?: Array<string>;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export type QuestionsType = Array<QuestionType>
