import { AllHTMLAttributes } from 'react'
import { QuestionType } from 'types'

export interface QuestionProps extends AllHTMLAttributes<HTMLDivElement> {
  question: QuestionType;
}

export function Question(props: QuestionProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <div
      className="box box--shadow p-8-ver p-16-hor"
      {...rest}
    >
      {children}
    </div>
  )
}
