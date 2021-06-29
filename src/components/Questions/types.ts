import { AllHTMLAttributes } from 'react'
import { LikesType, QuestionType } from 'types'

export type QuestionsProps = {
  isOwner?: boolean
  likes?: LikesType
  loading?: boolean
  questions?: Array<QuestionType>
  questionsPath: string
}

export interface QuestionProps extends AllHTMLAttributes<HTMLDivElement> {
  question: QuestionType
  likeCallback?: () => void
  resolveCallback?: () => void
  removeCallback?: () => void
}

export type QuestionActionProps = {
  question: QuestionType
  questionPath: string
  disabled?: boolean
  userId?: string
}
