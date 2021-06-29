import { useAuth } from 'hooks'
import { QuestionsProps } from './types'
import { Question } from './Question'
import { QuestionActionAnswered } from './QuestionActionAnswered'
import { QuestionActionHighlighted } from './QuestionActionHighlighted'
import { QuestionActionLike } from './QuestionActionLike'
import { QuestionActionRemove } from './QuestionActionRemove'
import './question.scss'

export function Questions({
  isOwner = false,
  questions = [],
  questionsPath = '',
} : QuestionsProps) {
  const { user } = useAuth()
  const { id: userId = '' } = user || {}

  return (
    <section id="roomQuestions">
      {questions.map((question: any) => (
        <Question
          key={`roomQuestion${question.id}`}
          id={`roomQuestion${question.id}`}
          question={question}
        >
          <div className="flex flex--centered-y flex--row gap-4">
            <QuestionActionLike
              question={question}
              questionPath={`${questionsPath}/${question.id}`}
              disabled={question?.isAnswered}
              userId={userId}
            />
            {isOwner && (
              <>
                <QuestionActionAnswered
                  question={question}
                  questionPath={`${questionsPath}/${question.id}`}
                />
                <QuestionActionHighlighted
                  question={question}
                  questionPath={`${questionsPath}/${question.id}`}
                  disabled={question?.isAnswered}
                />
                <QuestionActionRemove
                  question={question}
                  questionPath={`${questionsPath}/${question.id}`}
                  disabled={question?.isAnswered}
                />
              </>
            )}
          </div>
        </Question>
      ))}
    </section>
  )
}
