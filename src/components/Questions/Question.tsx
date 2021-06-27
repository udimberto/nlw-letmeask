import { AllHTMLAttributes } from 'react'
import { QuestionType } from 'types'
import { User } from '../User'

export interface QuestionProps extends AllHTMLAttributes<HTMLDivElement> {
  question: QuestionType;
  likeCallback?: () => void;
  resolveCallback?: () => void;
  removeCallback?: () => void;
}

export function Question({
  children,
  question,
  ...rest
}: QuestionProps) {
  const { author, content } = question

  return (
    <article
      className="box box--shadow p-24 m-16-t"
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
