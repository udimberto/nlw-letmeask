import classNames from 'classnames'
import { User } from '../User'
import { QuestionProps } from './types'

export function Question({
  children,
  question,
  ...rest
} : QuestionProps) {
  const {
    author,
    content,
    isAnswered,
    isHighlighted,
  } = question

  return (
    <article
      className={classNames(
        ' p-24 m-16-t',
        'box box--shadow',
        {
          'box--disabled': isAnswered,
          'box--primary': !isAnswered && isHighlighted,
        }
      )}
      {...rest}
    >
      <div className="text-sm">
        {content}
      </div>
      <footer className="flex flex--row flex--sb p-24-t text-gray-dark">
        <div className="flex flex--centered-y flex--1">
          <User user={author} />
        </div>
        <div className="flex flex--centered-y">
          {children}
        </div>
      </footer>
    </article>
  )
}
