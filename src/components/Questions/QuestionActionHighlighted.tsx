import classNames from 'classnames'
import { useFirebase } from 'hooks'
import { Button } from '../Button'
import { QuestionActionProps } from './types'

export function QuestionActionHighlighted({
  question,
  questionPath,
  disabled,
} : QuestionActionProps) {
  const { isHighlighted } = question
  const { error, update } = useFirebase()

  async function handleHighlighted() {
    return await update(questionPath, { isHighlighted: !isHighlighted })
  }

  return (
    <Button
      small
      variant="white"
      title={`${isHighlighted ? 'Desmarcar' : 'Marcar'} como respondida`}
      disabled={disabled}
      onClick={handleHighlighted}
      className={classNames(
        'question__action',
        {
          'active': isHighlighted,
          'error': error.message,
        }
      )}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
        />
      </svg>
    </Button>
  )
}
