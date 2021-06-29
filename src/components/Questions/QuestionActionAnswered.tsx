import classNames from 'classnames'
import { useFirebase } from 'hooks'
import { Button } from '../Button'
import { QuestionActionProps } from './types'

export function QuestionActionAnswered({
  question,
  questionPath,
  disabled,
} : QuestionActionProps) {
  const { isAnswered } = question
  const { error, update } = useFirebase()

  async function handleAnswered() {
    return await update(
      questionPath,
      {
        isAnswered: !isAnswered,
        ...(isAnswered ? {} : {
          isHighlighted: false,
        }),
      },
    )
  }

  return (
    <Button
      small
      variant="white"
      title={`${isAnswered ? 'Desmarcar' : 'Marcar'} como resolvida`}
      disabled={disabled}
      onClick={handleAnswered}
      className={classNames(
        'question__action',
        {
          'active': isAnswered,
          'error': error.message,
        }
      )}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12.0003"
          cy="11.9998"
          r="9.00375"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  )
}
