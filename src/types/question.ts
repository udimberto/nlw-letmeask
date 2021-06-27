import { LikesType } from './like'
import { UserType } from './user'

export type QuestionType = {
  content: string;
  author?: UserType;
  id?: string;
  likes?: LikesType;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export type QuestionsType = Array<QuestionType>
