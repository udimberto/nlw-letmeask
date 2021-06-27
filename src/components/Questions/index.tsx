import { useAuth } from 'hooks'
import { LikesType, QuestionType } from 'types'
import { Question } from './Question'
import { QuestionActions } from './QuestionActions'
import { QuestionLike } from './QuestionLike'
import './actions.scss'

export type QuestionsProps = {
  isOwner?: boolean
  likes?: LikesType
  loading?: boolean
  questions?: Array<QuestionType>
  questionsPath: string
}

export function Questions({
  isOwner = false,
  questions = [],
  questionsPath = '',
}: QuestionsProps) {
  const { user } = useAuth()
  const { id: userId = '' } = user || {}

  return (
    <section
      id="roomQuestions"
      className="p-16-t"
    >
      {questions.map((question: any) => (
        <Question
          key={`roomQuestion${question.id}`}
          id={`roomQuestion${question.id}`}
          question={question}
        >
          <div className="flex flex--centered-y flex--row gap-4">
            <QuestionLike
              likes={question?.likes}
              userId={userId}
              questionPath={`${questionsPath}/${question.id}`}
            />
            {isOwner && (
              <QuestionActions
                // userId={userId}
                // questionPath={`${questionsPath}/${question.id}`}
              />
            )}
          </div>
        </Question>
      ))}
    </section>
  )
}
